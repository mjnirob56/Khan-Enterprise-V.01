const C="rfl-v12",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","banner.jpg","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
function offlinePage(req){return caches.match(req,{ignoreSearch:true}).then(m=>m||caches.match("index.html")).then(m=>m||caches.match("./"))}
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
if(["cdnjs.cloudflare.com","fonts.googleapis.com","fonts.gstatic.com"].includes(u.hostname)){e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>m)));return}
if(u.origin!==location.origin)return;
e.respondWith((async()=>{try{const r=await fetch(e.request);if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{})}return r}catch(err){const m=await offlinePage(e.request);if(m)return m;throw err}})())});
