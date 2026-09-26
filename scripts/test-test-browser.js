const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../android/app/build/generated/testAssets/academy');
const server=http.createServer((req,res)=>{
  const file=path.join(root,new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));
  if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404);return res.end();}
  const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.ttf':'font/ttf','.png':'image/png','.webp':'image/webp'};
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await chromium.launch();
  try {
    const page=await browser.newPage({viewport:{width:360,height:800},isMobile:true,hasTouch:true});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(()=>document.fonts.ready);
    async function check(label){
      await page.waitForTimeout(500);
      const result=await page.evaluate(()=>({
        font:document.fonts.check('16px "Protest Riot"'),
        wrong:[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length&&e.textContent.trim()&&!getComputedStyle(e).fontFamily.includes('Protest Riot')).map(e=>e.tagName),
        overflow:document.documentElement.scrollWidth>innerWidth+1
      }));
      assert(result.font,label+' font loaded');assert.deepEqual(result.wrong,[],label+' global font');
      assert(!result.overflow,label+' horizontal overflow');
      console.log('PASS TEST browser: '+label);
    }
    await check('home');
    for(const key of ['fundamentos','modalidades','pratica']){
      await page.evaluate(k=>stage(k,1),key);
      await page.waitForTimeout(1500);
      await check(key);
      // Lazy modules normalize the lesson catalog after the first lesson opens.
      for(let i=0;i<await page.evaluate(k=>D[k].i.length,key);i++){
        await page.evaluate(([k,n])=>lesson(k,n,1),[key,i]);
        await check(key+'/'+i);
      }
    }
    assert.deepEqual(errors,[]);
    fs.mkdirSync('test-diagnostics',{recursive:true});
    await page.evaluate(()=>home());
    await page.screenshot({path:'test-diagnostics/browser-home.png',fullPage:true});
    for (const name of ['privacy.html','privacy-policy.html']) {
      await page.goto(`http://127.0.0.1:${server.address().port}/${name}`);
      await page.evaluate(()=>document.fonts.ready);
      await check(name);
    }
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
