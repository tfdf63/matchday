'use client'

import React from 'react'
import Link from 'next/link'
import styles from './GamesMatch.module.scss'
import Timer2 from '../Timer2/Timer2'
interface CardMatchProps {
	homeTeam?: string
	awayTeam?: string
	date?: string
	time?: string
	stadium?: string
	className?: string
	ticketLink?: string
	ticketLinkVip?: string
	leagueInfo?: string
	priceIncreaseDates?: {
		first?: string
		second?: string
	}
	fanIdStatus?: string
}

const CardMatch: React.FC<CardMatchProps> = ({
	homeTeam = 'Команда 1',
	awayTeam = 'Команда 2',
	date = '12 марта',
	time = '19:30',
	stadium = 'Стадион',
	className,
	ticketLink = '#',
	// ticketLinkVip = '#',
	leagueInfo = '',
	priceIncreaseDates = {
		first: '2025-05-18',
		second: '2025-05-22',
	},
	fanIdStatus,
}) => {
	return (
		<div className={`${styles.card} ${className || ''}`}>
			{leagueInfo && (
				<div className={styles.leagueInfo}>
					<span>{leagueInfo}</span>
				</div>
			)}
			{fanIdStatus && (
				<Link href='#fan-card' className={styles.fanIdStatus}>
					{fanIdStatus}
				</Link>
			)}
			<div className={styles.teams}>
				<span className={styles.team}>{homeTeam}</span>
				<span className={styles.divider}>—</span>
				<span className={styles.team}>{awayTeam}</span>
			</div>

			<div className={styles.info}>
				<span>{date}</span>
				<span>{time}</span>
			</div>
			<div className={styles.info}>
				<span>{stadium}</span>
			</div>

			<div className={styles.buttonsContainer}>
				<Link href={ticketLink} className={styles.button}>
					Купить билеты
				</Link>
				{/* <Link href={ticketLinkVip} className={styles.button}>
					VIP A106
				</Link> */}
			</div>
			<Timer2 priceIncreaseDates={priceIncreaseDates} />
		</div>
	)
}

export default CardMatch
