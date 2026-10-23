// STP Foils — the shade card
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- stagger indexes ----
  document.querySelectorAll('.mosaic .t').forEach((t, i) => t.style.setProperty('--i', i));

  // ---- section entrances: heading, then text, then picture ----
  const riseGroups = ['.intro', '.story-text', '.reasons', '.cat-head', '.family', '.proofer-controls', '.grow > li', '.contact-body', '.postcard'];
  const rise = [];
  riseGroups.forEach(sel => document.querySelectorAll(sel).forEach(el => {
    el.setAttribute('data-rise', '');
    [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
    rise.push(el);
  }));
  // shade rows get their own stagger inside a family
  document.querySelectorAll('.shades').forEach(list => {
    list.setAttribute('data-rise', '');
    [...list.children].forEach((c, i) => c.style.setProperty('--i', i));
    rise.push(list);
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
  const pending = [...rise, ...document.querySelectorAll('.shutter')];
  pending.forEach(el => io.observe(el));
  // belt and braces: if the observer is throttled (background tab, fast jumps), reveal by position
  let sweepTimer;
  const sweep = () => {
    for (const el of pending) {
      if (el.classList.contains('is-in')) continue;
      if (el.getBoundingClientRect().top < innerHeight * 0.92) { el.classList.add('is-in'); io.unobserve(el); }
    }
  };
  addEventListener('scroll', () => { clearTimeout(sweepTimer); sweepTimer = setTimeout(sweep, 120); }, { passive: true });
  addEventListener('load', sweep);

  // ---- bar hides on the way down, returns on the way up ----
  const bar = document.querySelector('.bar');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    bar.classList.toggle('is-hidden', y > 400 && y > lastY);
    lastY = y;
  }, { passive: true });

  // ---- the drifting strip: duplicate once for a seamless loop ----
  const track = document.querySelector('.strip-track');
  if (track) track.append(...[...track.children].map(n => n.cloneNode(true)));

  // ---- showcase objects drift a little with the scroll ----
  if (!reduce) {
    const objs = [...document.querySelectorAll('.panel-obj')];
    let ticking = false;
    const drift = () => {
      ticking = false;
      objs.forEach(o => {
        const r = o.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
        o.style.transform = `translateX(-50%) translateY(${(p * -6).toFixed(2)}%)`;
      });
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
    drift();
  }

  // ---- the live thing: stamp a proof ----
  const canvas = document.getElementById('proofCanvas');
  const form = document.getElementById('proofForm');
  if (!canvas || !form) return;
  const ctx = canvas.getContext('2d');
  const caption = document.getElementById('proofCaption');
  const input = document.getElementById('proofText');
  const foilBox = document.getElementById('foilChoices');

  const FOILS = [
    { id: 'gold', name: 'Gold metallic', file: 'metallic-gold' },
    { id: 'silver', name: 'Silver metallic', file: 'metallic-silver' },
    { id: 'rose', name: 'Rose gold metallic', file: 'metallic-rose-gold' },
    { id: 'copper', name: 'Copper metallic', file: 'metallic-copper' },
    { id: 'antique', name: 'Antique gold metallic', file: 'metallic-antique-gold' },
    { id: 'rainbow', name: 'Rainbow holographic', file: 'holo-rainbow' },
    { id: 'diamond', name: 'Silver diamond holographic', file: 'holo-silver-diamond' },
    { id: 'white', name: 'White pigment', file: 'pigment-white' },
    { id: 'red', name: 'Red pigment', file: 'pigment-red' },
    { id: 'blue', name: 'Blue pigment', file: 'pigment-blue' },
  ];
  const STOCKS = {
    black: { name: 'black carton', base: '#151515', grain: 18 },
    ivory: { name: 'ivory card', base: '#eee8db', grain: 10 },
    kraft: { name: 'kraft board', base: '#b68a5c', grain: 26 },
    red: { name: 'STP red board', base: '#c4140f', grain: 14 },
  };

  // build the foil choices from the real swatches
  FOILS.forEach((f, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="foil" value="${f.id}"${i === 0 ? ' checked' : ''}><span><img src="assets/img/swatches/${f.file}.jpg" alt="" width="22" height="30">${f.name.replace(/ (metallic|holographic|pigment)$/, '')}</span>`;
    foilBox.append(label);
  });

  const images = {};
  const loadImg = f => images[f.id] || (images[f.id] = new Promise(res => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = `assets/img/swatches/${f.file}.jpg`;
  }));

  // paper grain, drawn once per stock
  const grainCache = {};
  function stockLayer(key) {
    if (grainCache[key]) return grainCache[key];
    const s = STOCKS[key];
    const c = document.createElement('canvas');
    c.width = canvas.width; c.height = canvas.height;
    const g = c.getContext('2d');
    g.fillStyle = s.base; g.fillRect(0, 0, c.width, c.height);
    const img = g.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * s.grain;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    g.putImageData(img, 0, 0);
    if (key === 'kraft') { // a few fibres
      g.globalAlpha = 0.08; g.strokeStyle = '#3b2612';
      for (let i = 0; i < 260; i++) {
        const x = Math.random() * c.width, y = Math.random() * c.height, l = 10 + Math.random() * 40, a = Math.random() * Math.PI;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
      }
      g.globalAlpha = 1;
    }
    return (grainCache[key] = c);
  }

  function fitFont(text) {
    let size = 220;
    const max = canvas.width * 0.82;
    do {
      ctx.font = `800 ${size}px Montserrat, "Helvetica Neue", Arial, sans-serif`;
      if (ctx.measureText(text).width <= max) break;
      size -= 6;
    } while (size > 40);
    return size;
  }

  // the stamped word: text shape filled with the swatch photograph
  function foilLayer(text, swatch, size) {
    const c = document.createElement('canvas');
    c.width = canvas.width; c.height = canvas.height;
    const g = c.getContext('2d');
    g.font = `800 ${size}px Montserrat, "Helvetica Neue", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.letterSpacing = '-0.02em';
    g.fillStyle = '#000';
    g.fillText(text, c.width / 2, c.height / 2);
    g.globalCompositeOperation = 'source-in';
    if (swatch) {
      // repeat the photographed swatch across the word, one reel-width per ~half an em,
      // so its highlights and shadows run through every letter
      const h = size * 1.3, tw = h * (swatch.naturalWidth / swatch.naturalHeight) * 0.8;
      const y = c.height / 2 - h / 2;
      for (let x = -tw * 0.3; x < c.width; x += tw) g.drawImage(swatch, x, y, tw, h);
    } else {
      g.fillStyle = '#c9a13b'; g.fillRect(0, 0, c.width, c.height);
    }
    return c;
  }

  let token = 0;
  async function render(animate) {
    const my = ++token;
    const text = (input.value.trim() || 'Your Brand').slice(0, 22);
    const foil = FOILS.find(f => f.id === form.foil.value) || FOILS[0];
    const stockKey = form.stock.value;
    const [swatch] = await Promise.all([loadImg(foil), document.fonts ? document.fonts.load('800 100px Montserrat') : null]);
    if (my !== token) return;
    const size = fitFont(text);
    const word = foilLayer(text, swatch, size);
    const paper = stockLayer(stockKey);
    const dark = stockKey === 'black' || stockKey === 'red';

    const draw = t => {
      ctx.globalAlpha = 1;
      ctx.drawImage(paper, 0, 0);
      // the die's bite: a soft shadow below, a light edge above
      ctx.save();
      ctx.globalAlpha = t;
      ctx.shadowColor = dark /* taste-skill-ignore: the die's bite drawn on the proof canvas, not a UI shadow */ ? 'rgba(0,0,0,0.6)' : 'rgba(60,40,20,0.35)';
      ctx.shadowOffsetY = 3; ctx.shadowBlur = 3;
      ctx.drawImage(word, 0, 0);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = t * (dark ? 0.12 : 0.25);
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(word, 0, -1);
      ctx.restore();
    };

    caption.textContent = `${foil.name} on ${STOCKS[stockKey].name}`;
    if (!animate || reduce) { draw(1); return; }
    canvas.classList.remove('is-pressing'); void canvas.offsetWidth; canvas.classList.add('is-pressing');
    const t0 = performance.now(), dur = 380;
    const step = now => {
      if (my !== token) return;
      const p = Math.min(1, (now - t0) / dur);
      draw(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  form.addEventListener('submit', e => { e.preventDefault(); render(true); });
  form.addEventListener('change', () => render(true));
  let typing;
  input.addEventListener('input', () => { clearTimeout(typing); typing = setTimeout(() => render(false), 120); });
  render(false);
})();
