const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
let screen={},callback,scrolls=[];
const root={querySelector:()=>screen};
const window={scrollTo:value=>scrolls.push(value)};
const document={getElementById:()=>root,createElement:()=>({}),head:{appendChild(){}}};
const history={scrollRestoration:'auto'};
vm.runInNewContext(fs.readFileSync('page-top-reset.js','utf8'),{
  window,document,history,MutationObserver:class{constructor(fn){callback=fn}observe(){}}
});
assert.equal(history.scrollRestoration,'manual');
assert.equal(scrolls.length,0,'late script installation must not interrupt a gesture');
screen={};callback();
assert.equal(scrolls.length,1,'one reset per committed screen');
assert.equal(scrolls[0].top,0);
for(let i=0;i<20;i++)callback();
assert.equal(scrolls.length,1,'child enhancements must not repeat the reset');
screen=null;callback();assert.equal(scrolls.length,1);
screen={};callback();assert.equal(scrolls.length,2,'back/forward screen replacement resets once');
assert(!fs.readFileSync('fundamentals-learning-flow.js','utf8').includes('scrollTo'));
assert(!fs.readFileSync('highlight-card-style.js','utf8').includes('content-visibility:auto'));
console.log('Navigation ownership regression tests passed');
