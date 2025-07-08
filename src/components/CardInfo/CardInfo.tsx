'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { SubscriptionCard } from '@/data/subscriptions'
import ActionButton from '@/components/ActionButton'
import TicketModal from '@/components/TicketModal'
import styles from './CardInfo.module.scss'

interface CardInfoProps {
	card: {
		id: number
		title: string
		subtitle: string
		gallery: string[]
		services:
			| string[]
			| Array<{
					benefit: string
					description: string
			  }>
		sectors: SubscriptionCard[]
		subsectors: string[]
		tariffs?: Array<{
			sector?: string
			price1?: string
			price2?: string
			price3?: string
		}>
		stadiumSchema: string
		buyButton?: string
		features: Array<{
			title: string
			description: string
		}>
	}
}

const CardInfo: React.FC<CardInfoProps> = ({ card }) => {
	const router = useRouter()
	const pathname = usePathname()
	const sliderWrapperRef = React.useRef<HTMLDivElement>(null)
	const [isModalOpen, setIsModalOpen] = React.useState(false)
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

	const handleSectorClick = (url: string) => {
		router.push(url)
	}

	// Функции для навигации стрелками
	const scrollLeft = () => {
		if (sliderWrapperRef.current) {
			sliderWrapperRef.current.scrollBy({
				left: -400,
				behavior: 'smooth',
			})
		}
	}

	const scrollRight = () => {
		if (sliderWrapperRef.current) {
			sliderWrapperRef.current.scrollBy({
				left: 400,
				behavior: 'smooth',
			})
		}
	}

	// Функции для модального окна
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	// Определяем тип действия и параметры для кнопок
	const isFanPage = card.title.toLowerCase().includes('фанатский')
	const isVipSector =
		card.title.toLowerCase().includes('skybox') ||
		card.title.toLowerCase().includes('социальный')

	const buttonTitle = isFanPage ? 'Группа болельщиков' : 'Купить'
	// На мобильных устройствах всегда используем link, на десктопе - modal для покупки билетов
	const buttonActionType = isMobile || isFanPage ? 'link' : 'modal'
	const buttonHref = isFanPage
		? 'https://vk.com/fcakron_fans'
		: 'https://widget.afisha.yandex.ru/w/venues/79807?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51&_ab_new_calendar=off'

	// Функция для получения статуса сектора по названию
	const getSectorStatus = (sectorName: string) => {
		const sectorCard = card.sectors.find(
			sector =>
				sector.buttonText.toLowerCase().includes(sectorName.toLowerCase()) ||
				sectorName.toLowerCase().includes(sector.buttonText.toLowerCase())
		)
		return sectorCard?.status || 'mass'
	}

	// Функция для определения активной карточки
	const isActiveCard = (sector: SubscriptionCard) => {
		return pathname === sector.url
	}

	return (
		<div className={styles.cardInfo}>
			{/* Галерея фото */}
			<div className={styles.gallery}>
				<div className={styles.mainGalleryImage}>
					<Image
						src={card.gallery[0]}
						alt='Главное фото'
						width={600}
						height={400}
						className={styles.galleryImage}
					/>
				</div>
			</div>
			{/* Заголовок и кнопка */}
			<div className={styles.header}>
				<h1 className={styles.title}>{card.title}</h1>
				{!isVipSector && (
					<ActionButton
						href={buttonHref}
						title={buttonTitle}
						actionType={buttonActionType}
						onModalOpen={!isMobile ? openModal : undefined}
					/>
				)}
			</div>
			{/* Подзаголовок */}
			<p className={styles.subtitle}>{card.subtitle}</p>
			{/* Слайдер с кнопками карточек */}
			<div className={styles.cardSlider}>
				<div className={styles.sliderContainer}>
					<button
						className={styles.sliderArrow}
						onClick={scrollLeft}
						aria-label='Прокрутить влево'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<path d='M15 18l-6-6 6-6' />
						</svg>
					</button>
					<div className={styles.sliderWrapper} ref={sliderWrapperRef}>
						<div className={styles.slider}>
							{card.sectors.map(sector => (
								<button
									key={sector.id}
									className={`${styles.sectorButton} ${
										styles[getSectorStatus(sector.buttonText).toLowerCase()]
									} ${isActiveCard(sector) ? styles.active : ''}`}
									onClick={() => handleSectorClick(sector.url)}
								>
									{sector.buttonText}
								</button>
							))}
						</div>
					</div>
					<button
						className={styles.sliderArrow}
						onClick={scrollRight}
						aria-label='Прокрутить вправо'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<path d='M9 18l6-6-6-6' />
						</svg>
					</button>
				</div>
			</div>
			{/* Текстовые мини-карточки */}
			<div className={styles.features}>
				{card.features.map((feature, index) => (
					<div key={index} className={styles.featureCard}>
						<h2 className={styles.featureTitle}>{feature.title}</h2>
						<div className={styles.featureDescription}>
							{feature.description.split('\n').map((line, lineIndex) => (
								<p key={lineIndex}>{line}</p>
							))}
						</div>
					</div>
				))}
			</div>
			{/* Блок Сервис */}
			<div className={styles.services}>
				<h2 className={styles.sectionTitle}>Сервис</h2>
				<ul className={styles.servicesList}>
					{card.services.map((service, index) => (
						<li key={index} className={styles.serviceItem}>
							{typeof service === 'string' ? (
								service
							) : (
								<>
									<strong>{service.benefit}</strong>
									<div className={styles.benefitDescription}>
										{service.description.split('\n').map((line, lineIndex) => (
											<p key={lineIndex}>{line}</p>
										))}
									</div>
								</>
							)}
						</li>
					))}
				</ul>
			</div>
			{/* Блок Сектора */}
			<div className={styles.sectors}>
				<h2 className={styles.sectionTitle}>Сектор</h2>
				<div className={styles.sectorsButtons}>
					{card.subsectors.map((subsector, index) => (
						<button
							key={index}
							className={`${styles.sectorButton} ${
								styles[getSectorStatus(subsector).toLowerCase()]
							}`}
						>
							{subsector}
						</button>
					))}
				</div>
			</div>
			{/* Схема стадиона */}
			<div className={styles.stadiumSchema}>
				<Image
					src={card.stadiumSchema}
					alt='Схема стадиона'
					width={800}
					height={600}
					className={styles.schemaImage}
				/>
			</div>
			{/* Блок Тарифы */}
			{card.tariffs && card.tariffs.length > 0 && (
				<div className={styles.tariffs}>
					<h2 className={styles.sectionTitle}>Цены</h2>
					<div className={styles.tariffsTable}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Сектор</th>
									<th>До 06.07</th>
									<th>07-13.07</th>
									<th>После 13.07</th>
								</tr>
							</thead>
							<tbody>
								{card.tariffs.map((tariff, index) => (
									<tr key={index}>
										<td>{tariff.sector}</td>
										<td>{tariff.price1}</td>
										<td>{tariff.price2}</td>
										<td>{tariff.price3}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
			{/* Кнопка покупки внизу */}
			{!isVipSector && (
				<div className={styles.bottomButton}>
					<ActionButton
						href={buttonHref}
						title={buttonTitle}
						actionType={buttonActionType}
						onModalOpen={!isMobile ? openModal : undefined}
					/>
				</div>
			)}
			{/* Модальное окно - только для десктопа */}
			{!isMobile && <TicketModal isOpen={isModalOpen} onClose={closeModal} />}
		</div>
	)
}

export default CardInfo
