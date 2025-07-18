'use client'

import React from 'react'
import Link from 'next/link'
import styles from './CardMatch.module.scss'

interface CardMatchProps {
	leagueInfo?: string
	homeTeam?: string
	awayTeam?: string
	date?: string
	time?: string
	stadium?: string
	className?: string
	ticketLink?: string
	ticketLinkVip?: string
}

const CardMatch: React.FC<CardMatchProps> = ({
	leagueInfo,
	homeTeam = 'Команда 1',
	awayTeam = 'Команда 2',
	date = '12 марта',
	time = '19:30',
	stadium = 'Стадион',
	className,
	ticketLink = '#',
	// ticketLinkVip = '#',
}) => {
	return (
		<div className={`${styles.card} ${className || ''}`}>
			{leagueInfo && (
				<div className={styles.leagueInfo}>
					<span>{leagueInfo}</span>
				</div>
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
		</div>
	)
}

export default CardMatch
