const CACHE_NAME = "color-v26";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    "./colorwheel-512x512.svg"
];

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
                    console.log('fonded resource', event.request.url)
                    return response;
                } else {    // CACHE MISS
                    console.log('not founded resource', event.request.url)
                    return fetch(event.request);
                }
            })
    );
});
