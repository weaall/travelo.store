self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("image-cache").then(() => {
            console.log("Service Worker Installed");
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (
        event.request.url.endsWith(".jpg") ||
        event.request.url.endsWith(".png") ||
        event.request.url.endsWith(".gif") ||
        event.request.url.endsWith(".jpeg") ||
        event.request.url.endsWith(".svg")
    ) {
        console.log("Intercepted fetch:", event.request.url);

        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log("Serving cached response:", event.request.url);
                    return cachedResponse;
                }
                return fetch(event.request).then((networkResponse) => {
                    return caches.open("image-cache").then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});

self.addEventListener("message", async (event) => {
    if (event.data.type === "CACHE_BLOB") {
        const { url, blob } = event.data;

        const response = new Response(blob);

        const cache = await caches.open("image-cache");
        await cache.put(url, response);

        console.log(`Blob cached for ${url}`);
    }
});
