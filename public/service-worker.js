self.addEventListener('install', event => console.log('ServiceWorker installed'));

self.addEventListener('notificationclick', event => {
  if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(self.clients.matchAll().then(clients => {
        if (clients.length){
            clients[0].focus();
        } else {
            self.clients.openWindow('/');
        }
    }));
  }
});