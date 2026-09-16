const CACHE_NAME = 'my-space-v1';

const FILES_TO_CACHE = [
    './',
    './home.html',
    './navbar.html',
    './navbar.js',
    './navbar.css',
    './script.js',
    './style.css',
    './car.css',
    './manifest.json'
];

// ติดตั้ง Service Worker
self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});

// เปิดใช้งาน Service Worker
self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {

            return Promise.all(
                cacheNames.map(function (cacheName) {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })
            );

        })
    );

    self.clients.claim();
});

// ดึงไฟล์จาก Cache ก่อน
self.addEventListener('fetch', function (event) {

    event.respondWith(

        caches.match(event.request)
            .then(function (cachedResponse) {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);

            })
    );
});