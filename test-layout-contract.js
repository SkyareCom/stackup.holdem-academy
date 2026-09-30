const fs=require('fs');
const assert=require('node:assert/strict');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const visual=fs.readFileSync('academy-visual-system.js','utf8');

const marker='id="stackup-academy-layout-audit-20260930"';
assert(index.includes(marker),'final layout audit style is missing');
assert(index.lastIndexOf(marker)>index.lastIndexOf('PADRAO DE ESPACAMENTO'),'audit layer must come after legacy spacing rules');
assert(index.includes('--academy-ui-x:16px')&&index.includes('--academy-ui-y:12px')&&index.includes('--academy-ui-i:8px')&&index.includes('--academy-ui-pad:14px'),'spacing tokens must be 16/12/8/14');
assert(index.includes('grid-template-columns:repeat(5,minmax(0,1fr))!important'),'footer must remain one row with five columns');
assert(index.includes('#app .view .evneed')&&index.includes('text-align:left!important'),'plan description must follow left-aligned editorial contract');
assert(index.includes('overflow-wrap:anywhere!important'),'long copy must have an overflow escape hatch');
assert(index.includes('#app .tab span')&&index.includes('overflow:hidden!important'),'footer labels must not spill outside their cells');
assert(index.includes('#app .pfopts')&&index.includes('gap:var(--academy-ui-y)!important'),'plan cards must keep vertical separation');
assert(sw.includes('academy-v2.1.1-layout-audit-20260930'),'service-worker cache must be bumped for layout audit');
assert(visual.includes('--academy-card-gap:12px')&&visual.includes('--academy-card-padding:14px')&&visual.includes('--academy-inner-gap:8px'),'legacy root visual system must share spacing rhythm');
console.log('Layout audit contract OK');
