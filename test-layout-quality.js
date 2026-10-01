const fs=require('fs');
const assert=require('assert');

const index=fs.readFileSync('index.html','utf8');

const auditMarker='<style id="stackup-academy-layout-audit-20260930">';
const hotfixMarker='<style id="stackup-academy-card-alignment-20261001">';

const auditStart=index.indexOf(auditMarker);
const hotfixStart=index.indexOf(hotfixMarker);

assert(auditStart>=0,'canonical UI audit style is present');
assert(hotfixStart>auditStart,'2.1.6 card alignment hotfix must come after the canonical audit');
assert.equal(hotfixStart,index.lastIndexOf('<style'),'2.1.6 alignment hotfix must be the last static style block');

const auditEnd=index.indexOf('</style>',auditStart);
const hotfixEnd=index.indexOf('</style>',hotfixStart);
assert(auditEnd>auditStart,'canonical UI audit style closes correctly');
assert(hotfixEnd>hotfixStart,'2.1.6 alignment hotfix closes correctly');

const css=index.slice(auditStart,auditEnd);
const hotfix=index.slice(hotfixStart,hotfixEnd);

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
assert(hotfix.includes('grid-template-rows:30px 54px!important'),'card title and description tracks must remain aligned');
assert(hotfix.includes('-webkit-line-clamp:3!important'),'card descriptions must allow up to three lines');
assert(index.includes('const TABS=["home","fund","mod","prat","perfil"];'),'footer fifth route is Profile');
assert(css.includes('#app .view li+li')&&css.includes('margin-top:var(--academy-ui-i)!important'),
  'list item vertical rhythm is normalized');
assert(!index.includes('alinhamento editorial: textos sempre pela esquerda'),
  'obsolete alignment patch was removed');
assert(!index.includes('REGRA GLOBAL: textos editoriais do app alinhados pela esquerda'),
  'duplicate global alignment patch was removed');

assert(index.includes('PRATICA: 3 cards horizontais iguais, um por linha.'),'Practice three-horizontal-card style must be present');
assert(index.includes('AJUSTES 2026-10-01: Minha Evolucao, Base e Simulador.'),'evolution/base/simulator balance hotfix must be present');
assert(index.includes('function bindCardOrphans(txt)'),'card descriptions must protect short connector words from orphan lines');
assert(index.includes('bindCardOrphans(txt).split(/ +/)'),'card balancing must retain non-breaking connector spaces');
assert(index.includes('tw.classList.add("practice-three")'),'Practice must render the three horizontal cards as one full-width column');
console.log('PASS UI layout quality audit: cascade, spacing, aligned cards, wrapping and 8px footer normalized.');
