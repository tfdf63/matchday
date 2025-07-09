'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubscriptionCard, subscriptionCards } from '@/data/subscriptions'
// import Timer from '@/components/Timer/Timer'
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

	const handleCardClick = (url: string) => {
		router.push(url)
	}

	const handleButtonClick = (e: React.MouseEvent, url: string) => {
		e.stopPropagation() // Предотвращаем всплытие события
		router.push(url)
	}

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
				{/* <Timer targetDate='2025-07-14T18:00:00' className={styles.timer} /> */}
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

			{/* Стрелки навигации */}
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
		</div>
	)
}

export default SubscriptionSlider
