const CACHE_NAME = "fortal-tech-pwa-v10";
const BASE = "/Controle-de-Atividade/";

const APP_SHELL = [
  BASE,
  BASE + "index.html",
  BASE + "app.js",
  BASE + "manifest.json",
  BASE + "icons/icon-192.png",
  BASE + "icons/icon-512.png",
  BASE + "assets/header-fortal-tech.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        for (const url of APP_SHELL) {
          try {
            const response = await fetch(url, { cache: "no-cache" });
            if (response.ok) await cache.put(url, response);
          } catch (e) {
            console.warn("Não foi possível armazenar:", url, e);
          }
        }
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Navegação: tenta a rede primeiro; se estiver offline, entrega o app.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(BASE, copy));
          return response;
        })
        .catch(() => caches.match(BASE))
    );
    return;
  }

  // Recursos locais: rede primeiro, cache como fallback.
  if (url.origin === location.origin && url.pathname.startsWith(BASE)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});