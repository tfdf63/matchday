'use client'

import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import CardMatch from '../CardMatch/CardMatch'
import games from '@/data/games'

// URL видеофайлов для кэширования
const VIDEO_URLS = [
	'/videos/bgmain1-optimized-fast.mp4',
	'/videos/bgmain1-optimized.webm',
	'/videos/bgmainmob-optimized-fast.mp4',
	'/videos/bgmainmob-optimized.webm',
]

// Функция для регистрации сервис-воркера для кэширования видео
const registerVideoServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		try {
			// Регистрируем сервис-воркер для кэширования видео
			navigator.serviceWorker.register('/video-sw.js').catch(error => {
				console.log('ServiceWorker registration failed:', error)
			})
		} catch (error) {
			console.log('ServiceWorker error:', error)
		}
	}
}

// Функция для предварительного кэширования видео
const precacheVideos = async () => {
	if ('caches' in window) {
		try {
			const cache = await caches.open('video-cache-v1')

			// Проверяем каждый URL и кэшируем, если еще не кэширован
			for (const url of VIDEO_URLS) {
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
}

// Функция для определения типа устройства
const isMobileDevice = () => {
	if (typeof window !== 'undefined') {
		return (
			window.innerWidth <= 768 ||
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		)
	}
	return false
}

// Функция для проверки поддержки WebP
const supportsWebP = () => {
	if (typeof window !== 'undefined') {
		const elem = document.createElement('canvas')
		if (elem.getContext && elem.getContext('2d')) {
			// Проверяем поддержку WebP с помощью canvas
			return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
		}
	}
	return false
}

// Функция для предварительной загрузки видео
const preloadVideo = (videoUrl: string) => {
	return new Promise<void>(resolve => {
		const link = document.createElement('link')
		link.rel = 'preload'
		link.as = 'video'
		link.href = videoUrl
		link.onload = () => resolve()
		link.onerror = () => resolve() // Продолжаем даже если возникла ошибка
		document.head.appendChild(link)
	})
}

interface MainProps {
	matchIndex?: number
}

const Main: React.FC<MainProps> = ({ matchIndex = 0 }) => {
	// Проверяем, что индекс в пределах массива
	const selectedIndex =
		matchIndex >= 0 && matchIndex < games.length ? matchIndex : 0
	const selectedGame = games[selectedIndex]

	// Состояние для отслеживания готовности видео
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [supportsWebPFormat, setSupportsWebPFormat] = useState<boolean>(true)

	// Предзагрузка видео при монтировании компонента
	useEffect(() => {
		// Определяем тип устройства
		const mobile = isMobileDevice()
		setIsMobile(mobile)

		// Проверяем поддержку WebP
		const webpSupported = supportsWebP()
		setSupportsWebPFormat(webpSupported)

		// Выбираем правильное видео для предзагрузки в зависимости от устройства и поддержки формата
		const priorityVideoUrl = mobile
			? webpSupported
				? '/videos/bgmainmob-optimized.webm'
				: '/videos/bgmainmob-optimized-fast.mp4'
			: webpSupported
			? '/videos/bgmain1-optimized.webm'
			: '/videos/bgmain1-optimized-fast.mp4'

		// Приоритетно загружаем видео для текущего устройства
		const loadPriorityVideo = async () => {
			// Регистрируем сервис-воркер для кэширования видео
			await registerVideoServiceWorker()

			// Предзагружаем основное видео для текущего устройства
			await preloadVideo(priorityVideoUrl)

			// Затем запускаем предкэширование остальных видео
			precacheVideos()
		}

		loadPriorityVideo()

		// Обработка изменения размера экрана
		const handleResize = () => {
			setIsMobile(isMobileDevice())
		}

		window.addEventListener('resize', handleResize)

		// Инициализируем видео элементы сразу после загрузки приоритетного видео
		const initializeVideoElements = () => {
			const desktopVideo = document.getElementById(
				'desktop-video'
			) as HTMLVideoElement
			const mobileVideo = document.getElementById(
				'mobile-video'
			) as HTMLVideoElement

			if (desktopVideo && mobileVideo) {
				// Определяем, какое видео должно загружаться первым
				const primaryVideo = isMobile ? mobileVideo : desktopVideo
				const secondaryVideo = isMobile ? desktopVideo : mobileVideo

				// Настраиваем приоритетное видео
				primaryVideo.setAttribute('preload', 'auto')
				primaryVideo.setAttribute('importance', 'high')

				// Устанавливаем атрибут для второстепенного видео
				secondaryVideo.setAttribute('preload', 'none')
				secondaryVideo.setAttribute('importance', 'low')

				// Событие загрузки метаданных для приоритетного видео
				primaryVideo.addEventListener('loadeddata', () => {
					primaryVideo
						.play()
						.catch(e => console.log('Video autoplay failed:', e))
					primaryVideo.classList.add(styles.loaded)

					// После загрузки основного видео начинаем загрузку второстепенного
					setTimeout(() => {
						if (secondaryVideo) {
							secondaryVideo.load()
						}
					}, 3000) // Задержка в 3 секунды перед загрузкой второстепенного видео
				})

				// Событие загрузки для второстепенного видео
				secondaryVideo.addEventListener('loadeddata', () => {
					secondaryVideo.classList.add(styles.loaded)
				})

				// Обработчики ошибок
				primaryVideo.addEventListener('error', () => {
					console.log(`${isMobile ? 'Mobile' : 'Desktop'} video loading error`)
					primaryVideo.classList.add(styles.loaded)
				})

				secondaryVideo.addEventListener('error', () => {
					console.log(`${!isMobile ? 'Mobile' : 'Desktop'} video loading error`)
					secondaryVideo.classList.add(styles.loaded)
				})

				// Загружаем приоритетное видео
				primaryVideo.load()
			}
		}

		// Выполняем инициализацию видео после рендера компонента
		setTimeout(initializeVideoElements, 100)

		// Очищаем при размонтировании
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={styles.main}>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='none'
				className={styles.backgroundVideo}
				id='desktop-video'
				poster='/images/optimized/stadium-background.webp'
			>
				{supportsWebPFormat && (
					<source src='/videos/bgmain1-optimized.webm' type='video/webm' />
				)}
				<source src='/videos/bgmain1-optimized-fast.mp4' type='video/mp4' />
			</video>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='none'
				className={styles.backgroundVideoMobile}
				id='mobile-video'
				poster='/images/optimized/mainmob.webp'
			>
				{supportsWebPFormat && (
					<source src='/videos/bgmainmob-optimized.webm' type='video/webm' />
				)}
				<source src='/videos/bgmainmob-optimized-fast.mp4' type='video/mp4' />
			</video>
			<div className={styles.leagueInfo}>{selectedGame.leagueInfo}</div>
			<div className={styles.content}>
				<div className={styles.featuredMatch}>
					<CardMatch
						homeTeam={selectedGame.homeTeam}
						awayTeam={selectedGame.awayTeam}
						date={selectedGame.date}
						time={selectedGame.time}
						stadium={selectedGame.stadium}
						ticketLink={selectedGame.ticketLink}
						ticketLinkVip={selectedGame.ticketLinkVip}
					/>
				</div>
			</div>
		</div>
	)
}
export default Main
