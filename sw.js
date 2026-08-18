const CACHE="controle-atividade-pwa-v7";
const ASSETS=["./","./index.html","./app.js","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  // Sempre buscar HTML/JS/manifest atuais; cache para os ícones.
  if(url.pathname.endsWith("/") || url.pathname.endsWith(".html") || url.pathname.endsWith(".js") || url.pathname.endsWith(".json")){
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
  } else {
    event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
  }
});