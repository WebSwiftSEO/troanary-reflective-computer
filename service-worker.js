const CACHE_NAME = 'troanary-cache-v1';
const urlsToCache = [
  './index.html',
  './assets/android-chrome-192x192.png',
  './assets/android-chrome-512x512.png',
  './assets/apple-touch-icon.png',
  './assets/maskable-icon.png',
  './assets/icon-home.png',
  './manifest.json',
  './favicon.ico',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.39/Tone.min.js'
];

// Install: Cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: Remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Serve cached or fetch fresh
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((response) => 
      response || fetch(event.request)
    )
  );
});
