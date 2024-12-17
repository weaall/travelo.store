// service-worker.js
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("image-cache").then((cache) => {
            console.log("Service Worker Installed");
        }),
    );
});

self.addEventListener("fetch", (event) => {
    // 이미지 요청일 경우만 처리
    if (
        event.request.url.endsWith(".jpg") ||
        event.request.url.endsWith(".png") ||
        event.request.url.endsWith(".gif") ||
        event.request.url.endsWith(".jpeg") ||
        event.request.url.endsWith(".svg")
    ) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    // 캐시된 이미지를 반환할 때 로그 출력
                    console.log("Returning cached image:", event.request.url);
                    return cachedResponse; // 캐시에서 이미지 반환
                }
                // 캐시가 없으면 네트워크 요청 후 캐시 저장
                return fetch(event.request).then((networkResponse) => {
                    return caches.open("image-cache").then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // 네트워크 응답 캐시 저장
                        return networkResponse;
                    });
                });
            }),
        );
    }
});
