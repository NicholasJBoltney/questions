const CACHE_NAME = 'questions-app-v2';

// Install event - skip waiting to activate immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('Service Worker activated, taking control');
        return self.clients.claim();
      })
  );
});

// Fetch event - cache-first strategy with aggressive caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip caching for external domains (like Google Fonts, analytics, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }

        // Fetch from network and cache it
        console.log('Fetching from network:', request.url);
        return fetch(request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone and cache the response
            const responseToCache = response.clone();
            cache.put(request, responseToCache);
            console.log('Cached:', request.url);

            return response;
          })
          .catch((error) => {
            console.log('Fetch failed, trying to serve from cache:', error);
            // If network fails, try to return the main page
            return cache.match('/').then((fallback) => {
              return fallback || new Response('Offline - No cached content available', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
          });
      });
    })
  );
});
