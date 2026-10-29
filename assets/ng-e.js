/* Namsan Glow, E family (Gota): page engine for mocks H and I.
   The page sets window.NG_E before loading this file:
   { mock, label, dayNight, sections: [...], hero: { h1, lead, img, imgNight }, story } */
(() => {
  const C = window.NG_E;
  const { CATALOG, BRANDS, STEPS, ROUTINES, INGREDIENTS, byId, esc, cart, L } = NG;
  const money = v => NG.money(v);
  const tr = v => Array.isArray(v) ? L(...v) : v;
  const $ = (s, r = document) => r.querySelector(s);
  const root = document.documentElement;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vt = fn => (document.startViewTransition && !reduce()) ? document.startViewTransition(fn) : fn();
  const TILE = i => `var(--t${(i % 5) + 1})`;
  const tile = p => TILE(p.s - 1);
  const COL = { centella: '#A9CF8F', heartleaf: '#CADB8C', hialuronico: '#CFE4F0', azelaico: '#F2DDA6', niacinamida: '#F5CFDB', pdrn: '#F0B9A8', ceramidas: '#EFE3CC', retinol: '#F2BE6A', colagenio: '#F7D3C0' };
  const ingOf = k => INGREDIENTS.find(x => x.key === k);
  const has = s => C.sections.includes(s);

  /* ---------- Morning / night (optional) ---------- */
  const TKEY = 'ng-time-' + C.mock;
  if (C.dayNight) {
    try { const s = sessionStorage.getItem(TKEY), h = new Date().getHours(); root.dataset.time = s || (h >= 19 || h < 7 ? 'noite' : 'manha'); } catch (e) { root.dataset.time = 'manha'; }
  }
  const time = () => root.dataset.time || 'manha';

  /* ---------- Icons ---------- */
  const I = {
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    x: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    search: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    wa: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19z"/><path d="M9.5 8.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z"/></svg>',
    bag: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    globe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    drop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2s7 8.4 7 13a7 7 0 0 1-14 0c0-4.6 7-13 7-13z"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    truck: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
    chat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/></svg>',
    prev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };
  I.chev = '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  I.ig = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>';
  I.pin = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
  const LANG_NAMES = { pt: 'Português', en: 'English', ko: '한국어' };

  /* ---------- Chrome: announcement, header, menu, footer ---------- */
  const tsw = cls => C.dayNight ? `<div class="tsw ${cls}" role="group" aria-label="${L('Momento do dia', 'Time of day', '시간대')}">
      <button type="button" data-time="manha" aria-pressed="${time() === 'manha'}" aria-label="${L('Manhã', 'Morning', '아침')}">${I.sun}<span>${L('Manhã', 'Morning', '아침')}</span></button>
      <button type="button" data-time="noite" aria-pressed="${time() === 'noite'}" aria-label="${L('Noite', 'Night', '저녁')}">${I.moon}<span>${L('Noite', 'Night', '저녁')}</span></button></div>` : '';
  const navLinks = () => [
    ['#/loja', L('Loja', 'Shop', '쇼핑')],
    ['#/inicio/ritual', L('A rotina', 'The routine', '루틴')],
    ...(has('lab') ? [['#/inicio/ingredientes', L('Ingredientes', 'Ingredients', '성분')]] : []),
    ['#/sobre', L('Sobre', 'About', '소개')]
  ];
  /* Side menu: a main panel plus sliding sub-panels for brands and ingredients */
  const sideTop = (left) => `<div class="side-top">${left}<button class="side-x" type="button" aria-label="${L('Fechar menu', 'Close menu', '메뉴 닫기')}" data-close-menu>${I.x}</button></div>`;
  const row = (href, label, extra = '') => `<li><a href="${href}">${extra}<span>${label}</span>${I.chev}</a></li>`;
  const sideMenu = () => {
    const night = time() === 'noite';
    return `<div class="side-in">
      <div class="side-panel side-main" id="sideMain">
        ${sideTop(`<a class="side-logo" href="#/inicio"><img src="assets/logo-badge.png" alt=""><span>Namsan Glow</span></a>`)}
        <nav class="side-nav" aria-label="${L('Menu', 'Menu', '메뉴')}">
          <ul class="side-list">
            ${row('#/loja', L('Toda a loja', 'Shop all', '전체 쇼핑'))}
            ${row('#/inicio/ritual', L('A rotina em 5 passos', 'The 5-step routine', '5단계 루틴'))}
            ${row('#/inicio/quiz', L('Quiz de pele', 'Skin quiz', '피부 퀴즈'))}
            ${has('lab') ? `<li><button type="button" data-sub="sideIng" aria-controls="sideIng"><span>${L('Ingredientes', 'Ingredients', '성분')}</span>${I.chev}</button></li>` : ''}
            <li><button type="button" data-sub="sideBrands" aria-controls="sideBrands"><span>${L('Marcas', 'Brands', '브랜드')}</span>${I.chev}</button></li>
          </ul>
          <p class="side-label">${L('Comprar por passo', 'Shop by step', '단계별 쇼핑')}</p>
          <ul class="side-list">
            ${STEPS.map(s => row('#/loja/s-' + s.n, s.t, `<i class="n">${s.n}</i>`)).join('')}
            ${row('#/loja/m', `${L('Máscaras', 'Masks', '마스크')} <em>−15%</em>`)}
          </ul>
          <ul class="side-list side-gap">${row('#/sobre', L('Sobre a Namsan Glow', 'About Namsan Glow', '남산 글로우 소개'))}</ul>
        </nav>
        <ul class="side-util">
          <li><a href="https://wa.me/351966700740"><span>${L('Falar por WhatsApp', 'Message us on WhatsApp', 'WhatsApp 문의')}</span>${I.wa}</a></li>
          <li><a href="https://instagram.com/namsanglow_skincare"><span>Instagram</span>${I.ig}</a></li>
          <li><a href="#/sobre/contactos"><span>${L('Contactos', 'Contact', '문의')}</span>${I.pin}</a></li>
          ${C.dayNight ? `<li><button type="button" data-time-flip><span>${night ? L('Mudar para dia', 'Switch to day', '낮 모드로') : L('Mudar para noite', 'Switch to night', '밤 모드로')}</span>${night ? I.sun : I.moon}</button></li>` : ''}
          <li class="side-lang"><span>${L('Idioma', 'Language', '언어')}</span><span class="opts-l">${NG.LANGS.map(l => `<button type="button" data-lang="${l}" lang="${l}" aria-pressed="${l === NG.lang}">${l.toUpperCase()}</button>`).join('')}</span></li>
        </ul>
      </div>
      <div class="side-panel side-sub" id="sideBrands" inert>
        ${sideTop(`<button class="side-back" type="button" data-sub-back>${I.prev}<span>${L('Marcas', 'Brands', '브랜드')}</span></button>`)}
        <ul class="side-list side-brands">${BRANDS.map(b => `<li><a href="#/loja/b-${encodeURIComponent(b.n)}"><span>${esc(b.n)}</span><img src="${b.src}" alt="" loading="lazy"></a></li>`).join('')}</ul>
      </div>
      ${has('lab') ? `<div class="side-panel side-sub" id="sideIng" inert>
        ${sideTop(`<button class="side-back" type="button" data-sub-back>${I.prev}<span>${L('Ingredientes', 'Ingredients', '성분')}</span></button>`)}
        <ul class="side-list">${INGREDIENTS.map(x => row('#/loja/i-' + x.key, esc(x.t), `<i class="sw" style="background-image:url(assets/u-ing-${x.key}.webp)"></i>`)).join('')}</ul>
      </div>` : ''}
    </div>`;
  };
  const chrome = () => {
    $('#ann').innerHTML = L('10% na primeira encomenda com <b>WELCOME10</b>. Envio grátis a partir de 50 €.', '10% off your first order with <b>WELCOME10</b>. Free shipping over €50.', '첫 주문 10% 할인 코드 <b>WELCOME10</b>. 50유로 이상 무료 배송.');
    $('#hdr').innerHTML = `<div class="wrap hdr-in">
      <div class="h-left">
        <button class="menu-btn" type="button" aria-label="${L('Abrir menu', 'Open menu', '메뉴 열기')}" aria-haspopup="dialog" data-open-menu>${I.menu}<span>${L('Menu', 'Menu', '메뉴')}</span></button>
        <nav class="nav" aria-label="${L('Principal', 'Main', '메인')}">${navLinks().map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      </div>
      <a class="logo" href="#/inicio"><img src="assets/logo-badge.png" alt=""><span>Namsan Glow</span></a>
      <div class="tools">
        ${tsw('sm')}
        <button class="lang-btn" type="button" popovertarget="langMenu" aria-label="${L('Idioma', 'Language', '언어')}: ${LANG_NAMES[NG.lang]}">${I.globe}${NG.lang.toUpperCase()}</button>
        <a class="ic" href="#/loja/procurar" aria-label="${L('Procurar', 'Search', '검색')}">${I.search}</a>
        <a class="ic wa" href="https://wa.me/351966700740" aria-label="WhatsApp">${I.wa}</a>
        <button class="ic" type="button" id="cartBtn" aria-label="${L('Abrir carrinho', 'Open bag', '장바구니 열기')}">${I.bag}<span class="badge" id="badge">${cart.count() || ''}</span></button>
      </div></div>`;
    $('#langMenu').innerHTML = NG.LANGS.map(l => `<button type="button" data-lang="${l}" lang="${l}" aria-current="${l === NG.lang}">${LANG_NAMES[l]}</button>`).join('');
    $('#mnav').setAttribute('aria-label', L('Menu', 'Menu', '메뉴'));
    $('#mnav').innerHTML = sideMenu();
    $('#ft').innerHTML = `<div class="wrap">
      <div class="ft-grid">
        <h2>${L('Cosmética coreana, escolhida em Braga.', 'Korean skincare, chosen in Braga.', '브라가에서 고른 한국 화장품.')}</h2>
        <div><h3>${L('Loja', 'Shop', '쇼핑')}</h3><ul><li><a href="#/loja">${L('Todos os produtos', 'All products', '전체 제품')}</a></li><li><a href="#/inicio/ritual">${L('A rotina em 5 passos', 'The 5-step routine', '5단계 루틴')}</a></li><li><a href="#/inicio/quiz">${L('Quiz de pele', 'Skin quiz', '피부 퀴즈')}</a></li></ul></div>
        <div><h3>Namsan Glow</h3><ul><li><a href="#/sobre">${L('Sobre nós', 'About us', '회사 소개')}</a></li><li><a href="#/sobre/marcas">${L('Marcas', 'Brands', '브랜드')}</a></li><li><a href="#/sobre/contactos">${L('Contactos', 'Contact', '문의')}</a></li></ul></div>
        <div><h3>${L('Falar connosco', 'Talk to us', '연락하기')}</h3><ul><li><a href="mailto:info@namsanglow.org">info@namsanglow.org</a></li><li><a href="https://wa.me/351966700740">+351 966 700 740</a></li><li><a href="https://instagram.com/namsanglow_skincare">@namsanglow_skincare</a></li></ul></div>
      </div>
      <div class="base"><span>Namsan Glow Asian Skincare, Braga, Portugal</span><span>${L('Proposta', 'Proposal', '시안')} ${C.mock}, ${C.label}</span></div></div>`;
    $('#cartBtn').onclick = drawer.open;
  };

  /* ---------- Product card ---------- */
  const stepLabel = p => L(`Passo ${p.s}, ${STEPS[p.s - 1].t.toLowerCase()}`, `Step ${p.s}, ${STEPS[p.s - 1].t.toLowerCase()}`, `${p.s}단계 ${STEPS[p.s - 1].t}`);
  const priceHTML = p => (p.o ? '<s>' + money(p.o) + '</s>' : '') + money(p.p);
  const card = p => `
    <article class="card">
      <a class="tile" href="#/produto/${p.id}" style="--tile:${tile(p)}" tabindex="-1" aria-hidden="true">
        <img src="${p.img}" alt="" loading="lazy" decoding="async">
        ${p.sold ? `<span class="tag">${L('Esgotado', 'Sold out', '품절')}</span>` : p.o ? '<span class="tag">−15%</span>' : ''}
      </a>
      <span class="brand">${esc(p.b)}</span>
      <a class="name" href="#/produto/${p.id}" title="${esc(stepLabel(p))}">${esc(p.n)}</a>
      <div class="buy"><span class="price">${priceHTML(p)}</span>
      <button class="add" type="button" data-add="${p.id}" ${p.sold ? 'disabled' : ''}>${p.sold ? L('Esgotado', 'Sold out', '품절') : L('Adicionar', 'Add', '담기')}</button></div>
    </article>`;

  /* ---------- Home sections ---------- */
  const DROP = 'M200 18C200 18 352 230 370 340C390 462 306 560 200 560C94 560 10 462 30 340C48 230 200 18 200 18Z';
  // Day keeps a low sun; night has no sky drawing, only the candle glow and halo around the drop (CSS)
  const sky = () => C.dayNight ? `<svg class="sky" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g class="sun"><circle cx="1150" cy="190" r="170" fill="#F6C48E" opacity=".35"/><circle cx="1150" cy="190" r="96" fill="#F4B47A" opacity=".55"/></g></svg>` : '';

  const hero = () => {
    const words = tr(C.hero.h1).split(' ');
    return `<section class="hero" aria-labelledby="h-hero">${sky()}
    <div class="wrap hero-in">
      <div>
        <h1 id="h-hero" aria-label="${esc(words.join(' '))}">${words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ')}</h1>
        <p class="lead seq" style="--i:0">${C.dayNight ? `<span class="only-manha">${tr(C.hero.leadDay)}</span><span class="only-noite">${tr(C.hero.leadNight)}</span>` : tr(C.hero.lead)}</p>
        <div class="ctas seq" style="--i:1">${C.dayNight ? tsw('big') : ''}<a class="btn gold" href="#/loja">${L('Ver a loja', 'Shop now', '쇼핑하기')}</a><a class="btn line" href="#/inicio/${has('lab') && !C.dayNight ? 'ingredientes' : 'quiz'}">${has('lab') && !C.dayNight ? L('Escolher pelo ingrediente', 'Shop by ingredient', '성분으로 고르기') : L('Descobrir a minha rotina', 'Find my routine', '내 루틴 찾기')}</a></div>
        <ul class="facts seq" style="--i:2"><li>${I.drop}${L('Envio grátis acima de 50 €', 'Free shipping over €50', '50유로 이상 무료 배송')}</li><li>${I.drop}${L('Aconselhamento por WhatsApp', 'Advice on WhatsApp', 'WhatsApp 상담')}</li></ul>
      </div>
      <div class="stage" aria-hidden="true">
        <svg viewBox="0 0 400 620" id="dropSvg">
          <defs>
            <clipPath id="dropClip"><path d="${DROP}"/></clipPath>
            <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3DDA6"/><stop offset=".45" stop-color="#B08A3E"/><stop offset="1" stop-color="#6E4F1A"/></linearGradient>
            <linearGradient id="tint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E3C27E" stop-opacity=".05"/><stop offset="1" stop-color="#2A1D15" stop-opacity=".3"/></linearGradient>
            <linearGradient id="tintN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A0F06" stop-opacity=".15"/><stop offset=".6" stop-color="#3A2410" stop-opacity=".35"/><stop offset="1" stop-color="#0C0805" stop-opacity=".7"/></linearGradient>
            <radialGradient id="shineG"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".4" stop-color="#FFF4D8" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
            <radialGradient id="poolG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E3C27E" stop-opacity=".45"/><stop offset="1" stop-color="#E3C27E" stop-opacity="0"/></radialGradient>
          </defs>
          <ellipse cx="200" cy="582" rx="170" ry="26" fill="url(#poolG)"/>
          <g class="ripples"><ellipse cx="200" cy="582" rx="190" ry="30" stroke-width="1.2"/><ellipse cx="200" cy="582" rx="190" ry="30" stroke-width="1"/><ellipse cx="200" cy="582" rx="190" ry="30" stroke-width=".8"/></g>
          <g class="ripples"><ellipse class="rest" cx="200" cy="582" rx="140" ry="20"/><ellipse class="rest" cx="200" cy="582" rx="196" ry="30"/></g>
          <g class="drop-g">
            <g clip-path="url(#dropClip)">
              <image class="drop-img day" href="${C.hero.img}" x="-90" y="10" width="580" height="580" preserveAspectRatio="xMidYMid slice"/>
              ${C.hero.imgNight ? `<image class="drop-img night" href="${C.hero.imgNight}" x="-60" y="0" width="520" height="620" preserveAspectRatio="xMidYMid slice"/>` : ''}
              <rect width="400" height="620" fill="url(#tint)"/>
              ${C.dayNight ? '<rect class="night-tint" width="400" height="620" fill="url(#tintN)"/>' : ''}
              <circle class="shine" id="shine" cx="140" cy="200" r="150" fill="url(#shineG)"/>
            </g>
            <path d="${DROP}" fill="none" stroke="url(#goldRim)" stroke-width="3"/>
            <path d="M150 150C128 190 108 236 100 280" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>
          </g>
        </svg>
      </div>
    </div>
  </section>`;
  };

  const brands = () => `<section class="brands" aria-label="${L('As nossas marcas', 'Our brands', '브랜드')}">
    <div class="mq">
      <div class="mq-set">${BRANDS.map(b => `<a href="#/loja/b-${encodeURIComponent(b.n)}" aria-label="${esc(b.n)}"><img src="${b.src}" alt="${esc(b.n)}" loading="lazy"></a>`).join('')}</div>
      <div class="mq-set" aria-hidden="true">${BRANDS.map(b => `<a href="#/loja" tabindex="-1"><img src="${b.src}" alt="" loading="lazy"></a>`).join('')}</div>
    </div></section>`;

  /* Ingredient lab */
  let ing = 'centella';
  const withIng = k => CATALOG.filter(p => p.i.includes(k));
  // Ingredient index: names on the left, the chosen one with its photo, what it does and where it is
  const panel = k => {
    const x = ingOf(k), list = withIng(k);
    return `<figure class="ix-photo"><img src="assets/u-ing-${k}.webp" alt="" decoding="async"></figure>
      <div class="ix-body">
        <h3 id="ingName" tabindex="-1">${esc(x.t)}</h3>
        <p class="what">${esc(x.d)}</p>
        <p class="ix-n">${L(`${list.length} ${list.length === 1 ? 'produto com este ingrediente' : 'produtos com este ingrediente'}`, `${list.length} ${list.length === 1 ? 'product with this ingredient' : 'products with this ingredient'}`, `이 성분이 든 제품 ${list.length}개`)}</p>
        <ul class="ix-prods">${list.slice(0, 3).map(p => `<li><a href="#/produto/${p.id}"><span class="th" style="background:${tile(p)}"><img src="${p.img}" alt=""></span><span class="nm"><small>${esc(p.b)}</small>${esc(p.n)}</span><b>${money(p.p)}</b></a></li>`).join('')}</ul>
        <a class="lnk" href="#/loja/i-${k}">${list.length > 3 ? L(`Ver os ${list.length} produtos`, `See all ${list.length} products`, `제품 ${list.length}개 모두 보기`) : L('Ver na loja', 'See in the shop', '상점에서 보기')}</a>
      </div>`;
  };
  const lab = () => `<section class="sec ${C.labDeep ? 'deep' : ''}" id="ingredientes" aria-labelledby="h-lab">
    <div class="wrap">
      <div class="sh"><h2 id="h-lab">${L('Escolha pelo ingrediente', 'Shop by ingredient', '성분으로 고르기')}</h2><p>${L('Nove ativos que encontra nas nossas rotinas. Escolha um para saber o que faz e em que produtos está.', 'Nine actives you will find in our routines. Pick one to see what it does and which products have it.', '루틴에 자주 쓰이는 아홉 가지 성분. 하나를 골라 효과와 해당 제품을 확인하세요.')}</p></div>
      <div class="ix">
        <div class="ix-list" role="tablist" aria-orientation="vertical" aria-label="${L('Ingredientes', 'Ingredients', '성분')}">
          ${INGREDIENTS.map(x => `<button type="button" role="tab" id="ixt-${x.key}" aria-controls="panel" aria-selected="${x.key === ing}" tabindex="${x.key === ing ? 0 : -1}" data-ing="${x.key}"><span class="nm">${esc(x.t)}</span><span class="ct">${withIng(x.key).length}</span></button>`).join('')}
        </div>
        <div class="ix-panel" id="panel" role="tabpanel" aria-labelledby="ixt-${ing}" aria-live="polite">${panel(ing)}</div>
      </div>
    </div></section>`;

  /* Ritual */
  const routineMode = { v: 'manha' };
  const mode = () => C.dayNight ? time() : routineMode.v;
  const stepName = (i, m) => i === 4 && m === 'noite' ? L('Olhos', 'Eyes', '아이케어') : STEPS[i].t;
  const stepDesc = (i, m) => i === 4 && m === 'noite' ? L('Contorno de olhos, à noite', 'Eye cream, at night', '저녁 아이크림') : STEPS[i].d;
  const ritualCards = m => ROUTINES[m].map((id, i) => {
    const p = byId[id];
    return `<div class="rt-card" style="--tile:${TILE(i)}" data-i="${i}"><span class="big" aria-hidden="true">${i + 1}</span><img src="${p.img}" alt="${esc(p.n)}">
      <div class="meta"><div><small>${esc(p.b)}</small><a href="#/produto/${p.id}">${esc(p.n)}</a></div><b>${money(p.p)}</b></div></div>`;
  }).join('');
  const ritualMob = m => ROUTINES[m].map((id, i) => {
    const p = byId[id];
    return `<li><a href="#/produto/${p.id}"><span class="th" style="--tile:${TILE(i)}"><img src="${p.img}" alt=""></span><span><small>${i + 1}. ${stepName(i, m)}</small><span class="nm">${esc(p.n)}</span></span><b>${money(p.p)}</b></a></li>`;
  }).join('');
  const routineTotal = m => money(ROUTINES[m].reduce((s, id) => s + byId[id].p, 0));
  const ritual = () => {
    const m = mode();
    return `<section class="rt" id="ritual" aria-labelledby="h-rt">
    <div class="wrap rt-stage">
      <div class="rt-copy">
        <h2 id="h-rt">${C.dayNight ? `<span class="only-manha">${L('A rotina da manhã, um passo de cada vez', 'The morning routine, one step at a time', '아침 루틴, 한 단계씩')}</span><span class="only-noite">${L('A rotina da noite, um passo de cada vez', 'The night routine, one step at a time', '저녁 루틴, 한 단계씩')}</span>` : L('A rotina coreana, um passo de cada vez', 'The Korean routine, one step at a time', '한국식 루틴, 한 단계씩')}</h2>
        <p>${L('Cada produto tem o seu lugar. Desça a página para ver a rotina completa.', 'Every product has its place. Scroll down to see the full routine.', '모든 제품에는 순서가 있습니다. 스크롤하며 전체 루틴을 확인하세요.')}</p>
        <div class="seg" role="group" aria-label="${L('Momento do dia', 'Time of day', '시간대')}"><button type="button" data-mode="manha" aria-pressed="${m === 'manha'}">${L('Manhã', 'Morning', '아침')}</button><button type="button" data-mode="noite" aria-pressed="${m === 'noite'}">${L('Noite', 'Night', '저녁')}</button></div>
        <ol class="rt-list" id="rtList">${STEPS.map((s, i) => `<li class="${i === 0 ? 'on' : ''}"><button type="button" data-step="${i}"><span class="n">${s.n}</span><span class="t">${stepName(i, m)}</span><span class="d">${stepDesc(i, m)}</span></button></li>`).join('')}</ol>
        <ul class="rt-mob" id="rtMob">${ritualMob(m)}</ul>
        <div class="rt-sum"><span>${L('Rotina completa', 'Full routine', '전체 루틴')} <b id="rtTot">${routineTotal(m)}</b></span><button class="btn" type="button" id="rtAdd">${L('Adicionar os 5 ao carrinho', 'Add all 5 to bag', '5개 모두 담기')}</button></div>
      </div>
      <div class="rt-show" id="rtShow">${ritualCards(m)}</div>
    </div></section>`;
  };

  /* Quiz: two questions on the left; the morning routine fills in on the right as you answer */
  const QI = {
    seca: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/><path d="M10 13l2 2-1 2"/>',
    oleosa: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" stroke-linecap="round"/>',
    mista: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" opacity=".35"/>',
    sensivel: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19l8-8"/>',
    hidratacao: '<path d="M3 9c3-2 6 2 9 0s6-2 9 0M3 14c3-2 6 2 9 0s6-2 9 0M3 19c3-2 6 2 9 0s6-2 9 0"/>',
    manchas: '<circle cx="12" cy="12" r="8"/><circle cx="9.5" cy="10" r="1.2" fill="currentColor"/><circle cx="14.5" cy="13.5" r="1.6" fill="currentColor"/><circle cx="10.5" cy="15.5" r=".8" fill="currentColor"/>',
    vermelhidao: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5" opacity=".6"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    poros: '<circle cx="12" cy="12" r="8"/><g fill="currentColor" stroke="none"><circle cx="9" cy="9" r=".9"/><circle cx="12" cy="9" r=".9"/><circle cx="15" cy="9" r=".9"/><circle cx="9" cy="12" r=".9"/><circle cx="12" cy="12" r=".9"/><circle cx="15" cy="12" r=".9"/><circle cx="9" cy="15" r=".9"/><circle cx="12" cy="15" r=".9"/><circle cx="15" cy="15" r=".9"/></g>'
  };
  const qIcon = k => `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true">${QI[k]}</svg>`;
  const Q = () => [
    [L('Como é a sua pele?', 'What is your skin like?', '피부 타입은 무엇인가요?'), 'skin', [
      ['seca', L('Seca', 'Dry', '건성'), L('Repuxa e pede conforto', 'Feels tight, wants comfort', '당기고 건조해요')],
      ['oleosa', L('Oleosa', 'Oily', '지성'), L('Brilho ao longo do dia', 'Shiny through the day', '하루 종일 번들거려요')],
      ['mista', L('Mista', 'Combination', '복합성'), L('Zona T oleosa, resto normal', 'Oily T-zone, normal elsewhere', 'T존만 번들거려요')],
      ['sensivel', L('Sensível', 'Sensitive', '민감성'), L('Reage e avermelha com facilidade', 'Reacts and reddens easily', '쉽게 붉어지고 예민해요')]]],
    [L('O que quer melhorar?', 'What would you like to improve?', '어떤 고민을 해결하고 싶나요?'), 'concern', [
      ['hidratacao', L('Hidratação', 'Hydration', '수분'), L('Pele baça ou desidratada', 'Dull or dehydrated skin', '칙칙하고 건조한 피부')],
      ['manchas', L('Manchas', 'Dark spots', '잡티'), L('Tom irregular e marcas', 'Uneven tone and marks', '고르지 않은 톤과 자국')],
      ['vermelhidao', L('Vermelhidão', 'Redness', '붉은기'), L('Pele reativa', 'Reactive skin', '예민한 피부')],
      ['poros', L('Poros e oleosidade', 'Pores and oil', '모공과 피지'), L('Brilho e imperfeições', 'Shine and blemishes', '번들거림과 트러블')]]]
  ];
  const SERUM = { hidratacao: 'anua-pdrn', manchas: 'anua-niacinamide', vermelhidao: 'anua-azelaic', poros: 'skin1004-ampoule' };
  const qz = { step: 0, skin: '', concern: '' };
  const pickRoutine = () => {
    const skin = qz.skin || 'mista', c = qz.concern || 'hidratacao', oily = skin === 'oleosa' || skin === 'mista';
    return ['anua-gel', 'anua-toner', SERUM[c], skin === 'seca' || skin === 'mista' ? 'haruharu-cream' : 'anua-3plus', oily ? 'torriden-toneup' : 'torriden-sun'];
  };
  const quiz = () => `<section class="sec qz" id="quiz" aria-labelledby="h-qz">
    <div class="wrap qz-in">
      <div class="qz-left">
        <h2 id="h-qz">${L('Não sabe por onde começar?', 'Not sure where to start?', '어디서 시작할지 모르겠나요?')}</h2>
        <p class="qz-lead">${L('Duas perguntas sobre a sua pele. A rotina da manhã monta-se ao lado à medida que responde.', 'Two questions about your skin. Your morning routine builds alongside as you answer.', '피부에 관한 두 가지 질문. 답하는 동안 옆에서 아침 루틴이 만들어집니다.')}</p>
        <div id="qzCard"></div>
      </div>
      <aside class="qz-res" id="qzRes" aria-live="polite" aria-label="${L('A sua rotina', 'Your routine', '나의 루틴')}"></aside>
    </div></section>`;
  const drawQuiz = focus => {
    const cardEl = $('#qzCard'), res = $('#qzRes'); if (!cardEl) return;
    const qs = Q(), done = qz.step >= 2, q = qs[Math.min(qz.step, 1)];
    const lbl = (qi, v) => qs[qi][2].find(o => o[0] === v)[1];
    const meta = `<div class="qz-meta"><span>${done ? L('Concluído', 'Done', '완료') : L(`Pergunta ${qz.step + 1} de 2`, `Question ${qz.step + 1} of 2`, `질문 ${qz.step + 1} / 2`)}</span><span class="qz-bar"><i style="--p:${done ? 1 : qz.step / 2 + .5}"></i></span></div>`;
    cardEl.innerHTML = meta + (done
      ? `<h3 tabindex="-1">${L('A sua rotina está pronta', 'Your routine is ready', '루틴이 준비되었습니다')}</h3>
         <p class="qz-sum">${L(`Para pele ${lbl(0, qz.skin).toLowerCase()}, com foco em ${lbl(1, qz.concern).toLowerCase()}. Cinco produtos, pela ordem em que se aplicam de manhã.`, `For ${lbl(0, qz.skin).toLowerCase()} skin, focused on ${lbl(1, qz.concern).toLowerCase()}. Five products, in the order you apply them in the morning.`, `${lbl(0, qz.skin)} 피부, ${lbl(1, qz.concern)} 집중 케어. 아침에 바르는 순서대로 다섯 가지 제품입니다.`)}</p>
         <div class="qz-acts"><button class="lnk" type="button" data-qz-restart>${L('Responder outra vez', 'Start again', '다시 하기')}</button></div>`
      : `<h3 tabindex="-1">${q[0]}</h3>
         <div class="qz-opts">${q[2].map(o => `<button type="button" data-qz="${q[1]}" data-v="${o[0]}" aria-pressed="${qz[q[1]] === o[0]}">${qIcon(o[0])}<b>${o[1]}</b><small>${o[2]}</small></button>`).join('')}</div>
         ${qz.step ? `<div class="qz-acts"><button class="ck-back" type="button" data-qz-back>${I.prev}${L('Voltar à pergunta anterior', 'Back to the previous question', '이전 질문으로')}</button></div>` : ''}`);
    // Steps 1, 2, 4 and 5 depend on skin type; step 3 (the serum) on what to improve
    const ids = pickRoutine();
    const known = i => i === 2 ? !!qz.concern : !!qz.skin;
    const total = ids.reduce((s, id) => s + byId[id].p, 0);
    res.classList.toggle('done', done);
    res.innerHTML = `<div class="qr-head"><h3>${L('A sua rotina da manhã', 'Your morning routine', '나의 아침 루틴')}</h3><span>${L('5 passos', '5 steps', '5단계')}</span></div>
      <ol class="qr-list">${ids.map((id, i) => {
        const p = byId[id], k = known(i);
        return `<li class="${k ? 'in' : ''}" style="--d:${i * 70}ms"><span class="no">${String(i + 1).padStart(2, '0')}</span>
          ${k ? `<span class="th" style="background:${TILE(i)}"><img src="${p.img}" alt=""></span><a class="nm" href="#/produto/${p.id}"><small>${STEPS[i].t}</small>${esc(p.n)}</a><b>${money(p.p)}</b>`
              : `<span class="th ghost"></span><span class="nm"><small>${STEPS[i].t}</small><span class="ph-line"></span></span><b class="muted">—</b>`}</li>`;
      }).join('')}</ol>
      <div class="qr-foot"><p><span>${L('Total da rotina', 'Routine total', '루틴 합계')}</span><b>${done ? money(total) : '—'}</b></p>
        <button class="btn" type="button" data-addset="${ids.join(',')}" ${done ? '' : 'disabled'}>${L('Adicionar os 5 ao carrinho', 'Add all 5 to bag', '5개 모두 담기')}</button></div>`;
    if (focus) cardEl.querySelector('h3').focus({ preventScroll: true });
  };

  const newIn = () => `<section class="sec" aria-labelledby="h-new">
    <div class="wrap">
      <div class="sh"><h2 id="h-new">${L('Chegaram esta semana', 'New this week', '이번 주 신상품')}</h2><div class="arrows"><button type="button" data-row="-1" aria-label="${L('Anteriores', 'Previous', '이전')}">${I.prev}</button><button type="button" data-row="1" aria-label="${L('Seguintes', 'Next', '다음')}">${I.next}</button></div></div>
      <div class="row" id="newRow">${CATALOG.filter(p => p.cat !== 'Máscaras').slice(0, 10).map(card).join('')}</div>
    </div></section>`;

  const story = () => `<section class="sec" style="padding-top:0" aria-labelledby="h-story">
    <div class="wrap story">
      <div class="arch"><img src="${C.story.img}" alt="${esc(tr(C.story.alt))}" loading="lazy"></div>
      <div>
        <h2 id="h-story">${L('Do primeiro ao último passo, com quem conhece cada produto', 'From the first step to the last, with people who know every product', '첫 단계부터 마지막 단계까지, 제품을 잘 아는 사람과 함께')}</h2>
        <p>${L('A Namsan Glow nasceu em Braga para trazer a cosmética coreana a Portugal. Escolhemos cada marca, explicamos cada passo e respondemos a dúvidas por WhatsApp.', 'Namsan Glow started in Braga to bring Korean skincare to Portugal. We choose every brand, explain every step and answer questions on WhatsApp.', '남산 글로우는 한국 화장품을 포르투갈에 소개하기 위해 브라가에서 시작했습니다. 브랜드를 직접 고르고, 단계마다 설명하며, WhatsApp으로 질문에 답합니다.')}</p>
        <a class="btn ghost" href="#/sobre">${L('Conhecer a Namsan Glow', 'Meet Namsan Glow', '남산 글로우 알아보기')}</a>
      </div></div></section>`;

  // Example reviews for the mock: replace with the shop's real Google or Instagram reviews before launch
  const REVIEWS = [
    { who: 'Inês C.', place: 'Braga', skin: ['Pele mista', 'Combination skin', '복합성 피부'], stars: 5, when: ['há 3 semanas', '3 weeks ago', '3주 전'], prod: 'anua-toner',
      t: ['Acalmou a vermelhidão', 'Calmed the redness down', '붉은기가 진정됐어요'],
      x: ['Uso o tónico de manhã e à noite há dois meses. A zona à volta do nariz está menos vermelha e já não sinto a pele a repuxar depois de lavar.', 'I have used the toner morning and night for two months. The area around my nose is less red and my skin no longer feels tight after washing.', '두 달 동안 아침저녁으로 토너를 썼어요. 코 주변 붉은기가 줄었고 세안 후 당김도 없어졌어요.'] },
    { who: 'Mariana P.', place: 'Porto', skin: ['Pele seca', 'Dry skin', '건성 피부'], stars: 5, when: ['há 1 mês', '1 month ago', '한 달 전'], prod: 'torriden-sun',
      t: ['Um protetor que não deixa branco', 'A sunscreen with no white cast', '백탁 없는 선크림'],
      x: ['Todos os protetores que experimentei ficavam pesados na minha pele seca. Este absorve depressa e funciona bem por baixo da base.', 'Every sunscreen I tried felt heavy on my dry skin. This one sinks in fast and sits well under foundation.', '건성 피부라 선크림이 늘 무거웠는데, 이건 빨리 흡수되고 파운데이션 밑에서도 잘 맞아요.'] },
    { who: 'Beatriz L.', place: 'Guimarães', skin: ['Pele normal', 'Normal skin', '중성 피부'], stars: 4, when: ['há 2 meses', '2 months ago', '두 달 전'], prod: 'haruharu-cream',
      t: ['Ótimo para o inverno', 'Great for winter', '겨울에 딱 좋아요'],
      x: ['Textura rica mas nada gordurosa e a pele fica confortável o dia todo. Tirei uma estrela porque o frasco dura menos do que esperava.', 'Rich but not greasy, and my skin stays comfortable all day. One star off because the jar runs out sooner than I expected.', '진하지만 기름지지 않고 하루 종일 편안해요. 생각보다 빨리 써서 별 하나 뺐어요.'] },
    { who: 'Joana R.', place: 'Lisboa', skin: ['Pele sensível', 'Sensitive skin', '민감성 피부'], stars: 5, when: ['há 2 semanas', '2 weeks ago', '2주 전'], prod: 'biodance-mask',
      t: ['Pele luminosa no dia seguinte', 'Glowing skin the next morning', '다음 날 피부가 환해요'],
      x: ['Uso uma vez por semana antes de dormir. Fica mesmo transparente e de manhã a pele está mais luminosa. Responderam-me no WhatsApp a explicar como a usar.', 'I use it once a week before bed. It really turns clear and my skin glows in the morning. They answered on WhatsApp to explain how to use it.', '일주일에 한 번 자기 전에 써요. 정말 투명해지고 아침에 피부가 환해요. WhatsApp으로 사용법도 친절히 알려 줬어요.'] }
  ];
  const starRow = n => `<span class="stars" role="img" aria-label="${L(`${n} de 5 estrelas`, `${n} out of 5 stars`, `별 5개 중 ${n}개`)}">${[1, 2, 3, 4, 5].map(i => `<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" ${i <= n ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.2"'}/></svg>`).join('')}</span>`;
  const quotes = () => `<section class="sec rv" aria-labelledby="h-q">
    <div class="wrap">
      <div class="sh"><h2 id="h-q">${L('O que dizem as clientes', 'What customers say', '고객 후기')}</h2><p>${L('Avaliações de quem comprou na loja.', 'Reviews from people who bought from the shop.', '상점에서 구매한 고객의 후기입니다.')}</p></div>
      <div class="rv-row">${REVIEWS.map(r => { const p = byId[r.prod]; return `<article class="rv-card">
        <div class="rv-top">${starRow(r.stars)}<span class="rv-when">${tr(r.when)}</span></div>
        <h3>${tr(r.t)}</h3>
        <p>${tr(r.x)}</p>
        <p class="rv-who"><b>${r.who}</b><span>${tr(r.skin)}, ${r.place}</span></p>
        <a class="rv-prod" href="#/produto/${p.id}"><span class="th" style="background:${tile(p)}"><img src="${p.img}" alt=""></span><span><small>${esc(p.b)}</small>${esc(p.n)}</span></a>
      </article>`; }).join('')}</div>
    </div></section>`;

  const SECTIONS = { hero, brands, lab, ritual, quiz, new: newIn, story, quotes };
  const home = () => C.sections.map(s => SECTIONS[s]()).join('');

  /* ---------- Shop ---------- */
  const shopState = { ing: '', step: 0, masks: false, brand: '', sort: 'rec', q: '' };
  const fromParam = p => {
    Object.assign(shopState, { ing: '', step: 0, masks: false, brand: '' });
    if (p.startsWith('i-')) shopState.ing = p.slice(2);
    else if (p.startsWith('b-')) shopState.brand = decodeURIComponent(p.slice(2));
    else if (p.startsWith('s-')) shopState.step = Number(p.slice(2)) || 0;
    else if (p === 'm') shopState.masks = true;
  };
  const filtered = () => {
    let list = CATALOG.filter(p =>
      (!shopState.ing || p.i.includes(shopState.ing)) &&
      (shopState.masks ? p.cat === 'Máscaras' : !shopState.step || (p.s === shopState.step && p.cat !== 'Máscaras')) &&
      (!shopState.brand || p.b === shopState.brand) &&
      (!shopState.q || (p.n + ' ' + p.b + ' ' + p.catT).toLowerCase().includes(shopState.q.toLowerCase())));
    if (shopState.sort === 'asc') list = list.slice().sort((a, b) => a.p - b.p);
    if (shopState.sort === 'desc') list = list.slice().sort((a, b) => b.p - a.p);
    if (shopState.sort === 'rec') list = list.slice().sort((a, b) => a.s - b.s);
    return list;
  };
  const shopGrid = () => {
    const l = filtered();
    return `<p class="count">${L(`${l.length} ${l.length === 1 ? 'produto' : 'produtos'}`, `${l.length} ${l.length === 1 ? 'product' : 'products'}`, `제품 ${l.length}개`)}</p>` +
      (l.length ? `<div class="grid">${l.map(card).join('')}</div>` : `<p class="none">${L('Nenhum produto com estes filtros.', 'No products match these filters.', '조건에 맞는 제품이 없습니다.')} <button class="chip" type="button" data-reset>${L('Limpar filtros', 'Clear filters', '필터 초기화')}</button></p>`);
  };
  // Search, ingredient and brand live in a side panel; only the step tabs and sort stay on the page
  const activeCount = () => (shopState.ing ? 1 : 0) + (shopState.brand ? 1 : 0) + (shopState.q ? 1 : 0);
  const activeTags = () => [
    shopState.q && [`“${esc(shopState.q)}”`, 'q'],
    shopState.ing && [esc(ingOf(shopState.ing).t), 'ing'],
    shopState.brand && [esc(shopState.brand), 'brand']
  ].filter(Boolean).map(([t, k]) => `<button class="ftag" type="button" data-clear="${k}" aria-label="${L('Remover filtro', 'Remove filter', '필터 제거')}: ${t}">${t}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`).join('');
  const filterSheet = () => {
    const brandsList = [...new Set(CATALOG.map(p => p.b))].sort();
    const n = filtered().length;
    return `<div class="fs-head"><h2 id="fs-title">${L('Filtrar', 'Filter', '필터')}</h2><button class="side-x" type="button" data-close-filters aria-label="${L('Fechar filtros', 'Close filters', '필터 닫기')}">${I.x}</button></div>
      <div class="fs-body">
        <div class="fs-grp"><label class="fs-lbl" for="q">${L('Procurar', 'Search', '검색')}</label><div class="fs-search">${I.search}<input type="search" id="q" value="${esc(shopState.q)}" placeholder="${L('Nome ou marca', 'Name or brand', '제품명 또는 브랜드')}"></div></div>
        ${has('lab') ? `<fieldset class="fs-grp"><legend class="fs-lbl">${L('Ingrediente', 'Ingredient', '성분')}</legend>
          ${INGREDIENTS.map(x => `<label class="fs-opt"><input type="radio" name="fing" value="${x.key}" ${shopState.ing === x.key ? 'checked' : ''}><i class="sw" style="background-image:url(assets/u-ing-${x.key}.webp)"></i><span>${esc(x.t)}</span><small>${withIng(x.key).length}</small></label>`).join('')}</fieldset>` : ''}
        <fieldset class="fs-grp"><legend class="fs-lbl">${L('Marca', 'Brand', '브랜드')}</legend>
          ${brandsList.map(b => `<label class="fs-opt"><input type="radio" name="fbrand" value="${esc(b)}" ${shopState.brand === b ? 'checked' : ''}><span>${esc(b)}</span><small>${CATALOG.filter(p => p.b === b).length}</small></label>`).join('')}</fieldset>
      </div>
      <div class="fs-foot"><button class="lnk" type="button" data-reset>${L('Limpar tudo', 'Clear all', '모두 지우기')}</button><button class="btn" type="button" data-close-filters id="fsApply">${L(`Ver ${n} ${n === 1 ? 'produto' : 'produtos'}`, `Show ${n} ${n === 1 ? 'product' : 'products'}`, `제품 ${n}개 보기`)}</button></div>`;
  };
  const shop = param => {
    if (param && param !== 'procurar') fromParam(param);
    const c = activeCount();
    return `<div class="wrap">
      <div class="ph ph-shop"><p class="crumb"><a href="#/inicio">${L('Início', 'Home', '홈')}</a> / ${L('Loja', 'Shop', '쇼핑')}</p><h1>${L('Loja', 'Shop', '쇼핑')}</h1></div>
      <div class="shop-bar">
        <div class="chips" role="group" aria-label="${L('Passo da rotina', 'Routine step', '루틴 단계')}">
          <button class="chip" type="button" data-fstep="0" aria-pressed="${!shopState.step && !shopState.masks}">${L('Todos', 'All', '전체')}</button>
          ${STEPS.map(s => `<button class="chip" type="button" data-fstep="${s.n}" aria-pressed="${shopState.step === s.n}">${s.t}</button>`).join('')}
          <button class="chip" type="button" data-masks aria-pressed="${shopState.masks}">${L('Máscaras', 'Masks', '마스크')}</button>
        </div>
        <div class="bar-r">
          <button class="flt-btn" type="button" data-open-filters aria-haspopup="dialog"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>${L('Filtrar', 'Filter', '필터')}<span class="cnt" id="fCnt">${c || ''}</span></button>
          <label class="sort"><span class="vh">${L('Ordenar', 'Sort', '정렬')}</span><select id="sortSel"><option value="rec">${L('Ordenar: pela rotina', 'Sort: by routine', '정렬: 루틴 순')}</option><option value="asc" ${shopState.sort === 'asc' ? 'selected' : ''}>${L('Preço mais baixo', 'Lowest price', '낮은 가격순')}</option><option value="desc" ${shopState.sort === 'desc' ? 'selected' : ''}>${L('Preço mais alto', 'Highest price', '높은 가격순')}</option></select></label>
        </div>
      </div>
      <div class="ftags" id="fTags">${activeTags()}</div>
      <div id="shopGrid">${shopGrid()}</div>
      <dialog class="fsheet" id="fSheet" closedby="any" aria-labelledby="fs-title" data-lenis-prevent>${filterSheet()}</dialog>
    </div><div style="height:96px"></div>`;
  };

  /* ---------- Product ---------- */
  const whenTags = p => {
    const night = p.s !== 5, morning = p.s === 5 || !(p.i.includes('retinol') || p.cat === 'Máscaras');
    return `<span class="when">${morning ? `<em>${L('Manhã', 'Morning', '아침')}</em>` : ''}${night ? `<em>${L('Noite', 'Night', '저녁')}</em>` : ''}</span>`;
  };
  const product = id => {
    const p = byId[id] || CATALOG[0], st = STEPS[p.s - 1];
    const ings = p.i.map(ingOf).filter(Boolean);
    const related = CATALOG.filter(x => x.s === p.s && x.id !== p.id).slice(0, 4);
    return `<div class="wrap">
      <p class="crumb" style="padding-top:32px"><a href="#/inicio">${L('Início', 'Home', '홈')}</a> / <a href="#/loja">${L('Loja', 'Shop', '쇼핑')}</a> / ${esc(p.b)}</p>
      <div class="pd">
        <div class="pd-media" style="--tile:${tile(p)}"><img src="${p.img}" alt="${esc(p.n)}"></div>
        <div>
          <span class="brand">${esc(p.b)} · ${esc(p.catT)}</span>
          <h1>${esc(p.n)}</h1>
          <p class="price">${priceHTML(p)}</p>
          <div class="steps5" aria-label="${L(`Passo ${p.s} de 5`, `Step ${p.s} of 5`, `5단계 중 ${p.s}단계`)}">${STEPS.map(s => `<i class="${s.n === p.s ? 'on' : ''}"></i>`).join('')}<span>${L(`Passo ${p.s} de 5: ${st.t.toLowerCase()}`, `Step ${p.s} of 5: ${st.t.toLowerCase()}`, `5단계 중 ${p.s}단계: ${st.t}`)}</span>${whenTags(p)}</div>
          <p class="desc">${esc(p.desc)}</p>
          <div class="buybar">
            <span class="qty"><button type="button" data-pq="-1" aria-label="${L('Menos um', 'One less', '하나 빼기')}">−</button><output id="pq">1</output><button type="button" data-pq="1" aria-label="${L('Mais um', 'One more', '하나 더')}">+</button></span>
            <button class="btn" type="button" data-add="${p.id}" data-qty ${p.sold ? 'disabled' : ''}>${p.sold ? L('Esgotado', 'Sold out', '품절') : L('Adicionar ao carrinho', 'Add to bag', '장바구니에 담기')}</button>
          </div>
          <div class="acc">
            <details open><summary>${L('Como usar', 'How to use', '사용 방법')}</summary><p>${esc(p.use)}</p></details>
            ${ings.length ? `<details ${has('lab') ? 'open' : ''}><summary>${L('Ingredientes em destaque', 'Key ingredients', '주요 성분')}</summary><div class="ings-l">${ings.map(x => `<a href="#/loja/i-${x.key}"><i style="--c:${COL[x.key]}"></i><span><b>${esc(x.t)}</b><small>${esc(x.d)}</small></span></a>`).join('')}</div></details>` : ''}
            <details><summary>${L('Envio e devoluções', 'Shipping and returns', '배송 및 반품')}</summary><p>${L('Envio a partir de Braga. Grátis em encomendas acima de 50 €. Dúvidas? Fale connosco por WhatsApp.', 'Ships from Braga. Free on orders over €50. Questions? Message us on WhatsApp.', '브라가에서 발송합니다. 50유로 이상 주문 시 무료 배송. 궁금한 점은 WhatsApp으로 문의하세요.')}</p></details>
          </div>
        </div>
      </div>
      <div class="sticky-buy" id="stickyBuy" aria-hidden="true"><span class="th" style="background:${tile(p)}"><img src="${p.img}" alt=""></span><span class="nm">${esc(p.n)}<b>${money(p.p)}</b></span>
        <button class="btn" type="button" data-add="${p.id}" tabindex="-1" ${p.sold ? 'disabled' : ''}>${p.sold ? L('Esgotado', 'Sold out', '품절') : L('Adicionar', 'Add', '담기')}</button></div>
      ${related.length ? `<section style="padding-bottom:96px" aria-labelledby="h-rel"><div class="sh"><h2 id="h-rel">${L(`Também no passo ${p.s}`, `Also in step ${p.s}`, `같은 ${p.s}단계 제품`)}</h2></div><div class="grid fit">${related.map(card).join('')}</div></section>` : ''}
    </div>`;
  };

  /* ---------- About ---------- */
  const about = () => `<div class="wrap">
    <div class="ab-hero">
      <div><p class="crumb"><a href="#/inicio">${L('Início', 'Home', '홈')}</a> / ${L('Sobre', 'About', '소개')}</p><h1 style="margin-top:8px">${L('Uma loja pequena, com a Coreia por perto', 'A small shop with Korea close by', '한국을 가까이 둔 작은 상점')}</h1>
      <p>${L('Somos uma loja de Braga dedicada aos cuidados asiáticos com a pele. Selecionamos produtos de elevada qualidade, feitos com ingredientes tradicionais, e ajudamos a montar rotinas eficazes para uma pele saudável e radiante.', 'We are a shop in Braga dedicated to Asian skincare. We select high-quality products made with traditional ingredients and help you build effective routines for healthy, radiant skin.', '우리는 브라가에 있는 아시아 스킨케어 전문 상점입니다. 전통 성분으로 만든 고품질 제품을 고르고, 건강하고 빛나는 피부를 위한 루틴을 함께 만듭니다.')}</p>
      <p>${L('O nome vem de Namsan, a montanha no centro de Seul onde fica a torre N Seoul.', 'The name comes from Namsan, the mountain in the middle of Seoul topped by N Seoul Tower.', '이름은 N서울타워가 있는 서울 중심의 남산에서 왔습니다.')}</p></div>
      <figure class="arch-fig"><div class="arch"><img src="assets/u-namsan.webp" alt="${L('A torre N Seoul no topo da montanha Namsan, em Seul', 'N Seoul Tower on top of Namsan mountain in Seoul', '서울 남산 위의 N서울타워')}"></div><figcaption>${L('Namsan, Seul. É daqui que vem o nome.', 'Namsan, Seoul. This is where the name comes from.', '서울 남산. 이름은 여기서 왔습니다.')}</figcaption></figure>
    </div>
    <div class="ab-ps">
      <article><h3>${L('Escolhidos um a um', 'Chosen one by one', '하나하나 고른 제품')}</h3><p>${L('Trabalhamos com catorze marcas coreanas.', 'We work with fourteen Korean brands.', '열네 개의 한국 브랜드와 함께합니다.')}</p></article>
      <article><h3>${L('Pensados como rotina', 'Built as a routine', '루틴으로 구성')}</h3><p>${L('Cada produto está ligado a um dos cinco passos, para saber sempre onde entra.', 'Every product belongs to one of five steps, so you always know where it goes.', '모든 제품은 다섯 단계 중 하나에 속해 언제 바르는지 알 수 있습니다.')}</p></article>
      <article><h3>${L('Com conversa', 'With real advice', '친절한 상담')}</h3><p>${L('Respondemos por WhatsApp e Instagram, antes e depois da compra.', 'We answer on WhatsApp and Instagram, before and after you buy.', '구매 전후 WhatsApp과 Instagram으로 답해 드립니다.')}</p></article>
    </div>
    <section id="marcas" class="sec" aria-labelledby="h-ab-b"><div class="sh"><h2 id="h-ab-b">${L('As nossas marcas', 'Our brands', '브랜드')}</h2></div>
      <div class="bgrid">${BRANDS.map(b => `<a href="#/loja/b-${encodeURIComponent(b.n)}" aria-label="${esc(b.n)}"><img src="${b.src}" alt="${esc(b.n)}" loading="lazy"></a>`).join('')}</div></section>
    <section id="contactos" style="padding-bottom:96px" aria-labelledby="h-ab-c"><div class="sh"><h2 id="h-ab-c">${L('Fale connosco', 'Talk to us', '문의하기')}</h2><p>${L('Dúvidas sobre uma rotina ou uma encomenda? Escreva-nos.', 'Questions about a routine or an order? Write to us.', '루틴이나 주문에 대해 궁금한 점이 있으면 연락 주세요.')}</p></div>
      <div class="contact"><a href="https://wa.me/351966700740"><small>WhatsApp</small><span>+351 966 700 740</span></a><a href="mailto:info@namsanglow.org"><small>Email</small><span>info@namsanglow.org</span></a><a href="https://instagram.com/namsanglow_skincare"><small>Instagram</small><span>@namsanglow_skincare</span></a></div></section>
  </div>`;

  /* ---------- Checkout ---------- */
  // One page, as in mock A: contact, delivery and payment together, the order in a soft card on the right
  const SHIP = { std: 3.9, exp: 6.9 };
  const ck = { d: {}, ship: 'std', pay: 'mbway', promo: false, order: null };
  const ckTotals = () => {
    const sub = cart.total(), disc = ck.promo ? Math.round(sub * 10) / 100 : 0;
    const ship = ck.ship === 'std' ? (sub >= NG.FREE_SHIP ? 0 : SHIP.std) : SHIP.exp;
    return { sub, disc, ship, total: sub - disc + ship };
  };
  const PAY_MARKS = {
    mbway: '<svg width="58" height="22" viewBox="0 0 58 22" aria-hidden="true"><rect x=".5" y=".5" width="57" height="21" rx="4" fill="#fff" stroke="#DDD5CC"/><text x="29" y="15" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="700" fill="#D60510">MB WAY</text></svg>',
    mb: '<svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true"><rect width="34" height="22" rx="4" fill="#2B5DA8"/><text x="17" y="15" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="700" fill="#fff">MB</text></svg>',
    card: '<svg width="40" height="22" viewBox="0 0 40 22" aria-hidden="true"><rect x=".5" y=".5" width="39" height="21" rx="4" fill="#fff" stroke="#DDD5CC"/><text x="20" y="15" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-style="italic" font-weight="800" fill="#1A1F71">VISA</text></svg><svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true"><rect x=".5" y=".5" width="33" height="21" rx="4" fill="#fff" stroke="#DDD5CC"/><circle cx="14" cy="11" r="6" fill="#EB001B"/><circle cx="20" cy="11" r="6" fill="#F79E1B" fill-opacity=".9"/></svg>'
  };
  const fld = (id, label, attrs, err, extra = {}) => {
    const req = /\brequired\b/.test(attrs);
    return `<div class="fld${extra.cls ? ' ' + extra.cls : ''}"><label for="f-${id}">${label}${req ? '<i aria-hidden="true"> *</i>' : ''}${extra.hint ? ` <small>${extra.hint}</small>` : ''}</label>
      <input id="f-${id}" name="${id}" value="${esc(ck.d[id] || '')}" ${extra.ph ? `placeholder="${extra.ph}"` : ''} ${attrs} aria-describedby="e-${id}"><span class="err" id="e-${id}">${err}</span></div>`;
  };
  const ckSteps = () => `<ol class="ck-steps">
      <li class="done"><span aria-hidden="true">✓</span>${L('Carrinho', 'Bag', '장바구니')}</li>
      <li class="cur" aria-current="step"><span aria-hidden="true">2</span>${L('Dados e pagamento', 'Details and payment', '정보 및 결제')}</li>
      <li><span aria-hidden="true">3</span>${L('Confirmação', 'Confirmation', '주문 완료')}</li></ol>`;
  const ckForm = () => {
    const t = ckTotals();
    const opt = (name, value, title, sub, right) => `<label class="opt"><input type="radio" name="${name}" value="${value}" ${ck[name === 'ship' ? 'ship' : 'pay'] === value ? 'checked' : ''}><span class="ot"><b>${title}</b><small>${sub}</small></span>${right}</label>`;
    const more = inner => `<div class="opt-more"><div><div class="opt-more-in">${inner}</div></div></div>`;
    return `<form id="ckForm" novalidate>
      <section class="ck-sec" aria-labelledby="ck-h1"><h2 id="ck-h1"><span>01</span>${L('Contacto', 'Contact', '연락처')}</h2>
        <div class="row2">${fld('email', 'Email', 'type="email" autocomplete="email" required', L('Indique um email válido.', 'Enter a valid email.', '올바른 이메일을 입력하세요.'), { ph: L('nome@exemplo.pt', 'name@example.com', 'name@example.com') })}
          ${fld('tel', L('Telemóvel', 'Mobile', '휴대전화'), 'type="tel" autocomplete="tel" required pattern="[+0-9 ]{9,}"', L('Indique um número com 9 dígitos.', 'Enter a 9-digit number.', '9자리 번호를 입력하세요.'), { ph: '912 345 678' })}</div>
        <label class="chk"><input type="checkbox" name="news"><span>${L('Quero receber novidades e ofertas por email', 'Email me news and offers', '소식과 혜택을 이메일로 받겠습니다')}</span></label>
      </section>
      <section class="ck-sec" aria-labelledby="ck-h2"><h2 id="ck-h2"><span>02</span>${L('Entrega', 'Delivery', '배송')}</h2>
        <div class="opt-grid" role="radiogroup" aria-label="${L('Método de envio', 'Shipping method', '배송 방법')}">
          ${opt('ship', 'std', L('CTT standard', 'CTT standard', 'CTT 일반 배송'), L('2 a 3 dias úteis', '2 to 3 business days', '영업일 2~3일'), `<span class="pr" id="stdPrice">${t.sub >= NG.FREE_SHIP ? L('Grátis', 'Free', '무료') : money(SHIP.std)}</span>`)}
          ${opt('ship', 'exp', L('CTT expresso', 'CTT express', 'CTT 특급 배송'), L('No dia útil seguinte', 'Next business day', '다음 영업일'), `<span class="pr">${money(SHIP.exp)}</span>`)}
        </div>
        <div class="row2">${fld('nome', L('Nome', 'First name', '이름'), 'autocomplete="given-name" required', L('Indique o nome.', 'Enter your first name.', '이름을 입력하세요.'))}${fld('apelido', L('Apelido', 'Last name', '성'), 'autocomplete="family-name" required', L('Indique o apelido.', 'Enter your last name.', '성을 입력하세요.'))}</div>
        ${fld('morada', L('Morada', 'Address', '주소'), 'autocomplete="street-address" required', L('Indique a morada.', 'Enter your address.', '주소를 입력하세요.'), { ph: L('Rua, número, andar', 'Street, number, floor', '도로명, 번지, 층') })}
        <div class="row3">${fld('cp', L('Código postal', 'Postcode', '우편번호'), 'autocomplete="postal-code" required pattern="[0-9]{4}-[0-9]{3}" inputmode="numeric"', L('Use o formato 0000-000.', 'Use the format 0000-000.', '0000-000 형식으로 입력하세요.'), { ph: '4700-000' })}
          ${fld('cidade', L('Localidade', 'Town', '도시'), 'autocomplete="address-level2" required', L('Indique a localidade.', 'Enter your town.', '도시를 입력하세요.'))}
          <div class="fld"><label for="f-pais">${L('País', 'Country', '국가')}</label><select id="f-pais" name="pais" autocomplete="country-name"><option>Portugal</option></select></div></div>
        ${fld('nif', 'NIF', 'inputmode="numeric" pattern="[0-9]{9}"', L('O NIF tem 9 dígitos.', 'The tax number has 9 digits.', '납세자 번호는 9자리입니다.'), { hint: L('opcional, para a fatura', 'optional, for the invoice', '선택, 영수증용'), cls: 'half' })}
      </section>
      <section class="ck-sec" aria-labelledby="ck-h3"><h2 id="ck-h3"><span>03</span>${L('Pagamento', 'Payment', '결제')}</h2>
        <p class="ck-sub">${I.lock}${L('Todas as transações são seguras e encriptadas.', 'All transactions are secure and encrypted.', '모든 거래는 안전하게 암호화됩니다.')}</p>
        <div class="opt-list" role="radiogroup" aria-label="${L('Método de pagamento', 'Payment method', '결제 방법')}">
          ${opt('pay', 'mbway', 'MB WAY', L('Pague com o telemóvel', 'Pay with your phone', '휴대전화로 결제'), `<span class="marks">${PAY_MARKS.mbway}</span>`)}
          ${more(`<p>${L('Vai receber um pedido de pagamento na app MB WAY.', 'You will get a payment request in the MB WAY app.', 'MB WAY 앱으로 결제 요청이 전송됩니다.')}</p>${fld('mbway', L('Número MB WAY', 'MB WAY number', 'MB WAY 번호'), 'type="tel" pattern="[+0-9 ]{9,}"', L('Indique o número associado ao MB WAY.', 'Enter the number linked to MB WAY.', 'MB WAY에 연결된 번호를 입력하세요.'), { ph: '912 345 678' })}`)}
          ${opt('pay', 'mb', L('Referência Multibanco', 'Multibanco reference', 'Multibanco 결제 번호'), L('Pague no multibanco ou no homebanking', 'Pay at an ATM or in online banking', 'ATM 또는 온라인 뱅킹으로 결제'), `<span class="marks">${PAY_MARKS.mb}</span>`)}
          ${more(`<p>${L('Enviamos a referência por email logo a seguir. É válida durante 48 horas.', 'We email you the reference right away. It is valid for 48 hours.', '결제 번호를 바로 이메일로 보내 드립니다. 48시간 동안 유효합니다.')}</p>`)}
          ${opt('pay', 'card', L('Cartão de crédito ou débito', 'Credit or debit card', '신용카드 또는 체크카드'), 'Visa, Mastercard', `<span class="marks">${PAY_MARKS.card}</span>`)}
          ${more(`<p>${L('Depois de clicar em pagar, abre a página segura do banco para concluir.', 'After you click pay, the bank’s secure page opens to finish.', '결제를 누르면 은행의 보안 페이지가 열립니다.')}</p>`)}
        </div>
      </section>
      <div class="ck-final">
        <label class="chk terms"><input type="checkbox" name="terms" required aria-describedby="e-terms"><span>${L('Li e aceito os <a href="#/sobre">termos e condições</a> e a <a href="#/sobre">política de privacidade</a>.', 'I have read and accept the <a href="#/sobre">terms and conditions</a> and the <a href="#/sobre">privacy policy</a>.', '<a href="#/sobre">이용 약관</a> 및 <a href="#/sobre">개인정보 처리방침</a>을 읽고 동의합니다.')}</span></label>
        <span class="err" id="e-terms">${L('Aceite os termos para continuar.', 'Accept the terms to continue.', '계속하려면 약관에 동의하세요.')}</span>
        <button class="btn btn-wide" type="submit" id="payBtn">${L(`Pagar ${money(t.total)}`, `Pay ${money(t.total)}`, `${money(t.total)} 결제하기`)}</button>
        <p class="ck-foot">${L('Protótipo: nenhum pagamento é feito e os dados não saem do browser.', 'Prototype: no payment is taken and your details stay in the browser.', '프로토타입입니다. 실제 결제는 이루어지지 않습니다.')}</p>
      </div>
    </form>`;
  };
  const summary = () => {
    const t = ckTotals(), left = Math.max(0, NG.FREE_SHIP - t.sub);
    return `<ul class="sum-items">${cart.items().map(it => { const p = byId[it.id]; return `<li><span class="th"><img src="${p.img}" alt=""><em>${it.q}</em></span><span class="nm"><small>${esc(p.b)}</small>${esc(p.n)}</span><b>${money(p.p * it.q)}</b></li>`; }).join('')}</ul>
      <form class="promo" id="promoForm"><label class="vh" for="promo">${L('Código de desconto', 'Discount code', '할인 코드')}</label><input id="promo" placeholder="${L('Código de desconto', 'Discount code', '할인 코드')}" value="${ck.promo ? 'WELCOME10' : ''}" autocomplete="off"><button type="submit">${L('Aplicar', 'Apply', '적용')}</button></form>
      <p class="promo-msg ${ck.promo ? 'ok' : ''}" id="promoMsg" role="status">${ck.promo ? L('WELCOME10 aplicado: 10% de desconto.', 'WELCOME10 applied: 10% off.', 'WELCOME10 적용: 10% 할인.') : ''}</p>
      <dl class="tot">
        <div><dt>${L('Subtotal', 'Subtotal', '소계')}</dt><dd>${money(t.sub)}</dd></div>
        ${t.disc ? `<div class="disc"><dt>${L('Desconto WELCOME10', 'WELCOME10 discount', 'WELCOME10 할인')}</dt><dd>−${money(t.disc)}</dd></div>` : ''}
        <div><dt>${L('Envio', 'Shipping', '배송비')}</dt><dd>${t.ship ? money(t.ship) : L('Grátis', 'Free', '무료')}</dd></div>
        <div class="big"><dt>${L('Total', 'Total', '합계')}</dt><dd>${money(t.total)}</dd></div>
      </dl>
      ${left > 0 ? `<p class="ship-note">${L(`Faltam ${money(left)} para o envio grátis.`, `${money(left)} away from free shipping.`, `무료 배송까지 ${money(left)} 남았습니다.`)}<span class="ship-bar"><span style="--p:${Math.min(1, t.sub / NG.FREE_SHIP)}"></span></span></p>` : ''}`;
  };
  const sumBox = () => {
    const t = ckTotals();
    return `<details class="sum" id="ckSumBox"><summary><span>${L('Resumo da encomenda', 'Order summary', '주문 요약')}</span><b id="ckSumTot">${money(t.total)}</b></summary>
      <h2 class="sum-h">${L('Resumo da encomenda', 'Order summary', '주문 요약')}</h2><div id="ckSum">${summary()}</div></details>
      <ul class="trust"><li>${I.lock}${L('Pagamento seguro', 'Secure payment', '안전한 결제')}</li><li>${I.truck}${L('Enviado de Braga em 1 dia útil', 'Ships from Braga within 1 business day', '영업일 1일 내 브라가에서 발송')}</li><li>${I.chat}<a href="https://wa.me/351966700740">${L('Dúvidas? Fale connosco no WhatsApp', 'Questions? Message us on WhatsApp', '문의는 WhatsApp으로')}</a></li></ul>`;
  };
  const checkout = () => {
    if (ck.order && cart.count()) ck.order = null;
    if (ck.order) {
      const o = ck.order;
      const steps = [
        [L('Encomenda recebida', 'Order received', '주문 접수'), L('Agora mesmo', 'Just now', '방금')],
        [L('Preparada em Braga', 'Packed in Braga', '브라가에서 포장'), L('No próximo dia útil', 'Next business day', '다음 영업일')],
        [L('Enviada pelos CTT', 'Shipped with CTT', 'CTT 발송'), o.ship === 'std' ? L('Chega em 2 a 3 dias úteis', 'Arrives in 2 to 3 business days', '영업일 2~3일 후 도착') : L('Chega no dia útil seguinte', 'Arrives the next business day', '다음 영업일 도착')]
      ];
      return `<div class="wrap ck-done"><div class="done-in">
          <svg class="done-mark" width="56" height="74" viewBox="0 0 24 32" aria-hidden="true"><path d="M12 1s10 12 10 19a10 10 0 0 1-20 0C2 13 12 1 12 1z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width=".8"/><path class="tick" d="M7.5 19.5l3 3 6-6" fill="none" stroke="#2A1D15" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>
          <p class="done-ord">${L('Encomenda', 'Order', '주문')} ${o.id}</p>
          <h1>${L(`Obrigada, ${esc(o.nome)}`, `Thank you, ${esc(o.nome)}`, `${esc(o.nome)}님, 감사합니다`)}</h1>
          <p class="done-lead">${o.pay === 'mbway' ? L('Confirme o pagamento na app MB WAY para concluir.', 'Confirm the payment in the MB WAY app to finish.', 'MB WAY 앱에서 결제를 승인하면 완료됩니다.') : o.pay === 'mb' ? L('A referência Multibanco já está no seu email.', 'The Multibanco reference is in your inbox.', 'Multibanco 결제 번호를 이메일로 보냈습니다.') : L('O pagamento foi recebido.', 'Your payment was received.', '결제가 완료되었습니다.')} ${L('Enviámos a confirmação para', 'We sent the confirmation to', '확인 메일을 보냈습니다:')} <b>${esc(o.email)}</b>.</p>
          <ol class="timeline">${steps.map((s, i) => `<li class="${i === 0 ? 'done' : ''}"><b>${s[0]}</b><span>${s[1]}</span></li>`).join('')}</ol>
          <div class="done-box2">
            <ul class="sum-items">${o.items.map(it => { const p = byId[it.id]; return `<li><span class="th"><img src="${p.img}" alt=""><em>${it.q}</em></span><span class="nm"><small>${esc(p.b)}</small>${esc(p.n)}</span><b>${money(p.p * it.q)}</b></li>`; }).join('')}</ul>
            <dl class="tot"><div><dt>${L('Enviar para', 'Ship to', '배송지')}</dt><dd>${esc(o.addr)}</dd></div><div class="big"><dt>${L('Total', 'Total', '합계')}</dt><dd>${money(o.total)}</dd></div></dl>
          </div>
          <div class="done-cta"><a class="btn" href="#/loja">${L('Continuar a comprar', 'Keep shopping', '쇼핑 계속하기')}</a><a class="lnk" href="https://wa.me/351966700740">${L('Dúvidas? Fale connosco', 'Questions? Talk to us', '문의하기')}</a></div>
        </div></div>`;
    }
    if (!cart.count()) {
      return `<div class="wrap ck-done"><div class="done-in done-empty"><span class="empty-ic" aria-hidden="true">${I.bag}</span><h1>${L('O carrinho está vazio', 'Your bag is empty', '장바구니가 비어 있습니다')}</h1><p class="done-lead">${L('Adicione produtos para finalizar a compra.', 'Add products to check out.', '결제하려면 제품을 담아 주세요.')}</p><div class="done-cta"><a class="btn" href="#/loja">${L('Ver a loja', 'Browse the shop', '쇼핑하기')}</a></div></div></div>`;
    }
    return `<div class="wrap ck">
      <a class="ck-back" href="#/loja">${I.prev}${L('Continuar a comprar', 'Continue shopping', '쇼핑 계속하기')}</a>
      <div class="ck-head"><h1>${L('Finalizar compra', 'Checkout', '결제')}</h1>${ckSteps()}</div>
      <div class="ck-grid"><div class="ck-main">${ckForm()}</div><aside class="ck-side" aria-label="${L('Resumo da encomenda', 'Order summary', '주문 요약')}">${sumBox()}</aside></div>
    </div>`;
  };
  const refreshSum = () => {
    const t = ckTotals();
    $('#ckSum').innerHTML = summary();
    $('#ckSumTot').textContent = money(t.total);
    const pay = $('#payBtn'); if (pay) pay.textContent = L(`Pagar ${money(t.total)}`, `Pay ${money(t.total)}`, `${money(t.total)} 결제하기`);
  };
  const openSum = () => { const b = $('#ckSumBox'); if (b && matchMedia('(min-width: 901px)').matches) b.open = true; };

  /* ---------- Ritual scroll ---------- */
  let ritualOff = null;
  const initRitual = () => {
    if (ritualOff) { ritualOff(); ritualOff = null; }
    const sec = $('#ritual'); if (!sec) return;
    const list = $('#rtList'), show = $('#rtShow');
    let cur = -1;
    const setStep = i => {
      if (i === cur) return; cur = i;
      list.querySelectorAll('li').forEach((li, k) => { li.classList.toggle('on', k === i); li.classList.toggle('done', k < i); });
      show.querySelectorAll('.rt-card').forEach((c, k) => c.classList.toggle('on', k === i));
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = sec.getBoundingClientRect(), span = sec.offsetHeight - innerHeight;
        if (span <= 0) return;
        const p = Math.min(1, Math.max(0, -r.top / span));
        list.style.setProperty('--p', p.toFixed(3));
        setStep(Math.min(4, Math.floor(p * 5 * 0.999)));
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    setStep(0); onScroll();
    list.onclick = e => {
      const b = e.target.closest('[data-step]'); if (!b) return;
      const span = sec.offsetHeight - innerHeight;
      scrollToY(sec.getBoundingClientRect().top + scrollY + span * (Number(b.dataset.step) + .5) / 5);
    };
    ritualOff = () => removeEventListener('scroll', onScroll);
    initRitual.redraw = () => {
      const m = mode(), on = $('#rtShow .rt-card.on'), idx = on ? Number(on.dataset.i) : 0;
      show.innerHTML = ritualCards(m);
      show.querySelectorAll('.rt-card').forEach((c, k) => c.classList.toggle('on', k === idx));
      $('#rtMob').innerHTML = ritualMob(m);
      $('#rtTot').textContent = routineTotal(m);
      list.querySelectorAll('.t').forEach((t, i) => { t.textContent = stepName(i, m); });
      list.querySelectorAll('.d').forEach((t, i) => { t.textContent = stepDesc(i, m); });
      document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
    };
  };

  /* ---------- Ingredient index: tabs with arrow keys ---------- */
  const selectIng = btn => {
    ing = btn.dataset.ing;
    document.querySelectorAll('.ix-list [data-ing]').forEach(b => { const on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $('#panel').setAttribute('aria-labelledby', btn.id);
    vt(() => { $('#panel').innerHTML = panel(ing); });
    if (matchMedia('(max-width: 960px)').matches) $('#panel').scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'nearest' });
  };
  document.addEventListener('keydown', e => {
    const b = e.target.closest('.ix-list [data-ing]');
    if (!b || !['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const all = [...document.querySelectorAll('.ix-list [data-ing]')], i = all.indexOf(b);
    const next = e.key === 'Home' ? all[0] : e.key === 'End' ? all[all.length - 1] : all[(i + (['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : -1) + all.length) % all.length];
    next.focus(); selectIng(next);
  });

  /* ---------- Scrolling helper (goes through Lenis when it is running) ---------- */
  let lenis = null;
  const scrollToY = (y, instant) => {
    if (lenis) lenis.scrollTo(y, { immediate: !!instant || reduce(), duration: 1.1 });
    else scrollTo({ top: y, behavior: instant || reduce() ? 'auto' : 'smooth' });
  };

  /* ---------- Hero shine follows the pointer ---------- */
  const heroShine = () => {
    const svg = $('#dropSvg'), shine = $('#shine');
    if (!svg || reduce() || !matchMedia('(pointer: fine)').matches) return;
    $('.hero').addEventListener('pointermove', e => {
      const r = svg.getBoundingClientRect();
      shine.setAttribute('cx', Math.max(60, Math.min(340, (e.clientX - r.left) / r.width * 400)).toFixed(0));
      shine.setAttribute('cy', Math.max(120, Math.min(520, (e.clientY - r.top) / r.height * 620)).toFixed(0));
    });
  };

  /* ---------- Day / night switch ---------- */
  const setTime = (m, btn) => {
    if (!C.dayNight || m === time()) return;
    const apply = () => {
      root.dataset.time = m;
      try { sessionStorage.setItem(TKEY, m); } catch (e) {}
      document.querySelectorAll('button[data-time]').forEach(b => b.setAttribute('aria-pressed', b.dataset.time === m));
      if (initRitual.redraw && $('#ritual')) initRitual.redraw();
      $('#mnav').innerHTML = sideMenu();
    };
    if (!document.startViewTransition || reduce()) { apply(); return; }
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('vt-time');
    const t = document.startViewTransition(apply);
    t.ready.then(() => root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 900, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }));
    t.finished.finally(() => root.classList.remove('vt-time'));
  };

  /* ---------- Events ---------- */
  let pq = 1;
  const refreshShop = full => {
    document.querySelectorAll('[data-fstep]').forEach(b => b.setAttribute('aria-pressed', !shopState.masks && Number(b.dataset.fstep) === shopState.step));
    const mk = $('[data-masks]'); if (mk) mk.setAttribute('aria-pressed', shopState.masks);
    if (full) {
      const qi = $('#q'); if (qi) qi.value = '';
      document.querySelectorAll('#fSheet input[type=radio]').forEach(r => { r.checked = false; });
    }
    const tags = $('#fTags'); if (tags) tags.innerHTML = activeTags();
    const cnt = $('#fCnt'); if (cnt) cnt.textContent = activeCount() || '';
    const n = filtered().length, apply = $('#fsApply');
    if (apply) apply.textContent = L(`Ver ${n} ${n === 1 ? 'produto' : 'produtos'}`, `Show ${n} ${n === 1 ? 'product' : 'products'}`, `제품 ${n}개 보기`);
    const g = $('#shopGrid'); if (!g) return;
    if ($('#fSheet')?.open) g.innerHTML = shopGrid(); else vt(() => { g.innerHTML = shopGrid(); });
  };
  document.addEventListener('click', e => {
    const t = e.target;
    const tb = t.closest('button[data-time]'); if (tb) { setTime(tb.dataset.time, tb); return; }
    const lb = t.closest('[data-lang]');
    if (lb) {
      NG.setLang(lb.dataset.lang);
      const menu = $('#langMenu'); if (menu.matches(':popover-open')) menu.hidePopover();
      if ($('#mnav').open) $('#mnav').close();
      vt(() => { chrome(); app.render(); });
      return;
    }
    if (t.closest('[data-open-menu]')) {
      $('#mnav').querySelectorAll('.side-sub').forEach(p => { p.classList.remove('in'); p.inert = true; });
      $('#sideMain')?.classList.remove('out');
      $('#mnav').showModal();
      return;
    }
    const sub = t.closest('[data-sub]');
    if (sub) {
      const p = $('#' + sub.dataset.sub);
      $('#sideMain').classList.add('out'); $('#sideMain').inert = true;
      p.inert = false; p.classList.add('in');
      // preventScroll: focusing inside the off-screen panel must not scroll the clipped menu sideways
      p.querySelector('.side-back').focus({ preventScroll: true });
      $('#mnav .side-in').scrollLeft = 0;
      sub.dataset.last = '1';
      return;
    }
    if (t.closest('[data-sub-back]')) {
      const p = t.closest('.side-sub');
      p.classList.remove('in'); p.inert = true;
      $('#sideMain').inert = false; $('#sideMain').classList.remove('out');
      const from = $('#sideMain [data-last]'); if (from) { from.focus({ preventScroll: true }); delete from.dataset.last; }
      return;
    }
    const flip = t.closest('[data-time-flip]');
    if (flip) { $('#mnav').close(); setTime(time() === 'noite' ? 'manha' : 'noite', $('[data-open-menu]')); return; }
    if (t.closest('[data-close-menu]') || (t.closest('#mnav a'))) { $('#mnav').close(); if (!t.closest('a')) return; }
    // The product tile morphs into the product page photo
    const toProduct = t.closest('a[href^="#/produto/"]');
    if (toProduct) {
      document.querySelectorAll('.pd-media').forEach(m => { m.style.viewTransitionName = 'none'; });
      document.querySelectorAll('.card .tile').forEach(x => { x.style.viewTransitionName = ''; });
      const tileEl = toProduct.closest('.card')?.querySelector('.tile');
      if (tileEl) tileEl.style.viewTransitionName = 'ptile';
    }
    const add = t.closest('[data-add]');
    if (add) {
      const p = byId[add.dataset.add];
      cart.add(p.id, add.hasAttribute('data-qty') ? pq : 1);
      const badgeEl = $('#badge');
      if (badgeEl) { badgeEl.classList.remove('bump'); void badgeEl.offsetWidth; badgeEl.classList.add('bump'); }
      if (!add.classList.contains('added')) {
        const was = add.innerHTML;
        add.classList.add('added');
        add.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>${L('Adicionado', 'Added', '담김')}`;
        setTimeout(() => { add.classList.remove('added'); add.innerHTML = was; }, 1600);
      }
      NG.toast(L(`${p.n.split(' ').slice(0, 4).join(' ')} no carrinho`, `${p.n.split(' ').slice(0, 4).join(' ')} added`, `${p.n.split(' ').slice(0, 4).join(' ')} 담김`), { label: L('Ver carrinho', 'View bag', '장바구니 보기'), run: drawer.open });
      return;
    }
    const set = t.closest('[data-addset]'); if (set) { set.dataset.addset.split(',').forEach(id => cart.add(id)); drawer.open(); return; }
    if (t.closest('#rtAdd')) { ROUTINES[mode()].forEach(id => cart.add(id)); drawer.open(); return; }
    const m = t.closest('[data-mode]');
    if (m) { if (C.dayNight) setTime(m.dataset.mode, m); else { routineMode.v = m.dataset.mode; initRitual.redraw(); } return; }
    const row = t.closest('[data-row]'); if (row) { const r = $('#newRow'); r.scrollBy({ left: Number(row.dataset.row) * r.clientWidth * .8, behavior: 'smooth' }); return; }
    const d = t.closest('[data-ing]');
    if (d) {
      selectIng(d);
      return;
    }
    const q = t.closest('[data-qz]'); if (q) { qz[q.dataset.qz] = q.dataset.v; qz.step++; drawQuiz(true); return; }
    if (t.closest('[data-qz-back]')) { qz.step--; drawQuiz(true); return; }
    if (t.closest('[data-qz-restart]')) { qz.step = 0; qz.skin = qz.concern = ''; drawQuiz(true); return; }
    const pqb = t.closest('[data-pq]'); if (pqb) { pq = Math.max(1, pq + Number(pqb.dataset.pq)); $('#pq').textContent = pq; return; }
    const fs = t.closest('[data-fstep]'); if (fs) { shopState.step = Number(fs.dataset.fstep); shopState.masks = false; refreshShop(); return; }
    if (t.closest('[data-open-filters]')) { $('#fSheet').showModal(); return; }
    if (t.closest('[data-close-filters]')) { $('#fSheet').close(); return; }
    const clr = t.closest('[data-clear]');
    if (clr) {
      const k = clr.dataset.clear; shopState[k] = '';
      if (k === 'q') { const qi = $('#q'); if (qi) qi.value = ''; }
      else document.querySelectorAll(`#fSheet input[name=${k === 'ing' ? 'fing' : 'fbrand'}]`).forEach(r => { r.checked = false; });
      refreshShop(); return;
    }
    if (t.closest('[data-masks]')) { shopState.masks = !shopState.masks; shopState.step = 0; refreshShop(); return; }
    if (t.closest('[data-reset]')) { Object.assign(shopState, { ing: '', step: 0, masks: false, brand: '', q: '' }); refreshShop(true); return; }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'q') { shopState.q = e.target.value; refreshShop(); }
    if (e.target.closest('#ckForm') && e.target.name && e.target.type !== 'radio') ck.d[e.target.name] = e.target.value;
  });
  document.addEventListener('change', e => {
    if (e.target.name === 'fing') { shopState.ing = e.target.value; refreshShop(); }
    if (e.target.name === 'fbrand') { shopState.brand = e.target.value; refreshShop(); }
    if (e.target.id === 'sortSel') { shopState.sort = e.target.value; refreshShop(); }
    if (e.target.name === 'ship') { ck.ship = e.target.value; refreshSum(); }
    if (e.target.name === 'pay') {
      ck.pay = e.target.value;
      // MB WAY usually uses the same phone: offer it pre-filled
      const mb = $('#f-mbway'); if (mb && !mb.value && ck.d.tel) { mb.value = ck.d.tel; ck.d.mbway = ck.d.tel; }
    }
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'promoForm') {
      e.preventDefault();
      const v = $('#promo').value.trim().toUpperCase();
      ck.promo = v === 'WELCOME10';
      refreshSum();
      if (!ck.promo && v) { $('#promo').value = v; $('#promoMsg').textContent = L('Este código não é válido.', 'This code is not valid.', '유효하지 않은 코드입니다.'); }
      return;
    }
    if (e.target.id === 'ckForm') {
      e.preventDefault();
      const form = e.target, mb = $('#f-mbway');
      if (mb) { mb.required = ck.pay === 'mbway'; if (mb.required && !mb.value && ck.d.tel) { mb.value = ck.d.tel; ck.d.mbway = ck.d.tel; } }
      const bad = [...form.querySelectorAll('input')].filter(i => !i.checkValidity());
      if (bad.length) {
        form.classList.add('tried');
        bad[0].focus({ preventScroll: true });
        scrollToY(bad[0].getBoundingClientRect().top + scrollY - innerHeight / 3);
        return;
      }
      const t = ckTotals();
      ck.order = { id: 'NG-' + String(Date.now()).slice(-6), nome: ck.d.nome || '', email: ck.d.email || '', pay: ck.pay, ship: ck.ship, total: t.total,
        items: cart.items().map(it => ({ ...it })), addr: `${ck.d.morada || ''}, ${ck.d.cp || ''} ${ck.d.cidade || ''}` };
      cart.clear();
      vt(() => { $('#app').innerHTML = checkout(); scrollToY(0, true); });
      requestAnimationFrame(() => { const h = $('#app h1'); if (h) { h.tabIndex = -1; h.focus(); } });
    }
  });

  /* Language menu sits under its button */
  const placeMenu = () => {
    const menu = $('#langMenu'), btn = $('.lang-btn'); if (!btn) return;
    const r = btn.getBoundingClientRect();
    menu.style.top = (r.bottom + 8) + 'px';
    menu.style.left = Math.max(8, Math.min(innerWidth - 196, r.right - 188)) + 'px';
  };

  /* Header state */
  const hdr = $('#hdr');
  // The header slips away while scrolling down and returns on the way up (not over the sticky routine)
  let lastY = 0;
  const onScrollHdr = () => {
    const y = scrollY;
    hdr.classList.toggle('scrolled', y > 8);
    const h = $('.hero'), rt = $('#ritual')?.getBoundingClientRect();
    document.body.classList.toggle('on-hero', $('#app').dataset.page === 'inicio' && !!h && h.getBoundingClientRect().bottom > 76);
    const inRitual = rt && rt.top < innerHeight && rt.bottom > 0;
    if (y < 200 || y < lastY - 6 || inRitual || document.querySelector('dialog[open]')) document.body.classList.remove('hdr-hide');
    else if (y > lastY + 6) document.body.classList.add('hdr-hide');
    lastY = y;
  };
  addEventListener('scroll', onScrollHdr, { passive: true });

  /* ---------- Boot ---------- */
  let lastProduct = null, buyObs = null;
  const drawer = NG.drawer({ onCheckout: () => { ck.order = null; location.hash = '#/checkout'; } });

  // Smooth, inertial scrolling (Lenis); panels that scroll on their own keep native scrolling
  if (window.Lenis && !reduce()) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    [$('#mnav'), $('#langMenu'), drawer.el].forEach(el => el && el.setAttribute('data-lenis-prevent', ''));
  }
  // Photos fade in once they have loaded instead of popping in
  document.addEventListener('load', e => { if (e.target.tagName === 'IMG') e.target.classList.add('ld'); }, true);
  const markLoaded = () => document.querySelectorAll('img[loading="lazy"]').forEach(i => { if (i.complete) i.classList.add('ld'); });
  cart.on(() => { const b = $('#badge'); if (b) b.textContent = cart.count() || ''; });
  chrome();
  $('#langMenu').addEventListener('toggle', e => { if (e.newState === 'open') placeMenu(); });
  const app = NG.router($('#app'), { inicio: home, loja: shop, produto: product, sobre: about, checkout }, (r, first) => {
    pq = 1;
    document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === '#/' + r.name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (r.name === 'inicio') {
      drawQuiz(false); initRitual(); heroShine();
      if (first || !r.param) { document.body.classList.remove('play'); void document.body.offsetWidth; document.body.classList.add('play'); }
    } else if (ritualOff) { ritualOff(); ritualOff = null; }
    if (r.name === 'loja' && r.param === 'procurar') { const qi = $('#q'); if (qi) qi.focus(); }
    // Coming back from a product: its card tile morphs back from the big photo
    if (lastProduct && r.name !== 'produto') {
      const back = $(`.card .tile[href="#/produto/${lastProduct}"]`);
      if (back) back.style.viewTransitionName = 'ptile';
    }
    lastProduct = r.name === 'produto' ? r.param : null;
    markLoaded();
    if (lenis && !first && !r.param) lenis.scrollTo(0, { immediate: true });
    if (r.name === 'checkout') openSum();
    // Sticky buy bar: shown once the main buy button has scrolled above the viewport
    if (buyObs) { removeEventListener('scroll', buyObs); buyObs = null; }
    const bar = $('#stickyBuy'), buy = $('.buybar');
    if (bar && buy) {
      let shown = false;
      buyObs = () => {
        const show = buy.getBoundingClientRect().bottom < 0;
        if (show === shown) return;
        shown = show;
        bar.classList.toggle('on', show);
        bar.setAttribute('aria-hidden', String(!show));
        bar.querySelector('button').tabIndex = show ? 0 : -1;
      };
      addEventListener('scroll', buyObs, { passive: true });
      buyObs();
    }
    onScrollHdr();
  });
})();
