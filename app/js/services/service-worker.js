const staticCache = "my-cashe-v1"
const assetsUrls = ["index.html", "assets/css/main.css", "assets/js/main.js"]

async function cacheFirst(request) {
	const result = (await caches.match(request)) ?? (await fetch(request))

	return result
}

self.addEventListener("install", async () => {
	console.log("Установлен")

	const cache = await caches.open(staticCache)
	await cache.addAll(assetsUrls)
})

self.addEventListener("activate", event => {
	console.log("Активирован")
})

self.addEventListener("fetch", event => {
	const { request } = event
	event.respondWith(cacheFirst(request))
})
