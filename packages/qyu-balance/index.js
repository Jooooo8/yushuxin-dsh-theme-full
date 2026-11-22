/** Host-only bundle: exposes the DeepSeek balance to the Q-version companion widget. */
const BALANCE_URL = 'https://api.deepseek.com/user/balance';

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(body));
}

/** Reject obvious cross-site / DNS-rebinding style requests; localhost-only route. */
function trusted(req) {
  const headers = req.headers || {};
  if (headers['sec-fetch-site'] === 'cross-site') return false;
  const origin = headers.origin;
  const host = headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return false;
    } catch (e) {
      return false;
    }
  }
  return true;
}

export function apply(ctx) {
  const disposers = [];
  ctx.effect(() => () => {
    for (const d of disposers) {
      try { d(); } catch (e) {}
    }
  }, 'qyu-balance: cleanup');

  ctx.inject(['webServer', 'credentials'], (c) => {
    disposers.push(c.webServer.register({
      kind: 'exact',
      path: '/qyu-balance/balance.json',
      handler: async (req, res) => {
        if (!trusted(req)) return send(res, 403, { ok: false, error: 'forbidden' });
        try {
          // The API key never leaves the Host process.
          let cred = null;
          for (let attempt = 0; attempt < 2; attempt++) {
            try {
              cred = await c.credentials.resolve('DEEPSEEK_API_KEY');
              break;
            } catch (e) {
              if (attempt === 0) await new Promise((r) => setTimeout(r, 600));
            }
          }
          if (!cred || !cred.value) {
            return send(res, 200, { ok: false, error: '未配置 DEEPSEEK_API_KEY（可在 DSH 凭据中设置）' });
          }
          const r = await fetch(BALANCE_URL, {
            headers: { Authorization: 'Bearer ' + cred.value, Accept: 'application/json' },
            signal: AbortSignal.timeout(8000)
          });
          if (!r.ok) return send(res, 200, { ok: false, error: 'HTTP ' + r.status });
          const data = await r.json();
          const infos = Array.isArray(data.balance_infos) ? data.balance_infos : [];
          const pick =
            infos.find((x) => x && x.currency === 'CNY' && Number(x.total_balance) > 0) ||
            infos.find((x) => x && Number(x.total_balance) > 0) ||
            infos[0];
          if (!pick) return send(res, 200, { ok: false, error: '接口未返回余额' });
          return send(res, 200, {
            ok: true,
            currency: pick.currency || 'CNY',
            total: String(pick.total_balance),
            granted: String(pick.granted_balance ?? ''),
            toppedUp: String(pick.topped_up_balance ?? ''),
            available: data.is_available !== false,
            ts: Date.now()
          });
        } catch (e) {
          return send(res, 200, { ok: false, error: String((e && e.message) || e).slice(0, 160) });
        }
      }
    }));
  });
}
