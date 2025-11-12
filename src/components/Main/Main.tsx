'use client'

import React, { useState, useEffect } from 'react'
import styles from './Main.module.scss'
import CardMatch from '../CardMatch/CardMatch'
// import Timer from '../Timer/Timer'
import Timer2 from '../Timer2/Timer2'
import games from '@/data/games'
import PromoCodesModal from '../PromoCodesModal/PromoCodesModal'
import ActionButton from '../ActionButton/ActionButton'
import NavCard from '../NavCard'
import { Ticket, Navigation } from 'lucide-react'
// import FonBus from '../FonBus/FonBus'
// import SpecialGuestModal from '../SpecialGuestModal'

// URL видеофайлов для кэширования
const VIDEO_URLS = [
	'/videos/bgmain2-optimized-fast.mp4',
	'/videos/bgmain2-optimized.webm',
	'/videos/bgmainmob1-optimized-fast.mp4',
	'/videos/bgmainmob1-optimized.webm',
]

// Функция для регистрации сервис-воркера для кэширования видео
const registerVideoServiceWorker = async () => {
	if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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
		// Создаем элемент video для предзагрузки
		const video = document.createElement('video')
		video.preload = 'auto'
		video.style.display = 'none'

		// Добавляем источник видео
		const source = document.createElement('source')
		source.src = videoUrl
		source.type = videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'
		video.appendChild(source)

		// Добавляем обработчики событий
		video.onloadeddata = () => {
			document.body.removeChild(video)
			resolve()
		}

		video.onerror = () => {
			document.body.removeChild(video)
			resolve()
		}

		// Добавляем видео в DOM для начала загрузки
		document.body.appendChild(video)
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
	const [isPromoOpen, setPromoOpen] = useState(false)
	// const [isFonBusVisible, setIsFonBusVisible] = useState(false)
	// const [isSpecialGuestOpen, setSpecialGuestOpen] = useState(false)

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
				? '/videos/bgmainmob1-optimized.webm'
				: '/videos/bgmainmob1-optimized-fast.mp4'
			: webpSupported
			? '/videos/bgmain2-optimized.webm'
			: '/videos/bgmain2-optimized-fast.mp4'

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
			const newIsMobile = isMobileDevice()
			if (newIsMobile !== isMobile) {
				setIsMobile(newIsMobile)
			}
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
				const primaryVideo = mobile ? mobileVideo : desktopVideo
				const secondaryVideo = mobile ? desktopVideo : mobileVideo

				// Настраиваем приоритетное видео
				primaryVideo.setAttribute('preload', 'auto')
				primaryVideo.setAttribute('importance', 'high')

				// Устанавливаем атрибут для второстепенного видео
				secondaryVideo.setAttribute('preload', 'none')
				secondaryVideo.setAttribute('importance', 'low')

				// Событие загрузки метаданных для приоритетного видео
				primaryVideo.addEventListener('loadeddata', () => {
					// Видео готово к воспроизведению, показываем видео поверх постера
					primaryVideo.classList.add(styles.loaded)

					// Запускаем видео только один раз после полной загрузки
					setTimeout(() => {
						primaryVideo
							.play()
							.catch(e => console.log('Video autoplay failed:', e))
					}, 100) // Небольшая задержка для плавного перехода

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
					console.log(`${mobile ? 'Mobile' : 'Desktop'} video loading error`)
					// При ошибке оставляем постер видимым
				})

				secondaryVideo.addEventListener('error', () => {
					console.log(`${!mobile ? 'Mobile' : 'Desktop'} video loading error`)
					// При ошибке оставляем постер видимым
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
	}, [isMobile]) // Добавляем isMobile в зависимости, так как он используется внутри эффекта

	// // Эффект для показа FonBus с задержкой
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setIsFonBusVisible(true)
	// 	}, 1000) // Показываем через 1 секунду после загрузки

	// 	return () => clearTimeout(timer)
	// }, [])

	return (
		<div className={styles.main}>
			<video
				muted
				loop
				playsInline
				poster='/videos/bgmain2-poster.jpg'
				preload='none'
				className={styles.backgroundVideo}
				id='desktop-video'
			>
				{supportsWebPFormat && (
					<source src='/videos/bgmain2-optimized.webm' type='video/webm' />
				)}
				<source src='/videos/bgmain2-optimized-fast.mp4' type='video/mp4' />
			</video>
			<video
				loop
				muted
				playsInline
				poster='/videos/bgmainmob1-poster.jpg'
				preload='auto'
				className={styles.backgroundVideoMobile}
				id='mobile-video'
			>
				{supportsWebPFormat && (
					<source src='/videos/bgmainmob1-optimized.webm' type='video/webm' />
				)}
				<source src='/videos/bgmainmob1-optimized-fast.mp4' type='video/mp4' />
			</video>
			{/* СПЕЦИАЛЬНЫЙ ГОСТЬ */}
			<div className={styles.content}>
				<div className={styles.featuredMatch}>
					{/* <div className={styles.specialGuestLink}>
						<button
							className={styles.specialGuestButton}
							onClick={() => setSpecialGuestOpen(true)}
						>
							<span className={styles.guestTitle}>Специальный гость</span>
							<span className={styles.guestNames}>Динана Шнайдер</span>
						</button>
					</div> */}
					<CardMatch
						homeTeam={selectedGame.homeTeam}
						awayTeam={selectedGame.awayTeam}
						date={selectedGame.date}
						time={selectedGame.time}
						timeLocal={selectedGame.timeLocal}
						stadium={selectedGame.stadium}
						ticketLink={selectedGame.ticketLink}
						ticketLinkVip={selectedGame.ticketLinkVip}
						ticketLinkSkybox={selectedGame.ticketLinkSkybox}
						fanIdStatus={selectedGame.fanIdStatus}
						leagueInfo={selectedGame.leagueInfo}
						promoType={selectedGame.promoType}
					/>
					{/* Кнопка промокодов */}
					{selectedGame.promoType && (
						<ActionButton
							href='#'
							title='Промокоды для друзей'
							actionType='modal'
							onModalOpen={() => setPromoOpen(true)}
							className={styles.promoButton}
						/>
					)}
					{/* <Timer priceIncreaseDate={selectedGame.priceIncreaseDates.first} /> */}
					{selectedGame.priceIncreaseDates && (
						<div className={styles.timerWrapper}>
							<Timer2 priceIncreaseDates={selectedGame.priceIncreaseDates} />
						</div>
					)}

					{/* Навигационные карточки */}
					<div className={styles.navCardsContainer}>
						<NavCard title='Тарифы промокоды' href='/bonuses' icon={Ticket} />
						<NavCard title='Как добраться?' href='/road' icon={Navigation} />
					</div>

					<PromoCodesModal
						isOpen={isPromoOpen}
						onClose={() => setPromoOpen(false)}
						promoType={selectedGame.promoType}
					/>
					{/* <FonBus isVisible={isFonBusVisible} /> */}
					{/* <SpecialGuestModal
						isOpen={isSpecialGuestOpen}
						onClose={() => setSpecialGuestOpen(false)}
					/> */}
				</div>
			</div>
		</div>
	)
}
export default Main
