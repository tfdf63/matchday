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

	// Определяем мобильное устройство
	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const buttonHref =
		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@43608494?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=42'
	const buttonActionType = isMobile ? 'link' : 'modal'

	return (
		<div className={styles.saranskPage}>
			{/* Фото */}
			<div className={styles.heroImage}>
				<Image
					src={
						isMobile
							? '/images/saransk/banner3.webp'
							: '/images/saransk/banner3.png'
					}
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
