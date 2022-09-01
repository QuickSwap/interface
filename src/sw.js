self.addEventListener('install', () => {
    console.log("Installin SW")
    // Skip over the "waiting" lifecycle state, to ensure that our
    // new service worker is activated immediately, even if there's
    // another tab open controlled by our older service worker code.
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    // Optional: Get a list of all the current open windows/tabs under
    // our service worker's control, and force them to reload.
    // This can "unbreak" any open windows/tabs as soon as the new
    // service worker activates, rather than users having to manually reload.
    console.log("Activating SW")
    event.waitUntil(self.clients.claim());
    
    console.log("new service worker activate")
    self.registration.unregister().then(() => {
      console.log('QUICKSWAP Safety Worker - unregistered old service worker');
    });
  
    self.clients.matchAll({
      type: 'window'
    }).then(windowClients => {
      windowClients.forEach((windowClient) => {
        windowClient.navigate(windowClient.url);
      });
    });
  });