const C="agenda-v3",F=["./","index.html","manifest.json","fondo.jpg","icon-192.png","icon-512.png"];
const H=["www.gstatic.com","cdnjs.cloudflare.com"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!="GET"||!(u.origin==location.origin||H.includes(u.host)))return;
 e.respondWith(caches.open(C).then(async c=>{
  const m=await c.match(e.request);
  const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);
  return m||f;
 }));
});
