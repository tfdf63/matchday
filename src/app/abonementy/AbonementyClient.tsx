'use client'

import React from 'react'
import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './AbonementyClient.module.scss'

const AbonementyClient: React.FC = () => {
	const [isMobile, setIsMobile] = React.useState(false)

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const buttonHref =
		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@season-57457877?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'
	const buttonActionType = isMobile ? 'link' : 'modal'

	return (
		<div className={styles.abonementyPage}>
			<div className={styles.heroImage}>
				<Image
					src='/images/abon1.webp'
					alt='Абонементы'
					width={1200}
					height={400}
					className={styles.image}
				/>
			</div>

			<div className={styles.headerSection}>
				<h1 className={styles.title}>Абонементы на весну — в продаже!</h1>
				<div className={styles.smallButton}>
					<ActionButton
						href={buttonHref}
						title='Купить абонемент'
						actionType={buttonActionType}
					/>
				</div>
			</div>

			<p className={styles.subtitle}>
				Эмоции, адреналин и азарт скоро вернутся на стадион. Бронируй место на
				трибунах, чтобы смотреть на футбольную драму с комфортом и лучшим видом.
			</p>

			<div className={styles.descriptionSection}>
				<h2 className={styles.descriptionTitle}>Об абонементах</h2>
				<ul className={styles.descriptionList}>
					<li>Покупая детский абонемент — выгода до 80%</li>
					<li>Оплату можно разделить на 4 платежа с помощью Яндекс Сплит</li>
					<li>
						При покупке «Центрального» и «Комфортного» абонементов — клубное
						джерси в подарок. Это предложение действует только в первый этап
						продаж
					</li>
				</ul>
			</div>
			<div className={styles.gallery}>
				{[1, 2, 3, 4, 5, 6].map(n => (
					<div key={n} className={styles.galleryItem}>
						<Image
							src={`/images/abon/abon${n}.jpg`}
							alt={`Абонементы — фото ${n}`}
							width={1620}
							height={2025}
							className={styles.galleryImage}
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw'
						/>
					</div>
				))}
			</div>

			<div className={styles.bigButton}>
				<ActionButton
					href={buttonHref}
					title='Купить абонемент'
					actionType={buttonActionType}
				/>
			</div>
		</div>
	)
}

export default AbonementyClient
