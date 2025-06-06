// serviceWorker.js

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('ucb-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/frontend.js',
        '/manifest.json',
        '/image/ucb.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
