(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Procedural city skyline (hero background) ---------- */
  function skyline() {
    const W = 1600, H = 900;
    let seed = 29;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    // one layer of buildings: tall towers with setbacks, antennas and lit windows
    const layer = (minH, maxH, minW, maxW, fill, win) => {
      let x = -30, out = '';
      while (x < W + 30) {
        const w = minW + rnd() * (maxW - minW), h = minH + rnd() * (maxH - minH), top = H - h;
        out += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${fill}"/>`;
        if (rnd() > 0.5) { const sw = w * (0.45 + rnd() * 0.3), sh = 20 + rnd() * 60;
          out += `<rect x="${(x + (w - sw) / 2).toFixed(1)}" y="${(top - sh).toFixed(1)}" width="${sw.toFixed(1)}" height="${(sh + 1).toFixed(1)}" fill="${fill}"/>`;
          if (rnd() > 0.5) out += `<rect x="${(x + w / 2 - 1).toFixed(1)}" y="${(top - sh - 50).toFixed(1)}" width="2" height="52" fill="${fill}"/>`; }
        if (win > 0) for (let wy = top + 12; wy < H - 6; wy += 13) {
          for (let wx = x + 6; wx < x + w - 7; wx += 9) {
            if (rnd() > 0.8) out += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3" height="5" fill="#efece6" opacity="${(win * (0.3 + rnd() * 0.7)).toFixed(2)}"/>`;
          }
        }
        x += w + rnd() * 10;
      }
      return out;
    };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">
      <defs>
        <filter id="b3"><feGaussianBlur stdDeviation="3.2"/></filter>
        <filter id="b1"><feGaussianBlur stdDeviation="1.4"/></filter>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8986" stop-opacity="0"/><stop offset=".55" stop-color="#8a8986" stop-opacity=".22"/><stop offset="1" stop-color="#8a8986" stop-opacity="0"/></linearGradient>
      </defs>
      <g filter="url(#b3)" opacity=".6">${layer(380, 760, 50, 120, '#444341', 0.04)}</g>
      <rect width="${W}" height="${H}" fill="url(#haze)"/>
      <g filter="url(#b1)">${layer(220, 520, 60, 150, '#333331', 0.12)}</g>
      <g>${layer(90, 300, 80, 190, '#1c1c1b', 0.18)}</g>
    </svg>`;
    const el = $('.hero__city');
    if (el) el.innerHTML = svg;
  }
  skyline();

  /* ---------- Render project archive ---------- */
  const archive = $('#archive');
  if (archive && window.PROJECTS) {
    archive.innerHTML = window.PROJECTS.map((p, i) => {
      const num = String(i + 2).padStart(2, '0');
      const links = [
        p.repo ? `<a class="link-arrow" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>` : '',
        p.demo ? `<a class="link-arrow" href="${p.demo}" target="_blank" rel="noopener">Live demo</a>` : ''
      ].join('');
      return `<li class="row reveal">
        <span class="row__num">${num}</span>
        <div class="row__main">
          <p class="row__role">${p.role}</p>
          <h3 class="row__title">${p.title}</h3>
          <p class="row__desc">${p.desc}</p>
          <ul class="tags">${p.tech.map(t => `<li>${t}</li>`).join('')}</ul>
          <div class="row__links">${links}</div>
        </div>
        <div class="row__plate">${(window.PROJECT_ART || {})[p.art] || ''}<span class="row__plate-num" aria-hidden="true">${num}</span></div>
      </li>`;
    }).join('');
  }

  /* ---------- Nav: scrolled state + active link ---------- */
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('nav--solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = $$('.nav__links a');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Mobile menu ---------- */
  const burger = $('.nav__burger'), menu = $('#mobile-menu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); }
    else { menu.classList.remove('is-open'); setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 350); }
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Hero intro ---------- */
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));

  /* ---------- Parallax (scroll + pointer) ---------- */
  if (!reduceMotion) {
    const items = $$('[data-parallax]');
    const hero = $('.hero');
    let mx = 0, my = 0, ticking = false;
    const update = () => {
      const sy = Math.min(window.scrollY, hero.offsetHeight);
      items.forEach(el => {
        const k = parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(${(mx * k * 60).toFixed(2)}px, ${(sy * k + my * k * 30).toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    if (window.matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('pointermove', e => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
        req();
      });
    }
  }

  /* ---------- Cursor spotlight: reveals true colours on the portrait ---------- */
  const portrait = $('.hero__portrait');
  if (portrait && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const heroEl = $('.hero');
    let raf = 0, px = 0, py = 0;
    const paint = () => {
      const r = portrait.getBoundingClientRect();
      const x = px - r.left, y = py - r.top;
      // only light up when the cursor is over the visible photo area
      const inside = x > 0 && y > 0 && x < r.width && y < r.height;
      portrait.style.setProperty('--mx', x + 'px');
      portrait.style.setProperty('--my', y + 'px');
      portrait.classList.toggle('is-lit', inside);
      raf = 0;
    };
    heroEl.addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    });
    heroEl.addEventListener('pointerleave', () => portrait.classList.remove('is-lit'));
  }

  /* ---------- Featured video (click-to-load Google Drive embed) ---------- */
  const poster = $('.feature__poster');
  if (poster) {
    poster.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = poster.dataset.video;
      iframe.title = 'Rule Card gameplay video';
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      iframe.className = 'feature__iframe';
      poster.replaceWith(iframe);
    });
  }
})();
