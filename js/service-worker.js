window.addEventListener('load', function() {
  if(`serviceWorker` in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log(`ServiceWorker registration successful with scope: ${registration.scope}`)
    }, function(err) {
      console.log(`ServiceWorker registration failed: ${err}`)
    })
  }
})
