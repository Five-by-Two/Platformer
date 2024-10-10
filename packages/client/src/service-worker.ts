const CACHE_NAME = 'platformer-cache';
const URLS = ['/', '/game'];

self.addEventListener('install', event => {
    const e = event as ExtendableEvent;
    console.log('precache');
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                cache.addAll(URLS).then(() => {
                    console.log('cached succefull');
                });
            })
            .catch(err => {
                throw err;
            }),
    );
});

self.addEventListener('fetch', event => {
    const e = event as FetchEvent;

    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) return response;

            const fetchRequest = e.request.clone();
            return fetch(fetchRequest).then(response => {
                const responseToCahche = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, responseToCahche);
                });
                return response;
            });
        }),
    );
});

self.addEventListener('activate', function (event) {
    const e = event as ExtendableEvent;
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(name => caches.delete(name)));
        }),
    );
});

export default null;
