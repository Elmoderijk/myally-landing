// My Ally: gedrag van de site. Zonder dit script staat alles in de eindstand en blijft de pagina leesbaar.
(() => {
  const stil = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // Kop wordt glas zodra je scrolt
  const kop = document.getElementById('kop');
  const opScroll = () => kop.classList.toggle('gescrold', scrollY > 12);
  addEventListener('scroll', opScroll, { passive: true }); opScroll();

  // Sterren: vaste plekken, zacht fonkelen, nooit achter tekst, alleen tekenen terwijl ze in beeld zijn
  const hemel = (doek) => {
    const pen = doek.getContext('2d'); let sterren = [], W = 0, H = 0, loopt = false;
    const maat = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), d = doek.getBoundingClientRect();
      W = doek.clientWidth; H = doek.clientHeight;
      doek.width = W * dpr; doek.height = H * dpr; pen.setTransform(dpr, 0, 0, dpr, 0, 0);
      const vrij = [...doek.parentElement.querySelectorAll('.regel,.lead,.acties,h2,p')].map(e => { const q = e.getBoundingClientRect(); return [q.left - d.left - 14, q.top - d.top - 10, q.right - d.left + 14, q.bottom - d.top + 10]; });
      let zaad = 42; const r = () => (zaad = zaad * 16807 % 2147483647) / 2147483647;
      sterren = Array.from({ length: Math.round(W * H / 6500) }, () => ({ x: r() * W, y: r() * H * .94, s: r() < .9 ? .4 + r() * .6 : 1 + r() * .7, a: .25 + r() * .65, f: .3 + r() * 1.1, p: r() * 6.28 }))
        .filter(s => !vrij.some(v => s.x > v[0] && s.x < v[2] && s.y > v[1] && s.y < v[3]));
    };
    const teken = (t) => {
      pen.clearRect(0, 0, W, H); pen.fillStyle = '#fff';
      for (const s of sterren) {
        pen.globalAlpha = s.a * (stil ? 1 : .6 + .4 * Math.sin(t / 1000 * s.f + s.p)) * (1 - s.y / H * .75);
        pen.beginPath(); pen.arc(s.x, s.y, s.s, 0, 6.28); pen.fill();
      }
      if (loopt && !stil) requestAnimationFrame(teken);
    };
    const opnieuw = () => { maat(); teken(0); };
    opnieuw(); addEventListener('resize', opnieuw);
    if (document.fonts) document.fonts.ready.then(opnieuw);
    new IntersectionObserver(([e]) => { const was = loopt; loopt = e.isIntersecting; if (loopt && !was && !stil) requestAnimationFrame(teken); }).observe(doek);
  };
  document.querySelectorAll('canvas.sterren').forEach(hemel);

  // Ally kijkt naar je cursor, bovenaan en onderaan
  const kijkers = [...document.querySelectorAll('[data-kijkt]')];
  if (!stil && matchMedia('(pointer: fine)').matches) {
    let wacht = false;
    addEventListener('pointermove', (e) => {
      if (wacht) return; wacht = true;
      requestAnimationFrame(() => {
        wacht = false;
        for (const k of kijkers) {
          const r = k.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width * .505), dy = e.clientY - (r.top + r.height * k.dataset.kijkt);
          const d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 460);
          k.classList.add('volgt');
          k.style.setProperty('--kx', (dx / d * m).toFixed(3));
          k.style.setProperty('--ky', (dy / d * m).toFixed(3));
        }
      });
    }, { passive: true });
  }

  // Melding bij Ally: rustig van links binnen, ruim blijven staan, naar rechts weer weg
  const meldingen = [
    ['08:12', 'Nieuwe mail van familie Verbeek: badkamer verbouwen in maart. Ik maak er een aanvraag van.'],
    ['08:13', 'Voorstel klaar voor familie Verbeek: antwoord, afspraakvoorstel voor dinsdag 10:00 en een conceptofferte.'],
    ['09:40', 'Verstuurd na jouw akkoord. De afspraak staat voorlopig in de planning.'],
  ];
  const m = document.getElementById('melding'); let mi = 0;
  const toon = () => {
    document.getElementById('m-tijd').textContent = meldingen[mi][0];
    document.getElementById('m-tekst').textContent = meldingen[mi][1];
    m.classList.add('komt'); m.classList.remove('weg');
    void m.offsetWidth;
    m.classList.remove('komt');
  };
  if (stil) { mi = 1; toon(); }
  else {
    setTimeout(toon, 1500);
    setInterval(() => { m.classList.add('weg'); setTimeout(() => { mi = (mi + 1) % meldingen.length; toon(); }, 1300); }, 8000);
  }

  // Scène: één venster dat de stap volgt die midden in beeld staat
  const stappen = [...document.querySelectorAll('#scene .stap')], schermen = [...document.querySelectorAll('#scene .scherm')];
  const tabs = [...document.querySelectorAll('#scene .kader .tab')], klok = document.getElementById('klok');
  const breed = matchMedia('(min-width: 921px)'), akkoord = schermen[2].querySelector('.vknop.primair');
  let nu = -1, druk;
  const zet = (i) => {
    nu = i;
    stappen.forEach((s, j) => s.classList.toggle('actief', j === i));
    schermen.forEach((s, j) => s.classList.toggle('actief', j === i));
    tabs.forEach(t => t.classList.toggle('aan', t.textContent === stappen[i].dataset.tab));
    klok.textContent = stappen[i].dataset.tijd;
  };
  const kies = (i) => {
    if (i === nu) return;
    clearTimeout(druk); akkoord.classList.remove('druk');
    // van voorstel naar besluit: eerst wordt "Akkoord en versturen" ingedrukt
    if (i === 3 && nu === 2 && !stil && breed.matches) { akkoord.classList.add('druk'); druk = setTimeout(() => { akkoord.classList.remove('druk'); zet(3); }, 420); }
    else zet(i);
  };
  zet(0);
  const midden = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) kies(stappen.indexOf(e.target)); }, { rootMargin: '-50% 0px -50% 0px' });
  stappen.forEach(s => midden.observe(s));

  // Bij aankomst: de animatie speelt af zodra het onderdeel goed in beeld staat, niet al aan de onderrand.
  // Scrol je terug tot erboven, dan staat hij weer klaar voor de volgende keer.
  const tween = (e, ms, zacht) => {
    const t0 = performance.now(); e._loopt = true;
    const stap = (t) => {
      const x = Math.min(1, (t - t0) / ms), y = zacht ? (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2) : 1 - Math.pow(1 - x, 3);
      if (!e._loopt) return;
      e.style.setProperty('--p', y.toFixed(3)); if (x < 1) requestAnimationFrame(stap);
    };
    requestAnimationFrame(stap);
  };
  const soorten = [ // [wat, duur in ms, hoeveel ervan in beeld moet staan, rustige start]
    ['#tijd h2[data-rol]', 1600, 1, false], ['.traject[data-rol]', 2800, .5, true], ['table[data-rol]', 1500, 0, false], ['#grootboek tbody tr', 900, 1, false],
  ];
  if (stil) soorten.forEach(([wat]) => document.querySelectorAll(wat).forEach(e => e.style.setProperty('--p', 1)));
  else {
    const weg = new IntersectionObserver((es) => { for (const e of es) if (!e.isIntersecting && e.boundingClientRect.top > 0) { e.target._loopt = false; e.target.style.setProperty('--p', 0); e.target._kom.observe(e.target); } });
    for (const [wat, ms, deel, zacht] of soorten) {
      const kom = new IntersectionObserver((es) => { let n = 0; for (const e of es) if (e.isIntersecting) { kom.unobserve(e.target); setTimeout(() => tween(e.target, ms, zacht), 200 + 120 * n++); } }, { rootMargin: '0px 0px -28% 0px', threshold: deel });
      document.querySelectorAll(wat).forEach(e => { e.style.setProperty('--p', 0); e._kom = kom; kom.observe(e); weg.observe(e); });
    }
  }

  // Aanwijzen: een korte film in het appvenster, speelt alleen terwijl hij in beeld is.
  // De sectie staat uit tot aanwijzen vanuit de gewone app werkt (Elmo, 2026-11-19).
  const film = document.getElementById('aanwijs');
  if (film) {
    const doek2 = film.querySelector('.film-inhoud');
    const fq = (q) => film.querySelector(q), cursor = fq('.cursor'), notitie = fq('.notitie-tekst'), status = fq('.status');
    const astappen = [...document.querySelectorAll('.aanwijs-stap')], zin = 'Ik wil automatische herinneringen bij offertes';
    let klokken = [];
    const na = (ms, f) => klokken.push(setTimeout(f, ms));
    const stop = () => { klokken.forEach(clearTimeout); klokken = []; };
    const fase = (n) => { film.dataset.fase = n; astappen.forEach((a, i) => a.classList.toggle('actief', i === (n < 4 ? 0 : n === 4 ? 1 : 2))); };
    const naar = (q, fx = .5, fy = .5) => { const a = doek2.getBoundingClientRect(), b = fq(q).getBoundingClientRect(); cursor.style.transform = `translate(${b.left - a.left + b.width * fx}px,${b.top - a.top + b.height * fy}px)`; };
    const klik = () => { cursor.classList.remove('klik'); void cursor.offsetWidth; cursor.classList.add('klik'); };
    const speel = () => {
      stop(); notitie.textContent = ''; status.textContent = ''; fase(0); naar('.app-tabel tbody', .25, .6);
      na(900, () => naar('.widget-knop'));
      na(1900, () => { klik(); fase(1); });
      na(2600, () => naar('.widget-menu .wijs', .35));
      na(3500, () => { klik(); fase(2); });
      na(4000, () => naar('.app-tabel thead', .5));
      na(5000, () => fase(3));
      na(5700, () => { klik(); fase(4); });
      [...zin].forEach((_, i) => na(6300 + i * 55, () => { notitie.textContent = zin.slice(0, i + 1); }));
      na(9300, () => naar('.verstuur'));
      na(10200, () => { klik(); fase(5); status.textContent = 'Bouwverzoek verstuurd'; });
      na(10800, () => naar('.app-tabel tbody', .3, .95));
      na(12000, () => { fase(6); status.textContent = 'Ally bouwt het'; });
      na(13800, () => { fase(7); status.textContent = 'Nieuw in je app'; });
      na(19500, speel);
    };
    if (stil) { fase(7); status.textContent = 'Nieuw in je app'; cursor.style.display = 'none'; }
    else new IntersectionObserver(([e]) => { if (e.isIntersecting) speel(); else { stop(); fase(0); } }, { threshold: .35 }).observe(film);
  }

  // Schakelaar: uit / voorstellen / zelf doen
  const schakel = document.getElementById('schakel'), knoppen = [...schakel.querySelectorAll('button')];
  knoppen.forEach((k, i) => k.addEventListener('click', () => {
    schakel.style.setProperty('--i', i);
    knoppen.forEach(x => x.setAttribute('aria-pressed', x === k));
    document.querySelectorAll('.stand,.modus').forEach(d => d.classList.toggle('aan', d.dataset.stand === k.dataset.stand));
  }));

  // Vragen klappen soepel open en dicht; zonder script gewoon open/dicht
  if (!stil) document.querySelectorAll('.vragen details').forEach(d => {
    const a = d.querySelector('.antwoord');
    d.querySelector('summary').addEventListener('click', e => {
      e.preventDefault();
      const van = d.open ? a.getBoundingClientRect().height : 0; // dicht meet Chrome nog de volle hoogte
      a.getAnimations().forEach(x => x.cancel());
      if (!d.open || d.classList.contains('sluit')) {
        d.classList.remove('sluit'); d.open = true;
        a.animate([{ height: van + 'px', opacity: van ? 1 : 0 }, { height: a.scrollHeight + 'px', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.33,1,.68,1)' });
      } else {
        d.classList.add('sluit');
        a.animate([{ height: van + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 440, easing: 'cubic-bezier(.65,0,.35,1)' })
          .onfinish = () => { d.open = false; d.classList.remove('sluit'); };
      }
    });
  });

  // Mobiel menu sluit na een keuze
  document.querySelectorAll('.uitklap a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));
})();
