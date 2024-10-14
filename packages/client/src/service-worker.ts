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
        fetch(e.request)
            .then(response => {
                if (response && response.status === 200) {
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        console.log('cache put');
                        cache.put(e.request, responseToCache);
                    });
                    return response;
                }
                return caches.match(e.request).then(cacheResponse => {
                    return cacheResponse || response;
                });
            })
            .catch(() => {
                return caches.match(e.request).then(cacheResponse => {
                    return cacheResponse || fetch(e.request);
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
