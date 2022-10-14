// Asignar nombre y version cache

const CACHE_NAME= 'V1_CACHE_AWP';

var urlToCache = [
    './',
    './styles.css',
    './assets/img/games.JPG',
    './assets/img/logoSpotify.png',
    './assets/img/musica.JPG',
    './assets/img/podcast.JPG',
    './assets/img/slider.JPG'

        //etc
]


// Evento de instalacion

self.addEventListener ('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => {
                console.log('NO SE HA RESGUARDADO LA CACHE',err);
            })
    )
});

// Evento activate

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            // Borrar los elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Activar la cache
                self.clients.claim();
            })
    )
})

// Evento fetch

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    // Devuelvo los datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})