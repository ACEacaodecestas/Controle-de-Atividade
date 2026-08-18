const PWA_SCOPE = "/Controle-de-Atividade/";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Pass-through fetch. O Service Worker existe e controla o escopo,
  // sem depender de cache para a instalação PWA.
  event.respondWith(fetch(event.request));
});