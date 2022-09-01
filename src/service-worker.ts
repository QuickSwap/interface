/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', () => {
  console.log("new service worker install")
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log("new service worker activate")
  self.registration.unregister().then(() => {
    console.log('QUICKSWAP Safety Worker - unregistered old service worker');
  });
  
  // Optional: Get a list of all the current open windows/tabs under
  // our service worker's control, and force them to reload.
  // This can "unbreak" any open windows/tabs as soon as the new
  // service worker activates, rather than users having to manually reload.
  self.clients.matchAll({
    type: 'window'
  }).then(windowClients => {
    windowClients.forEach((windowClient) => {
      windowClient.navigate(windowClient.url);
    });
  });
});