const CACHE="stackup-academy-v31";
const ASSETS=["./","./index.html","./manifest.webmanifest","./engine.js","./positions-table.js","./fundamentals-details.js","./misdeal-staff-details.js","./terminology-profiles-details.js","./strategic-concepts-details.js","./terminology-extra-terms.js","./cash-tournament-details.js","./highlight-card-style.js","./etiquette-details.js","./other-rules-details.js","./fundamentals-interactive-bank.js","./fundamentals-interactive.js","./fundamentals-progress-panel.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();const clients=await self.clients.matchAll({type:"window"});await Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null)));})())});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(async resp=>{
      const type=resp.headers.get("content-type")||"";
      if(!type.includes("text/html"))return resp;
      let html=await resp.text();
      html=html.replace(/sw\.js\?v=\d+/g,"sw.js?v=31");
      html=html.replace(/terminology-extra-terms\.js\?v=\d+/g,"terminology-extra-terms.js?v=2");
      html=html.replace(/highlight-card-style\.js\?v=\d+/g,"highlight-card-style.js?v=2");
      html=html.replace(/fundamentals-interactive-bank\.js\?v=\d+/g,"fundamentals-interactive-bank.js?v=1");
      html=html.replace(/fundamentals-interactive\.js\?v=\d+/g,"fundamentals-interactive.js?v=3");
      html=html.replace(/fundamentals-progress-panel\.js\?v=\d+/g,"fundamentals-progress-panel.js?v=1");
      if(!html.includes("positions-table.js"))html=html.replace("</body>",'<script src="./positions-table.js?v=3"></script></body>');
      if(!html.includes("fundamentals-details.js"))html=html.replace("</body>",'<script src="./fundamentals-details.js?v=3"></script></body>');
      if(!html.includes("misdeal-staff-details.js"))html=html.replace("</body>",'<script src="./misdeal-staff-details.js?v=1"></script></body>');
      if(!html.includes("terminology-profiles-details.js"))html=html.replace("</body>",'<script src="./terminology-profiles-details.js?v=1"></script></body>');
      if(!html.includes("strategic-concepts-details.js"))html=html.replace("</body>",'<script src="./strategic-concepts-details.js?v=1"></script></body>');
      if(!html.includes("terminology-extra-terms.js"))html=html.replace("</body>",'<script src="./terminology-extra-terms.js?v=2"></script></body>');
      if(!html.includes("cash-tournament-details.js"))html=html.replace("</body>",'<script src="./cash-tournament-details.js?v=1"></script></body>');
      if(!html.includes("highlight-card-style.js"))html=html.replace("</body>",'<script src="./highlight-card-style.js?v=2"></script></body>');
      if(!html.includes("etiquette-details.js"))html=html.replace("</body>",'<script src="./etiquette-details.js?v=2"></script></body>');
      if(!html.includes("other-rules-details.js"))html=html.replace("</body>",'<script src="./other-rules-details.js?v=1"></script></body>');
      if(!html.includes("fundamentals-interactive-bank.js"))html=html.replace("</body>",'<script src="./fundamentals-interactive-bank.js?v=1"></script></body>');
      if(!html.includes("fundamentals-interactive.js"))html=html.replace("</body>",'<script src="./fundamentals-interactive.js?v=3"></script></body>');
      if(!html.includes("fundamentals-progress-panel.js"))html=html.replace("</body>",'<script src="./fundamentals-progress-panel.js?v=1"></script></body>');
      const headers=new Headers(resp.headers);headers.set("content-type","text/html; charset=utf-8");
      return new Response(html,{status:resp.status,statusText:resp.statusText,headers});
    }).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))))
});