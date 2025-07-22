'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubscriptionCard, subscriptionCards } from '@/data/subscriptions'

import ActionButton from '@/components/ActionButton'
import TicketModal from '@/components/TicketModal'
import styles from './SubscriptionSlider.module.scss'

interface SubscriptionSliderProps {
	cards?: SubscriptionCard[]
	className?: string
}

const SubscriptionSlider: React.FC<SubscriptionSliderProps> = ({
	cards = subscriptionCards,
	className = '',
}) => {
	const router = useRouter()
	const sliderWrapperRef = useRef<HTMLDivElement>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	// Определяем мобильное устройство
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const handleCardClick = (url: string) => {
		router.push(url)
	}

	const handleButtonClick = (e: React.MouseEvent, url: string) => {
		e.stopPropagation() // Предотвращаем всплытие события
		router.push(url)
	}

	// Функции для модального окна
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	// Определяем параметры для кнопки "Купить"
	const buttonTitle = 'Купить'
	const buttonActionType = isMobile ? 'link' : 'modal'
	const buttonHref =
		'https://widget.afisha.yandex.ru/w/venues/79807?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51&_ab_new_calendar=off'

	// Функции для навигации стрелками
	const scrollLeft = () => {
		if (sliderWrapperRef.current) {
			console.log('Прокрутка влево')
			console.log('Текущая позиция:', sliderWrapperRef.current.scrollLeft)
			console.log('Ширина слайдера:', sliderWrapperRef.current.scrollWidth)
			sliderWrapperRef.current.scrollBy({
				left: -400,
				behavior: 'smooth',
			})
		}
	}

	const scrollRight = () => {
		if (sliderWrapperRef.current) {
			console.log('Прокрутка вправо')
			console.log('Текущая позиция:', sliderWrapperRef.current.scrollLeft)
			console.log('Ширина слайдера:', sliderWrapperRef.current.scrollWidth)
			sliderWrapperRef.current.scrollBy({
				left: 400,
				behavior: 'smooth',
			})
		}
	}

	// Проверяем, что cards существует и не пустой
	if (!cards || cards.length === 0) {
		return <div className={`${styles.sliderContainer} ${className}`} />
	}

	return (
		<div className={`${styles.sliderContainer} ${className}`}>
			<div className={styles.headerRow}>
				<h2 className={styles.sectionTitle}>Выбери свой сектор</h2>
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
				<ActionButton
					href={buttonHref}
					title={buttonTitle}
					actionType={buttonActionType}
					onModalOpen={!isMobile ? openModal : undefined}
					className={styles.buyButton}
				/>
			</div>
			<div ref={sliderWrapperRef} className={styles.sliderWrapper}>
				<div className={styles.slider}>
					{cards.map(card => (
						<div
							key={card.id}
							className={styles.card}
							onClick={() => handleCardClick(card.url)}
						>
							<div className={styles.imageWrapper}>
								<Image
									src={card.image}
									alt={`Абонемент ${card.id}`}
									fill
									className={styles.image}
									priority={true}
									sizes='340px'
								/>
								<div className={styles.cardOverlay}>
									<div className={styles.cardContent}>
										<button
											className={`${styles.button} ${
												styles[card.status.toLowerCase()]
											}`}
											onClick={e => handleButtonClick(e, card.url)}
										>
											{card.buttonText}
										</button>
										<span className={styles.price}>{card.price}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Модальное окно */}
			<TicketModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	)
}

export default SubscriptionSlider
