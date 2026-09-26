const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const official = ['index.html', 'typography-standard.js', 'sw.js'].map(f => fs.readFileSync(path.join(root,f)));
require('./prepare-test-assets.js');
const dir = path.join(root,'android/app/build/generated/testAssets/academy');
const html = fs.readFileSync(path.join(dir,'index.html'),'utf8');
assert(html.includes('academy-test.css'));
for (const name of fs.readdirSync(root).filter(f=>f.endsWith('.html'))) {
  assert(fs.readFileSync(path.join(dir,name),'utf8').includes('academy-test.css'), name+' TEST font');
}
for (const module of ['academy-visual-system.js','typography-standard.js','release-compliance.js','session-reset.js']) assert(html.includes(module),module+' must be bootstrapped');
assert(!html.includes("navigator.serviceWorker.register("));
assert(fs.readFileSync(path.join(dir,'academy-test.css'),'utf8').includes('Protest Riot'));
assert.deepEqual(fs.readFileSync(path.join(dir,'fonts/ProtestRiot-Regular.ttf')), fs.readFileSync(path.join(root,'android/app/src/debug/assets/test-fonts/ProtestRiot-Regular.ttf')));
for (const file of fs.readdirSync(root).filter(f=>f.endsWith('.js')&&!f.startsWith('test-')&&f!=='sw.js')) {
  assert.deepEqual(fs.readFileSync(path.join(dir,file)),fs.readFileSync(path.join(root,file)),file);
}
['index.html','typography-standard.js','sw.js'].forEach((f,i)=>assert.deepEqual(fs.readFileSync(path.join(root,f)),official[i]));
console.log('PASS: TEST assets include the exact font, all runtime modules, and leave official assets unchanged.');
