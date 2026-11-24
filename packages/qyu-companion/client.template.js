window.__ModuleLoader__.load({
  id: '@local/qyu-companion',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const CHAR = '__CHAR__';
    const CLOSED = '__CLOSED__';
    const HALF = '__HALF__';
    const AUDIO = __AUDIO__;
    const NS = 'qyu-companion';

    const KEYS = [
      'bubble.1', 'bubble.2', 'bubble.3', 'bubble.4',
      'bubble.5', 'bubble.6', 'bubble.7', 'bubble.8'
    ];

    const zh = {
      'bubble.1': '嗨呀～今天也要元气满满哦！',
      'bubble.2': '摸摸头，辛苦啦 ✨',
      'bubble.3': '我在呢，随时叫我一声音～',
      'bubble.4': '要不要休息一下，喝口热水？',
      'bubble.5': '滑雪去不去？护目镜我都戴好了！',
      'bubble.6': '今天也是被自己可爱到的一天～',
      'bubble.7': '小星星正在为你打气 ⭐',
      'bubble.8': '任务完成！给你比个心 ❤️',
      'aria.character': 'Q版欣宝，点击说话并随机播放音效，拖动移动，右键打开设置',
      'tag': '欣宝',
      'menu.title': '欣宝设置',
      'menu.balance': '💰 余额记账',
      'menu.sound': '🔊 音效',
      'menu.bubble': '💬 台词泡泡',
      'menu.look': '🎚️ 外观',
      'menu.position': '🧭 位置',
      'menu.reset': '回到右下角',
      'menu.save': '保存',
      'menu.cancel': '取消',
      'menu.defaults': '恢复默认',
      'menu.preview': '试听',
      'field.showBalance': '显示余额',
      'field.refresh': '自动刷新',
      'field.warn': '余额预警低于',
      'field.refreshNow': '立即刷新',
      'field.soundOn': '点击音效',
      'field.volume': '音量',
      'field.bubbleOn': '台词泡泡',
      'field.greetOn': '进场打招呼',
      'field.size': '体型',
      'balance.total': '总余额',
      'balance.granted': '赠金',
      'balance.topped': '充值余额',
      'balance.today': '今日已用',
      'balance.updated': '更新于',
      'balance.noKey': '未配置 DEEPSEEK_API_KEY，可在 DSH 凭据中设置',
      'balance.hint': '若提示 404，请重启一次 Harness 以加载余额路由',
      'balance.loading': '查询中…',
      'bubble.balance': '余额',
      'bubble.warn': '余额偏低啦，记得充值哦',
      'unit.sec': '秒'
    };
    const en = {
      'bubble.1': 'Hi there~ Let us keep the spark today!',
      'bubble.2': 'Pat pat, you did great ✨',
      'bubble.3': 'I am right here, call me anytime~',
      'bubble.4': 'How about a break and some warm tea?',
      'bubble.5': 'Skiing? My goggles are already on!',
      'bubble.6': 'Another day of being adorable~',
      'bubble.7': 'The little stars are cheering for you ⭐',
      'bubble.8': 'Task done! Sending you a heart ❤️',
      'aria.character': 'Q-version companion, click to talk, drag to move, right-click for settings',
      'tag': 'Xinbao',
      'menu.title': 'Xinbao Settings',
      'menu.balance': '💰 Balance',
      'menu.sound': '🔊 Sound',
      'menu.bubble': '💬 Bubbles',
      'menu.look': '🎚️ Appearance',
      'menu.position': '🧭 Position',
      'menu.reset': 'Reset position',
      'menu.save': 'Save',
      'menu.cancel': 'Cancel',
      'menu.defaults': 'Defaults',
      'menu.preview': 'Preview',
      'field.showBalance': 'Show balance',
      'field.refresh': 'Auto refresh',
      'field.warn': 'Warn below',
      'field.refreshNow': 'Refresh now',
      'field.soundOn': 'Click sounds',
      'field.volume': 'Volume',
      'field.bubbleOn': 'Speech bubbles',
      'field.greetOn': 'Greet on load',
      'field.size': 'Size',
      'balance.total': 'Total',
      'balance.granted': 'Granted',
      'balance.topped': 'Topped up',
      'balance.today': 'Used today',
      'balance.updated': 'Updated',
      'balance.noKey': 'No DEEPSEEK_API_KEY configured',
      'balance.hint': 'If you see 404, restart Harness once to load the balance route',
      'balance.loading': 'Loading…',
      'bubble.balance': 'Balance',
      'bubble.warn': 'Balance is low, time to top up',
      'unit.sec': 's'
    };
    const fallback = (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? zh : en;
    let t = function (key) { return fallback[key] || key; };

    const DEFAULTS = {
      soundOn: true,
      volume: 100,
      bubbleOn: true,
      greetOn: true,
      size: 132,
      balanceOn: true,
      balanceRefresh: 60,
      warnBelow: 0
    };

    function loadSettings() {
      try {
        const raw = localStorage.getItem('qyu-settings');
        if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
      } catch (e) {}
      return Object.assign({}, DEFAULTS);
    }

    const CSS = `
.qyu-wrap{position:fixed;z-index:2147483647;touch-action:none;user-select:none;-webkit-user-select:none;animation:qyu-enter .75s cubic-bezier(.34,1.56,.64,1) both}
.qyu-char{position:relative;cursor:grab;filter:drop-shadow(0 8px 16px rgba(214,90,140,.32));animation:qyu-float 4s ease-in-out infinite;transition:transform .28s cubic-bezier(.34,1.56,.64,1)}
.qyu-char.qyu-press{transform:scale(.9) translateY(6px);animation:none}
.qyu-char.qyu-drag{cursor:grabbing;animation:none}
.qyu-char img{width:100%;height:100%;object-fit:contain;pointer-events:none;display:block;-webkit-user-drag:none}
.qyu-tag{position:absolute;left:50%;bottom:-13px;transform:translateX(-50%);padding:3px 12px;border-radius:999px;background:linear-gradient(118deg,#d94f70,#e86b8c);color:#fff;font-size:10px;letter-spacing:1px;white-space:nowrap;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 4px 12px rgba(217,79,112,.45);pointer-events:none}
.qyu-bubble{position:absolute;left:50%;bottom:calc(100% + 12px);transform:translateX(-50%);min-width:138px;max-width:242px;padding:11px 15px;border-radius:15px;background:linear-gradient(158deg,#33142a,#170a13);border:1px solid rgba(255,166,199,.2);box-shadow:inset 0 1px 0 rgba(255,214,232,.14),0 12px 32px rgba(20,3,12,.5);color:#ffe0ed;font-size:13px;line-height:1.55;text-align:center;pointer-events:none;animation:qyu-pop .25s ease-out;z-index:4;white-space:nowrap;backdrop-filter:blur(10px)}
.qyu-bubble:after{content:"";position:absolute;left:50%;bottom:-7px;width:12px;height:12px;background:#20101b;border-right:1px solid rgba(255,166,199,.2);border-bottom:1px solid rgba(255,166,199,.2);transform:translateX(-50%) rotate(45deg)}
.qyu-star{position:absolute;font-size:15px;color:#ffb8d2;pointer-events:none;animation:qyu-twinkle 2.6s ease-in-out infinite;filter:drop-shadow(0 0 5px rgba(227,93,140,.4))}
.qyu-star.s1{left:-8px;top:6px;animation-delay:0s}
.qyu-star.s2{right:-10px;top:34px;animation-delay:.7s;font-size:12px}
.qyu-star.s3{left:10px;bottom:-2px;animation-delay:1.4s;font-size:11px}
.qyu-note{position:absolute;right:-2px;top:-8px;font-size:19px;color:#ff9ec4;pointer-events:none;animation:qyu-note 1s ease-in-out infinite;filter:drop-shadow(0 0 6px rgba(227,93,140,.5))}
.qyu-gear{position:absolute;right:-4px;top:-8px;width:22px;height:22px;border-radius:50%;border:1px solid rgba(255,166,199,.3);background:rgba(34,15,29,.78);color:#ffd3e4;font-size:11px;line-height:20px;text-align:center;cursor:pointer;opacity:0;transition:opacity .2s,transform .2s,background .2s;z-index:5;padding:0;backdrop-filter:blur(8px)}
.qyu-wrap:hover .qyu-gear{opacity:1}
.qyu-gear:hover{background:rgba(217,79,112,.85);transform:rotate(45deg) scale(1.08)}
.qyu-bal-pill{position:absolute;left:50%;top:calc(100% + 18px);transform:translateX(-50%);padding:3px 11px;border-radius:999px;background:linear-gradient(120deg,rgba(217,79,112,.28),rgba(34,15,29,.78));border:1px solid rgba(255,166,199,.26);box-shadow:inset 0 1px 0 rgba(255,214,232,.14),0 4px 14px rgba(20,3,12,.4);color:#ffd3e4;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap;cursor:pointer;backdrop-filter:blur(8px);z-index:3;transition:transform .18s ease,background .18s ease}
.qyu-bal-pill:hover{transform:translateX(-50%) scale(1.05);background:linear-gradient(120deg,rgba(217,79,112,.45),rgba(34,15,29,.85))}
.qyu-bal-card{position:absolute;left:50%;bottom:calc(100% + 12px);transform:translateX(-50%);width:238px;box-sizing:border-box;padding:14px 15px;border-radius:18px;background:linear-gradient(158deg,#33142a,#170a13);border:1px solid rgba(255,166,199,.18);box-shadow:inset 0 1px 0 rgba(255,214,232,.14),0 20px 48px rgba(20,3,12,.55);z-index:5;animation:qyu-pop .22s ease-out;color:#f6e2ec;backdrop-filter:blur(12px)}
.qyu-bal-big{font-size:23px;font-weight:800;letter-spacing:.5px;font-variant-numeric:tabular-nums;background:linear-gradient(118deg,#ffe3ef,#ff9ec4);-webkit-background-clip:text;background-clip:text;color:transparent}
.qyu-bal-line{display:flex;justify-content:space-between;gap:8px;font-size:11px;padding:3px 0;color:rgba(246,226,236,.68)}
.qyu-bal-line b{color:#ffe0ed;font-weight:600;font-variant-numeric:tabular-nums}
.qyu-bal-err{font-size:10px;line-height:1.5;color:#ff9ec4;word-break:break-all}
.qyu-link{border:none;background:transparent;color:#f0a8c4;font-size:11px;cursor:pointer;padding:0;border-bottom:1px solid rgba(240,168,196,.35)}
.qyu-link:hover{color:#fff;border-bottom-color:#ff9ec4}
.qyu-backdrop{position:fixed;inset:0;z-index:2147483647;background:rgba(18,6,12,.5);backdrop-filter:blur(6px)}
.qyu-menu{position:fixed;z-index:2147483647;width:272px;max-height:76vh;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;padding:16px 17px;border-radius:22px;background:linear-gradient(158deg,#33142a 0%,#22101c 46%,#170a13 100%);border:1px solid rgba(255,166,199,.16);box-shadow:inset 0 1px 0 rgba(255,214,232,.14),inset 0 0 0 1px rgba(255,166,199,.05),0 28px 70px rgba(20,3,12,.6),0 8px 22px rgba(20,3,12,.38);color:#f6e2ec;font-size:12px;animation:qyu-menu-pop .34s cubic-bezier(.22,1.25,.36,1);backdrop-filter:blur(16px) saturate(1.25);scrollbar-width:thin;scrollbar-color:rgba(232,107,140,.35) transparent}
.qyu-menu:before{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");mix-blend-mode:soft-light}
.qyu-menu > *{position:relative;z-index:1}
.qyu-menu-title{font-size:14px;font-weight:800;letter-spacing:1px;color:#ffd3e4;display:flex;align-items:center;gap:7px;padding-bottom:6px;text-shadow:0 1px 10px rgba(227,93,140,.3)}
.qyu-ver{margin-left:auto;font-size:9px;color:rgba(240,214,230,.5);font-weight:400;letter-spacing:.8px}
.qyu-sec{font-size:10px;letter-spacing:2px;color:#f0a8c4;font-weight:700;padding:12px 2px 4px;border-top:1px solid rgba(240,168,196,.16);margin-top:8px}
.qyu-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 2px}
.qyu-row-label{font-size:11px;color:#efd8e4}
.qyu-tog{width:36px;height:20px;border-radius:999px;border:1px solid rgba(255,166,199,.16);background:rgba(255,214,232,.1);position:relative;cursor:pointer;padding:0;flex:none;transition:background .2s ease,box-shadow .2s ease}
.qyu-tog.on{background:linear-gradient(120deg,#d94f70,#e86b8c);box-shadow:0 2px 10px rgba(217,79,112,.4),inset 0 1px 0 rgba(255,255,255,.2)}
.qyu-tog i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .22s cubic-bezier(.34,1.56,.64,1);box-shadow:0 1px 3px rgba(0,0,0,.25)}
.qyu-tog.on i{transform:translateX(16px)}
.qyu-menu input[type=range]{width:112px;accent-color:#e86b8c}
.qyu-menu select,.qyu-menu input[type=number]{width:70px;border:1px solid rgba(255,166,199,.22);border-radius:8px;padding:3px 6px;background:rgba(255,214,232,.07);color:#ffe0ed;font-size:11px;outline:none}
.qyu-menu select option{background:#2a1220;color:#ffe0ed}
.qyu-btn{border:1px solid rgba(255,166,199,.22);border-radius:9px;background:rgba(255,214,232,.07);color:#ffe0ed;font-size:11px;padding:5px 10px;cursor:pointer;backdrop-filter:blur(6px);transition:background .18s ease,transform .18s ease,box-shadow .18s ease}
.qyu-btn:hover{background:rgba(232,107,140,.24);transform:translateY(-1px)}
.qyu-btn:active{transform:translateY(0) scale(.96)}
.qyu-btn.primary{background:linear-gradient(120deg,#d94f70,#e86b8c);border-color:transparent;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 4px 12px rgba(217,79,112,.4)}
.qyu-foot{display:flex;gap:6px;margin-top:14px;justify-content:flex-end}
.qyu-status{font-size:10px;line-height:1.6;color:rgba(240,214,230,.62);word-break:break-all}
@keyframes qyu-enter{from{opacity:0;transform:translateY(46px) scale(.55)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes qyu-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes qyu-pop{from{opacity:0;transform:translateX(-50%) translateY(8px) scale(.9)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
@keyframes qyu-menu-pop{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes qyu-twinkle{0%,100%{opacity:.25;transform:scale(.7) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(25deg)}}
@keyframes qyu-note{0%{opacity:0;transform:translateY(6px) scale(.8)}50%{opacity:1;transform:translateY(-6px) scale(1.1)}100%{opacity:0;transform:translateY(-18px) scale(1)}}`;

    function clampPos(p) {
      const maxX = Math.max(2, window.innerWidth - 140);
      const maxY = Math.max(2, window.innerHeight - 158);
      return {
        x: Math.min(Math.max(2, Number(p.x) || 0), maxX),
        y: Math.min(Math.max(2, Number(p.y) || 0), maxY)
      };
    }
    function defaultPos() {
      return { x: Math.max(8, window.innerWidth - 162), y: Math.max(8, window.innerHeight - 190) };
    }

    function Tog(props) {
      return h(
        'button',
        {
          type: 'button',
          className: 'qyu-tog' + (props.value ? ' on' : ''),
          role: 'switch',
          'aria-checked': !!props.value,
          'aria-label': props.label,
          onClick: function () { props.onChange(!props.value); }
        },
        h('i', null)
      );
    }
    function Row(label, control) {
      return h('div', { className: 'qyu-row' }, h('span', { className: 'qyu-row-label' }, label), control);
    }
    function Sec(text) {
      return h('div', { className: 'qyu-sec' }, text);
    }

    function Companion() {
      const [pos, setPos] = React.useState(function () {
        try {
          const raw = localStorage.getItem('qyu-companion-pos');
          if (raw) {
            const p = JSON.parse(raw);
            if (p && typeof p.x === 'number' && typeof p.y === 'number') return clampPos(p);
          }
        } catch (e) {}
        return defaultPos();
      });
      const [settings, setSettings] = React.useState(loadSettings);
      const [draft, setDraft] = React.useState(function () { return loadSettings(); });
      const [menuOpen, setMenuOpen] = React.useState(false);
      const [phrase, setPhrase] = React.useState(null);
      const [press, setPress] = React.useState(false);
      const [drag, setDrag] = React.useState(false);
      const [soundOn, setSoundOn] = React.useState(false);
      const [cardOpen, setCardOpen] = React.useState(false);
      const [eyes, setEyes] = React.useState('open');
      const [balance, setBalance] = React.useState({ state: 'idle' });
      const [used, setUsed] = React.useState(0);

      const posRef = React.useRef(pos);
      const settingsRef = React.useRef(settings);
      settingsRef.current = settings;
      const menuStart = React.useRef(null);
      const audios = React.useRef(null);
      const lastAudio = React.useRef(-1);
      const start = React.useRef(null);
      const idx = React.useRef(-1);
      const timer = React.useRef(null);
      const longTimer = React.useRef(null);
      const blinkTimers = React.useRef([]);
      const warned = React.useRef(false);

      function clearBlinks() {
        blinkTimers.current.forEach(clearTimeout);
        blinkTimers.current = [];
      }
      function blink(ms) {
        if (CLOSED === HALF) return;
        clearBlinks();
        blinkTimers.current.push(setTimeout(function () { setEyes('half'); }, 0));
        blinkTimers.current.push(setTimeout(function () { setEyes('closed'); }, 90));
        blinkTimers.current.push(setTimeout(function () { setEyes('open'); }, ms || 330));
      }

      function say(text) {
        if (!settingsRef.current.bubbleOn) return;
        setPhrase(text);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(function () { setPhrase(null); }, 5200);
      }

      const next = React.useCallback(function () {
        idx.current = (idx.current + 1) % KEYS.length;
        say(t(KEYS[idx.current]));
      }, []);

      function playSound() {
        const s = settingsRef.current;
        if (!s.soundOn) return;
        if (!audios.current) {
          audios.current = AUDIO.map(function (src) {
            const a = new Audio(src);
            a.preload = 'auto';
            a.addEventListener('ended', function () { setSoundOn(false); });
            return a;
          });
        }
        const list = audios.current;
        const vol = Math.max(0, Math.min(1, Number(s.volume) / 100));
        list.forEach(function (a) {
          a.pause();
          a.volume = vol;
          try { a.currentTime = 0; } catch (e) {}
        });
        let i = Math.floor(Math.random() * list.length);
        if (list.length > 1 && i === lastAudio.current) i = (i + 1) % list.length;
        lastAudio.current = i;
        setSoundOn(true);
        const p = list[i].play();
        if (p && typeof p.catch === 'function') p.catch(function () { setSoundOn(false); });
      }

      async function getPayload() {
        // Try every available Host route in turn. The standalone qyu-balance
        // bundle is live immediately; the companion's own route appears after
        // the next Harness restart; the whale widget is an optional fallback.
        const paths = [
          '/qyu-balance/balance.json',
          '/qyu-companion/balance.json',
          '/dsh-whale/balance.json?refresh=1'
        ];
        for (const path of paths) {
          try {
            const r = await fetch(path, { cache: 'no-store' });
            if (!r.ok) continue;
            const d = await r.json();
            if (!d) continue;
            if (d.ok && d.totalBalance !== undefined) {
              return {
                ok: true,
                total: String(d.totalBalance),
                granted: d.bonusBalance == null ? '' : String(d.bonusBalance),
                toppedUp: d.rechargeBalance == null ? '' : String(d.rechargeBalance),
                currency: d.currency || 'CNY',
                ts: d.updatedAt ? Date.parse(d.updatedAt) : Date.now()
              };
            }
            if (d.ok && d.total !== undefined) {
              return {
                ok: true,
                total: d.total,
                granted: d.granted,
                toppedUp: d.toppedUp,
                currency: d.currency,
                ts: d.ts
              };
            }
            if (d.error || d.ok === false) return { ok: false, error: d.error || 'failed' };
          } catch (e) {}
        }
        return { ok: false, error: 'NO_ROUTE · ' + t('balance.hint') };
      }

      async function refreshBalance(manual) {
        setBalance(function (b) { return { state: 'loading', data: b.data }; });
        const d = await getPayload();
        if (!d.ok) {
          setBalance({ state: 'error', message: (d.error || '') + ' · ' + t('balance.hint') });
          return;
        }
        const data = {
          ok: true,
          currency: d.currency || 'CNY',
          total: d.total,
          granted: d.granted || '',
          toppedUp: d.toppedUp || '',
          ts: Number(d.ts) || Date.now()
        };
        setBalance({ state: 'ok', data: data });
        const total = Number(data.total) || 0;
        try {
          const key = 'qyu-balance-track';
          const prev = JSON.parse(localStorage.getItem(key) || '{}');
          const today = new Date().toDateString();
          if (prev.date !== today) {
            prev.date = today;
            prev.used = 0;
            prev.last = total;
          } else {
            if (typeof prev.last === 'number' && total < prev.last - 0.000001) {
              prev.used = (prev.used || 0) + (prev.last - total);
            }
            prev.last = total;
          }
          localStorage.setItem(key, JSON.stringify(prev));
          setUsed(prev.used || 0);
        } catch (e) {}
        if (manual) say(t('bubble.balance') + ' ' + data.currency + ' ' + total.toFixed(2));
        const limit = Number(settingsRef.current.warnBelow) || 0;
        if (limit > 0 && total < limit && !warned.current) {
          warned.current = true;
          say('⚠️ ' + t('bubble.warn') + ' (' + data.currency + ' ' + total.toFixed(2) + ')');
        }
      }

      React.useEffect(function () {
        const hello = settingsRef.current.greetOn ? setTimeout(next, 1500) : null;
        let blinkLoop = null;
        if (CLOSED !== HALF) {
          const schedule = function () {
            blinkLoop = setTimeout(function () {
              blink();
              schedule();
            }, 3000 + Math.random() * 5000);
          };
          schedule();
        }
        function onResize() {
          setPos(function (p) {
            const c = clampPos(p);
            posRef.current = c;
            return c;
          });
        }
        window.addEventListener('resize', onResize);
        return function () {
          if (hello) clearTimeout(hello);
          if (blinkLoop) clearTimeout(blinkLoop);
          clearBlinks();
          window.removeEventListener('resize', onResize);
          if (timer.current) clearTimeout(timer.current);
          if (longTimer.current) clearTimeout(longTimer.current);
          if (audios.current) audios.current.forEach(function (a) { a.pause(); });
        };
      }, [next]);

      React.useEffect(function () {
        if (!settings.balanceOn) return;
        refreshBalance(false);
        const ms = Math.max(30, Number(settings.balanceRefresh) || 60) * 1000;
        const id = setInterval(function () { refreshBalance(false); }, ms);
        return function () { clearInterval(id); };
      }, [settings.balanceOn, settings.balanceRefresh]);

      function openMenu() {
        menuStart.current = Object.assign({}, settingsRef.current);
        setDraft(Object.assign({}, settingsRef.current));
        setMenuOpen(true);
      }
      function cancelMenu() {
        if (menuStart.current) {
          setSettings(menuStart.current);
          settingsRef.current = menuStart.current;
        }
        setMenuOpen(false);
      }
      function saveSettings() {
        setSettings(draft);
        settingsRef.current = draft;
        try { localStorage.setItem('qyu-settings', JSON.stringify(draft)); } catch (e) {}
        setMenuOpen(false);
      }
      function resetPos() {
        const p = defaultPos();
        posRef.current = p;
        setPos(p);
        try { localStorage.setItem('qyu-companion-pos', JSON.stringify(p)); } catch (e) {}
      }
      function patchDraft(key, value) {
        setDraft(function (d) { return Object.assign({}, d, { [key]: value }); });
      }

      function down(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        start.current = {
          px: e.clientX,
          py: e.clientY,
          x: posRef.current.x,
          y: posRef.current.y,
          moved: false,
          longFired: false
        };
        setPress(true);
        longTimer.current = setTimeout(function () {
          if (start.current) {
            start.current.longFired = true;
            start.current.moved = true;
            openMenu();
          }
        }, 900);
      }
      function move(e) {
        const s = start.current;
        if (!s) return;
        const dx = e.clientX - s.px;
        const dy = e.clientY - s.py;
        if (Math.abs(dx) + Math.abs(dy) > 6) {
          s.moved = true;
          if (longTimer.current) { clearTimeout(longTimer.current); longTimer.current = null; }
          setDrag(true);
        }
        if (s.moved && !s.longFired) {
          const p = clampPos({ x: s.x + dx, y: s.y + dy });
          posRef.current = p;
          setPos(p);
        }
      }
      function up(e) {
        const s = start.current;
        start.current = null;
        if (longTimer.current) { clearTimeout(longTimer.current); longTimer.current = null; }
        setPress(false);
        setDrag(false);
        if (!s) return;
        try { localStorage.setItem('qyu-companion-pos', JSON.stringify(posRef.current)); } catch (err) {}
        if (!s.moved && !s.longFired) { next(); playSound(); blink(620); }
      }

      function onContext(e) {
        e.preventDefault();
        openMenu();
      }

      function menuPos() {
        const w = 262;
        const estH = 380;
        let left = pos.x - w + 132;
        if (left < 8) left = 8;
        if (left + w > window.innerWidth - 8) left = Math.max(8, window.innerWidth - w - 8);
        let top = pos.y - estH - 14;
        if (top < 8) top = Math.min(window.innerHeight - estH - 8, pos.y + 148);
        return { left: left, top: Math.max(8, top) };
      }

      function slider(value, min, max, onChange) {
        return h('input', {
          type: 'range',
          min: min,
          max: max,
          value: value,
          onChange: function (e) { onChange(Number(e.target.value)); }
        });
      }

      function menuPanel() {
        return h(
          React.Fragment,
          null,
          h('div', { className: 'qyu-backdrop', onClick: function () { setMenuOpen(false); } }),
          h(
            'div',
            { className: 'qyu-menu', style: menuPos(), onClick: function (e) { e.stopPropagation(); } },
            h('div', { className: 'qyu-menu-title' }, '🍎 ' + t('menu.title'), h('span', { className: 'qyu-ver' }, 'v2.0')),

            Sec(t('menu.balance')),
            Row(t('field.showBalance'), h(Tog, { value: draft.balanceOn, label: t('field.showBalance'), onChange: function (v) { patchDraft('balanceOn', v); } })),
            Row(t('field.refresh'), h(
              'select',
              { value: draft.balanceRefresh, onChange: function (e) { patchDraft('balanceRefresh', Number(e.target.value)); } },
              h('option', { value: 30 }, '30' + t('unit.sec')),
              h('option', { value: 60 }, '60' + t('unit.sec')),
              h('option', { value: 120 }, '120' + t('unit.sec'))
            )),
            Row(t('field.warn'), h('input', {
              type: 'number', min: 0, step: 1, value: draft.warnBelow,
              onChange: function (e) { patchDraft('warnBelow', Number(e.target.value)); }
            })),
            Row('', h('button', { type: 'button', className: 'qyu-btn', onClick: function () { refreshBalance(true); } }, t('field.refreshNow'))),
            h('div', { className: 'qyu-status' }, balance.state === 'ok'
              ? (t('balance.total') + ' ' + balance.data.currency + ' ' + Number(balance.data.total).toFixed(2))
              : balance.state === 'loading' ? t('balance.loading') : (balance.message || t('balance.noKey'))),

            Sec(t('menu.sound')),
            Row(t('field.soundOn'), h(Tog, { value: draft.soundOn, label: t('field.soundOn'), onChange: function (v) { patchDraft('soundOn', v); } })),
            Row(t('field.volume') + ' ' + draft.volume + '%', slider(draft.volume, 0, 100, function (v) { patchDraft('volume', v); })),
            Row('', h('button', { type: 'button', className: 'qyu-btn', onClick: playSound }, t('menu.preview'))),

            Sec(t('menu.bubble')),
            Row(t('field.bubbleOn'), h(Tog, { value: draft.bubbleOn, label: t('field.bubbleOn'), onChange: function (v) { patchDraft('bubbleOn', v); } })),
            Row(t('field.greetOn'), h(Tog, { value: draft.greetOn, label: t('field.greetOn'), onChange: function (v) { patchDraft('greetOn', v); } })),

            Sec(t('menu.look')),
            Row(
              t('field.size') + ' ' + draft.size + 'px',
              slider(draft.size, 90, 200, function (v) {
                patchDraft('size', v);
                setSettings(function (s) { return Object.assign({}, s, { size: v }); });
              })
            ),

            Sec(t('menu.position')),
            Row('', h('button', { type: 'button', className: 'qyu-btn', onClick: resetPos }, t('menu.reset'))),

            h(
              'div',
              { className: 'qyu-foot' },
              h('button', { type: 'button', className: 'qyu-btn', onClick: cancelMenu }, t('menu.cancel')),
              h('button', { type: 'button', className: 'qyu-btn', onClick: function () {
                setDraft(Object.assign({}, DEFAULTS));
                setSettings(Object.assign({}, DEFAULTS));
              } }, t('menu.defaults')),
              h('button', { type: 'button', className: 'qyu-btn primary', onClick: saveSettings }, t('menu.save'))
            )
          )
        );
      }

      function balanceCard() {
        const d = balance.data;
        return h(
          'div',
          { className: 'qyu-bal-card', onClick: function (e) { e.stopPropagation(); } },
          h('div', { className: 'qyu-bal-line' }, t('balance.total')),
          h('div', { className: 'qyu-bal-big' }, d.currency + ' ' + Number(d.total).toFixed(2)),
          h('div', { className: 'qyu-bal-line' }, t('balance.granted'), h('b', null, d.granted ? Number(d.granted).toFixed(2) : '—')),
          h('div', { className: 'qyu-bal-line' }, t('balance.topped'), h('b', null, d.toppedUp ? Number(d.toppedUp).toFixed(2) : '—')),
          h('div', { className: 'qyu-bal-line' }, t('balance.today'), h('b', null, d.currency + ' ' + used.toFixed(2))),
          h('div', { className: 'qyu-bal-line' }, t('balance.updated') + ' ' + new Date(d.ts).toLocaleTimeString(),
            h('button', { className: 'qyu-link', type: 'button', onClick: function () { refreshBalance(true); } }, t('field.refreshNow')))
        );
      }

      return h(
        React.Fragment,
        null,
        h('style', null, CSS),
        h(
          'div',
          { className: 'qyu-wrap', style: { left: pos.x, top: pos.y } },
          phrase && !cardOpen && h('div', { className: 'qyu-bubble', key: idx.current }, phrase),
          cardOpen && balance.state === 'ok' && balanceCard(),
          cardOpen && balance.state === 'error' && h('div', { className: 'qyu-bal-card' }, h('div', { className: 'qyu-bal-err' }, balance.message)),
          h(
            'div',
            {
              className: 'qyu-char' + (press ? ' qyu-press' : '') + (drag ? ' qyu-drag' : ''),
              style: { width: settings.size, height: settings.size },
              onPointerDown: down,
              onPointerMove: move,
              onPointerUp: up,
              onPointerCancel: up,
              onContextMenu: onContext,
              role: 'button',
              tabIndex: 0,
              'aria-label': t('aria.character')
            },
            h('img', {
              src: eyes === 'closed' ? CLOSED : eyes === 'half' ? HALF : CHAR,
              alt: '',
              draggable: false,
              key: eyes
            }),
            soundOn && h('span', { className: 'qyu-note', 'aria-hidden': 'true' }, '\u266a'),
            h('span', { className: 'qyu-star s1', 'aria-hidden': 'true' }, '\u2726'),
            h('span', { className: 'qyu-star s2', 'aria-hidden': 'true' }, '\u2726'),
            h('span', { className: 'qyu-star s3', 'aria-hidden': 'true' }, '\u2726'),
            h('span', { className: 'qyu-tag', 'aria-hidden': 'true' }, t('tag'))
          ),
          h('button', { type: 'button', className: 'qyu-gear', title: t('menu.title'), 'aria-label': t('menu.title'), onClick: openMenu }, '\u2699'),
          settings.balanceOn && h('button', {
            type: 'button',
            className: 'qyu-bal-pill',
            onClick: function () { setCardOpen(function (o) { return !o; }); },
            title: t('menu.balance')
          }, balance.state === 'ok'
            ? '💰 ' + balance.data.currency + ' ' + Number(balance.data.total).toFixed(2)
            : balance.state === 'loading' ? '💰 ' + t('balance.loading') : '💰 —')
        ),
        menuOpen && menuPanel()
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // Locale is optional: a missing/broken locale service must never stop the widget.
        try {
          const loc = ctx.get('locale');
          if (loc && typeof loc.register === 'function' && typeof loc.bind === 'function') {
            ctx.effect(function () { return loc.register(NS, { zh: zh, en: en }); }, 'qyu: locale');
            const bound = loc.bind(NS);
            t = function (key) {
              try { return bound(key) || fallback[key] || key; } catch (e) { return fallback[key] || key; }
            };
          }
        } catch (e) {}
        ctx.slots.inject('shell.overlay', function () {
          return ctx.slots.register(
            { name: 'shell.overlay', id: 'qyu-companion', order: 999, label: 'Q\u7248\u6b23\u5b9d' },
            Companion
          );
        });
      }
    };
  }
});
