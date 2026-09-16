// Run with Playwright available via NODE_PATH. Uses Chromium touch input,
// cold and service-worker-controlled reloads, and a throttled mobile CPU.
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const server=http.createServer((req,res)=>{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.join(__dirname,name==='/'?'index.html':name);
  if(!file.startsWith(__dirname)||!fs.existsSync(file)){res.writeHead(404);return res.end();}
  const types={'.html':'text/html','.js':'application/javascript','.png':'image/png','.ttf':'font/ttf','.webmanifest':'application/manifest+json'};
  res.setHeader('Content-Type',types[path.extname(file)]||'text/plain');
  res.end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:393,height:851},isMobile:true,hasTouch:true,deviceScaleFactor:2});
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const cdp=await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
    await page.addInitScript(()=>{
      window.scrollCalls=[];
      const scroll=window.scrollTo;
      window.scrollTo=function(...args){window.scrollCalls.push(args);return scroll.apply(this,args)};
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded'});
    await page.locator('.card.stage').first().waitFor();
    console.log('PASS bootstrap: mobile Academy rendered');
    for(const mode of ['cold','pwa']){
      if(mode==='pwa'){
        await page.evaluate(()=>Promise.race([
          navigator.serviceWorker.ready,
          new Promise((_,reject)=>setTimeout(()=>reject(new Error('service worker ready timeout')),10000))
        ]));
        await page.reload({waitUntil:'domcontentloaded'});
        await page.locator('.card.stage').first().waitFor();
        assert(await page.evaluate(()=>!!navigator.serviceWorker.controller));
        console.log('PASS pwa bootstrap: service worker controls reload');
      }
      for(const stage of ['fundamentos','modalidades','pratica']){
        await page.evaluate(k=>window.stage(k,1),stage);
        await page.locator('.card.topic').first().waitFor();
        const count=await page.locator('.card.topic').count();
        console.log(`CHECK ${mode}: ${stage}, ${count} lessons`);
        for(let index=0;index<count;index++){
          await page.evaluate(({stage,index})=>window.lesson(stage,index,1),{stage,index});
          await page.locator('.card.lesson').waitFor();
          const calls=await page.evaluate(()=>scrollCalls.length);
          const y=[];
          await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:680}]});
          for(let step=1;step<=8;step++){
            await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:195,y:680-step*45}]});
            await page.waitForTimeout(25);
            y.push(await page.evaluate(()=>scrollY));
          }
          await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
          await page.waitForTimeout(120);
          assert.equal(await page.evaluate(()=>scrollCalls.length),calls,`${mode}/${stage}/${index}: delayed scroll reset`);
          for(let i=1;i<y.length;i++)assert(y[i]>=y[i-1]-2,`${mode}/${stage}/${index}: first swipe moved backwards: ${y}`);
          assert(y.at(-1)>0,`${mode}/${stage}/${index}: first swipe did not advance`);
          // This app uses same-document History API navigation. Trigger history directly;
          // page.goBack() waits for a document navigation that never occurs in this SPA.
          await page.evaluate(()=>history.back());
          await page.locator('.card.topic').first().waitFor();
        }
        console.log(`PASS ${mode}: ${stage}, ${count} lessons, immediate touch swipe and history back`);
      }
      await page.evaluate(()=>window.stage('pratica',1));
      await page.locator('.card.topic').first().waitFor();
      assert(await page.getByText('Matemática do poker',{exact:true}).count(),'visual math title preserved');
      assert.equal(await page.locator('.screen').evaluate(el=>getComputedStyle(el).transform),'none');
    }
    assert.deepEqual(errors,[]);
  }finally{await browser.close();server.close();}
})().catch(err=>{console.error(err);server.close();process.exitCode=1});
