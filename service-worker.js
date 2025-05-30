// service-worker.js - Implementación de PWA y caching
const CACHE_NAME = "ecommerce-site-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/styles-extra.css",
  "/index.js",
  "/JS/app.js",
  "/JS/utils.js",
  "/img/logo.png",
  "/img/banner/placeholder.svg",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/sweetalert2@11",
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Escuchar por peticiones y servir desde caché cuando sea posible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, lo devuelve
      if (response) {
        return response;
      }

      // Si no está en caché, lo solicita a la red
      return fetch(event.request)
        .then((response) => {
          // Verificar que sea una respuesta válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clonar la respuesta para poder almacenarla en caché
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // No cachear API calls para evitar datos obsoletos
            if (!event.request.url.includes("dolarapi.com")) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // Si falla la red y es un request de una imagen, devolver placeholder
          if (event.request.destination === "image") {
            return caches.match("/img/banner/placeholder.svg");
          }
        });
    })
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
