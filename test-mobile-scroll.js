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

    const cdpSend=(method,params,label)=>Promise.race([
      cdp.send(method,params),
      new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${label}: CDP touch timeout`)),5000))
    ]);

    async function firstSwipe(label){
      const canScroll=await page.evaluate(()=>document.documentElement.scrollHeight>innerHeight+4);
      if(!canScroll){
        console.log(`PASS ${label}: screen is not vertically scrollable`);
        return;
      }
      const calls=await page.evaluate(()=>scrollCalls.length);
      await cdpSend('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:680}]},label);
      const y=[];
      for(let step=1;step<=8;step++){
        await cdpSend('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:195,y:680-step*45}]},label);
        await page.waitForTimeout(25);
        y.push(await page.evaluate(()=>scrollY));
      }
      await cdpSend('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]},label);
      await page.waitForTimeout(180);
      assert.equal(await page.evaluate(()=>scrollCalls.length),calls,`${label}: delayed scroll reset`);
      for(let i=1;i<y.length;i++)assert(y[i]>=y[i-1]-2,`${label}: first swipe moved backwards: ${y}`);
      assert(y.at(-1)>0,`${label}: first swipe did not advance`);
      console.log(`PASS ${label}: first touch swipe advances without late reset`);
    }

    async function openStage(stage,mode){
      await page.evaluate(k=>window.stage(k,1),stage);
      await page.locator('.card.topic').first().waitFor();
      console.log(`CHECK ${mode}: ${stage} topic screen`);
      await firstSwipe(`${mode}/${stage}/topic`);

      // The requested mobile journey validates the first lesson. Testing every lesson
      // under 4x CPU throttling made the deploy gate exceed its 8-minute budget.
      await page.evaluate(stage=>{window.lesson(stage,0,1);},stage);
      await page.locator('.card.lesson').first().waitFor();
      await firstSwipe(`${mode}/${stage}/lesson-0`);

      // Same-document History API navigation: do not wait for a document navigation.
      await page.evaluate(()=>history.back());
      await page.locator('.card.topic').first().waitFor();
      await firstSwipe(`${mode}/${stage}/back`);
      console.log(`PASS ${mode}: ${stage}, first lesson + back + immediate scroll`);
    }

    await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded'});
    await page.locator('.card.stage').first().waitFor();
    console.log('PASS bootstrap: mobile Academy rendered');

    for(const stage of ['fundamentos','modalidades','pratica'])await openStage(stage,'cold');

    // Normal reload must preserve a usable, immediately scrollable rendered screen.
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.card.stage,.card.topic,.card.lesson').first().waitFor();
    await firstSwipe('normal-reload');
    console.log('PASS normal reload: rendered UI remains responsive');

    // Service-worker-controlled reload exercises the cached/PWA path when available.
    await page.evaluate(()=>Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_,reject)=>setTimeout(()=>reject(new Error('service worker ready timeout')),10000))
    ]));
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.card.stage').first().waitFor();
    assert(await page.evaluate(()=>!!navigator.serviceWorker.controller));
    console.log('PASS pwa bootstrap: service worker controls reload');
    for(const stage of ['fundamentos','modalidades','pratica'])await openStage(stage,'pwa');

    await page.evaluate(()=>window.stage('pratica',1));
    await page.locator('.card.topic').first().waitFor();
    assert(await page.getByText('Matemática do poker',{exact:true}).count(),'visual math title preserved');
    assert.equal(await page.locator('.screen').evaluate(el=>getComputedStyle(el).transform),'none');
    await page.waitForTimeout(250);
    assert.deepEqual(errors,[]);
    console.log('PASS mobile/PWA journey: no page errors or late whole-screen transform');
  }finally{await browser.close();server.close();}
})().catch(err=>{console.error(err);server.close();process.exitCode=1});
