'use client'

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { players } from '@/data/players'
import BackToHome from '@/components/BackToHome'
import styles from './page.module.scss'

const PlayersPage: React.FC = () => {
	return (
		<>
			<Head>
				<title>Состав команды ФК Акрон | Игроки команды</title>
				<meta
					name='description'
					content='Полный состав команды ФК Акрон. Информация об игроках, статистика, биографии, достижения. Официальный сайт клуба.'
				/>
				<meta
					name='keywords'
					content='ФК Акрон, состав команды, игроки, футболисты, статистика, биографии, достижения'
				/>
			</Head>

			{/* Глобальный фон */}
			<Image
				src='/images/fon.webp'
				alt='Фон'
				fill
				priority
				className='globalBgFon'
			/>

			<div className={styles.container}>
				<BackToHome />

				<div className={styles.content}>
					<h1 className={styles.title}>Состав команды</h1>

					<div className={styles.playersGrid}>
						{players.map(player => (
							<div key={player.id} className={styles.playerCard}>
								<div className={styles.imageWrapper}>
									<Image
										src={player.photoUrl}
										alt={`${player.firstName} ${player.lastName}`}
										fill
										className={styles.image}
										priority={true}
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
		</>
	)
}

export default PlayersPage
