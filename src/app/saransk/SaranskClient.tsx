'use client'

import React from 'react'
import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './SaranskClient.module.scss'
import Marquee from '@/components/Marquee/Marquee'
import StarPlayer from '@/components/StarPlayer'
import Merch from '@/components/Merch'
import FanCard from '@/components/FanCard/FanCard'

const SaranskClient: React.FC = () => {
	const [isMobile, setIsMobile] = React.useState(false)
	const djContainerRef = React.useRef<HTMLDivElement>(null)

	// Определяем мобильное устройство
	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Обработчики событий для предотвращения блокировки прокрутки при hover на изображениях
	React.useEffect(() => {
		const images = djContainerRef.current?.querySelectorAll('.djImage')
		if (!images) return

		const handleWheel = (e: WheelEvent) => {
			// Предотвращаем перехват событий прокрутки изображениями
			e.stopPropagation()
		}

		images.forEach(image => {
			image.addEventListener('wheel', handleWheel, { passive: false })
		})

		return () => {
			images.forEach(image => {
				image.removeEventListener('wheel', handleWheel)
			})
		}
	}, [])

	// Функции для прокрутки
	const scrollLeft = () => {
		if (djContainerRef.current) {
			djContainerRef.current.scrollBy({
				left: -320,
				behavior: 'smooth',
			})
		}
	}

	const scrollRight = () => {
		if (djContainerRef.current) {
			djContainerRef.current.scrollBy({
				left: 320,
				behavior: 'smooth',
			})
		}
	}

	const buttonHref =
		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@43608494?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=42'
	const buttonActionType = isMobile ? 'link' : 'modal'

	return (
		<div className={styles.saranskPage}>
			{/* Фото */}
			<div className={styles.heroImage}>
				<Image
					src='/images/saransk/mordovia-arena.jpg'
					alt='Стадион Мордовия Арена'
					width={1200}
					height={600}
					className={styles.image}
				/>
			</div>

			{/* Заголовок и малая кнопка в одной строке */}
			<div className={styles.headerSection}>
				<h1 className={styles.title}>
					Акрон <span className={styles.vs}>х</span> Локомотив
				</h1>
				<div className={styles.smallButton}>
					<ActionButton
						href={buttonHref}
						title='Купить билеты'
						actionType={buttonActionType}
					/>
				</div>
			</div>

			{/* Подзаголовок */}
			<p className={styles.subtitle}>
				Домашний матч красно-черных в Саранске на стадионе Чемпионата Мира
				Мордовия Арена
			</p>

			{/* Секция с описанием */}
			<div className={styles.descriptionSection}>
				<h2 className={styles.descriptionTitle}>О матче</h2>
				<p className={styles.descriptionText}>
					Приглашаем всех болельщиков на домашний матч ФК &quot;Акрон&quot;
					против &quot;Локомотива&quot; в Саранске. Это будет незабываемое
					спортивное событие на стадионе &quot;Мордовия Арена&quot; с отличной
					атмосферой и поддержкой наших красно-черных!
				</p>
			</div>

			{/* Схема стадиона */}
			<div className={styles.bannerSchemeContainer}>
				<Image
					src='/images/saransk/banner_scheme.webp'
					alt='Схема стадиона Мордовия Арена'
					width={1200}
					height={600}
					className={styles.bannerSchemeImage}
				/>
			</div>

			<Marquee
				text='Легенда российского футбола × Лучший бомбардир в истории сборной ×'
				duration={50}
			/>
			<StarPlayer />
			{/* Информация о DJ*/}
			<div className={styles.djMarqueeWrapper}>
				<Marquee
					text='DJ FEST × DJ FEST × DJ FEST × DJ FEST × DJ FEST × DJ FEST × DJ FEST × DJ FEST × DJ FEST × '
					duration={50}
				/>
			</div>
			{/* Секция с описанием DJ FEST */}
			<div className={styles.djDescriptionSection}>
				<h2 className={styles.djDescriptionTitle}>
					DJ FEST перед стартовым свистком на «Мордовия Арене»
				</h2>
				<p className={styles.djDescriptionText}>
					Мы впервые сыграем в Саранске в роли хозяев поля. И по этому поводу
					решили закатить вечеринку.
				</p>
				<p className={styles.djDescriptionText}>
					В день игры мастера звука зададут настроение и объединят трибуны
					ритмом. Готовимся к жаркой вписке!
				</p>
			</div>

			<div className={styles.djSection}>
				<div className={styles.djHeaderRow}>
					{!isMobile && (
						<div className={styles.navigationArrows}>
							<button
								className={styles.arrowButton}
								onClick={scrollLeft}
								aria-label='Прокрутить влево'
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M15 18L9 12L15 6'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
							<button
								className={styles.arrowButton}
								onClick={scrollRight}
								aria-label='Прокрутить вправо'
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M9 18L15 12L9 6'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					)}
				</div>
				<div className={styles.djImagesContainer} ref={djContainerRef}>
					<div className={styles.djImage}>
						<Image
							src='/images/saransk/DJ1.webp'
							alt='DJ 1'
							width={300}
							height={500}
							className={styles.djImageItem}
						/>
					</div>
					<div className={styles.djImage}>
						<Image
							src='/images/saransk/DJ2.webp'
							alt='DJ 2'
							width={300}
							height={500}
							className={styles.djImageItem}
						/>
					</div>
					<div className={styles.djImage}>
						<Image
							src='/images/saransk/DJ3.webp'
							alt='DJ 3'
							width={300}
							height={500}
							className={styles.djImageItem}
						/>
					</div>
					<div className={styles.djImage}>
						<Image
							src='/images/saransk/DJ4.webp'
							alt='DJ 4'
							width={300}
							height={500}
							className={styles.djImageItem}
						/>
					</div>
				</div>
			</div>
			<Marquee
				text='БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × 
        БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ 
        СТИЛЬНЫМ × БУДЬ С АКРОНОМ × '
				duration={50}
			/>
			<Merch />
			<FanCard />

			{/* Большая кнопка Купить билеты */}
			<div className={styles.bigButton}>
				<ActionButton
					href={buttonHref}
					title='Купить билеты'
					actionType={buttonActionType}
				/>
			</div>
		</div>
	)
}

export default SaranskClient
