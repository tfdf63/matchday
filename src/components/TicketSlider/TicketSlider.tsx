'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './TicketSlider.module.scss'

export interface TicketCard {
	id: number
	image: string
	buttonText: string
	url: string
	status: 'VIP' | 'Premium' | 'Mass'
}

interface TicketSliderProps {
	cards: TicketCard[]
	className?: string
}

const TicketSlider: React.FC<TicketSliderProps> = ({
	cards,
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

	// Проверяем, что cards существует и не пустой
	if (!cards || cards.length === 0) {
		return <div className={`${styles.sliderContainer} ${className}`} />
	}

	return (
		<div className={`${styles.sliderContainer} ${className}`}>
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
									alt={`Билет ${card.id}`}
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
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default TicketSlider
