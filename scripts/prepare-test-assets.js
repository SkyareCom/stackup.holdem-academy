// Build a private, offline snapshot for debug only. Never edits hosted assets.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'android/app/build/generated/testAssets/academy');
fs.mkdirSync(out, {recursive:true});
for (const name of fs.readdirSync(root)) {
  if (!/\.(js|html|png|webp|webmanifest)$/.test(name) || name.startsWith('test-') || name === 'sw.js') continue;
  fs.copyFileSync(path.join(root,name),path.join(out,name));
}
fs.cpSync(path.join(root,'fonts'),path.join(out,'fonts'),{recursive:true});
fs.copyFileSync(path.join(root,'android/app/src/debug/assets/test-fonts/ProtestRiot-Regular.ttf'),path.join(out,'fonts/ProtestRiot-Regular.ttf'));
let html = fs.readFileSync(path.join(out,'index.html'),'utf8');
// Apply the same enhancements the official service worker adds on navigation,
// including its visual system, typography sizing and lightweight core modules.
html = vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8')+'\nenhanceHtml(source)', {
  source:html, self:{addEventListener(){}},
}, {timeout:1000});
const registration = "if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=120').catch(()=>{}));";
if (!html.includes(registration)) throw new Error('Service worker registration changed; review the offline snapshot.');
html = html.replace(registration,'').replace('</head>','<link rel="stylesheet" href="./academy-test.css"></head>');
fs.writeFileSync(path.join(out,'index.html'),html);
for (const name of fs.readdirSync(out).filter(f=>f.endsWith('.html')&&f!=='index.html')) {
  const file=path.join(out,name);
  fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('</head>','<link rel="stylesheet" href="./academy-test.css"></head>'));
}
fs.writeFileSync(path.join(out,'academy-test.css'), `@font-face {
  font-family: 'Protest Riot';
  src: url('./fonts/ProtestRiot-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
/* Extra specificity keeps lazy-loaded modules from restoring the official font.
   Only the family changes: all existing sizes, spacing and layout remain. */
html:root, html:root body, html:root body *, html:root body *::before, html:root body *::after {
  font-family: 'Protest Riot', sans-serif !important;
}
`);
console.log('Prepared Academy TEST offline assets.');
