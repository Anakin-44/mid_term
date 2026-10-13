const CACHE_NAME = "sem3-cache-v2";
const ASSETS_TO_CACHE = [
  "./index.html",
  "./cryp1.html",
  "./cryp2.html",
  "./cryp3.html",
  "./MERN1.html",
  "./MERN2.html",
  "./MERN3.html",
  "./MERN4.html",
  "./MERN5.html",
  "./MERN6.html",
  "./gui1.html",
  "./gui2.html",
  "./gui3.html",
  "./gui4.html",
  "./gui5.html",
  "./gui6.html",
  "./DM1.HTML",
  "./DM2.HTML",
  "./DM3.HTML",
  "./DM4.HTML",
  "./DM5.HTML",
  "./DM6.HTML",
  "./manifest.json",
];

// Install Event: Caches all required files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching app shell");
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activate Event: Cleans up old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event: Serve from cache first, then fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
