'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { players } from '@/data/players'
import ActionButton from '@/components/ActionButton'
import styles from './Players.module.scss'

const Players: React.FC = () => {
	const [isMobile, setIsMobile] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)

	// Определяем мобильное устройство
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Функции для навигации стрелками (как в SubscriptionSlider)
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: -400,
				behavior: 'smooth',
			})
		}
	}

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: 400,
				behavior: 'smooth',
			})
		}
	}

	return (
		<section className={styles.playersSection}>
			<div className={styles.container}>
				<div className={styles.headerRow}>
					<h2 className={styles.sectionTitle}>Состав команды</h2>

					{/* Стрелки навигации для ПК (как в SubscriptionSlider) */}
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

					{/* Кнопка "Подробнее" */}
					<ActionButton
						href='/players'
						title='Подробнее'
						actionType='internal'
						className={styles.detailsButton}
					/>
				</div>

				<div ref={sliderRef} className={styles.sliderWrapper}>
					<div className={styles.slider}>
						{players.map((player, index) => (
							<div key={player.id} className={styles.card}>
								<div className={styles.imageWrapper}>
									<Image
										src={player.photoUrl}
										alt={`${player.firstName} ${player.lastName}`}
										fill
										className={styles.image}
										priority={index < 3}
									/>

									<div className={styles.cardOverlay}>
										<div className={styles.cardContent}>
											<div className={styles.playerInfo}>
												<div className={styles.playerName}>
													<div className={styles.lastName}>
														{player.lastName}
													</div>
													<div className={styles.firstName}>
														{player.firstName}
													</div>
												</div>
											</div>

											<div className={styles.playerNumber}>{player.number}</div>
										</div>
									</div>

									{/* Дополнительная информация при наведении */}
									<div className={styles.hoverInfo}>
										<div className={styles.hoverContent}>
											{player.titles.length > 0 && (
												<div className={styles.playerTitles}>
													{player.titles.map((title, titleIndex) => (
														<span key={titleIndex} className={styles.title}>
															{title}
														</span>
													))}
												</div>
											)}

											<div className={styles.playerDescription}>
												{player.description}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Players
