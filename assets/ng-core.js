/* Namsan Glow mock core: catalogue, languages, cart, hash router and cart drawer.
   Shared by mocks E, F, H and I. Each mock owns its own markup and CSS.
   Text fields hold [pt, en, ko]; reading them returns the current language. */
(function () {
  const MOCK = window.NG_MOCK || 'x';
  const LANGS = ['pt', 'en', 'ko'];
  const HTML_LANG = { pt: 'pt-PT', en: 'en', ko: 'ko' };
  let lang = 'pt';
  try { const s = localStorage.getItem('ng-lang-' + MOCK); if (LANGS.includes(s)) lang = s; } catch (e) {}
  document.documentElement.lang = HTML_LANG[lang];

  const pick = v => Array.isArray(v) ? (v[LANGS.indexOf(lang)] ?? v[0]) : v;
  const L = (pt, en, ko) => pick([pt, en, ko]);
  // Turn [pt, en, ko] fields into getters that follow the current language
  const i18n = (obj, keys) => {
    for (const k of keys) { const v = obj[k]; Object.defineProperty(obj, k, { get: () => pick(v), enumerable: true }); }
    return obj;
  };

  const STEPS = [
    { n: 1, key: 'limpar', t: ['Limpar', 'Cleanse', '클렌징'], d: ['Óleos e géis de limpeza', 'Cleansing oils and gels', '클렌징 오일과 젤'] },
    { n: 2, key: 'tonificar', t: ['Tonificar', 'Tone', '토너'], d: ['Tónicos e essências', 'Toners and essences', '토너와 에센스'] },
    { n: 3, key: 'tratar', t: ['Tratar', 'Treat', '세럼'], d: ['Séruns, ampolas e máscaras', 'Serums, ampoules and masks', '세럼, 앰플, 마스크'] },
    { n: 4, key: 'hidratar', t: ['Hidratar', 'Moisturise', '보습'], d: ['Cremes e contorno de olhos', 'Creams and eye care', '크림과 아이케어'] },
    { n: 5, key: 'proteger', t: ['Proteger', 'Protect', '자외선 차단'], d: ['Protetor solar, todas as manhãs', 'Sunscreen, every morning', '매일 아침 선크림'] }
  ].map(s => i18n(s, ['t', 'd']));

  const INGREDIENTS = [
    { key: 'centella', t: ['Centella asiática', 'Centella asiatica', '센텔라'], d: ['Planta usada há gerações para acalmar a pele.', 'A plant used for generations to calm the skin.', '오랫동안 피부 진정에 쓰여 온 식물입니다.'] },
    { key: 'heartleaf', t: ['Heartleaf', 'Heartleaf', '어성초'], d: ['Extrato calmante, a base dos tónicos da Anua.', 'A soothing extract, the base of Anua toners.', '아누아 토너의 핵심인 진정 성분입니다.'] },
    { key: 'hialuronico', t: ['Ácido hialurónico', 'Hyaluronic acid', '히알루론산'], d: ['Retém água e dá à pele um aspeto mais cheio.', 'Holds water and makes skin look plumper.', '수분을 붙잡아 피부를 촉촉하고 탄탄해 보이게 합니다.'] },
    { key: 'azelaico', t: ['Ácido azelaico', 'Azelaic acid', '아젤라산'], d: ['Ajuda com vermelhidão e tom irregular.', 'Helps with redness and uneven tone.', '붉은기와 고르지 않은 톤에 도움을 줍니다.'] },
    { key: 'niacinamida', t: ['Niacinamida', 'Niacinamide', '나이아신아마이드'], d: ['Uniformiza o tom e reforça a barreira.', 'Evens tone and supports the skin barrier.', '톤을 고르게 하고 피부 장벽을 강화합니다.'] },
    { key: 'pdrn', t: ['PDRN', 'PDRN', 'PDRN'], d: ['Ativo de origem marinha, popular na Coreia.', 'A marine-derived active, popular in Korea.', '한국에서 인기 있는 해양 유래 성분입니다.'] },
    { key: 'ceramidas', t: ['Cerâmidas', 'Ceramides', '세라마이드'], d: ['Repõem os lípidos da barreira cutânea.', 'Replenish the lipids in the skin barrier.', '피부 장벽의 지질을 채워 줍니다.'] },
    { key: 'retinol', t: ['Retinol', 'Retinol', '레티놀'], d: ['Ativo de noite para textura e linhas finas.', 'A night-time active for texture and fine lines.', '피부결과 잔주름을 위한 저녁용 성분입니다.'] },
    { key: 'colagenio', t: ['Colagénio', 'Collagen', '콜라겐'], d: ['Dá elasticidade e conforto em máscara.', 'Adds bounce and comfort in a mask.', '마스크로 탄력과 편안함을 더합니다.'] }
  ].map(x => i18n(x, ['t', 'd']));

  const CATS = {
    'Limpeza': ['Limpeza', 'Cleansers', '클렌저'], 'Tónicos e pads': ['Tónicos e pads', 'Toners and pads', '토너와 패드'],
    'Séruns e ampolas': ['Séruns e ampolas', 'Serums and ampoules', '세럼과 앰플'], 'Hidratantes': ['Hidratantes', 'Moisturisers', '보습제'],
    'Contorno de olhos': ['Contorno de olhos', 'Eye care', '아이케어'], 'Proteção solar': ['Proteção solar', 'Sun care', '선케어'], 'Máscaras': ['Máscaras', 'Masks', '마스크']
  };

  // p: price, o: price before discount, s: routine step, i: ingredient keys, sold: out of stock.
  // cat stays in Portuguese as a stable key; catT is the translated label.
  const P = (id, b, n, p, o, img, cat, s, i, desc, use, sold) =>
    i18n({ id, b, n, p, o, img: 'assets/' + img, cat, catT: CATS[cat], s, i, desc, use, sold: !!sold }, ['catT', 'desc', 'use']);
  const CATALOG = [
    P('skin1004-oil', 'SKIN1004', 'Madagascar Centella Light Cleansing Oil 30ml', 10, null, 'p-skin1004-oil.webp', 'Limpeza', 1, ['centella'],
      ['Óleo de limpeza leve com centella de Madagáscar. Dissolve protetor solar e maquilhagem sem deixar a pele repuxada.', 'Light cleansing oil with Madagascar centella. Melts away sunscreen and make-up without leaving skin tight.', '마다가스카르 센텔라를 담은 가벼운 클렌징 오일. 자외선 차단제와 메이크업을 당김 없이 녹여냅니다.'],
      ['À noite, aplique na pele seca, massaje e emulsione com água antes de enxaguar.', 'At night, massage onto dry skin, then emulsify with water and rinse.', '저녁에 마른 피부에 마사지한 뒤 물로 유화시켜 헹궈 주세요.']),
    P('anua-gel', 'Anua', '8 Hyaluronic Acid Gentle Gel Cleanser', 16, null, 'p-anua-gel.webp', 'Limpeza', 1, ['hialuronico'],
      ['Gel de limpeza suave com oito tipos de ácido hialurónico, para limpar sem tirar a hidratação.', 'Gentle gel cleanser with eight types of hyaluronic acid, to cleanse without stripping moisture.', '8가지 히알루론산을 담은 순한 젤 클렌저로, 수분을 지키며 세안합니다.'],
      ['Manhã e noite, faça espuma nas mãos húmidas e massaje o rosto durante um minuto.', 'Morning and night, lather in wet hands and massage the face for one minute.', '아침저녁으로 젖은 손에 거품을 내어 1분간 마사지해 주세요.']),
    P('anua-toner', 'Anua', 'Heartleaf 77 Soothing Toner 250ml', 25.5, null, 'p-anua-toner.webp', 'Tónicos e pads', 2, ['heartleaf'],
      ['Tónico com 77% de extrato de heartleaf. Acalma e prepara a pele para os passos seguintes.', 'Toner with 77% heartleaf extract. Soothes and preps skin for the next steps.', '어성초 추출물 77% 토너. 피부를 진정시키고 다음 단계를 준비합니다.'],
      ['Depois da limpeza, aplique com as mãos ou com um disco de algodão.', 'After cleansing, apply with your hands or a cotton pad.', '세안 후 손이나 화장솜으로 발라 주세요.']),
    P('anua-azelaic', 'Anua', 'Azelaic Acid 10 Hyaluron Redness Soothing Serum', 28, null, 'p-anua-azelaic10.webp', 'Séruns e ampolas', 3, ['azelaico', 'hialuronico'],
      ['Sérum com ácido azelaico e ácido hialurónico, pensado para pele com tendência a vermelhidão.', 'Serum with azelaic and hyaluronic acid, made for skin prone to redness.', '아젤라산과 히알루론산을 담은 세럼으로, 붉은기가 있는 피부를 위한 제품입니다.'],
      ['Duas a três gotas depois do tónico, manhã ou noite.', 'Two to three drops after toner, morning or night.', '토너 후 2~3방울, 아침 또는 저녁에 사용하세요.']),
    P('anua-niacinamide', 'Anua', 'Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml', 22, null, 'p-anua-niacinamide.webp', 'Séruns e ampolas', 3, ['niacinamida'],
      ['Sérum com 10% de niacinamida e 4% de ácido tranexâmico para manchas e tom irregular.', 'Serum with 10% niacinamide and 4% tranexamic acid for dark spots and uneven tone.', '나이아신아마이드 10%와 트라넥삼산 4%로 잡티와 고르지 않은 톤을 케어하는 세럼.'],
      ['Aplique depois do tónico. De manhã, termine sempre com protetor solar.', 'Apply after toner. In the morning, always finish with sunscreen.', '토너 후 사용하고, 아침에는 꼭 자외선 차단제로 마무리하세요.']),
    P('anua-pdrn', 'Anua', 'PDRN Hyaluronic Acid Capsule 100 Serum 30ml', 27.95, null, 'p-anua-pdrn.webp', 'Séruns e ampolas', 3, ['pdrn', 'hialuronico'],
      ['Sérum com cápsulas de PDRN e ácido hialurónico para pele baça ou desidratada.', 'Serum with PDRN capsules and hyaluronic acid for dull or dehydrated skin.', 'PDRN 캡슐과 히알루론산을 담아 칙칙하고 건조한 피부를 위한 세럼.'],
      ['Agite, aplique duas a três gotas e pressione suavemente até absorver.', 'Shake, apply two to three drops and press in gently until absorbed.', '흔들어 2~3방울을 덜어 흡수될 때까지 가볍게 눌러 주세요.']),
    P('skin1004-ampoule', 'SKIN1004', 'Madagascar Centella Tea-Trica Relief Ampoule 30ml', 11, null, 'p-skin1004-teatrica.webp', 'Séruns e ampolas', 3, ['centella'],
      ['Ampola com centella e árvore do chá para pele oleosa e poros visíveis.', 'Ampoule with centella and tea tree for oily skin and visible pores.', '센텔라와 티트리로 지성 피부와 모공을 케어하는 앰플.'],
      ['Depois do tónico, aplique nas zonas que precisam e deixe absorver.', 'After toner, apply where needed and let it absorb.', '토너 후 필요한 부위에 발라 흡수시켜 주세요.']),
    P('medicube-red', 'Medicube', 'Red Succinic Acid Serum', 24, null, 'p-medicube-red.webp', 'Séruns e ampolas', 3, [],
      ['Sérum com ácido succínico para pele com imperfeições.', 'Serum with succinic acid for blemish-prone skin.', '숙신산을 담은 트러블 피부용 세럼.'],
      ['Aplique uma pequena quantidade à noite, depois do tónico.', 'Apply a small amount at night, after toner.', '저녁에 토너 후 소량 발라 주세요.']),
    P('anua-3plus', 'Anua', '3+ Azelaic Acid Cica Skin Soothing Moisturizer', 28, null, 'p-anua-3plus.webp', 'Hidratantes', 4, ['azelaico', 'centella'],
      ['Hidratante leve com ácido azelaico e cica, para pele sensível ou com vermelhidão.', 'Light moisturiser with azelaic acid and cica, for sensitive or redness-prone skin.', '아젤라산과 시카를 담은 가벼운 보습제로, 민감하거나 붉은 피부에 맞습니다.'],
      ['Último passo da noite, ou antes do protetor solar de manhã.', 'Last step at night, or before sunscreen in the morning.', '저녁 마지막 단계 또는 아침 자외선 차단제 전에 사용하세요.']),
    P('haruharu-cream', 'Haruharu Wonder', 'Black Rice 5 Ceramide Barrier Moisturizing Cream', 20, null, 'p-haruharu-cream.webp', 'Hidratantes', 4, ['ceramidas'],
      ['Creme com arroz preto fermentado e cinco cerâmidas para reforçar a barreira da pele.', 'Cream with fermented black rice and five ceramides to strengthen the skin barrier.', '발효 흑미와 5가지 세라마이드로 피부 장벽을 강화하는 크림.'],
      ['Aplique uma camada fina no fim da rotina, manhã e noite.', 'Apply a thin layer at the end of your routine, morning and night.', '아침저녁 루틴 마지막에 얇게 펴 발라 주세요.']),
    P('anua-retinol', 'Anua', 'Retinol 3 Peptide Night Repair Cream 50g', 33.95, null, 'p-anua-retinol.webp', 'Hidratantes', 4, ['retinol'],
      ['Creme de noite com retinol e péptidos. Comece duas noites por semana.', 'Night cream with retinol and peptides. Start with two nights a week.', '레티놀과 펩타이드를 담은 나이트 크림. 주 2회부터 시작하세요.'],
      ['Só à noite. De manhã, use sempre protetor solar.', 'Night only. Always wear sunscreen in the morning.', '저녁에만 사용하고, 아침에는 반드시 자외선 차단제를 바르세요.']),
    P('vt-eye', 'VT Cosmetics', 'Reedle Shot Lifting Eye Cream', 26, null, 'p-vt-eye.webp', 'Contorno de olhos', 4, [],
      ['Creme de contorno de olhos com microagulhas de origem vegetal.', 'Eye cream with plant-derived micro-needles.', '식물 유래 미세 니들을 담은 아이크림.'],
      ['Dê toques leves com o dedo anelar à volta dos olhos.', 'Pat gently around the eyes with your ring finger.', '약지로 눈가를 가볍게 두드려 주세요.']),
    P('numbuzin-eye', 'Numbuzin', 'No.9 NAD+ Retinol Volumetox Eye Cream', 19.5, null, 'p-numbuzin-eye.webp', 'Contorno de olhos', 4, ['retinol'],
      ['Creme de olhos com retinol e NAD+.', 'Eye cream with retinol and NAD+.', '레티놀과 NAD+를 담은 아이크림.'],
      ['À noite, uma pequena quantidade à volta dos olhos.', 'At night, a small amount around the eyes.', '저녁에 눈가에 소량 발라 주세요.'], true),
    P('torriden-sun', 'Torriden', 'DIVE-IN Moisture Sun Cream', 26.5, null, 'p-torriden-sun.webp', 'Proteção solar', 5, ['hialuronico'],
      ['Protetor solar SPF50+ com textura hidratante e sem deixar marcas brancas.', 'SPF50+ sunscreen with a hydrating texture and no white cast.', '백탁 없이 촉촉한 SPF50+ 선크림.'],
      ['Último passo da manhã. Reaplique a cada duas horas ao sol.', 'Last step of the morning. Reapply every two hours in the sun.', '아침 마지막 단계에 바르고, 햇볕 아래에서는 2시간마다 덧발라 주세요.']),
    P('torriden-toneup', 'Torriden', 'Balanceful Cica Tone Up Sun Cream', 22, null, 'p-torriden-toneup.webp', 'Proteção solar', 5, ['centella'],
      ['Protetor solar SPF50+ com cica e um leve efeito de uniformização do tom.', 'SPF50+ sunscreen with cica and a light tone-evening effect.', '시카를 담아 톤을 가볍게 정돈하는 SPF50+ 선크림.'],
      ['Último passo da manhã. Funciona como base leve.', 'Last step of the morning. Works as a light base.', '아침 마지막 단계에 사용하세요. 가벼운 베이스로도 좋습니다.']),
    P('biodance-mask', 'Biodance', 'Bio Collagen Real Deep Mask 1pc', 6.38, 7.5, 'm-biodance.webp', 'Máscaras', 3, ['colagenio'],
      ['Máscara de hidrogel com colagénio que fica transparente à medida que absorve.', 'Collagen hydrogel mask that turns clear as it absorbs.', '흡수될수록 투명해지는 콜라겐 하이드로겔 마스크.'],
      ['À noite, depois do tónico. Deixe atuar até ficar transparente.', 'At night, after toner. Leave on until it turns clear.', '저녁에 토너 후 붙이고, 투명해질 때까지 두세요.']),
    P('torriden-mask', 'Torriden', 'DIVE-IN Low Molecular Hyaluronic Acid Mask 1pc', 2.98, 3.5, 'm-torriden.webp', 'Máscaras', 3, ['hialuronico'],
      ['Máscara de folha com ácido hialurónico de baixo peso molecular.', 'Sheet mask with low-molecular hyaluronic acid.', '저분자 히알루론산 시트 마스크.'],
      ['Deixe atuar 15 a 20 minutos e massaje o excesso.', 'Leave on for 15 to 20 minutes and pat in the rest.', '15~20분 후 떼어내고 남은 에센스를 두드려 흡수시키세요.']),
    P('vt-mask', 'VT Cosmetics', 'Cica Collagen Mask 30pcs', 19.55, 23, 'm-vt.webp', 'Máscaras', 3, ['centella', 'colagenio'],
      ['Caixa de 30 máscaras com cica e colagénio, para uso diário.', 'Box of 30 masks with cica and collagen, for daily use.', '시카와 콜라겐을 담은 데일리 마스크 30매.'],
      ['Depois da limpeza, 10 a 20 minutos.', 'After cleansing, 10 to 20 minutes.', '세안 후 10~20분간 사용하세요.']),
    P('dralthea-mask', 'Dr. Althea', 'Jelly Seal Dewy Mask 1pc', 3.28, 3.85, 'm-dralthea.webp', 'Máscaras', 3, [],
      ['Máscara de gel para um acabamento luminoso.', 'Gel mask for a dewy finish.', '촉촉한 광채를 주는 젤 마스크.'],
      ['Deixe atuar 20 minutos e massaje o excesso.', 'Leave on for 20 minutes and pat in the rest.', '20분 후 떼어내고 남은 에센스를 두드려 흡수시키세요.'])
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
  const LOCALE = { pt: 'pt-PT', en: 'en-IE', ko: 'ko-KR' };
  const money = v => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR' }).format(v);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const FREE_SHIP = 50;

  /* ---------- Cart ---------- */
  const KEY = 'ng-cart-' + MOCK;
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
    return { render };
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
      let h = '<div class="cd-head"><h2 id="cd-title">' + (opts.title || L('O seu carrinho', 'Your bag', '장바구니')) + ' <small>' + cart.count() + '</small></h2>' +
        '<button class="cd-x" type="button" aria-label="' + L('Fechar carrinho', 'Close bag', '장바구니 닫기') + '" data-close><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>';
      if (!list.length) {
        h += '<div class="cd-empty"><p>' + L('O carrinho está vazio.', 'Your bag is empty.', '장바구니가 비어 있습니다.') + '</p><p class="cd-muted">' +
          L('Comece pela rotina: escolha um produto para cada passo.', 'Start with the routine: pick one product for each step.', '루틴부터 시작해 보세요. 단계마다 제품을 하나씩 고르면 됩니다.') +
          '</p><a class="cd-btn" href="#/loja" data-close>' + L('Ver a loja', 'Browse the shop', '쇼핑하기') + '</a></div>';
      } else {
        const m = '<b>' + money(left) + '</b>';
        h += '<div class="cd-ship"><p>' + (left > 0 ? L('Faltam ' + m + ' para o envio grátis.', m + ' away from free shipping.', '무료 배송까지 ' + m + ' 남았습니다.') :
          L('Tem <b>envio grátis</b> nesta encomenda.', 'This order ships <b>free</b>.', '이 주문은 <b>무료 배송</b>입니다.')) + '</p>' +
          '<span class="cd-bar"><span style="--p:' + Math.min(1, total / FREE_SHIP) + '"></span></span></div><ul class="cd-items">';
        for (const it of list) {
          const p = byId[it.id];
          h += '<li class="cd-item">' + thumb(p) + '<div class="cd-info"><span class="cd-brand">' + esc(p.b) + '</span><a class="cd-name" href="#/produto/' + p.id + '" data-close>' + esc(p.n) + '</a>' +
            '<div class="cd-row"><span class="cd-qty"><button type="button" data-q="' + p.id + '" data-d="-1" aria-label="' + L('Menos um', 'One less', '하나 빼기') + '">−</button><output>' + it.q + '</output><button type="button" data-q="' + p.id + '" data-d="1" aria-label="' + L('Mais um', 'One more', '하나 더') + '">+</button></span>' +
            '<span class="cd-price">' + money(p.p * it.q) + '</span></div><button class="cd-rm" type="button" data-q="' + p.id + '" data-d="-999">' + L('Remover', 'Remove', '삭제') + '</button></div></li>';
        }
        h += '</ul><div class="cd-foot"><p class="cd-total"><span>' + L('Total', 'Total', '합계') + '</span><b>' + money(total) + '</b></p><p class="cd-muted">' +
          L('Portes e código WELCOME10 aplicados no passo seguinte.', 'Shipping and the WELCOME10 code are applied at the next step.', '배송비와 WELCOME10 코드는 다음 단계에서 적용됩니다.') +
          '</p><button class="cd-btn" type="button" data-checkout>' + L('Finalizar compra', 'Check out', '결제하기') + '</button></div>';
      }
      d.innerHTML = h;
    };
    d.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) { const it = items.find(x => x.id === q.dataset.q); cart.set(q.dataset.q, it ? it.q + Number(q.dataset.d) : 0); return; }
      if (e.target.closest('[data-checkout]')) {
        if (opts.onCheckout) { d.close(); opts.onCheckout(); }
        else toast(L('Neste protótipo, o checkout liga à loja real.', 'In this prototype, checkout links to the real shop.', '이 프로토타입에서는 결제가 실제 상점으로 연결됩니다.'));
        return;
      }
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

  const setLang = l => {
    if (!LANGS.includes(l)) return;
    lang = l;
    document.documentElement.lang = HTML_LANG[l];
    try { localStorage.setItem('ng-lang-' + MOCK, l); } catch (e) {}
  };

  window.NG = {
    STEPS, INGREDIENTS, CATALOG, BRANDS, ROUTINES, byId, money, esc, cart, router, drawer, toast, FREE_SHIP,
    L, LANGS, setLang, get lang() { return lang; }
  };
})();
