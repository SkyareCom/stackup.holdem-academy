const CACHE='stackup-academy-v110';
const SW_VERSION=110;
const ASSETS=[
  './fonts/love-ya-like-a-sister.ttf',
  './','./index.html','./privacy.html','./manifest.webmanifest','./engine.js','./session-reset.js','./language-selector.js','./i18n-en-us-phrases-1.js','./i18n-en-us-phrases-2.js','./i18n-en-us-phrases-3.js','./i18n-en-us-words.js','./i18n-en-us-words-extra-1.js','./i18n-en-us-words-extra-2.js','./i18n-en-us-words-extra-3.js','./i18n-en-us-words-extra-4.js','./i18n-en-us.js',
  './positions-table.js','./fundamentals-details.js','./misdeal-staff-details.js','./terminology-profiles-details.js',
  './strategic-concepts-details.js','./terminology-extra-terms.js','./cash-tournament-details.js','./highlight-card-style.js',
  './etiquette-details.js','./other-rules-details.js','./fundamentals-learning-flow.js','./fundamentals-interactive-bank.js',
  './fundamentals-visual-layer.js','./fundamentals-interactive.js','./fundamentals-progress-panel.js','./modalities-module.js',
  './modalities-depth-details.js','./mixed-games-module.js','./practice-module.js','./practice-table.js','./practice-advanced-bank.js',
  './practice-advanced.js','./practice-progress-layout.js','./table-rotation-guard.js','./math-card-structure.js','./practice-math-odds.js','./portuguese-corrections.js','./cover-layout.js','./release-compliance.js',
  './academy-loader.js','./academy-visual-system.js','./page-top-reset.js','./header-logo-transparent.png','./typography-standard.js','./icon-192.png','./icon-512.png'
];
const SCRIPTS=[
  ['session-reset.js',3],
  ['language-selector.js',4],
  ['i18n-en-us-phrases-1.js',2],
  ['i18n-en-us-phrases-2.js',2],
  ['i18n-en-us-phrases-3.js',2],
  ['i18n-en-us-words.js',2],
  ['i18n-en-us-words-extra-1.js',1],
  ['i18n-en-us-words-extra-2.js',1],
  ['i18n-en-us-words-extra-3.js',1],
  ['i18n-en-us-words-extra-4.js',2],
  ['i18n-en-us.js',5],
  ['positions-table.js',6],
  ['fundamentals-details.js',3],
  ['misdeal-staff-details.js',1],
  ['terminology-profiles-details.js',1],
  ['strategic-concepts-details.js',1],
  ['terminology-extra-terms.js',2],
  ['cash-tournament-details.js',1],
  ['highlight-card-style.js',41],
  ['etiquette-details.js',2],
  ['other-rules-details.js',2],
  ['fundamentals-learning-flow.js',4],
  ['fundamentals-interactive-bank.js',1],
  ['fundamentals-visual-layer.js',2],
  ['fundamentals-interactive.js',5],
  ['fundamentals-progress-panel.js',4],
  ['modalities-module.js',2],
  ['modalities-depth-details.js',1],
  ['mixed-games-module.js',3],
  ['practice-module.js',1],
  ['practice-table.js',3],
  ['practice-advanced-bank.js',2],
  ['practice-advanced.js',3],
  ['table-rotation-guard.js',3],
  ['math-card-structure.js',2],
  ['practice-math-odds.js',2],
  ['portuguese-corrections.js',5],
  ['cover-layout.js',10],
  ['release-compliance.js',1],
  ['academy-visual-system.js',4],
  ['page-top-reset.js',5],
  ['typography-standard.js',3],
  ['academy-loader.js',15]
];
const AUTO_SCRIPTS=new Set([
  'session-reset.js','highlight-card-style.js','fundamentals-learning-flow.js',
  'portuguese-corrections.js','cover-layout.js','release-compliance.js',
  'academy-visual-system.js','page-top-reset.js','typography-standard.js','academy-loader.js'
]);

async function precacheFresh(){
  const cache=await caches.open(CACHE);
  await Promise.all(ASSETS.map(async asset=>{
    const request=new Request(asset,{cache:'reload'});
    const response=await fetch(request);
    if(response.ok)await cache.put(request,response);
  }));
}

self.addEventListener('install',event=>{
  event.waitUntil(precacheFresh().then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

function escapeRegExp(value){
  return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}

function enhanceHtml(source){
  let html=source.replace(/sw\.js\?v=\d+/g,`sw.js?v=${SW_VERSION}`);
  for(const [name,version] of SCRIPTS){
    const re=new RegExp(`${escapeRegExp(name)}\\?v=\\d+`,'g');
    html=html.replace(re,`${name}?v=${version}`);
  }
  if(!html.includes('stackup-performance-guard')){
    const guard=`<script id="stackup-performance-guard">(()=>{if(window.__stackupObserverGuard)return;window.__stackupObserverGuard=1;const nativeObserve=MutationObserver.prototype.observe;MutationObserver.prototype.observe=function(target,options){const root=document.getElementById('root');if(root&&target===document.documentElement&&options&&options.childList&&options.subtree&&!options.attributes&&!options.characterData){return nativeObserve.call(this,root,{childList:true});}return nativeObserve.call(this,target,options);};})();</script>`;
    html=html.replace('</head>',guard+'</head>');
  }
  if(!html.includes('stackup-header-logo-size')){
    html=html.replace('</head>','<style id="stackup-header-logo-size">.brandin .logo[data-stackup-logo="1"]{width:80px!important;height:80px!important;flex:0 0 80px!important;object-fit:contain!important;background:transparent!important}</style></head>');
  }
  if(!html.includes('stackup-font-lock')){
    html=html.replace('</head>','<style id="stackup-font-lock">html,body,body *{font-family:\'Love Ya Like A Sister\',cursive!important}.navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}</style></head>');
  }
  for(const [name,version] of SCRIPTS){
    if(AUTO_SCRIPTS.has(name)&&!html.includes(name))html=html.replace('</body>',`<script src="./${name}?v=${version}"></script></body>`);
  }
  return html;
}

async function appShellResponse(request){
  let response;
  try{
    response=await fetch(request,{cache:'no-store'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(request,copy));
  }catch(_){
    response=await caches.match(request)||await caches.match('./index.html');
  }
  if(!response)return new Response('Offline',{status:503,headers:{'content-type':'text/plain; charset=utf-8'}});
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  const html=enhanceHtml(await response.text());
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(html,{status:200,statusText:'OK',headers});
}

async function networkFirst(request){
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(request,copy));
    return response;
  }catch(_){
    return (await caches.match(request))||(await caches.match(request,{ignoreSearch:true}))||new Response('Offline',{status:503});
  }
}

async function cacheFirst(request){
  const cached=await caches.match(request);
  if(cached)return cached;
  try{
    const response=await fetch(request);
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}
    return response;
  }catch(_){
    return (await caches.match(request,{ignoreSearch:true}))||new Response('Offline',{status:503});
  }
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(event.request.mode==='navigate'){
    const isAppShell=url.pathname.endsWith('/')||url.pathname.endsWith('/index.html');
    if(isAppShell){event.respondWith(appShellResponse(event.request));return;}
    event.respondWith(networkFirst(event.request));
    return;
  }
  const freshCode=url.origin===self.location.origin&&(/\.(?:js|css|json)$/i.test(url.pathname)||url.pathname.endsWith('.webmanifest'));
  event.respondWith(freshCode?networkFirst(event.request):cacheFirst(event.request));
});
