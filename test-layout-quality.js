const fs=require('fs');
const assert=require('assert');

const index=fs.readFileSync('index.html','utf8');

const auditMarker='<style id="stackup-academy-layout-audit-20260930">';
const hotfixMarker='<style id="stackup-academy-card-alignment-20261001">';
const descriptionMarker='<style id="stackup-academy-description-lift-20261002">';
const practiceFrozenMarker='<style id="stackup-academy-practice-frozen-anchors-20261002">';
const typographyMarker='<style id="stackup-academy-typography-lock-20261002">';

const auditStart=index.indexOf(auditMarker);
const hotfixStart=index.indexOf(hotfixMarker);
const descriptionStart=index.indexOf(descriptionMarker);
const practiceFrozenStart=index.indexOf(practiceFrozenMarker);
const typographyStart=index.indexOf(typographyMarker);

assert(auditStart>=0,'canonical UI audit style is present');
assert(hotfixStart>auditStart,'2.1.6 card alignment hotfix must come after the canonical audit');
assert(descriptionStart>hotfixStart,'description-only lift patch must come after the frozen card alignment hotfix');
assert(practiceFrozenStart>descriptionStart,'Practice frozen-anchor patch must come after the global description patch');
assert(typographyStart>practiceFrozenStart,'global typography lock must come after layout-specific patches');
assert.equal(typographyStart,index.lastIndexOf('<style'),'global typography lock must be the last static style block');
assert(!index.includes('stackup-academy-practice-description-balance-20261002'),'obsolete Practice description-only patch must be removed');

const auditEnd=index.indexOf('</style>',auditStart);
const hotfixEnd=index.indexOf('</style>',hotfixStart);
const descriptionEnd=index.indexOf('</style>',descriptionStart);
const practiceFrozenEnd=index.indexOf('</style>',practiceFrozenStart);
const typographyEnd=index.indexOf('</style>',typographyStart);
assert(auditEnd>auditStart,'canonical UI audit style closes correctly');
assert(hotfixEnd>hotfixStart,'2.1.6 alignment hotfix closes correctly');
assert(descriptionEnd>descriptionStart,'description-only lift patch closes correctly');
assert(practiceFrozenEnd>practiceFrozenStart,'Practice frozen-anchor patch closes correctly');
assert(typographyEnd>typographyStart,'global typography lock closes correctly');

const css=index.slice(auditStart,auditEnd);
const hotfix=index.slice(hotfixStart,hotfixEnd);
const descriptionCss=index.slice(descriptionStart,descriptionEnd);
const practiceFrozenCss=index.slice(practiceFrozenStart,practiceFrozenEnd);
const typographyCss=index.slice(typographyStart,typographyEnd);

assert(css.includes('--academy-ui-x:16px')&&css.includes('--academy-ui-y:12px')&&css.includes('--academy-ui-i:8px')&&css.includes('--academy-ui-pad:14px'),
  'spacing scale is 16/12/8/14');
assert(css.includes('gap:var(--academy-ui-y)!important'),'structural/card vertical gap is normalized');
assert(css.includes('padding:var(--academy-ui-pad)!important'),'editorial card padding is normalized');
assert(css.includes('text-align:left!important'),'editorial text alignment is left');
assert(css.includes('#app .tile.tcard .htx')&&css.includes('text-align:center!important'),'menu-card text remains centered at all menu depths');
assert(css.includes('overflow-wrap:anywhere!important'),'long copy is allowed to wrap');
assert(css.includes('white-space:normal!important'),'legacy nowrap is reset for editorial copy');
assert(css.includes('text-overflow:clip!important'),'legacy ellipsis is reset for card copy');
assert(css.includes('grid-template-columns:repeat(5,minmax(0,1fr))!important'),
  'footer remains five columns in one row');

