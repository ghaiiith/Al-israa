// Service Worker for Al-Israa Creativity Co. Website
// Version 1.0.0

const CACHE_NAME = 'al-israa-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Tajawal:wght@300;400;500;700&display=swap',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('All resources cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request).then(response => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    // Add to cache
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(error => {
                console.error('Fetch failed:', error);
                
                // Return offline page if available
                if (event.request.destination === 'document') {
                    return caches.match('/offline.html');
                }
                
                // For other requests, return a generic offline response
                return new Response('الموقع غير متوفر حالياً. يرجى المحاولة لاحقاً.', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Handle offline form submissions
            handleOfflineFormSubmission()
        );
    }
});

// Handle offline form submissions
async function handleOfflineFormSubmission() {
    try {
        // Get stored form data from IndexedDB
        const formData = await getStoredFormData();
        
        if (formData) {
            // Try to submit the form
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Clear stored data after successful submission
                await clearStoredFormData();
                
                // Notify user of successful submission
                self.registration.showNotification('تم إرسال الرسالة بنجاح!', {
                    body: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
                    icon: '/icons/success.png',
                    badge: '/icons/badge.png',
                    tag: 'form-success'
                });
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handler
self.addEventListener('push', event => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/icons/notification.png',
            badge: '/icons/badge.png',
            vibrate: [200, 100, 200],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'عرض الموقع',
                    icon: '/icons/explore.png'
                },
                {
                    action: 'close',
                    title: 'إغلاق',
                    icon: '/icons/close.png'
                }
            ],
            tag: 'al-israa-notification'
        };
        
        event.waitUntil(
            self.registration.showNotification('شركة ابداع الاسراء', options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the website
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the website
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions for IndexedDB operations
async function getStoredFormData() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('al-israa-db', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['forms'], 'readonly');
            const store = transaction.objectStore('forms');
            const getRequest = store.get('contact-form');
            
            getRequest.onsuccess = () => resolve(getRequest.result);
            getRequest.onerror = () => reject(getRequest.error);
        };
    });
}

async function clearStoredFormData() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('al-israa-db', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');
            const deleteRequest = store.delete('contact-form');
            
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
        };
    });
}

// Cache management functions
async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => name !== CACHE_NAME);
    
    return Promise.all(
        oldCaches.map(name => caches.delete(name))
    );
}

// Periodic cache cleanup
setInterval(cleanupOldCaches, 24 * 60 * 60 * 1000); // Once a day

// Log service worker events
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded - Al-Israa Creativity Co.');