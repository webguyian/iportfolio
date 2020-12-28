const cacheName = 'iportfolio-v1.3';
const staticAssets = ['./', './main.css', './main.js', './vendor.js'];

// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cachedResponse = await cache.match(req);

//   return cachedResponse || fetch(req);
// }

async function networkFirst(req) {
  const cache = await caches.open(cacheName);

  try {
    const fresh = await fetch(req);

    if (req.url.indexOf('http') === 0 && req.destination !== 'video') {
      cache.put(req, fresh.clone());
    }

    return fresh;
  } catch (e) {
    const cachedResponse = await cache.match(req);

    return cachedResponse;
  }
}

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName);

  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  const req = event.request;

  event.respondWith(networkFirst(req));
});
