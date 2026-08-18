const CACHE_NAME="controle-atividade-pwa-diagnostico-v1";
const BASE="/Controle-de-Atividade/";
const ASSETS=[
  BASE, BASE+"index.html", BASE+"app.js", BASE+"manifest.json",
  BASE+"icons/icon-192.png", BASE+"icons/icon-512.png"
];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const u=new URL(e.request.url);
  if(u.pathname.endsWith("/")||u.pathname.endsWith(".html")||u.pathname.endsWith(".js")||u.pathname.endsWith(".json")){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});