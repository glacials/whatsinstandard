// This file is required to be at the project root.
// See https://developers.google.com/web/fundamentals/primers/service-workers/#register_a_service_worker

const version = '8'

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== `standard-v${version}`) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})

self.addEventListener('install', event => event.waitUntil(
    caches.open(`standard-v${version}`).then(cache => cache.addAll([
      '/',
      '/api/v5/sets.json',
      '/css/style.css',
      '/img/github.png',
      '/js/app.js',
      '/js/service-worker.js',
      '/js/tracking.js',
      '/node_modules/bootstrap/dist/css/bootstrap.min.css',
      '/node_modules/bootstrap-vue/dist/bootstrap-vue.min.js',
      '/node_modules/keyrune/css/keyrune.min.css',
      '/node_modules/keyrune/fonts/keyrune.ttf',
      '/node_modules/keyrune/fonts/keyrune.woff2?v=3.2.4',
      '/node_modules/moment/moment.js',
      '/node_modules/npm-font-open-sans/open-sans.css',
      '/node_modules/npm-font-open-sans/fonts/Regular/OpenSans-Regular.woff2',
      '/node_modules/npm-font-open-sans/fonts/Italic/OpenSans-Italic.woff2',
      '/node_modules/npm-font-open-sans/fonts/Bold/OpenSans-Bold.woff2',
      '/node_modules/tether/dist/js/tether.min.js',
      '/node_modules/underscore/underscore-min.js',
      '/node_modules/vue/dist/vue.min.js',
      '/node_modules/vue-tippy/dist/vue-tippy.min.js'
    ]))
  )
)

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
