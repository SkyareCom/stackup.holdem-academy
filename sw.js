const CACHE="stackup-academy-v62";
const ASSETS=["./","./index.html","./privacy.html","./manifest.webmanifest","./engine.js","./positions-table.js","./fundamentals-details.js","./misdeal-staff-details.js","./terminology-profiles-details.js","./strategic-concepts-details.js","./terminology-extra-terms.js","./cash-tournament-details.js","./highlight-card-style.js","./etiquette-details.js","./other-rules-details.js","./fundamentals-learning-flow.js","./fundamentals-interactive-bank.js","./fundamentals-visual-layer.js","./fundamentals-interactive.js","./fundamentals-progress-panel.js","./modalities-module.js","./modalities-depth-details.js","./mixed-games-module.js","./practice-module.js","./practice-table.js","./practice-advanced-bank.js","./practice-advanced.js","./practice-math-odds.js","./portuguese-corrections.js","./cover-layout.js","./release-compliance.js","./medalhão_heráldico_dourado_e_esmeralda.png","./typography-standard.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();const clients=await self.clients.matchAll({type:"window"});await Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null)));})())});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    const url=new URL(event.request.url);
    const isAppShell=url.pathname.endsWith("/")||url.pathname.endsWith("/index.html");
    if(!isAppShell){
      event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request)));
      return;
    }
    event.respondWith(fetch(event.request).then(async resp=>{
      const type=resp.headers.get("content-type")||"";
      if(!type.includes("text/html"))return resp;
      let html=await resp.text();
      html=html.replace(/sw\.js\?v=\d+/g,"sw.js?v=62");
      html=html.replace(/positions-table\.js\?v=\d+/g,"positions-table.js?v=4");
      html=html.replace(/terminology-extra-terms\.js\?v=\d+/g,"terminology-extra-terms.js?v=2");
      html=html.replace(/highlight-card-style\.js\?v=\d+/g,"highlight-card-style.js?v=26");
      html=html.replace(/fundamentals-learning-flow\.js\?v=\d+/g,"fundamentals-learning-flow.js?v=1");
      html=html.replace(/fundamentals-interactive-bank\.js\?v=\d+/g,"fundamentals-interactive-bank.js?v=1");
      html=html.replace(/fundamentals-visual-layer\.js\?v=\d+/g,"fundamentals-visual-layer.js?v=2");
      html=html.replace(/fundamentals-interactive\.js\?v=\d+/g,"fundamentals-interactive.js?v=3");
      html=html.replace(/fundamentals-progress-panel\.js\?v=\d+/g,"fundamentals-progress-panel.js?v=1");
      html=html.replace(/modalities-module\.js\?v=\d+/g,"modalities-module.js?v=1");
      html=html.replace(/modalities-depth-details\.js\?v=\d+/g,"modalities-depth-details.js?v=1");
      html=html.replace(/mixed-games-module\.js\?v=\d+/g,"mixed-games-module.js?v=2");
      html=html.replace(/practice-module\.js\?v=\d+/g,"practice-module.js?v=1");
      html=html.replace(/practice-table\.js\?v=\d+/g,"practice-table.js?v=2");
      html=html.replace(/practice-advanced-bank\.js\?v=\d+/g,"practice-advanced-bank.js?v=1");
      html=html.replace(/practice-advanced\.js\?v=\d+/g,"practice-advanced.js?v=2");
      html=html.replace(/practice-math-odds\.js\?v=\d+/g,"practice-math-odds.js?v=2");
      html=html.replace(/portuguese-corrections\.js\?v=\d+/g,"portuguese-corrections.js?v=1");
      html=html.replace(/cover-layout\.js\?v=\d+/g,"cover-layout.js?v=7");
      html=html.replace(/release-compliance\.js\?v=\d+/g,"release-compliance.js?v=1");
      html=html.replace("</head>",'<style id="stackup-header-logo-size">.brandin .logo[data-stackup-logo="1"]{width:80px!important;height:80px!important;flex:0 0 80px!important;object-fit:contain!important;background:transparent!important}</style></head>');
      if(!html.includes("positions-table.js"))html=html.replace("</body>",'<script src="./positions-table.js?v=4"></script></body>');
      if(!html.includes("fundamentals-details.js"))html=html.replace("</body>",'<script src="./fundamentals-details.js?v=3"></script></body>');
      if(!html.includes("misdeal-staff-details.js"))html=html.replace("</body>",'<script src="./misdeal-staff-details.js?v=1"></script></body>');
      if(!html.includes("terminology-profiles-details.js"))html=html.replace("</body>",'<script src="./terminology-profiles-details.js?v=1"></script></body>');
      if(!html.includes("strategic-concepts-details.js"))html=html.replace("</body>",'<script src="./strategic-concepts-details.js?v=1"></script></body>');
      if(!html.includes("terminology-extra-terms.js"))html=html.replace("</body>",'<script src="./terminology-extra-terms.js?v=2"></script></body>');
      if(!html.includes("cash-tournament-details.js"))html=html.replace("</body>",'<script src="./cash-tournament-details.js?v=1"></script></body>');
      if(!html.includes("highlight-card-style.js"))html=html.replace("</body>",'<script src="./highlight-card-style.js?v=26"></script></body>');
      if(!html.includes("etiquette-details.js"))html=html.replace("</body>",'<script src="./etiquette-details.js?v=2"></script></body>');
      if(!html.includes("other-rules-details.js"))html=html.replace("</body>",'<script src="./other-rules-details.js?v=1"></script></body>');
      if(!html.includes("fundamentals-learning-flow.js"))html=html.replace("</body>",'<script src="./fundamentals-learning-flow.js?v=1"></script></body>');
      if(!html.includes("fundamentals-interactive-bank.js"))html=html.replace("</body>",'<script src="./fundamentals-interactive-bank.js?v=1"></script></body>');
      if(!html.includes("fundamentals-visual-layer.js"))html=html.replace("</body>",'<script src="./fundamentals-visual-layer.js?v=2"></script></body>');
      if(!html.includes("fundamentals-interactive.js"))html=html.replace("</body>",'<script src="./fundamentals-interactive.js?v=3"></script></body>');
      if(!html.includes("fundamentals-progress-panel.js"))html=html.replace("</body>",'<script src="./fundamentals-progress-panel.js?v=1"></script></body>');
      if(!html.includes("modalities-module.js"))html=html.replace("</body>",'<script src="./modalities-module.js?v=1"></script></body>');
      if(!html.includes("modalities-depth-details.js"))html=html.replace("</body>",'<script src="./modalities-depth-details.js?v=1"></script></body>');
      if(!html.includes("mixed-games-module.js"))html=html.replace("</body>",'<script src="./mixed-games-module.js?v=2"></script></body>');
      if(!html.includes("practice-module.js"))html=html.replace("</body>",'<script src="./practice-module.js?v=1"></script></body>');
      if(!html.includes("practice-table.js"))html=html.replace("</body>",'<script src="./practice-table.js?v=2"></script></body>');
      if(!html.includes("practice-advanced-bank.js"))html=html.replace("</body>",'<script src="./practice-advanced-bank.js?v=1"></script></body>');
      if(!html.includes("practice-advanced.js"))html=html.replace("</body>",'<script src="./practice-advanced.js?v=2"></script></body>');
      if(!html.includes("practice-math-odds.js"))html=html.replace("</body>",'<script src="./practice-math-odds.js?v=2"></script></body>');
      if(!html.includes("portuguese-corrections.js"))html=html.replace("</body>",'<script src="./portuguese-corrections.js?v=1"></script></body>');
      if(!html.includes("cover-layout.js"))html=html.replace("</body>",'<script src="./cover-layout.js?v=7"></script></body>');
      if(!html.includes("release-compliance.js"))html=html.replace("</body>",'<script src="./release-compliance.js?v=1"></script></body>');
      if(!html.includes("typography-standard.js"))html=html.replace("</body>",'<script src="./typography-standard.js?v=1"></script></body>');
      const headers=new Headers(resp.headers);headers.set("content-type","text/html; charset=utf-8");
      return new Response(html,{status:resp.status,statusText:resp.statusText,headers});
    }).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))))
});