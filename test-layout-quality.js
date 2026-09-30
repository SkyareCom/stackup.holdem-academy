const fs=require('fs');
const assert=require('assert');

const index=fs.readFileSync('index.html','utf8');
const marker='<style id="academy-ui-quality-normalization">';
const start=index.indexOf(marker);
assert(start>=0,'final UI quality normalization style is present');
assert.equal(start,index.lastIndexOf('<style'),'UI quality normalization is the last static style block');
const end=index.indexOf('</style>',start);
assert(end>start,'UI quality normalization style closes correctly');
const css=index.slice(start,end);

assert(css.includes('--gx:16px')&&css.includes('--gy:12px')&&css.includes('--gi:8px')&&css.includes('--pad:14px'),
  'spacing scale is 16/12/8/14');
assert(css.includes('gap:var(--gy)!important'),'structural/card vertical gap is normalized');
assert(css.includes('padding:var(--pad)!important'),'editorial card padding is normalized');
assert(css.includes('text-align:left!important'),'editorial text alignment is left');
assert(css.includes('overflow-wrap:anywhere!important'),'long copy is allowed to wrap');
assert(css.includes('white-space:normal!important'),'legacy nowrap is reset for editorial copy');
assert(css.includes('text-overflow:clip!important'),'legacy ellipsis is reset for card copy');
assert(css.includes('grid-template-columns:repeat(5,minmax(0,1fr))!important'),
  'footer remains five columns in one row');
assert(css.includes('#app .qcard li + li')&&css.includes('margin-top:var(--gi)!important'),
  'list item vertical rhythm is normalized');
assert(!index.includes('alinhamento editorial: textos sempre pela esquerda'),
  'obsolete alignment patch was removed');
assert(!index.includes('REGRA GLOBAL: textos editoriais do app alinhados pela esquerda'),
  'duplicate global alignment patch was removed');

console.log('PASS UI layout quality audit: cascade, spacing, wrapping, cards and footer normalized.');
