'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NextMatchCard.module.scss'
import { NextMatchGame } from '@/data/nextMatchMock'

interface NextMatchCardProps {
	game: NextMatchGame
	onPromoClick?: () => void
	className?: string
}

const NextMatchCard: React.FC<NextMatchCardProps> = ({
	game,
	onPromoClick,
	className,
}) => {
	const {
		homeTeam,
		awayTeam,
		date,
		time,
		stadium,
		leagueInfo,
		ticketLink,
		ticketLinkVip,
		ticketLinkSkybox,
		priceIncreaseDates,
		fanIdRequired,
	} = game

	const priceInfoText =
		priceIncreaseDates?.first && priceIncreaseDates?.second
			? `Повышение цен: ${priceIncreaseDates.first} - ${priceIncreaseDates.second}`
			: priceIncreaseDates?.first
				? `Повышение цен: ${priceIncreaseDates.first}`
				: null

	return (
		<div className={`${styles.card} ${className || ''}`}>
			{fanIdRequired && <div className={styles.fanIdBadge}>FAN ID</div>}

			<div className={styles.content}>
				<h3 className={styles.title}>Следующий матч</h3>

				<div className={styles.content}>
					<div className={styles.content}>
						<div className={styles.matchInfo}>
							<div className={styles.leagueInfo}>{leagueInfo}</div>

							<div className={styles.dateRow}>
								<Image
									src='/images/icon-calendar.svg'
									alt=''
									width={20}
									height={20}
									className={styles.dateIcon}
								/>
								<span className={styles.dateText}>
									{date} {time}
								</span>
							</div>

							<div className={styles.stadium}>{stadium}</div>
						</div>

						<div className={styles.teams}>
							<div className={styles.team}>
								<Image
									src={homeTeam.logo}
									alt={homeTeam.name}
									width={56}
									height={56}
									className={styles.teamLogo}
								/>
								<div className={styles.teamDetails}>
									<div className={styles.teamName}>{homeTeam.name}</div>
									<div className={styles.teamCity}>{homeTeam.city}</div>
								</div>
							</div>

							<span className={styles.teamsDivider}>—</span>

							<div className={styles.team}>
								<Image
									src={awayTeam.logo}
									alt={awayTeam.name}
									width={56}
									height={56}
									className={styles.teamLogo}
								/>
								<div className={styles.teamDetails}>
									<div className={styles.teamName}>{awayTeam.name}</div>
									<div className={styles.teamCity}>{awayTeam.city}</div>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.actions}>
						<div className={styles.ticketButtons}>
							{ticketLink && (
								<a
									href={ticketLink}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.btnPrimary}
								>
									Купить билеты
								</a>
							)}

							<div className={styles.btnRow}>
								{ticketLinkVip && (
									<a
										href={ticketLinkVip}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.btnOutlined}
									>
										VIP
									</a>
								)}
								{ticketLinkSkybox && (
									<a
										href={ticketLinkSkybox}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.btnOutlined}
									>
										Ложи
									</a>
								)}
							</div>
						</div>

						{priceInfoText && (
							<div className={styles.priceInfo}>{priceInfoText}</div>
						)}

						<div className={styles.btnRow}>
							{onPromoClick ? (
								<button
									type='button'
									onClick={onPromoClick}
									className={styles.btnDark}
								>
									<Image
										src='/images/icon-ticket.svg'
										alt=''
										width={20}
										height={20}
										className={styles.btnIcon}
									/>
									Промокоды
								</button>
							) : (
								<Link href='/bonuses' className={styles.btnDark}>
									<Image
										src='/images/icon-ticket.svg'
										alt=''
										width={20}
										height={20}
										className={styles.btnIcon}
									/>
									Промокоды
								</Link>
							)}

							<Link href='/road' className={styles.btnDark}>
								<Image
									src='/images/icon-location-arrow.svg'
									alt=''
									width={20}
									height={20}
									className={styles.btnIcon}
								/>
								Как добраться
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NextMatchCard
