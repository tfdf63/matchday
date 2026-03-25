/**
 * Инициализация двух фоновых video (desktop + mobile) с приоритетной загрузкой.
 * loadedClassName — CSS-модульный класс, добавляемый после loadeddata.
 */
export function initDualBackgroundVideos(options: {
	isMobile: boolean
	loadedClassName: string
	desktopVideoId?: string
	mobileVideoId?: string
	delayMs?: number
}): void {
	const {
		isMobile,
		loadedClassName,
		desktopVideoId = 'desktop-video',
		mobileVideoId = 'mobile-video',
		delayMs = 100,
	} = options

	const initializeVideoElements = () => {
		const desktopVideo = document.getElementById(desktopVideoId) as HTMLVideoElement | null
		const mobileVideo = document.getElementById(mobileVideoId) as HTMLVideoElement | null

		if (!desktopVideo || !mobileVideo) return

		const primaryVideo = isMobile ? mobileVideo : desktopVideo
		const secondaryVideo = isMobile ? desktopVideo : mobileVideo

		primaryVideo.setAttribute('preload', 'auto')
		primaryVideo.setAttribute('importance', 'high')

		secondaryVideo.setAttribute('preload', 'none')
		secondaryVideo.setAttribute('importance', 'low')

		primaryVideo.addEventListener('loadeddata', () => {
			primaryVideo.classList.add(loadedClassName)

			setTimeout(() => {
				primaryVideo.play().catch(e => console.log('Video autoplay failed:', e))
			}, 100)

			setTimeout(() => {
				secondaryVideo.load()
			}, 3000)
		})

		secondaryVideo.addEventListener('loadeddata', () => {
			secondaryVideo.classList.add(loadedClassName)
		})

		primaryVideo.addEventListener('error', () => {
			console.log(`${isMobile ? 'Mobile' : 'Desktop'} video loading error`)
		})

		secondaryVideo.addEventListener('error', () => {
			console.log(`${!isMobile ? 'Mobile' : 'Desktop'} video loading error`)
		})

		primaryVideo.load()
	}

	setTimeout(initializeVideoElements, delayMs)
}
