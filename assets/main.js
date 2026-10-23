// STP Foils — animated brochure interactions
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // stagger index for children
  document.querySelectorAll('.stagger').forEach(group => {
    [...group.children].forEach((el, i) => el.style.setProperty('--i', i));
  });
  document.querySelectorAll('.reels').forEach(group => {
    [...group.children].forEach((el, i) => el.style.setProperty('--i', i));
  });

  // reveal on scroll
  const targets = document.querySelectorAll('.reveal, .stagger, .reels, .flow');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.count').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(t => io.observe(t));

  // year counters
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const to = +el.dataset.to;
    if (reduce) { el.textContent = to; return; }
    const from = to - 60, dur = 1600, t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // progress bar, top bar state, current page number
  const bar = document.querySelector('.progress span');
  const topbar = document.querySelector('.topbar');
  const pageNow = document.getElementById('pageNow');
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    topbar.classList.toggle('scrolled', scrollY > 10);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const pageIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) pageNow.textContent = e.target.dataset.page; });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.page').forEach(p => pageIO.observe(p));

  // contents menu
  const btn = document.querySelector('.menu-btn');
  const toc = document.getElementById('toc');
  const setMenu = open => { toc.hidden = !open; btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', () => setMenu(toc.hidden));
  toc.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => { if (!toc.hidden && !e.target.closest('#toc, .menu-btn')) setMenu(false); });

  // keyboard page turning (arrow keys / PageUp / PageDown)
  const pages = [...document.querySelectorAll('.page')];
  addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    const dir = (e.key === 'ArrowRight' || e.key === 'PageDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'PageUp') ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const y = scrollY + 80;
    let idx = pages.findIndex(p => p.offsetTop + p.offsetHeight > y);
    if (idx < 0) idx = pages.length - 1;
    const next = pages[Math.max(0, Math.min(pages.length - 1, idx + dir))];
    next.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  if (reduce) return;

  // holographic: swatches and background follow the pointer
  const holoPage = document.querySelector('.holo-page');
  holoPage?.addEventListener('pointermove', e => {
    const r = holoPage.getBoundingClientRect();
    holoPage.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    holoPage.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
  document.querySelectorAll('.holo-sw span').forEach(sw => {
    sw.addEventListener('pointermove', e => {
      const r = sw.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      sw.style.setProperty('--hx', x * 100 + '%');
      sw.style.setProperty('--hy', y * 100 + '%');
      sw.style.setProperty('--a', Math.round(x * 360));
      sw.style.transform = `perspective(500px) rotateY(${(x - .5) * 18}deg) rotateX(${(.5 - y) * 18}deg)`;
    });
    sw.addEventListener('pointerleave', () => { sw.style.transform = ''; });
  });
  // idle shimmer for touch devices
  let a = 0;
  const idle = () => {
    a = (a + 0.6) % 360;
    document.querySelectorAll('.holo-sw span').forEach((sw, i) => {
      if (!sw.matches(':hover')) sw.style.setProperty('--a', Math.round(a + i * 40));
    });
    requestAnimationFrame(idle);
  };
  requestAnimationFrame(idle);

  // gentle parallax on cover image
  const hero = document.querySelector('.cover-hero img');
  addEventListener('scroll', () => {
    if (scrollY < innerHeight * 1.2) hero.style.transform = `translateY(${scrollY * 0.12}px)`;
  }, { passive: true });
})();
