const fs=require('fs');
const assert=require('assert');

const index=fs.readFileSync('index.html','utf8');
const marker='<style id="stackup-academy-layout-audit-20260930">';
const start=index.indexOf(marker);
assert(start>=0,'final UI quality normalization style is present');
assert.equal(start,index.lastIndexOf('<style'),'canonical UI audit is the last static style block');
const end=index.indexOf('</style>',start);
assert(end>start,'UI quality normalization style closes correctly');
const css=index.slice(start,end);

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
assert(index.includes('const TABS=["home","fund","mod","prat","perfil"];'),'footer fifth route is Profile');
assert(css.includes('#app .view li+li')&&css.includes('margin-top:var(--academy-ui-i)!important'),
  'list item vertical rhythm is normalized');
assert(!index.includes('alinhamento editorial: textos sempre pela esquerda'),
  'obsolete alignment patch was removed');
assert(!index.includes('REGRA GLOBAL: textos editoriais do app alinhados pela esquerda'),
  'duplicate global alignment patch was removed');

console.log('PASS UI layout quality audit: cascade, spacing, wrapping, cards and footer normalized.');
