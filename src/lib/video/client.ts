import {
	MAIN_DESKTOP,
	MAIN_MOBILE,
	MAIN_PRECACHE_VIDEO_URLS,
	VIDEO_CACHE_NAME,
	VIDEO_SERVICE_WORKER_PATH,
} from './constants'

export async function registerVideoServiceWorker(): Promise<void> {
	if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
		try {
			navigator.serviceWorker.register(VIDEO_SERVICE_WORKER_PATH).catch(error => {
				console.log('ServiceWorker registration failed:', error)
			})
		} catch (error) {
			console.log('ServiceWorker error:', error)
		}
	}
}

export async function precacheMainBackgroundVideos(): Promise<void> {
	if (!('caches' in window)) return

	try {
		const cache = await caches.open(VIDEO_CACHE_NAME)
		for (const url of MAIN_PRECACHE_VIDEO_URLS) {
			const match = await cache.match(url)
			if (!match) {
				try {
					await cache.add(url)
					console.log(`Cached: ${url}`)
				} catch (err) {
					console.log(`Failed to cache ${url}:`, err)
				}
			} else {
				console.log(`Already cached: ${url}`)
			}
		}
	} catch (err) {
		console.log('Caching error:', err)
	}
}

export function isMobileDevice(): boolean {
	if (typeof window !== 'undefined') {
		return (
			window.innerWidth < 767 ||
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		)
	}
	return false
}

export function supportsWebP(): boolean {
	if (typeof window !== 'undefined') {
		const elem = document.createElement('canvas')
		if (elem.getContext && elem.getContext('2d')) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
		}
	}
	return false
}

export function preloadVideo(videoUrl: string): Promise<void> {
	return new Promise(resolve => {
		const video = document.createElement('video')
		video.preload = 'auto'
		video.style.display = 'none'

		const source = document.createElement('source')
		source.src = videoUrl
		source.type = videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'
		video.appendChild(source)

		const removeVideo = () => {
			if (video.parentNode === document.body && document.body) {
				document.body.removeChild(video)
			}
			resolve()
		}

		video.onloadeddata = removeVideo
		video.onerror = removeVideo

		if (typeof document !== 'undefined' && document.body) {
			document.body.appendChild(video)
		} else {
			resolve()
		}
	})
}

export function getMainBackgroundPriorityVideoUrl(
	isMobile: boolean,
	webpSupported: boolean,
): string {
	if (isMobile) {
		return webpSupported ? MAIN_MOBILE.webm : MAIN_MOBILE.mp4
	}
	return webpSupported ? MAIN_DESKTOP.webm : MAIN_DESKTOP.mp4
}
