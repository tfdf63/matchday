// Имя кэша для видео
const VIDEO_CACHE_NAME = 'video-cache-v1'

// Список URL-адресов видео для кэширования
const VIDEO_URLS = [
	'/videos/bgmain1-optimized-fast.mp4',
	'/videos/bgmain1-optimized.webm',
	'/videos/bgmainmob-optimized-fast.mp4',
	'/videos/bgmainmob-optimized.webm',
]

// Событие установки сервис-воркера
self.addEventListener('install', event => {
	// Предварительное кэширование URL-адресов видео
	event.waitUntil(
		caches
			.open(VIDEO_CACHE_NAME)
			.then(cache => {
				console.log('Opened cache for videos')
				return cache.addAll(VIDEO_URLS)
			})
			.catch(error => {
				console.error('Failed to cache videos during install:', error)
			})
	)

	// Активируем сервис-воркер немедленно без ожидания закрытия старых вкладок
	self.skipWaiting()
})

// Активация сервис-воркера
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName => {
						// Удаляем любые старые кэши видео, кроме текущего
						return (
							cacheName.startsWith('video-cache-') &&
							cacheName !== VIDEO_CACHE_NAME
						)
					})
					.map(cacheName => {
						console.log('Deleting outdated video cache:', cacheName)
						return caches.delete(cacheName)
					})
			)
		})
	)

	// Сервис-воркер начинает контролировать все страницы немедленно
	self.clients.claim()
})

// Обработка запросов к сервису
self.addEventListener('fetch', event => {
	// Проверяем, является ли запрос запросом видео
	const url = new URL(event.request.url)
	const isVideoRequest =
		VIDEO_URLS.some(videoUrl => url.pathname.endsWith(videoUrl)) ||
		(url.pathname.includes('/videos/') &&
			(url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm')))

	if (isVideoRequest) {
		event.respondWith(
			caches
				.match(event.request)
				.then(response => {
					// Кэш-хит - возвращаем ответ из кэша
					if (response) {
						console.log('Serving from cache:', url.pathname)
						return response
					}

					// Кэш-мисс - получаем из сети и кэшируем
					console.log('Fetching from network:', url.pathname)
					return fetch(event.request).then(networkResponse => {
						// Проверяем, что получили действительный ответ
						if (
							!networkResponse ||
							networkResponse.status !== 200 ||
							networkResponse.type !== 'basic'
						) {
							return networkResponse
						}

						// Кэшируем копию ответа
						const responseToCache = networkResponse.clone()
						caches.open(VIDEO_CACHE_NAME).then(cache => {
							cache.put(event.request, responseToCache)
							console.log('Cached new video:', url.pathname)
						})

						return networkResponse
					})
				})
				.catch(error => {
					console.error('Error serving video:', error)
					// При ошибке возвращаем запасной ответ или сообщение об ошибке
					return new Response('Video loading error', {
						status: 503,
						statusText: 'Service Unavailable',
					})
				})
		)
	}
})

// Отправляем сообщения о состоянии кэширования клиенту
const sendStatusToClients = status => {
	self.clients.matchAll().then(clients => {
		clients.forEach(client => {
			client.postMessage({
				type: 'VIDEO_CACHE_STATUS',
				status,
			})
		})
	})
}

// Обработка сообщений от клиента
self.addEventListener('message', event => {
	if (event.data && event.data.type === 'CACHE_VIDEOS') {
		// Начинаем кэширование по запросу клиента
		event.waitUntil(
			caches
				.open(VIDEO_CACHE_NAME)
				.then(cache => {
					sendStatusToClients({ message: 'Начало кэширования видео...' })
					return cache.addAll(VIDEO_URLS).then(() => {
						sendStatusToClients({ message: 'Все видео успешно кэшированы!' })
					})
				})
				.catch(error => {
					console.error('Failed to cache videos on message:', error)
					sendStatusToClients({
						message: 'Ошибка кэширования видео',
						error: error.message,
					})
				})
		)
	}
})
