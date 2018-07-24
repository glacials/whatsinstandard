window.addEventListener('appinstalled', event => {
  ga('send', 'event', 'app', 'install', 'progressive web app installed')
})
