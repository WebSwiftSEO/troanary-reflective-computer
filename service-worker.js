const CACHE_NAME = 'troanary-cache-v1';
const urlsToCache = [
  '/troanary-reflective-computer/index.html',
  '/troanary-reflective-computer/assets/android-chrome-192x192.png',
  '/troanary-reflective-computer/assets/android-chrome-512x512.png',
  '/troanary-reflective-computer/assets/apple-touch-icon.png',
  '/troanary-reflective-computer/assets/maskable-icon.png',
  '/troanary-reflective-computer/assets/icon-home.png',
  '/troanary-reflective-computer/manifest.json',
  '/troanary-reflective-computer/favicon.ico',
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
