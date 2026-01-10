# Service Workers

## Overview
Service Workers are a type of web worker that act as a proxy between web applications, the browser, and the network. They enable features like offline functionality, push notifications, background sync, and caching strategies.

## Registration

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
```

## Basic Service Worker (sw.js)

```javascript
// Install event - fires when SW is first installed
self.addEventListener("install", (event) => {
  console.log("Service Worker installing");
  
  // Force activation of new SW
  self.skipWaiting();
});

// Activate event - fires when SW becomes active
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating");
  
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

// Fetch event - intercepts network requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        // Fallback for offline
        return new Response("Offline");
      })
  );
});
```

## Caching Strategies

### Cache First (Offline First)

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available
      if (response) {
        return response;
      }
      
      // Otherwise fetch from network
      return fetch(event.request).then((response) => {
        // Cache the response for future use
        const responseClone = response.clone();
        caches.open("v1").then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
```

### Network First

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        const responseClone = response.clone();
        caches.open("v1").then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});
```

### Stale While Revalidate

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("v1").then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // Fetch from network in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        
        // Return cached version immediately, update in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

## Cache Management

```javascript
// Install - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/image.png"
      ]);
    })
  );
});

// Activate - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "v1") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

## Push Notifications

```javascript
// In service worker
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/icon.png",
    badge: "/badge.png"
  };
  
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});
```

## Background Sync

```javascript
// Register background sync
navigator.serviceWorker.ready.then((registration) => {
  return registration.sync.register("sync-data");
});

// Handle sync in service worker
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Perform background sync
  return fetch("/api/sync")
    .then((response) => response.json())
    .then((data) => {
      // Process synced data
      console.log("Data synced:", data);
    });
}
```

## Lifecycle

1. **Install**: Service worker is downloaded and installed
2. **Activate**: Service worker becomes active and controls pages
3. **Fetch**: Intercepts network requests
4. **Update**: New version is downloaded and installed

## Key Points
- Acts as a network proxy between app and network
- Enables offline functionality and caching
- Supports push notifications and background sync
- Must be served over HTTPS (except localhost)
- Lifecycle: Install → Activate → Fetch
- Use appropriate caching strategy for your use case

