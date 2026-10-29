/* Namsan Glow mock core: catalogue, cart, hash router and cart drawer.
   Shared by mocks E, F and G. Each mock owns its own markup and CSS. */
(function () {
  const STEPS = [
    { n: 1, key: 'limpar', t: 'Limpar', d: 'Óleos e géis de limpeza' },
    { n: 2, key: 'tonificar', t: 'Tonificar', d: 'Tónicos e essências' },
    { n: 3, key: 'tratar', t: 'Tratar', d: 'Séruns, ampolas e máscaras' },
    { n: 4, key: 'hidratar', t: 'Hidratar', d: 'Cremes e contorno de olhos' },
    { n: 5, key: 'proteger', t: 'Proteger', d: 'Protetor solar, todas as manhãs' }
  ];

  const INGREDIENTS = [
    { key: 'centella', t: 'Centella asiática', d: 'Planta usada há gerações para acalmar a pele.' },
    { key: 'heartleaf', t: 'Heartleaf', d: 'Extrato calmante, a base dos tónicos da Anua.' },
    { key: 'hialuronico', t: 'Ácido hialurónico', d: 'Retém água e dá à pele um aspeto mais cheio.' },
    { key: 'azelaico', t: 'Ácido azelaico', d: 'Ajuda com vermelhidão e tom irregular.' },
    { key: 'niacinamida', t: 'Niacinamida', d: 'Uniformiza o tom e reforça a barreira.' },
    { key: 'pdrn', t: 'PDRN', d: 'Ativo de origem marinha, popular na Coreia.' },
    { key: 'ceramidas', t: 'Cerâmidas', d: 'Repõem os lípidos da barreira cutânea.' },
    { key: 'retinol', t: 'Retinol', d: 'Ativo de noite para textura e linhas finas.' },
    { key: 'colagenio', t: 'Colagénio', d: 'Dá elasticidade e conforto em máscara.' }
  ];

  // p: price, o: price before discount, s: routine step, i: ingredient keys, sold: out of stock
  const P = (id, b, n, p, o, img, cat, s, i, desc, use, sold) => ({ id, b, n, p, o, img: 'assets/' + img, cat, s, i, desc, use, sold: !!sold });
  const CATALOG = [
    P('skin1004-oil', 'SKIN1004', 'Madagascar Centella Light Cleansing Oil 30ml', 10, null, 'p-skin1004-oil.webp', 'Limpeza', 1, ['centella'],
      'Óleo de limpeza leve com centella de Madagáscar. Dissolve protetor solar e maquilhagem sem deixar a pele repuxada.',
      'À noite, aplique na pele seca, massaje e emulsione com água antes de enxaguar.'),
    P('anua-gel', 'Anua', '8 Hyaluronic Acid Gentle Gel Cleanser', 16, null, 'p-anua-gel.webp', 'Limpeza', 1, ['hialuronico'],
      'Gel de limpeza suave com oito tipos de ácido hialurónico, para limpar sem tirar a hidratação.',
      'Manhã e noite, faça espuma nas mãos húmidas e massaje o rosto durante um minuto.'),
    P('anua-toner', 'Anua', 'Heartleaf 77 Soothing Toner 250ml', 25.5, null, 'p-anua-toner.webp', 'Tónicos e pads', 2, ['heartleaf'],
      'Tónico com 77% de extrato de heartleaf. Acalma e prepara a pele para os passos seguintes.',
      'Depois da limpeza, aplique com as mãos ou com um disco de algodão.'),
    P('anua-azelaic', 'Anua', 'Azelaic Acid 10 Hyaluron Redness Soothing Serum', 28, null, 'p-anua-azelaic10.webp', 'Séruns e ampolas', 3, ['azelaico', 'hialuronico'],
      'Sérum com ácido azelaico e ácido hialurónico, pensado para pele com tendência a vermelhidão.',
      'Duas a três gotas depois do tónico, manhã ou noite.'),
    P('anua-niacinamide', 'Anua', 'Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml', 22, null, 'p-anua-niacinamide.webp', 'Séruns e ampolas', 3, ['niacinamida'],
      'Sérum com 10% de niacinamida e 4% de ácido tranexâmico para manchas e tom irregular.',
      'Aplique depois do tónico. De manhã, termine sempre com protetor solar.'),
    P('anua-pdrn', 'Anua', 'PDRN Hyaluronic Acid Capsule 100 Serum 30ml', 27.95, null, 'p-anua-pdrn.webp', 'Séruns e ampolas', 3, ['pdrn', 'hialuronico'],
      'Sérum com cápsulas de PDRN e ácido hialurónico para pele baça ou desidratada.',
      'Agite, aplique duas a três gotas e pressione suavemente até absorver.'),
    P('skin1004-ampoule', 'SKIN1004', 'Madagascar Centella Tea-Trica Relief Ampoule 30ml', 11, null, 'p-skin1004-teatrica.webp', 'Séruns e ampolas', 3, ['centella'],
      'Ampola com centella e árvore do chá para pele oleosa e poros visíveis.',
      'Depois do tónico, aplique nas zonas que precisam e deixe absorver.'),
    P('medicube-red', 'Medicube', 'Red Succinic Acid Serum', 24, null, 'p-medicube-red.webp', 'Séruns e ampolas', 3, [],
      'Sérum com ácido succínico para pele com imperfeições.',
      'Aplique uma pequena quantidade à noite, depois do tónico.'),
    P('anua-3plus', 'Anua', '3+ Azelaic Acid Cica Skin Soothing Moisturizer', 28, null, 'p-anua-3plus.webp', 'Hidratantes', 4, ['azelaico', 'centella'],
      'Hidratante leve com ácido azelaico e cica, para pele sensível ou com vermelhidão.',
      'Último passo da noite, ou antes do protetor solar de manhã.'),
    P('haruharu-cream', 'Haruharu Wonder', 'Black Rice 5 Ceramide Barrier Moisturizing Cream', 20, null, 'p-haruharu-cream.webp', 'Hidratantes', 4, ['ceramidas'],
      'Creme com arroz preto fermentado e cinco cerâmidas para reforçar a barreira da pele.',
      'Aplique uma camada fina no fim da rotina, manhã e noite.'),
    P('anua-retinol', 'Anua', 'Retinol 3 Peptide Night Repair Cream 50g', 33.95, null, 'p-anua-retinol.webp', 'Hidratantes', 4, ['retinol'],
      'Creme de noite com retinol e péptidos. Comece duas noites por semana.',
      'Só à noite. De manhã, use sempre protetor solar.'),
    P('vt-eye', 'VT Cosmetics', 'Reedle Shot Lifting Eye Cream', 26, null, 'p-vt-eye.webp', 'Contorno de olhos', 4, [],
      'Creme de contorno de olhos com microagulhas de origem vegetal.',
      'Dê toques leves com o dedo anelar à volta dos olhos.'),
    P('numbuzin-eye', 'Numbuzin', 'No.9 NAD+ Retinol Volumetox Eye Cream', 19.5, null, 'p-numbuzin-eye.webp', 'Contorno de olhos', 4, ['retinol'],
      'Creme de olhos com retinol e NAD+.',
      'À noite, uma pequena quantidade à volta dos olhos.', true),
    P('torriden-sun', 'Torriden', 'DIVE-IN Moisture Sun Cream', 26.5, null, 'p-torriden-sun.webp', 'Proteção solar', 5, ['hialuronico'],
      'Protetor solar SPF50+ com textura hidratante e sem deixar marcas brancas.',
      'Último passo da manhã. Reaplique a cada duas horas ao sol.'),
    P('torriden-toneup', 'Torriden', 'Balanceful Cica Tone Up Sun Cream', 22, null, 'p-torriden-toneup.webp', 'Proteção solar', 5, ['centella'],
      'Protetor solar SPF50+ com cica e um leve efeito de uniformização do tom.',
      'Último passo da manhã. Funciona como base leve.'),
    P('biodance-mask', 'Biodance', 'Bio Collagen Real Deep Mask 1pc', 6.38, 7.5, 'm-biodance.webp', 'Máscaras', 3, ['colagenio'],
      'Máscara de hidrogel com colagénio que fica transparente à medida que absorve.',
      'À noite, depois do tónico. Deixe atuar até ficar transparente.'),
    P('torriden-mask', 'Torriden', 'DIVE-IN Low Molecular Hyaluronic Acid Mask 1pc', 2.98, 3.5, 'm-torriden.webp', 'Máscaras', 3, ['hialuronico'],
      'Máscara de folha com ácido hialurónico de baixo peso molecular.',
      'Deixe atuar 15 a 20 minutos e massaje o excesso.'),
    P('vt-mask', 'VT Cosmetics', 'Cica Collagen Mask 30pcs', 19.55, 23, 'm-vt.webp', 'Máscaras', 3, ['centella', 'colagenio'],
      'Caixa de 30 máscaras com cica e colagénio, para uso diário.',
      'Depois da limpeza, 10 a 20 minutos.'),
    P('dralthea-mask', 'Dr. Althea', 'Jelly Seal Dewy Mask 1pc', 3.28, 3.85, 'm-dralthea.webp', 'Máscaras', 3, [],
      'Máscara de gel para um acabamento luminoso.',
      'Deixe atuar 20 minutos e massaje o excesso.')
  ];

  const BRANDS = [
    ['Anua', 'brand-anua.png'], ['SKIN1004', 'brand-skin1004.png'], ['Torriden', 'brand-torriden.png'],
    ['Haruharu Wonder', 'brand-haruharu-wonder.png'], ['Medicube', 'brand-medicube.png'], ['VT Cosmetics', 'brand-vt-cosmetics.png'],
    ['Numbuzin', 'brand-numbuzin.png'], ['Biodance', 'brand-biodance.png'], ['Dr. Althea', 'brand-dr-althea.png'],
    ['COSRX', 'brand-cosrx.png'], ['Beauty of Joseon', 'brand-beauty-of-joseon.png'], ['celimax', 'brand-celimax.png'],
    ['Some By Mi', 'brand-some-by-mi.png'], ['Centellian24', 'brand-centellian24.png']
  ].map(([n, f]) => ({ n, src: 'assets/' + f }));

  // Morning and night routines (same picks as the D quiz defaults)
  const ROUTINES = {
    manha: ['anua-gel', 'anua-toner', 'anua-pdrn', 'haruharu-cream', 'torriden-sun'],
    noite: ['skin1004-oil', 'anua-toner', 'anua-azelaic', 'anua-retinol', 'vt-eye']
  };

  const byId = Object.fromEntries(CATALOG.map(p => [p.id, p]));
  const money = v => v.toFixed(2).replace('.', ',') + ' €';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const FREE_SHIP = 50;

  /* ---------- Cart ---------- */
  const KEY = 'ng-cart-' + (window.NG_MOCK || 'x');
  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { items = []; }
  const subs = new Set();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} subs.forEach(f => f()); };
  const cart = {
    items: () => items.filter(it => byId[it.id]),
    count: () => items.reduce((s, it) => s + it.q, 0),
    total: () => items.reduce((s, it) => s + (byId[it.id] ? byId[it.id].p * it.q : 0), 0),
    add(id, q = 1) { const it = items.find(x => x.id === id); if (it) it.q += q; else items.push({ id, q }); save(); },
    set(id, q) { if (q <= 0) items = items.filter(x => x.id !== id); else { const it = items.find(x => x.id === id); if (it) it.q = q; } save(); },
    clear() { items = []; save(); },
    on(f) { subs.add(f); return () => subs.delete(f); }
  };

  /* ---------- Router ---------- */
  // routes: { name: (param) => html }. Hash form: #/name/param
  function router(root, routes, after) {
    const parse = () => {
      const [, name = 'inicio', param = ''] = (location.hash || '#/inicio').split('/');
      return { name: routes[name] ? name : 'inicio', param: decodeURIComponent(param) };
    };
    let first = true;
    const render = () => {
      const r = parse();
      const update = () => {
        root.innerHTML = routes[r.name](r.param);
        root.dataset.page = r.name;
        const anchor = r.param && document.getElementById(r.param);
        if (anchor) anchor.scrollIntoView();
        else if (!first) window.scrollTo(0, 0);
        if (after) after(r, first);
        if (!first) { const h = root.querySelector('h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
      };
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (first || reduce || !document.startViewTransition) update();
      else document.startViewTransition(update);
      first = false;
    };
    window.addEventListener('hashchange', render);
    render();
  }

  /* ---------- Cart drawer (native modal dialog) ---------- */
  function drawer(opts = {}) {
    const d = document.createElement('dialog');
    d.className = 'cd';
    d.setAttribute('closedby', 'any');
    d.setAttribute('aria-labelledby', 'cd-title');
    document.body.appendChild(d);
    const thumb = p => '<span class="cd-thumb"><img src="' + p.img + '" alt=""></span>';
    const draw = () => {
      const list = cart.items(), total = cart.total(), left = Math.max(0, FREE_SHIP - total);
      let h = '<div class="cd-head"><h2 id="cd-title">' + (opts.title || 'O seu carrinho') + ' <small>' + cart.count() + '</small></h2>' +
        '<button class="cd-x" type="button" aria-label="Fechar carrinho" data-close><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>';
      if (!list.length) {
        h += '<div class="cd-empty"><p>O carrinho está vazio.</p><p class="cd-muted">Comece pela rotina: escolha um produto para cada passo.</p><a class="cd-btn" href="#/loja" data-close>Ver a loja</a></div>';
      } else {
        h += '<div class="cd-ship"><p>' + (left > 0 ? 'Faltam <b>' + money(left) + '</b> para o envio grátis.' : 'Tem <b>envio grátis</b> nesta encomenda.') + '</p>' +
          '<span class="cd-bar"><span style="--p:' + Math.min(1, total / FREE_SHIP) + '"></span></span></div><ul class="cd-items">';
        for (const it of list) {
          const p = byId[it.id];
          h += '<li class="cd-item">' + thumb(p) + '<div class="cd-info"><span class="cd-brand">' + esc(p.b) + '</span><a class="cd-name" href="#/produto/' + p.id + '" data-close>' + esc(p.n) + '</a>' +
            '<div class="cd-row"><span class="cd-qty"><button type="button" data-q="' + p.id + '" data-d="-1" aria-label="Menos um">−</button><output>' + it.q + '</output><button type="button" data-q="' + p.id + '" data-d="1" aria-label="Mais um">+</button></span>' +
            '<span class="cd-price">' + money(p.p * it.q) + '</span></div><button class="cd-rm" type="button" data-q="' + p.id + '" data-d="-999">Remover</button></div></li>';
        }
        h += '</ul><div class="cd-foot"><p class="cd-total"><span>Total</span><b>' + money(total) + '</b></p><p class="cd-muted">Portes e código WELCOME10 aplicados no passo seguinte.</p>' +
          '<button class="cd-btn" type="button" data-checkout>Finalizar compra</button></div>';
      }
      d.innerHTML = h;
    };
    d.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) { const it = items.find(x => x.id === q.dataset.q); cart.set(q.dataset.q, it ? it.q + Number(q.dataset.d) : 0); return; }
      if (e.target.closest('[data-checkout]')) { toast('Neste protótipo, o checkout liga à loja real.'); return; }
      if (e.target.closest('[data-close]')) d.close();
    });
    cart.on(() => { if (d.open) draw(); });
    return { open() { draw(); d.showModal(); }, el: d };
  }

  /* ---------- Small toast for add-to-cart feedback ---------- */
  let toastEl, toastT;
  function toast(msg, action) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'ng-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span>' + esc(msg) + '</span>' + (action ? '<button type="button">' + esc(action.label) + '</button>' : '');
    if (action) toastEl.querySelector('button').onclick = () => { toastEl.classList.remove('on'); action.run(); };
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('on'), 3600);
  }

  window.NG = { STEPS, INGREDIENTS, CATALOG, BRANDS, ROUTINES, byId, money, esc, cart, router, drawer, toast, FREE_SHIP };
})();
