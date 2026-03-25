export {
	MAIN_DESKTOP,
	MAIN_MOBILE,
	MAIN_PRECACHE_VIDEO_URLS,
	VIDEO_CACHE_NAME,
	VIDEO_SERVICE_WORKER_PATH,
} from './constants'
export {
	registerVideoServiceWorker,
	precacheMainBackgroundVideos,
	isMobileDevice,
	supportsWebP,
	preloadVideo,
	getMainBackgroundPriorityVideoUrl,
} from './client'
export { initDualBackgroundVideos } from './init-dual-background-videos'