assert(hotfix.includes('font-size:8px!important'),'footer labels must be 8px in 2.1.6');
assert(hotfix.includes('Idioma + Interacoes: selecao pelo botao inteiro, sem circulo/check.'),'full-button selection visual contract must be present');
assert(!index.includes('<span class="ck">'),'check-circle markup must be removed from language and interaction selectors');
assert(hotfix.includes('grid-template-rows:30px 54px!important'),'frozen title/description tracks must remain unchanged');
assert(descriptionCss.includes('transform:translateY(-4px)!important'),'card descriptions must move upward without moving title or icon');
assert(descriptionCss.includes('font-size:10px!important')&&descriptionCss.includes('line-height:1.15!important'),'card descriptions must use the compact global text rhythm');
assert(descriptionCss.includes('-webkit-line-clamp:4!important'),'card descriptions must allow up to four rendered lines');
assert(descriptionCss.includes('#app #home .tile.tcard .d2>span'),'balanced description lines must inherit the compact rhythm');
assert(!descriptionCss.includes('.hic'),'description-only patch must not touch frozen card icons');
assert(!descriptionCss.includes('.htx b'),'description-only patch must not touch frozen card titles');
assert(!descriptionCss.includes('.tower .tile.tcard{'),'description-only patch must not change card structure');
assert(practiceFrozenCss.includes('.tower.scroll.practice-four>.tile.tcard .htx'),'Practice frozen-anchor patch must target the text container only');
assert(practiceFrozenCss.includes('grid-template-rows:30px 32px!important'),'Practice title and description tracks must be fixed and equal across all four cards');
assert(practiceFrozenCss.includes('height:66px!important')&&practiceFrozenCss.includes('min-height:66px!important')&&practiceFrozenCss.includes('max-height:66px!important'),'Practice text container height must be fixed so content length cannot shift icons or titles');
assert(practiceFrozenCss.includes('.tower.scroll.practice-four>.tile.tcard .htx small'),'Practice description styling must remain scoped to Practice');
assert(practiceFrozenCss.includes('white-space:nowrap!important'),'Practice description lines must remain exactly two balanced lines');
assert(practiceFrozenCss.includes('font-size:clamp(9px,2.6vw,10px)!important'),'Practice descriptions must remain responsive on narrow screens');
assert(!practiceFrozenCss.includes('.hic'),'Practice frozen-anchor patch must not touch icon geometry');
assert(!practiceFrozenCss.includes('.htx b'),'Practice frozen-anchor patch must not restyle title geometry');
assert(!practiceFrozenCss.includes('>.tile.tcard{'),'Practice frozen-anchor patch must not change card structure');
assert(!index.includes('Overlock Academy'),'Overlock must be completely removed from Academy');
assert(typographyCss.includes("font-family:'Saira Semi Condensed','Saira Condensed',sans-serif!important"),'Saira Semi Condensed must be the Academy UI font');
assert(typographyCss.includes('font-size:12px!important'),'Academy UI text must be locked to 12px by default');
assert(typographyCss.includes('.tile.tcard .htx small')&&typographyCss.includes('font-size:10px!important'),'card descriptions must be exactly 10px');
assert(typographyCss.includes('.tabbar .tab span')&&typographyCss.includes('font-size:9px!important'),'footer labels are the only 9px typography exception');
assert(!typographyCss.includes('font-size:8px!important'),'final typography lock must not use 8px');
assert(!typographyCss.includes('font-size:11px!important'),'final typography lock must not use 11px');
assert(typographyCss.includes('#splash .spsub')&&typographyCss.includes('font-size:24px!important'),'splash STACKUP HOLD\'EM branding must keep its frozen size');
assert(typographyCss.includes('#splash .sptitle')&&typographyCss.includes('font-size:58px!important'),'splash ACADEMY branding must keep its frozen size');
assert(typographyCss.includes('#welcome .brand .sub')&&typographyCss.includes('clamp(20px,min(7vw,3.4vh),30px)'),'welcome STACKUP HOLD\'EM branding must keep its frozen size');
assert(typographyCss.includes('#welcome .brand .title')&&typographyCss.includes('clamp(40px,min(15vw,7.2vh),70px)'),'welcome ACADEMY branding must keep its frozen size');
assert(typographyCss.includes('#welcome .hero .logo')&&typographyCss.includes('width:min(200px,50vw,24vh)!important'),'welcome logo image size must remain frozen');
assert(index.includes('const TABS=["home","fund","mod","prat","perfil"];'),'footer fifth route is Profile');
assert(css.includes('#app .view li+li')&&css.includes('margin-top:var(--academy-ui-i)!important'),
  'list item vertical rhythm is normalized');
assert(!index.includes('alinhamento editorial: textos sempre pela esquerda'),
  'obsolete alignment patch was removed');
assert(!index.includes('REGRA GLOBAL: textos editoriais do app alinhados pela esquerda'),
  'duplicate global alignment patch was removed');

assert(index.includes('PRATICA: 4 cards em torre 2x2, conteudo centralizado.'),'Practice 2x2 four-card style must be present');
assert(index.includes('AJUSTES 2026-10-01: Minha Evolucao, Base e Simulador.'),'evolution/base/simulator balance hotfix must be present');
assert(index.includes('function bindCardOrphans(txt)'),'card descriptions must protect short connector words from orphan lines');
assert(index.includes('bindCardOrphans(txt).split(/ +/)'),'card balancing must retain non-breaking connector spaces');
assert(index.includes('function practiceListH()')&&index.includes('data-open="hist"'),'Practice must render Simulator, Quiz, Math and History in the four-card grid');
console.log('PASS UI layout quality audit: frozen icons/titles preserved; descriptions lifted and normalized without card-structure changes.');
