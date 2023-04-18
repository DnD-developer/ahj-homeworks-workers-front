self.addEventListener("install", event => {
	console.log("Установлен")

	event.waitUntil(
		caches.open("my-best-cache").then(cache => {
			cache.addAll(["./", "./index.html"])
		})
	)
})

self.addEventListener("activate", event => {
	console.log("Активирован")
})

self.addEventListener("fetch", event => {
	console.log("Происходит запрос на сервер")

	const url = new URL(event.request.url)

	if (FETCH_PRIORITY_URLS.includes(url.pathname)) {
		event.respondWith(fetchPriorityThenCache(event))

		return
	}

	if (url.pathname.startsWith("/images/user")) {
		event.respondWith(fetchPriorityThenCacheThenImageFallback(event))

		return
	}

	event.respodWith(cachePriorityThenFetch(event))
})
