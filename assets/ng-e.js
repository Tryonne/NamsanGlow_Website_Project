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
        <ul class="side-list">${INGREDIENTS.map(x => row('#/loja/i-' + x.key, esc(x.t), `<i class="sw" style="--c:${COL[x.key]}"></i>`)).join('')}</ul>
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
        <span class="step">${stepLabel(p)}</span>
        <img src="${p.img}" alt="" loading="lazy" decoding="async">
        ${p.sold ? `<span class="tag">${L('Esgotado', 'Sold out', '품절')}</span>` : p.o ? '<span class="tag">−15%</span>' : ''}
      </a>
      <span class="brand">${esc(p.b)}</span>
      <a class="name" href="#/produto/${p.id}">${esc(p.n)}</a>
      ${has('lab') && p.i.length ? `<span class="ings">${p.i.map(k => `<span><i style="--c:${COL[k]}"></i>${esc(ingOf(k).t)}</span>`).join('')}</span>` : ''}
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
  const panel = k => {
    const x = ingOf(k), list = withIng(k);
    return `<figure class="ing-photo"><img src="assets/u-ing-${k}.webp" alt="" decoding="async"><span class="dot" style="--c:${COL[k]}" aria-hidden="true"></span></figure>
      <h3 id="ingName" tabindex="-1">${esc(x.t)}</h3>
      <p class="what">${esc(x.d)}</p>
      <p class="n">${L(`Está em ${list.length} ${list.length === 1 ? 'produto da loja' : 'produtos da loja'}`, `In ${list.length} ${list.length === 1 ? 'product' : 'products'} in the shop`, `상점의 ${list.length}개 제품에 들어 있습니다`)}</p>
      <ul>${list.slice(0, 4).map(p => `<li><a href="#/produto/${p.id}"><span class="th" style="background:${tile(p)}"><img src="${p.img}" alt=""></span><span><small>${esc(p.b)}</small><span class="nm">${esc(p.n)}</span></span><b>${money(p.p)}</b></a></li>`).join('')}</ul>
      <div class="more"><a class="btn" href="#/loja/i-${k}">${L('Ver na loja', 'See in the shop', '상점에서 보기')}</a></div>`;
  };
  const lab = () => `<section class="sec ${C.labDeep ? 'deep' : ''}" id="ingredientes" aria-labelledby="h-lab">
    <div class="wrap">
      <div class="sh"><h2 id="h-lab">${L('Escolha pelo ingrediente', 'Shop by ingredient', '성분으로 고르기')}</h2><p>${L('Nove ativos que encontra nas nossas rotinas. Toque num para saber o que faz e em que produtos está.', 'Nine actives you will find in our routines. Tap one to see what it does and which products have it.', '루틴에 자주 쓰이는 아홉 가지 성분. 하나를 눌러 효과와 해당 제품을 확인하세요.')}</p></div>
      <div class="lab-grid">
        <div class="dishes" id="dishes" role="group" aria-label="${L('Ingredientes', 'Ingredients', '성분')}">
          ${INGREDIENTS.map((x, i) => `<button class="dish" type="button" data-ing="${x.key}" aria-pressed="${x.key === ing}" style="--c:${COL[x.key]};--i:${i}"><span class="gel"></span><span class="lbl">${esc(x.t)}</span></button>`).join('')}
        </div>
        <div class="panel" id="panel" aria-live="polite">${panel(ing)}</div>
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

  /* Quiz */
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
  const quiz = () => `<section class="sec qz deep" id="quiz" aria-labelledby="h-qz">
    <div class="wrap">
      <div class="sh"><h2 id="h-qz">${L('Não sabe por onde começar?', 'Not sure where to start?', '어디서 시작할지 모르겠나요?')}</h2><p>${L('Duas perguntas sobre a sua pele. Mostramos cinco produtos para a rotina da manhã.', 'Two questions about your skin. We show five products for your morning routine.', '피부에 관한 두 가지 질문에 답하면 아침 루틴 제품 다섯 가지를 보여 드립니다.')}</p></div>
      <div class="qz-grid"><div class="qz-card" id="qzCard"></div><div class="qz-res pending" id="qzRes" aria-live="polite"></div></div>
    </div></section>`;
  const drawQuiz = focus => {
    const cardEl = $('#qzCard'), res = $('#qzRes'); if (!cardEl) return;
    const qs = Q(), done = qz.step >= 2, q = qs[Math.min(qz.step, 1)];
    const lbl = (qi, v) => qs[qi][2].find(o => o[0] === v)[1];
    cardEl.innerHTML = `<div class="qz-prog" aria-hidden="true"><span class="on"></span><span class="${qz.step >= 1 ? 'on' : ''}"></span></div>` +
      (done ? `<h3 tabindex="-1">${L('A sua rotina está pronta', 'Your routine is ready', '루틴이 준비되었습니다')}</h3><p style="color:var(--muted)">${L(`Pele ${lbl(0, qz.skin).toLowerCase()}, foco em ${lbl(1, qz.concern).toLowerCase()}.`, `${lbl(0, qz.skin)} skin, focus on ${lbl(1, qz.concern).toLowerCase()}.`, `${lbl(0, qz.skin)} 피부, ${lbl(1, qz.concern)} 집중 케어.`)}</p><button class="qz-back" type="button" data-qz-restart>${L('Responder outra vez', 'Start again', '다시 하기')}</button>` :
      `<h3 tabindex="-1">${q[0]}</h3><div class="qz-opts">${q[2].map(o => `<button type="button" data-qz="${q[1]}" data-v="${o[0]}" aria-pressed="${qz[q[1]] === o[0]}"><span class="dot"></span><b>${o[1]}</b><small>${o[2]}</small></button>`).join('')}</div>` +
      (qz.step ? `<button class="qz-back" type="button" data-qz-back>${L('Voltar', 'Back', '이전')}</button>` : ''));
    const ids = pickRoutine();
    res.classList.toggle('pending', !done);
    res.innerHTML = `<h3>${done ? L('Para a sua manhã', 'For your morning', '당신의 아침 루틴') : L('Exemplo de rotina', 'Sample routine', '루틴 예시')}</h3><p>${done ? L('Cinco produtos, pela ordem em que se aplicam.', 'Five products, in the order you apply them.', '바르는 순서대로 다섯 가지 제품입니다.') : L('Responda às perguntas para a ajustar à sua pele.', 'Answer the questions to fit it to your skin.', '질문에 답하면 피부에 맞게 바뀝니다.')}</p>
      <ol>${ids.map((id, i) => { const p = byId[id]; return `<li><span class="n">${i + 1}</span><span class="th"><img src="${p.img}" alt=""></span><span><small>${STEPS[i].t}</small><span class="nm">${esc(p.n)}</span></span><b>${money(p.p)}</b></li>`; }).join('')}</ol>
      <div class="qz-tot"><b>${money(ids.reduce((s, id) => s + byId[id].p, 0))}</b><button class="btn gold" type="button" data-addset="${ids.join(',')}" ${done ? '' : 'disabled'}>${L('Adicionar a rotina', 'Add the routine', '루틴 담기')}</button></div>`;
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

  const quotes = () => `<section class="sec" style="padding-top:0" aria-labelledby="h-q">
    <div class="wrap"><h2 id="h-q" class="vh">${L('O que dizem as clientes', 'What customers say', '고객 후기')}</h2>
      <ul class="quotes">
        <li><figure><blockquote>${L('Os produtos Namsan Glow elevaram a minha rotina de cuidados com a pele.', 'Namsan Glow products took my skincare routine to another level.', '남산 글로우 제품 덕분에 스킨케어 루틴이 한 단계 올라갔어요.')}</blockquote><figcaption>Cláudia Soares</figcaption></figure></li>
        <li><figure><blockquote>${L('Estou completamente apaixonada pelos produtos da Namsan Glow.', 'I am completely in love with Namsan Glow products.', '남산 글로우 제품에 완전히 반했어요.')}</blockquote><figcaption>Teresa Domingos</figcaption></figure></li>
        <li><figure><blockquote>${L('A minha pele fica purificada, refrescada e verdadeiramente nutrida.', 'My skin feels purified, refreshed and truly nourished.', '피부가 맑고 산뜻하며 깊이 영양을 받은 느낌이에요.')}</blockquote><figcaption>Sofia Matos</figcaption></figure></li>
      </ul></div></section>`;

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
  const shop = param => {
    if (param && param !== 'procurar') fromParam(param);
    const brandsList = [...new Set(CATALOG.map(p => p.b))].sort();
    return `<div class="wrap">
      <div class="ph"><p class="crumb"><a href="#/inicio">${L('Início', 'Home', '홈')}</a> / ${L('Loja', 'Shop', '쇼핑')}</p><h1>${L('Loja', 'Shop', '쇼핑')}</h1><p>${L('Escolha pelo passo da rotina, pelo ingrediente ou pela marca. Todos os produtos são originais e enviados de Braga.', 'Shop by routine step, ingredient or brand. Every product is genuine and ships from Braga.', '루틴 단계, 성분, 브랜드로 골라 보세요. 모든 제품은 정품이며 브라가에서 발송됩니다.')}</p></div>
      <div class="filters">
        <div class="chips" role="group" aria-label="${L('Passo da rotina', 'Routine step', '루틴 단계')}">
          <button class="chip" type="button" data-fstep="0" aria-pressed="${!shopState.step && !shopState.masks}">${L('Todos', 'All', '전체')}</button>
          ${STEPS.map(s => `<button class="chip" type="button" data-fstep="${s.n}" aria-pressed="${shopState.step === s.n}"><span class="n">${s.n}</span>${s.t}</button>`).join('')}
          <button class="chip" type="button" data-masks aria-pressed="${shopState.masks}">${L('Máscaras −15%', 'Masks −15%', '마스크 −15%')}</button>
        </div>
        ${has('lab') ? `<div class="chips" role="group" aria-label="${L('Ingrediente', 'Ingredient', '성분')}">${INGREDIENTS.map(x => `<button class="chip" type="button" data-fi="${x.key}" aria-pressed="${shopState.ing === x.key}"><i style="--c:${COL[x.key]}"></i>${esc(x.t)}</button>`).join('')}</div>` : ''}
        <div class="fsel">
          <label id="procurar">${L('Procurar', 'Search', '검색')} <input type="search" id="q" value="${esc(shopState.q)}" placeholder="${L('Nome ou marca', 'Name or brand', '제품명 또는 브랜드')}"></label>
          <label>${L('Marca', 'Brand', '브랜드')} <select id="brandSel"><option value="">${L('Todas', 'All', '전체')}</option>${brandsList.map(b => `<option ${shopState.brand === b ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select></label>
          <label>${L('Ordenar', 'Sort', '정렬')} <select id="sortSel"><option value="rec">${L('Pela rotina', 'By routine', '루틴 순')}</option><option value="asc" ${shopState.sort === 'asc' ? 'selected' : ''}>${L('Preço mais baixo', 'Lowest price', '낮은 가격순')}</option><option value="desc" ${shopState.sort === 'desc' ? 'selected' : ''}>${L('Preço mais alto', 'Highest price', '높은 가격순')}</option></select></label>
        </div>
      </div>
      <div id="shopGrid">${shopGrid()}</div>
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
  const SHIP = { std: 3.9, exp: 6.9 };
  const ck = { step: 1, d: {}, ship: 'std', pay: 'mbway', promo: false, order: null };
  const ckTotals = () => {
    const sub = cart.total(), disc = ck.promo ? Math.round(sub * 10) / 100 : 0;
    const ship = ck.ship === 'std' ? (sub >= NG.FREE_SHIP ? 0 : SHIP.std) : SHIP.exp;
    return { sub, disc, ship, total: sub - disc + ship };
  };
  const fld = (id, label, attrs, err, hint) => `<div class="fld"><label for="f-${id}">${label}${hint ? ` <small>${hint}</small>` : ''}</label><input id="f-${id}" name="${id}" value="${esc(ck.d[id] || '')}" ${attrs}><span class="err">${err}</span></div>`;
  const summary = () => {
    const t = ckTotals(), left = Math.max(0, NG.FREE_SHIP - t.sub);
    return `<h2>${L('A sua encomenda', 'Your order', '주문 내역')}</h2>
      <ul>${cart.items().map(it => { const p = byId[it.id]; return `<li><span class="th" style="background:${tile(p)}"><img src="${p.img}" alt=""><em>${it.q}</em></span><span><small>${esc(p.b)}</small><span class="nm">${esc(p.n)}</span></span><b>${money(p.p * it.q)}</b></li>`; }).join('')}</ul>
      <form class="promo" id="promoForm"><label class="vh" for="promo">${L('Código de desconto', 'Discount code', '할인 코드')}</label><input id="promo" placeholder="${L('Código de desconto', 'Discount code', '할인 코드')}" value="${ck.promo ? 'WELCOME10' : ''}" autocomplete="off"><button type="submit">${L('Aplicar', 'Apply', '적용')}</button></form>
      <p class="promo-msg ${ck.promo ? 'ok' : ''}" id="promoMsg" role="status">${ck.promo ? L('WELCOME10 aplicado: 10% de desconto.', 'WELCOME10 applied: 10% off.', 'WELCOME10 적용: 10% 할인.') : ''}</p>
      <div class="tot">
        <div><span>${L('Subtotal', 'Subtotal', '소계')}</span><span>${money(t.sub)}</span></div>
        ${t.disc ? `<div class="disc"><span>${L('Desconto', 'Discount', '할인')}</span><span>−${money(t.disc)}</span></div>` : ''}
        <div><span>${L('Envio', 'Shipping', '배송비')}</span><span>${t.ship ? money(t.ship) : L('Grátis', 'Free', '무료')}</span></div>
        ${left > 0 && ck.ship === 'std' ? `<p style="margin:0;font-size:13px;color:var(--muted)">${L(`Faltam ${money(left)} para o envio grátis.`, `${money(left)} away from free shipping.`, `무료 배송까지 ${money(left)} 남았습니다.`)}<span class="ship-bar"><span style="--p:${Math.min(1, t.sub / NG.FREE_SHIP)}"></span></span></p>` : ''}
        <div class="big"><span>${L('Total', 'Total', '합계')}</span><b>${money(t.total)}</b></div>
      </div>
      <ul class="trust"><li>${I.lock}${L('Pagamento seguro', 'Secure payment', '안전한 결제')}</li><li>${I.truck}${L('Enviado de Braga em 24 h úteis', 'Ships from Braga within 1 business day', '영업일 기준 24시간 내 브라가에서 발송')}</li><li>${I.chat}${L('Dúvidas? WhatsApp +351 966 700 740', 'Questions? WhatsApp +351 966 700 740', '문의: WhatsApp +351 966 700 740')}</li></ul>`;
  };
  const stepTitles = () => [L('Contacto e morada', 'Contact and address', '연락처와 주소'), L('Envio', 'Shipping', '배송'), L('Pagamento', 'Payment', '결제')];
  const ckForm = () => {
    const tt = stepTitles(), t = ckTotals();
    const fs = (n, inner, sum) => `<fieldset ${ck.step < n ? 'disabled' : ''}><legend><span>${n}</span>${tt[n - 1]}</legend>${ck.step === n ? inner : ck.step > n ? `<p style="color:var(--muted)">${sum}</p><div><button class="ck-link" type="button" data-ck-go="${n}">${L('Alterar', 'Edit', '수정')}</button></div>` : ''}</fieldset>`;
    const d = ck.d;
    return `<form id="ckForm" novalidate>
      ${fs(1, `<div class="ck-row">${fld('email', 'Email', 'type="email" autocomplete="email" required', L('Indique um email válido.', 'Enter a valid email.', '올바른 이메일을 입력하세요.'))}${fld('tel', L('Telemóvel', 'Mobile', '휴대전화'), 'type="tel" autocomplete="tel" required pattern="[+0-9 ]{9,}"', L('Indique um número com 9 dígitos.', 'Enter a 9-digit number.', '9자리 번호를 입력하세요.'))}</div>
        <div class="ck-row">${fld('nome', L('Nome', 'First name', '이름'), 'autocomplete="given-name" required', L('Indique o nome.', 'Enter your first name.', '이름을 입력하세요.'))}${fld('apelido', L('Apelido', 'Last name', '성'), 'autocomplete="family-name" required', L('Indique o apelido.', 'Enter your last name.', '성을 입력하세요.'))}</div>
        ${fld('morada', L('Morada', 'Address', '주소'), 'autocomplete="street-address" required', L('Indique a morada.', 'Enter your address.', '주소를 입력하세요.'))}
        <div class="ck-row">${fld('cp', L('Código postal', 'Postcode', '우편번호'), 'autocomplete="postal-code" required pattern="[0-9]{4}-[0-9]{3}" placeholder="4700-000" inputmode="numeric"', L('Use o formato 0000-000.', 'Use the format 0000-000.', '0000-000 형식으로 입력하세요.'))}${fld('cidade', L('Localidade', 'Town', '도시'), 'autocomplete="address-level2" required', L('Indique a localidade.', 'Enter your town.', '도시를 입력하세요.'))}</div>
        ${fld('nif', 'NIF', 'inputmode="numeric" pattern="[0-9]{9}"', L('O NIF tem 9 dígitos.', 'The tax number has 9 digits.', '납세자 번호는 9자리입니다.'), L('opcional, para fatura', 'optional, for the invoice', '선택, 영수증용'))}
        <div class="ck-actions"><a class="ck-link" href="#/loja">${L('Continuar a comprar', 'Keep shopping', '쇼핑 계속하기')}</a><button class="btn" type="submit">${L('Continuar para o envio', 'Continue to shipping', '배송 선택으로')}</button></div>`,
        `${esc(d.nome || '')} ${esc(d.apelido || '')}, ${esc(d.email || '')}<br>${esc(d.morada || '')}, ${esc(d.cp || '')} ${esc(d.cidade || '')}`)}
      ${fs(2, `<div class="opts" role="radiogroup">
          <label class="opt"><input type="radio" name="ship" value="std" ${ck.ship === 'std' ? 'checked' : ''}><b>${L('Envio standard CTT', 'CTT standard', 'CTT 일반 배송')}</b><span class="pr">${t.sub >= NG.FREE_SHIP ? L('Grátis', 'Free', '무료') : money(SHIP.std)}</span><small>${L('2 a 3 dias úteis. Grátis acima de 50 €.', '2 to 3 business days. Free over €50.', '영업일 2~3일. 50유로 이상 무료.')}</small></label>
          <label class="opt"><input type="radio" name="ship" value="exp" ${ck.ship === 'exp' ? 'checked' : ''}><b>${L('Expresso CTT', 'CTT express', 'CTT 특급 배송')}</b><span class="pr">${money(SHIP.exp)}</span><small>${L('Entrega no dia útil seguinte.', 'Next business day delivery.', '다음 영업일 도착.')}</small></label>
        </div>
        <div class="ck-actions"><button class="ck-link" type="button" data-ck-go="1">${L('Voltar', 'Back', '이전')}</button><button class="btn" type="submit">${L('Continuar para o pagamento', 'Continue to payment', '결제로')}</button></div>`,
        ck.ship === 'std' ? L('Envio standard CTT', 'CTT standard', 'CTT 일반 배송') : L('Expresso CTT', 'CTT express', 'CTT 특급 배송'))}
      ${fs(3, `<div class="opts" role="radiogroup">
          <label class="opt"><input type="radio" name="pay" value="mbway" ${ck.pay === 'mbway' ? 'checked' : ''}><b>MB WAY</b><small>${L('Confirme o pagamento na app, no telemóvel indicado.', 'Confirm the payment in the app on your phone.', '입력한 휴대전화의 앱에서 결제를 승인하세요.')}</small><span class="logos"><span>MB WAY</span></span></label>
          <label class="opt"><input type="radio" name="pay" value="mb" ${ck.pay === 'mb' ? 'checked' : ''}><b>${L('Referência Multibanco', 'Multibanco reference', 'Multibanco 결제 번호')}</b><small>${L('Enviamos a referência por email. Válida 48 horas.', 'We email you the reference. Valid for 48 hours.', '결제 번호를 이메일로 보내 드립니다. 48시간 유효.')}</small><span class="logos"><span>MB</span></span></label>
          <label class="opt"><input type="radio" name="pay" value="card" ${ck.pay === 'card' ? 'checked' : ''}><b>${L('Cartão', 'Card', '카드')}</b><small>${L('Pagamento na página segura do banco.', 'Paid on the bank’s secure page.', '은행의 보안 페이지에서 결제합니다.')}</small><span class="logos"><span>VISA</span><span>MC</span></span></label>
        </div>
        <div class="ck-actions"><button class="ck-link" type="button" data-ck-go="2">${L('Voltar', 'Back', '이전')}</button><button class="btn" type="submit">${L(`Pagar ${money(t.total)}`, `Pay ${money(t.total)}`, `${money(t.total)} 결제하기`)}</button></div>`, '')}
    </form>`;
  };
  const checkout = () => {
    if (ck.order && cart.count()) { ck.order = null; ck.step = 1; }
    if (ck.order) {
      const o = ck.order;
      return `<div class="wrap ck"><div class="done-box">
        <svg width="72" height="96" viewBox="0 0 24 32" aria-hidden="true"><path d="M12 1s10 12 10 19a10 10 0 0 1-20 0C2 13 12 1 12 1z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width=".8"/><path d="M7.5 19.5l3 3 6-6" fill="none" stroke="#2A1D15" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h1>${L(`Obrigada, ${esc(o.nome)}`, `Thank you, ${esc(o.nome)}`, `${esc(o.nome)}님, 감사합니다`)}</h1>
        <p>${o.pay === 'mbway' ? L('Confirme o pagamento na app MB WAY. Enviamos a confirmação para', 'Confirm the payment in the MB WAY app. We sent the confirmation to', 'MB WAY 앱에서 결제를 승인해 주세요. 확인 메일을 보냈습니다:') : o.pay === 'mb' ? L('Enviamos a referência Multibanco para', 'We sent the Multibanco reference to', 'Multibanco 결제 번호를 보냈습니다:') : L('Pagamento recebido. Enviamos a confirmação para', 'Payment received. We sent the confirmation to', '결제가 완료되었습니다. 확인 메일을 보냈습니다:')} <b>${esc(o.email)}</b>.</p>
        <span class="ord">${L('Encomenda', 'Order', '주문 번호')} ${o.id}</span>
        <p style="font-size:15px">${L(`Total pago: ${money(o.total)}. Enviamos de Braga e avisamos quando sair.`, `Total: ${money(o.total)}. We ship from Braga and let you know when it leaves.`, `합계: ${money(o.total)}. 브라가에서 발송되면 알려 드립니다.`)}</p>
        <a class="btn" href="#/inicio">${L('Voltar ao início', 'Back to home', '홈으로')}</a>
      </div></div>`;
    }
    if (!cart.count()) {
      return `<div class="wrap ck"><div class="empty-ck"><h1>${L('O carrinho está vazio', 'Your bag is empty', '장바구니가 비어 있습니다')}</h1><p>${L('Adicione produtos para finalizar a compra.', 'Add products to check out.', '결제하려면 제품을 담아 주세요.')}</p><a class="btn" href="#/loja">${L('Ver a loja', 'Browse the shop', '쇼핑하기')}</a></div></div>`;
    }
    const tt = stepTitles();
    return `<div class="wrap ck">
      <p class="crumb"><a href="#/loja">${L('Loja', 'Shop', '쇼핑')}</a> / ${L('Finalizar compra', 'Checkout', '결제')}</p>
      <div class="ck-head"><h1>${L('Finalizar compra', 'Checkout', '결제')}</h1>
        <ol class="ck-steps" id="ckSteps">${tt.map((t, i) => `<li data-n="${i + 1}" class="${ck.step > i + 1 ? 'done' : ck.step === i + 1 ? 'cur' : ''}">${t}</li>`).join('')}</ol></div>
      <p class="ck-note">${I.lock}${L('Protótipo: nenhum pagamento é feito e os dados não saem do browser.', 'Prototype: no payment is taken and your details stay in the browser.', '프로토타입입니다. 실제 결제는 이루어지지 않으며 정보는 브라우저 밖으로 전송되지 않습니다.')}</p>
      <div class="ck-grid"><div id="ckMain">${ckForm()}</div><aside class="sum" id="ckSum" aria-label="${L('Resumo', 'Summary', '요약')}">${summary()}</aside></div>
    </div>`;
  };
  const redrawCk = focusSel => {
    vt(() => {
      $('#ckMain').innerHTML = ckForm();
      $('#ckSum').innerHTML = summary();
      const tt = stepTitles();
      $('#ckSteps').innerHTML = tt.map((t, i) => `<li data-n="${i + 1}" class="${ck.step > i + 1 ? 'done' : ck.step === i + 1 ? 'cur' : ''}">${t}</li>`).join('');
    });
    requestAnimationFrame(() => { const f = $(focusSel || `#ckMain fieldset:nth-of-type(${ck.step}) :is(input,button)`); if (f) f.focus(); });
  };

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
      scrollTo({ top: sec.getBoundingClientRect().top + scrollY + span * (Number(b.dataset.step) + .5) / 5, behavior: reduce() ? 'auto' : 'smooth' });
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
  const dishesIn = () => {
    const d = $('#dishes'); if (!d) return;
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { d.classList.add('in'); o.disconnect(); } }, { threshold: .3 }).observe(d);
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
    document.querySelectorAll('[data-fi]').forEach(b => b.setAttribute('aria-pressed', b.dataset.fi === shopState.ing));
    const mk = $('[data-masks]'); if (mk) mk.setAttribute('aria-pressed', shopState.masks);
    if (full) ['#q', '#brandSel'].forEach(s => { const el = $(s); if (el) el.value = ''; });
    const g = $('#shopGrid'); if (g) vt(() => { g.innerHTML = shopGrid(); });
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
      ing = d.dataset.ing;
      document.querySelectorAll('[data-ing]').forEach(b => b.setAttribute('aria-pressed', b === d));
      vt(() => { $('#panel').innerHTML = panel(ing); });
      if (matchMedia('(max-width: 960px)').matches) $('#panel').scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'nearest' });
      return;
    }
    const q = t.closest('[data-qz]'); if (q) { qz[q.dataset.qz] = q.dataset.v; qz.step++; drawQuiz(true); return; }
    if (t.closest('[data-qz-back]')) { qz.step--; drawQuiz(true); return; }
    if (t.closest('[data-qz-restart]')) { qz.step = 0; qz.skin = qz.concern = ''; drawQuiz(true); return; }
    const pqb = t.closest('[data-pq]'); if (pqb) { pq = Math.max(1, pq + Number(pqb.dataset.pq)); $('#pq').textContent = pq; return; }
    const fs = t.closest('[data-fstep]'); if (fs) { shopState.step = Number(fs.dataset.fstep); shopState.masks = false; refreshShop(); return; }
    const fi = t.closest('[data-fi]'); if (fi) { shopState.ing = shopState.ing === fi.dataset.fi ? '' : fi.dataset.fi; refreshShop(); return; }
    if (t.closest('[data-masks]')) { shopState.masks = !shopState.masks; shopState.step = 0; refreshShop(); return; }
    if (t.closest('[data-reset]')) { Object.assign(shopState, { ing: '', step: 0, masks: false, brand: '', q: '' }); refreshShop(true); return; }
    const go = t.closest('[data-ck-go]'); if (go) { ck.step = Number(go.dataset.ckGo); redrawCk(); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'q') { shopState.q = e.target.value; const g = $('#shopGrid'); if (g) g.innerHTML = shopGrid(); }
    if (e.target.closest('#ckForm') && e.target.name && e.target.type !== 'radio') ck.d[e.target.name] = e.target.value;
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'brandSel') { shopState.brand = e.target.value; refreshShop(); }
    if (e.target.id === 'sortSel') { shopState.sort = e.target.value; refreshShop(); }
    if (e.target.name === 'ship') { ck.ship = e.target.value; $('#ckSum').innerHTML = summary(); const pay = $('#ckForm .btn[type=submit]'); if (pay && ck.step === 3) pay.textContent = L(`Pagar ${money(ckTotals().total)}`, `Pay ${money(ckTotals().total)}`, `${money(ckTotals().total)} 결제하기`); }
    if (e.target.name === 'pay') ck.pay = e.target.value;
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'promoForm') {
      e.preventDefault();
      const v = $('#promo').value.trim().toUpperCase();
      ck.promo = v === 'WELCOME10';
      $('#ckSum').innerHTML = summary();
      if (!ck.promo) { const msg = $('#promoMsg'); msg.textContent = v ? L('Este código não é válido.', 'This code is not valid.', '유효하지 않은 코드입니다.') : ''; }
      const pay = $('#ckForm .btn[type=submit]'); if (pay && ck.step === 3) pay.textContent = L(`Pagar ${money(ckTotals().total)}`, `Pay ${money(ckTotals().total)}`, `${money(ckTotals().total)} 결제하기`);
      return;
    }
    if (e.target.id === 'ckForm') {
      e.preventDefault();
      if (ck.step === 1) {
        const bad = [...e.target.querySelectorAll('fieldset:first-of-type input')].filter(i => !i.checkValidity());
        if (bad.length) { bad.forEach(i => i.dispatchEvent(new Event('blur'))); e.target.reportValidity(); return; }
        ck.step = 2; redrawCk(); return;
      }
      if (ck.step === 2) { ck.step = 3; redrawCk(); return; }
      const t = ckTotals();
      ck.order = { id: 'NG-' + String(Date.now()).slice(-6), nome: ck.d.nome || '', email: ck.d.email || '', pay: ck.pay, total: t.total };
      cart.clear();
      vt(() => { $('#app').innerHTML = checkout(); scrollTo(0, 0); });
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
  const onScrollHdr = () => {
    hdr.classList.toggle('scrolled', scrollY > 8);
    const h = $('.hero');
    document.body.classList.toggle('on-hero', $('#app').dataset.page === 'inicio' && !!h && h.getBoundingClientRect().bottom > 76);
  };
  addEventListener('scroll', onScrollHdr, { passive: true });

  /* ---------- Boot ---------- */
  let lastProduct = null, buyObs = null;
  const drawer = NG.drawer({ onCheckout: () => { ck.order = null; ck.step = 1; location.hash = '#/checkout'; } });
  cart.on(() => { const b = $('#badge'); if (b) b.textContent = cart.count() || ''; });
  chrome();
  $('#langMenu').addEventListener('toggle', e => { if (e.newState === 'open') placeMenu(); });
  const app = NG.router($('#app'), { inicio: home, loja: shop, produto: product, sobre: about, checkout }, (r, first) => {
    pq = 1;
    document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === '#/' + r.name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (r.name === 'inicio') {
      drawQuiz(false); initRitual(); heroShine(); dishesIn();
      if (first || !r.param) { document.body.classList.remove('play'); void document.body.offsetWidth; document.body.classList.add('play'); }
    } else if (ritualOff) { ritualOff(); ritualOff = null; }
    if (r.name === 'loja' && r.param === 'procurar') { const qi = $('#q'); if (qi) qi.focus(); }
    // Coming back from a product: its card tile morphs back from the big photo
    if (lastProduct && r.name !== 'produto') {
      const back = $(`.card .tile[href="#/produto/${lastProduct}"]`);
      if (back) back.style.viewTransitionName = 'ptile';
    }
    lastProduct = r.name === 'produto' ? r.param : null;
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
