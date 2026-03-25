/** Должен совпадать с VIDEO_CACHE_NAME в public/video-sw.js */
export const VIDEO_CACHE_NAME = 'video-cache-v1'

export const VIDEO_SERVICE_WORKER_PATH = '/video-sw.js'

/** URL для ручного precache в Main (подмножество того, что кэширует SW). */
export const MAIN_PRECACHE_VIDEO_URLS = [
	'/videos/bgmain2-optimized-fast.mp4',
	'/videos/bgmain2-optimized.webm',
	'/videos/bgmainmob1-optimized-fast.mp4',
	'/videos/bgmainmob1-optimized.webm',
] as const

export const MAIN_DESKTOP = {
	webm: '/videos/bgmain2-optimized.webm',
	mp4: '/videos/bgmain2-optimized-fast.mp4',
	poster: '/videos/bgmain2-poster.jpg',
} as const

export const MAIN_MOBILE = {
	webm: '/videos/bgmainmob1-optimized.webm',
	mp4: '/videos/bgmainmob1-optimized-fast.mp4',
	poster: '/videos/bgmainmob1-poster.jpg',
} as const
