const CACHE_NAME = 'files-explorer-v4.4-shell-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-192.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('files-explorer-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));}
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  const isAppAsset = ASSETS.some(path => new URL(path, self.registration.scope).href === url.href);
  if (!isAppAsset) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy));}
    return response;
  })));
});
