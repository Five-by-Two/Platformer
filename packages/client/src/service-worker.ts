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
    const request = e.request.clone();

    e.respondWith(
        fetch(request).then(response => {
            if (!response) return response;

            const responseToCache = response.clone();

            if (responseToCache.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                    console.log('cache put');
                    cache.put(e.request, responseToCache);
                });
                return response;
            }

            console.log('not result. check cache');
            caches.match(e.request).then(cacheResponse => {
                if (cacheResponse) return cacheResponse;
            });

            return response;
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
