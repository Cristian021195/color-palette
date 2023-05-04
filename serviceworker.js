const CACHE_NAME = "portfolio-v26";
const urlsToCache = ["./","./index.html", "./manifest.json","./css/BebasNeue-Regular.woff", "./css/BebasNeue-Regular.woff2", "https://upload.wikimedia.org/wikipedia/commons/c/c5/Colorwheel.svg"];

// si cambiamos la version de cache se elimina la anterior
caches.keys().then(res=>{
    res.forEach(e=>{
        if(e != CACHE_NAME){
            caches.delete(e)
        }
    })
})

self.addEventListener("install", event => {
    // forzado de instalacion de nuevo sw
    self.skipWaiting();
    // Pre-cache archivos para offline y performance; los pictogramas los dejamos para la primera carga
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
        })
    );
});

// Cache First Policy
self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request)  
          .then(function(response) {
              if (response) {  // CACHE HIT
                  return response;
              } else {    // CACHE MISS
                  return fetch(event.request);
              }
          })
  );
});
