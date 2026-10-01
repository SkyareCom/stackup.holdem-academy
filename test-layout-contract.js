const fs=require('fs');
const assert=require('node:assert/strict');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');

const marker='id="stackup-academy-layout-audit-20260930"';
assert(index.includes(marker),'final layout audit style is missing');
assert(index.lastIndexOf(marker)>index.lastIndexOf('PADRAO DE ESPACAMENTO'),'audit layer must come after legacy spacing rules');
assert(index.includes('--academy-ui-x:16px')&&index.includes('--academy-ui-y:12px')&&index.includes('--academy-ui-i:8px')&&index.includes('--academy-ui-pad:14px'),'spacing tokens must be 16/12/8/14');
assert(index.includes('grid-template-columns:repeat(5,minmax(0,1fr))!important'),'footer must remain one row with five columns');
assert(index.includes('id="stackup-academy-card-alignment-20261001"'),'2.1.6 alignment hotfix must be present');
assert(index.lastIndexOf('id="stackup-academy-card-alignment-20261001"')>index.lastIndexOf('id="stackup-academy-layout-audit-20260930"'),'alignment hotfix must override the prior layout audit');
assert(index.includes('font-size:8px!important'),'footer label font must be 8px');
assert(index.includes('#app #home .tabbar .tab')&&index.includes('align-items:center!important')&&index.includes('text-align:center!important'),'footer icons and labels must be centered');
assert(index.includes('#app #home .tile.tcard .hic')&&index.includes('flex:0 0 48px!important'),'menu card icons must use a fixed anchor');
assert(index.includes('grid-template-rows:30px 54px!important'),'menu card title/description geometry must use fixed aligned tracks');
assert(index.includes('-webkit-line-clamp:3!important'),'menu card descriptions must allow three aligned lines without clipping');
assert(index.includes('const TABS=["home","fund","mod","prat","perfil"];'),'footer fifth route must be Profile');
assert(index.includes('perfil:"t_perfil"'),'footer fifth label must be Perfil/Profile');
assert(index.includes('#app .view .evneed')&&index.includes('text-align:left!important'),'plan description must follow left-aligned editorial contract');
assert(index.includes('overflow-wrap:anywhere!important'),'long copy must have an overflow escape hatch');
assert(index.includes('const APP_VERSION="2.1.6";'),'web app version must match release 2.1.6');
assert(index.includes('#app .tab span')&&index.includes('overflow:hidden!important'),'footer labels must not spill outside their cells');
assert(index.includes('#app .pfopts')&&index.includes('gap:var(--academy-ui-y)!important'),'plan cards must keep vertical separation');
assert(sw.includes('academy-v2.1.6-card-align-footer8-20261001'),'service-worker cache must match the cleaned frontend release');
assert(sw.includes('"auth-production.js"')&&sw.includes('"billing-production.js"'),'runtime auth/billing scripts must be cached');

const removedLegacy=[
  'academy-loader.js','academy-visual-system.js','typography-standard.js',
  'engine.js','modalities-module.js','practice-module.js',
  'fonts/love-ya-like-a-sister.ttf','privacy-policy.html',
  'icon-192.png','icon-512.png'
];
for(const file of removedLegacy) assert(!fs.existsSync(file),`legacy frontend artifact must stay removed: ${file}`);

console.log('Layout/current frontend contract OK');
