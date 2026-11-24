window.__ModuleLoader__.load({
  id: '@local/yushuxin-appearance',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PHOTOS = __PHOTOS__;
    const AVATAR = '__AVATAR__';
    const HERO = '__HERO__';
    const N = PHOTOS.length;
    const STEP = 81;
    const SET = N * STEP;
    const NS = 'yushuxin-appearance';

    const OVERRIDES = {
      '--dsw-alias-bg-base': { light: '#fff7fb', dark: '#1b1219' },
      '--dsw-alias-bg-layer-1': { light: '#ffffff', dark: '#251a22' },
      '--dsw-alias-bg-layer-2': { light: '#fff0f7', dark: '#30212b' },
      '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#2b1e27' },
      '--dsw-alias-border-l1': { light: '#f3dbe7', dark: '#46303c' },
      '--dsw-alias-border-l2': { light: '#e7bdd1', dark: '#5c3f4f' },
      '--dsw-alias-brand-primary': { light: '#e35d8c', dark: '#f07fae' },
      '--dsw-specific-sidebar-fill': { light: '#fff3f8', dark: '#20151d' }
    };

    const zh = {
      'title': '虞书欣 · 胶片',
      'badge': '小石榴',
      'aria': '虞书欣照片胶卷，自动循环滑动，点击照片放大',
      'mute': '关闭音效',
      'unmute': '打开音效',
      'close': '关闭',
      'prev': '上一张',
      'next': '下一张',
      'caption': '小石榴 ♥ 虞书欣',
      'swipe': '松开放大'
    };
    const en = {
      'title': 'Yu Shuxin · Film',
      'badge': 'Little Pomegranates',
      'aria': 'Yu Shuxin looping photo filmstrip, click a photo to enlarge',
      'mute': 'Mute sounds',
      'unmute': 'Enable sounds',
      'close': 'Close',
      'prev': 'Previous',
      'next': 'Next',
      'caption': 'Little Pomegranates ♥ Yu Shuxin',
      'swipe': 'Release to enlarge'
    };

    const CSS = `
.ysx-wrap{width:100%;box-sizing:border-box;padding:2px 0 4px;font-family:var(--dsw-font-family,inherit)}
.ysx-head{display:flex;align-items:center;gap:7px;padding:0 4px 6px;color:#e35d8c;font-size:11px;line-height:14px;letter-spacing:.5px}
.ysx-heart{font-size:13px;line-height:1;animation:ysx-beat 1.9s ease-in-out infinite}
.ysx-badge{display:inline-flex;align-items:center;gap:4px;background:linear-gradient(135deg,#d94f70,#e86b8c);color:#fff;border-radius:999px;padding:1px 8px 1px 5px;font-size:10px;letter-spacing:1px;box-shadow:0 2px 8px rgba(217,79,112,.35)}
.ysx-ver{font-size:9px;opacity:.62;letter-spacing:.5px;font-variant-numeric:tabular-nums}
.ysx-count{margin-left:auto;color:var(--dsw-alias-label-secondary,#a06b84);font-variant-numeric:tabular-nums}
.ysx-mute{border:none;background:transparent;cursor:pointer;font-size:12px;line-height:1;padding:0 2px;opacity:.8}
.ysx-mute:hover{opacity:1;transform:scale(1.15)}
.ysx-film{position:relative;border-radius:12px;background:linear-gradient(180deg,#36262f,#241a21);border:.5px solid #d9a9c2;box-shadow:0 4px 16px rgba(120,40,80,.22);overflow:hidden}
.ysx-track{display:flex;gap:5px;overflow-x:auto;overflow-y:hidden;padding:20px 10px;scrollbar-width:none;cursor:grab;touch-action:none}
.ysx-track::-webkit-scrollbar{display:none}
.ysx-track.ysx-dragging{cursor:grabbing;user-select:none}
.ysx-cell{flex:none;width:76px;display:flex;flex-direction:column;align-items:center;gap:3px}
.ysx-hole{width:15px;height:5px;border-radius:2px;background:#f6e3ee;opacity:.78;flex:none}
.ysx-shot{width:72px;height:96px;border-radius:3px;background-size:cover;background-position:center;flex:none;border:1px solid rgba(255,255,255,.14);box-shadow:0 1px 4px rgba(0,0,0,.35);transition:box-shadow .2s ease}
.ysx-cell:hover .ysx-shot{animation:ysx-tilt 1.8s ease-in-out infinite;box-shadow:0 10px 22px rgba(227,93,140,.5),0 0 0 2px #f07fae}
.ysx-shot.ysx-current{box-shadow:0 0 0 2px #e35d8c,0 3px 10px rgba(227,93,140,.42)}
.ysx-arrow{position:absolute;top:50%;transform:translateY(-50%);width:27px;height:27px;border-radius:50%;border:.5px solid rgba(255,255,255,.28);background:rgba(255,255,255,.16);color:#fff;font-size:17px;line-height:24px;text-align:center;cursor:pointer;z-index:3;padding:0;backdrop-filter:blur(4px)}
.ysx-arrow:hover{background:rgba(217,79,112,.85)}
.ysx-arrow.left{left:7px}
.ysx-arrow.right{right:7px}
.ysx-swipe-hint{position:absolute;left:50%;top:4px;transform:translateX(-50%);z-index:4;background:rgba(217,79,112,.92);color:#fff;font-size:10px;letter-spacing:1px;padding:3px 11px;border-radius:999px;pointer-events:none;animation:ysx-fade .18s ease-out}
.ysx-pome-deco{position:absolute;bottom:4px;opacity:.9;pointer-events:none;z-index:2;animation:ysx-sway 4.5s ease-in-out infinite}
.ysx-pome-deco.l{left:3px}
.ysx-pome-deco.r{right:3px;animation-delay:1.2s}
.ysx-particle{position:fixed;pointer-events:none;z-index:2147483400;transform:translate(-50%,-50%);animation:ysx-burst 1.15s cubic-bezier(.2,.7,.3,1) forwards;text-shadow:0 2px 6px rgba(180,40,90,.35)}
.ysx-lightbox{position:fixed;inset:0;z-index:2147483300;background:rgba(32,12,24,.74);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;animation:ysx-fade .18s ease-out}
.ysx-lb-card{margin:0;display:flex;flex-direction:column;align-items:center;gap:12px;animation:ysx-zoom .3s cubic-bezier(.34,1.56,.64,1)}
.ysx-lb-card img{max-height:74vh;max-width:84vw;border-radius:16px;border:3px solid #f4c6dc;box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 0 8px rgba(217,79,112,.16);background:#fff;display:block}
.ysx-lb-cap{display:flex;align-items:center;gap:8px;color:#ffe6f0;font-size:13px;letter-spacing:1px;background:rgba(217,79,112,.28);border:1px solid rgba(255,200,220,.35);padding:6px 14px;border-radius:999px}
.ysx-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;border:.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.14);color:#fff;font-size:26px;line-height:38px;text-align:center;cursor:pointer;padding:0;backdrop-filter:blur(6px)}
.ysx-lb-nav:hover{background:rgba(217,79,112,.8)}
.ysx-lb-nav.prev{left:26px}
.ysx-lb-nav.next{right:26px}
.ysx-lb-close{position:absolute;top:18px;right:22px;width:34px;height:34px;border-radius:50%;border:.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.14);color:#fff;font-size:20px;line-height:30px;cursor:pointer;padding:0}
.ysx-lb-close:hover{background:rgba(217,79,112,.8)}
@keyframes ysx-beat{0%,100%{transform:scale(1)}28%{transform:scale(1.28)}55%{transform:scale(1)}75%{transform:scale(1.14)}}
@keyframes ysx-tilt{0%,100%{transform:perspective(420px) rotateX(5deg) rotateZ(-4deg) translateY(-8px) scale(1.12)}50%{transform:perspective(420px) rotateX(5deg) rotateZ(3deg) translateY(-13px) scale(1.16)}}
@keyframes ysx-sway{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-3px)}}
@keyframes ysx-fade{from{opacity:0}to{opacity:1}}
@keyframes ysx-zoom{from{opacity:0;transform:scale(.82) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes ysx-burst{0%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(0deg)}12%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(1.15) rotate(var(--rot))}}
.ysx-ambient{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.ysx-glow{position:absolute;width:430px;height:430px;border-radius:50%;filter:blur(72px);opacity:.3}
.ysx-glow.a{top:-190px;left:-170px;background:radial-gradient(circle,#ffb8d2,transparent 65%)}
.ysx-glow.b{bottom:-200px;right:-160px;background:radial-gradient(circle,#e86b8c,transparent 65%)}
.ysx-fall{position:absolute;top:-8vh;animation:ysx-fall linear infinite;opacity:0;text-shadow:0 1px 4px rgba(217,79,112,.25)}
.ysx-charm{display:inline-flex;align-items:center;gap:5px;padding:2px 9px 2px 5px;border-radius:999px;background:linear-gradient(135deg,rgba(217,79,112,.14),rgba(232,107,140,.2));border:.5px solid var(--dsw-alias-border-l1,#f3dbe7);color:#d94f70;font-size:11px;letter-spacing:1px;cursor:default;transition:transform .25s ease}
.ysx-charm:hover{transform:rotate(-3deg) scale(1.06)}
.ysx-sess{display:inline-flex;align-items:center;gap:6px;cursor:default}
.ysx-ava{width:24px;height:24px;border-radius:50%;background-size:cover;background-position:center 25%;border:2px solid #d94f70;box-shadow:0 0 0 2px rgba(217,79,112,.2);transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.ysx-sess:hover .ysx-ava{transform:rotate(8deg) scale(1.15)}
.ysx-sess-heart{color:#e35d8c;font-size:12px;animation:ysx-beat 1.9s ease-in-out infinite}
.ysx-hero{position:relative;width:72px;height:72px;animation:ysx-herofloat 4s ease-in-out infinite}
.ysx-hero-ph{width:72px;height:72px;border-radius:50%;background-size:cover;background-position:center 25%;border:3px solid #f0a8c4;box-shadow:0 0 0 4px rgba(217,79,112,.18),0 8px 24px rgba(217,79,112,.3)}
.ysx-hero-pome{position:absolute;right:-6px;bottom:-4px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2));animation:ysx-sway 4.5s ease-in-out infinite}
.ysx-hero-star{position:absolute;left:-8px;top:-4px;color:#ffbe3d;font-size:15px;animation:ysx-twinkle 2.6s ease-in-out infinite}
@keyframes ysx-fall{0%{opacity:0;transform:translate3d(0,-6vh,0) rotate(0deg)}8%{opacity:.55}85%{opacity:.4}100%{opacity:0;transform:translate3d(var(--sway),108vh,0) rotate(320deg)}}
@keyframes ysx-herofloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ysx-twinkle{0%,100%{opacity:.3;transform:scale(.7) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(25deg)}}`;

    let t = function (key) { return key; };

    function Pomegranate(props) {
      const size = (props && props.size) || 16;
      return h(
        'svg',
        { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': 'true', className: (props && props.className) || '' },
        h('path', { d: 'M8.2 5.6 9.4 2.4 11 4.2 12 2 13 4.2 14.6 2.4 15.8 5.6Z', fill: '#a5344f' }),
        h('circle', { cx: 12, cy: 14, r: 8.2, fill: '#d94f70' }),
        h('path', { d: 'M12 5.8a8.2 8.2 0 0 1 7.6 11.3c-2.6 1.6-6 1.6-8.7.3-2.7-1.3-4.3-4-4.2-6.9.1-2 1.7-3.9 5.3-4.7Z', fill: '#e86b8c', opacity: 0.55 }),
        h('circle', { cx: 9.4, cy: 12.4, r: 1.5, fill: '#ffd9e6' }),
        h('circle', { cx: 13.4, cy: 11.4, r: 1.5, fill: '#ffd9e6' }),
        h('circle', { cx: 11.2, cy: 15.8, r: 1.5, fill: '#ffd9e6' }),
        h('circle', { cx: 15.2, cy: 15.2, r: 1.5, fill: '#ffd9e6' }),
        h('circle', { cx: 8.6, cy: 16.4, r: 1.3, fill: '#ffd9e6' })
      );
    }

    function Filmstrip() {
      const track = React.useRef(null);
      const hover = React.useRef(false);
      const drag = React.useRef(null);
      const raf = React.useRef(0);
      const curRef = React.useRef(0);
      const openRef = React.useRef(-1);
      const audio = React.useRef(null);
      const lastTick = React.useRef(0);
      const [current, setCurrent] = React.useState(0);
      const [dragging, setDragging] = React.useState(false);
      const [swiping, setSwiping] = React.useState(false);
      const [open, setOpen] = React.useState(-1);
      const [bursts, setBursts] = React.useState([]);
      const [muted, setMuted] = React.useState(function () {
        try { return localStorage.getItem('ysx-muted') === '1'; } catch (e) { return false; }
      });
      const mutedRef = React.useRef(muted);
      mutedRef.current = muted;
      openRef.current = open;

      function normalize(el) {
        if (el.scrollLeft < SET) el.scrollLeft += SET;
        else if (el.scrollLeft >= 2 * SET) el.scrollLeft -= SET;
      }

      React.useEffect(function () {
        const el = track.current;
        if (!el) return;
        el.scrollLeft = SET;
        let last = 0;
        const loop = function (ts) {
          raf.current = requestAnimationFrame(loop);
          if (ts - last < 16) return;
          last = ts;
          if (drag.current || openRef.current >= 0) return;
          // Hovering slows the film down instead of stopping it (0.12 vs 0.45 px/frame).
          el.scrollLeft += hover.current ? 0.12 : 0.45;
          normalize(el);
        };
        raf.current = requestAnimationFrame(loop);
        return function () { cancelAnimationFrame(raf.current); };
      }, []);

      function ensureAudio() {
        try {
          if (!audio.current) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            audio.current = new AC();
          }
          if (audio.current.state === 'suspended') audio.current.resume();
          return audio.current;
        } catch (e) { return null; }
      }
      function blip(freq, dur, vol) {
        if (mutedRef.current) return;
        const ac = audio.current;
        if (!ac || ac.state !== 'running') return;
        try {
          const o = ac.createOscillator();
          const g = ac.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, ac.currentTime);
          o.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 0.45), ac.currentTime + dur);
          g.gain.setValueAtTime(vol, ac.currentTime);
          g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
          o.connect(g);
          g.connect(ac.destination);
          o.start();
          o.stop(ac.currentTime + dur + 0.01);
        } catch (e) {}
      }
      function hoverTick() {
        const now = Date.now();
        if (now - lastTick.current < 60) return;
        lastTick.current = now;
        blip(1700, 0.06, 0.17);
      }

      function spawnBurst(x, y, count) {
        const chars = ['\u2726', '\u2665', '\u25cf', '\u2727', '\u2665', '\u25cf'];
        const colors = ['#ffd9e6', '#f07fae', '#d94f70', '#ffbe3d', '#e86b8c', '#ff9ec4'];
        const items = [];
        const stamp = Date.now();
        for (let k = 0; k < count; k++) {
          const ang = (Math.PI * 2 * k) / count + Math.random() * 0.5;
          const dist = 60 + Math.random() * 110;
          items.push({
            id: stamp + '-' + k,
            x: x,
            y: y,
            dx: Math.cos(ang) * dist,
            dy: Math.sin(ang) * dist - 70,
            char: chars[k % chars.length],
            color: colors[k % colors.length],
            size: 12 + Math.random() * 12,
            rot: Math.round(Math.random() * 240 - 120),
            delay: Math.random() * 0.12
          });
        }
        setBursts(function (b) { return b.concat(items); });
        const ids = items.map(function (p) { return p.id; });
        setTimeout(function () {
          setBursts(function (b) { return b.filter(function (p) { return ids.indexOf(p.id) < 0; }); });
        }, 1600);
      }

      function openLightbox(i, x, y) {
        setOpen(i);
        spawnBurst(x, y, 16);
        blip(760, 0.11, 0.28);
      }
      function closeLightbox() { setOpen(-1); }
      function nav(dir) {
        setOpen(function (o) { return (o + dir + N) % N; });
        blip(1100, 0.08, 0.18);
      }

      React.useEffect(function () {
        if (open < 0) return;
        function onKey(e) {
          if (e.key === 'Escape') closeLightbox();
          else if (e.key === 'ArrowLeft') nav(-1);
          else if (e.key === 'ArrowRight') nav(1);
        }
        window.addEventListener('keydown', onKey);
        return function () { window.removeEventListener('keydown', onKey); };
      }, [open]);

      function page(dir) {
        const el = track.current;
        if (el) el.scrollBy({ left: dir * 390, behavior: 'smooth' });
        blip(1300, 0.06, 0.16);
      }
      function onScroll(e) {
        const el = e.currentTarget;
        normalize(el);
        const idx = ((Math.round(el.scrollLeft / STEP) % N) + N) % N;
        if (idx !== curRef.current) {
          curRef.current = idx;
          setCurrent(idx);
        }
      }
      function down(e) {
        const el = track.current;
        if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return;
        ensureAudio();
        // Accept a press anywhere in the film cell, not only on the image pixel.
        let shot = e.target && e.target.closest ? e.target.closest('[data-shot]') : null;
        if (!shot && e.target && e.target.closest) {
          const cell = e.target.closest('.ysx-cell');
          if (cell) shot = cell.querySelector('[data-shot]');
        }
        drag.current = {
          x: e.clientX,
          y: e.clientY,
          left: el.scrollLeft,
          moved: false,
          swipeUp: false,
          shot: shot ? Number(shot.getAttribute('data-shot')) : -1
        };
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      function move(e) {
        const d = drag.current;
        const el = track.current;
        if (!d || !el) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        const ax = Math.abs(dx);
        const ay = Math.abs(dy);

        // Swipe-up is checked on EVERY move, not only the first one. A tiny
        // initial wobble must not lock the gesture into "horizontal drag".
        if (!d.swipeUp && d.shot >= 0 && dy < -18 && ay > ax * 1.2) {
          d.swipeUp = true;
          d.moved = true;
          setDragging(false);
          setSwiping(true);
          el.scrollLeft = d.left; // undo any horizontal scroll from the wobble
        }
        if (!d.moved && (ax > 5 || ay > 5)) {
          d.moved = true;
          if (!d.swipeUp) setDragging(true);
        }
        if (d.moved && !d.swipeUp) el.scrollLeft = d.left - dx;
      }
      function up(e) {
        const d = drag.current;
        drag.current = null;
        setDragging(false);
        setSwiping(false);
        if (d && d.shot >= 0 && (!d.moved || d.swipeUp)) {
          openLightbox(d.shot % N, e.clientX, e.clientY);
        }
      }
      function toggleMute() {
        ensureAudio();
        setMuted(function (m) {
          try { localStorage.setItem('ysx-muted', m ? '0' : '1'); } catch (e) {}
          return !m;
        });
      }

      const cells = [];
      for (let copy = 0; copy < 3; copy++) {
        for (let i = 0; i < N; i++) {
          const global = copy * N + i;
          cells.push(
            h(
              'div',
              { className: 'ysx-cell', key: global, onPointerEnter: hoverTick },
              h('span', { className: 'ysx-hole', 'aria-hidden': 'true' }),
              h('div', {
                className: 'ysx-shot' + (i === current ? ' ysx-current' : ''),
                'data-shot': global,
                style: { backgroundImage: 'url("' + PHOTOS[i] + '")' }
              }),
              h('span', { className: 'ysx-hole', 'aria-hidden': 'true' })
            )
          );
        }
      }

      return h(
        React.Fragment,
        null,
        h('style', null, CSS),
        h(
          'div',
          { className: 'ysx-wrap' },
          h(
            'div',
            { className: 'ysx-head' },
            h('span', { className: 'ysx-heart', 'aria-hidden': 'true' }, '\u2665'),
            h('span', null, t('title')),
            h('span', { className: 'ysx-badge' }, h(Pomegranate, { size: 12 }), t('badge')),
            h('span', { className: 'ysx-ver' }, 'v2.0'),
            h('button', {
              type: 'button',
              className: 'ysx-mute',
              onClick: toggleMute,
              title: muted ? t('unmute') : t('mute'),
              'aria-label': muted ? t('unmute') : t('mute')
            }, muted ? '\ud83d\udd07' : '\ud83d\udd0a'),
            h('span', { className: 'ysx-count' }, (current + 1) + ' / ' + N)
          ),
          h(
            'div',
            {
              className: 'ysx-film',
              onPointerEnter: function () { hover.current = true; ensureAudio(); },
              onPointerLeave: function () { hover.current = false; }
            },
            h('button', { type: 'button', className: 'ysx-arrow left', 'aria-label': t('prev'), onClick: () => page(-1) }, '\u2039'),
            h(
              'div',
              {
                className: 'ysx-track' + (dragging ? ' ysx-dragging' : ''),
                ref: track,
                onScroll: onScroll,
                onPointerDown: down,
                onPointerMove: move,
                onPointerUp: up,
                onPointerCancel: up,
                role: 'img',
                'aria-label': t('aria')
              },
              cells
            ),
            h(Pomegranate, { size: 22, className: 'ysx-pome-deco l' }),
            h(Pomegranate, { size: 22, className: 'ysx-pome-deco r' }),
            swiping && h('div', { className: 'ysx-swipe-hint' }, '\u2191 ' + t('swipe')),
            h('button', { type: 'button', className: 'ysx-arrow right', 'aria-label': t('next'), onClick: () => page(1) }, '\u203a')
          )
        ),
        bursts.map(function (p) {
          return h('span', {
            key: p.id,
            className: 'ysx-particle',
            style: {
              left: p.x,
              top: p.y,
              color: p.color,
              fontSize: p.size,
              animationDelay: p.delay + 's',
              '--dx': p.dx + 'px',
              '--dy': p.dy + 'px',
              '--rot': p.rot + 'deg'
            },
            'aria-hidden': 'true'
          }, p.char);
        }),
        open >= 0 && h(
          'div',
          { className: 'ysx-lightbox', onClick: closeLightbox, role: 'dialog', 'aria-modal': 'true', 'aria-label': t('aria') },
          h('button', { type: 'button', className: 'ysx-lb-close', 'aria-label': t('close'), onClick: closeLightbox }, '\u00d7'),
          h('button', { type: 'button', className: 'ysx-lb-nav prev', 'aria-label': t('prev'), onClick: function (e) { e.stopPropagation(); nav(-1); } }, '\u2039'),
          h(
            'figure',
            { className: 'ysx-lb-card', key: open, onClick: function (e) { e.stopPropagation(); } },
            h('img', { src: PHOTOS[open], alt: t('caption') + ' ' + (open + 1), draggable: false }),
            h('figcaption', { className: 'ysx-lb-cap' }, h(Pomegranate, { size: 16 }), t('caption'), (open + 1) + ' / ' + N)
          ),
          h('button', { type: 'button', className: 'ysx-lb-nav next', 'aria-label': t('next'), onClick: function (e) { e.stopPropagation(); nav(1); } }, '\u203a')
        )
      );
    }

    function Ambient() {
      const seeds = React.useMemo(function () {
        const chars = ['\u2726', '\u25cf', '\u2665', '\u2727'];
        const colors = ['#f07fae', '#d94f70', '#ffbe3d', '#e86b8c'];
        const arr = [];
        for (let i = 0; i < 14; i++) {
          arr.push({
            left: (i * 7.3 + Math.random() * 4) % 100,
            size: 8 + Math.random() * 9,
            dur: 16 + Math.random() * 16,
            delay: -Math.random() * 30,
            sway: Math.round(Math.random() * 120 - 60),
            char: chars[i % 4],
            color: colors[i % 4]
          });
        }
        return arr;
      }, []);
      return h(
        'div',
        { className: 'ysx-ambient', 'aria-hidden': 'true' },
        h('div', { className: 'ysx-glow a' }),
        h('div', { className: 'ysx-glow b' }),
        seeds.map(function (s, i) {
          return h('span', {
            key: i,
            className: 'ysx-fall',
            style: {
              left: s.left + '%',
              fontSize: s.size,
              color: s.color,
              animationDuration: s.dur + 's',
              animationDelay: s.delay + 's',
              '--sway': s.sway + 'px'
            }
          }, s.char);
        })
      );
    }

    function HeaderCharm() {
      return h(
        'span',
        { className: 'ysx-charm', title: t('badge') + ' · Yu Shuxin' },
        h(Pomegranate, { size: 16 }),
        t('badge'),
        h('span', { 'aria-hidden': 'true', style: { fontSize: 10, color: '#ffbe3d' } }, '\u2726')
      );
    }

    function SessionCharm() {
      return h(
        'span',
        { className: 'ysx-sess', title: t('caption') },
        h('span', { className: 'ysx-ava', style: { backgroundImage: 'url("' + AVATAR + '")' } }),
        h('span', { className: 'ysx-sess-heart', 'aria-hidden': 'true' }, '\u2665')
      );
    }

    function HeroBrand() {
      return h(
        'div',
        { className: 'ysx-hero' },
        h('div', { className: 'ysx-hero-ph', style: { backgroundImage: 'url("' + HERO + '")' } }),
        h('span', { className: 'ysx-hero-star', 'aria-hidden': 'true' }, '\u2726'),
        h(Pomegranate, { size: 26, className: 'ysx-hero-pome' })
      );
    }

    return {
      inject: ['slots', 'theme', 'locale'],
      apply(ctx) {
        ctx.effect(
          () => ctx.theme.overrideTokens('@local/yushuxin-appearance', OVERRIDES),
          'yushuxin: pink theme tokens'
        );
        ctx.effect(function () { return ctx.locale.register(NS, { zh: zh, en: en }); }, 'yushuxin: locale');
        const bound = ctx.locale.bind(NS);
        t = function (key) { return bound(key); };
        ctx.slots.inject('conversation.composer.dock', () =>
          ctx.slots.register(
            { name: 'conversation.composer.dock', id: 'yushuxin-filmstrip', order: 5 },
            Filmstrip
          )
        );
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register({ name: 'shell.overlay', id: 'yushuxin-ambient', order: 0 }, Ambient)
        );
        ctx.slots.inject('conversation.header.leading', () =>
          ctx.slots.register({ name: 'conversation.header.leading', id: 'yushuxin-header-charm' }, HeaderCharm)
        );
        ctx.slots.inject('conversation.session.header.utilities', () =>
          ctx.slots.register(
            { name: 'conversation.session.header.utilities', id: 'yushuxin-session-charm', order: 0 },
            SessionCharm
          )
        );
        ctx.slots.inject('conversation.hero.brand.mark', () =>
          ctx.slots.register({ name: 'conversation.hero.brand.mark', id: 'yushuxin-hero' }, HeroBrand)
        );
      }
    };
  }
});
