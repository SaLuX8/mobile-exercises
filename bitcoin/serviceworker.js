var cacheName = 'bitcoin-v1';
var filesToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-512x512.png',
  './icons/favicon.ico',
];

// In install event all the cache files will be cached. Add a following code to your service worker file.
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] caching');
      return cache.addAll(filesToCache);
    })
  );
});


// Now activate event is not doing anything special, 
// it only removes old cached files if service worker has been updated. Add a following code to your service worker file.
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] activating');
  event.waitUntil(
      caches.keys()
      .then(function(cacheNames) {
          return Promise.all(
              cacheNames.map(function(cName) {
                  if(cName !== cacheName){
                      return caches.delete(cName);
                  }
              })
          );
      })
  );
});

// A final step with a service worker is to add fetch event listener. Here we have added a few
// console.log lines that we can see from the console what is happening in our PWA app when it
// is launched and run in online/offline mode.
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
    }).catch(error => { 
      console.log(error);
    })
  );
});