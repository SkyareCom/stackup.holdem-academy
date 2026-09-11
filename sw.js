const CACHE='stackup-academy-v68';
const SW_VERSION=68;
const ASSETS=[
  './','./index.html','./privacy.html','./manifest.webmanifest','./engine.js','./session-reset.js','./language-selector.js','./i18n-en-us-phrases-1.js','./i18n-en-us-phrases-2.js','./i18n-en-us-phrases-3.js','./i18n-en-us-words.js','./i18n-en-us-words-extra-1.js','./i18n-en-us-words-extra-2.js','./i18n-en-us-words-extra-3.js','./i18n-en-us-words-extra-4.js','./i18n-en-us.js',
  './positions-table.js','./fundamentals-details.js','./misdeal-staff-details.js','./terminology-profiles-details.js',
  './strategic-concepts-details.js','./terminology-extra-terms.js','./cash-tournament-details.js','./highlight-card-style.js',
  './etiquette-details.js','./other-rules-details.js','./fundamentals-learning-flow.js','./fundamentals-interactive-bank.js',
  './fundamentals-visual-layer.js','./fundamentals-interactive.js','./fundamentals-progress-panel.js','./modalities-module.js',
  './modalities-depth-details.js','./mixed-games-module.js','./practice-module.js','./practice-table.js','./practice-advanced-bank.js',
  './practice-advanced.js','./practice-math-odds.js','./portuguese-corrections.js','./cover-layout.js','./release-compliance.js',
  './header-logo-transparent.png','./typography-standard.js','./icon-192.png','./icon-512.png'
];
const SCRIPTS=[
  ['session-reset.js',1],
  ['language-selector.js',3],
  ['i18n-en-us-phrases-1.js',2],
  ['i18n-en-us-phrases-2.js',2],
  ['i18n-en-us-phrases-3.js',1],
  ['i18n-en-us-words.js',2],
  ['i18n-en-us-words-extra-1.js',1],
  ['i18n-en-us-words-extra-2.js',1],
  ['i18n-en-us-words-extra-3.js',1],
  ['i18n-en-us-words-extra-4.js',1],
  ['i18n-en-us.js',3],
  ['positions-table.js',4],
  ['fundamentals-details.js',3],
  ['misdeal-staff-details.js',1],
  ['terminology-profiles-details.js',1],
  ['strategic-concepts-details.js',1],
  ['terminology-extra-terms.js',2],
  ['cash-tournament-details.js',1],
  ['highlight-card-style.js',27],
  ['etiquette-details.js',2],
  ['other-rules-details.js',1],
  ['fundamentals-learning-flow.js',1],
  ['fundamentals-interactive-bank.js',1],
  ['fundamentals-visual-layer.js',2],
  ['fundamentals-interactive.js',3],
  ['fundamentals-progress-panel.js',1],
  ['modalities-module.js',1],
  ['modalities-depth-details.js',1],
  ['mixed-games-module.js',2],
  ['practice-module.js',1],
  ['practice-table.js',2],
  ['practice-advanced-bank.js',1],
  ['practice-advanced.js',2],
  ['practice-math-odds.js',2],
  ['portuguese-corrections.js',1],
  ['cover-layout.js',8],
  ['release-compliance.js',1],
  ['typography-standard.js',2]
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window'});
    await Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null)));
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
  if(!html.includes('stackup-header-logo-size')){
    html=html.replace('</head>','<style id="stackup-header-logo-size">.brandin .logo[data-stackup-logo="1"]{width:80px!important;height:80px!important;flex:0 0 80px!important;object-fit:contain!important;background:transparent!important}</style></head>');
  }
  if(!html.includes('stackup-font-lock')){
    html=html.replace('</head>','<style id="stackup-font-lock">html,body,body *{font-family:\'Love Ya Like A Sister\',cursive!important}.navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}</style></head>');
  }
  for(const [name,version] of SCRIPTS){
    if(!html.includes(name))html=html.replace('</body>',`<script src="./${name}?v=${version}"></script></body>`);
  }
  return html;
}

async function appShellResponse(request){
  let response;
  try{
    response=await fetch(request);
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
  }catch(_){
    response=await caches.match('./index.html');
  }
  if(!response)return new Response('Offline',{status:503,headers:{'content-type':'text/plain; charset=utf-8'}});
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  const html=enhanceHtml(await response.text());
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(html,{status:200,statusText:'OK',headers});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    const url=new URL(event.request.url);
    const isAppShell=url.pathname.endsWith('/')||url.pathname.endsWith('/index.html');
    if(isAppShell){
      event.respondWith(appShellResponse(event.request));
      return;
    }
    event.respondWith(
      fetch(event.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      }).catch(()=>caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request).then(response=>response||caches.match('./index.html')))
  );
});
