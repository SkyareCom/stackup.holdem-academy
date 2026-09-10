const CACHE="stackup-academy-v19";
const ASSETS=["./","./index.html","./manifest.webmanifest","./engine.js","./positions-table.js","./fundamentals-details.js","./misdeal-staff-details.js","./terminology-profiles-details.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();const clients=await self.clients.matchAll({type:"window"});await Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null)));})())});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(async resp=>{
      const type=resp.headers.get("content-type")||"";
      if(!type.includes("text/html"))return resp;
      let html=await resp.text();
      if(!html.includes("positions-table.js"))html=html.replace("</body>",'<script src="./positions-table.js?v=3"></script></body>');
      if(!html.includes("fundamentals-details.js"))html=html.replace("</body>",'<script src="./fundamentals-details.js?v=3"></script></body>');
      if(!html.includes("misdeal-staff-details.js"))html=html.replace("</body>",'<script src="./misdeal-staff-details.js?v=1"></script></body>');
      if(!html.includes("terminology-profiles-details.js"))html=html.replace("</body>",'<script src="./terminology-profiles-details.js?v=1"></script></body>');
      const headers=new Headers(resp.headers);
      headers.set("content-type","text/html; charset=utf-8");
      return new Response(html,{status:resp.status,statusText:resp.statusText,headers});
    }).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))))
});