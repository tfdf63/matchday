'use client'

import React from 'react'
import Link from 'next/link'
import styles from './CardMatch.module.scss'
import MatchTicketBanner from '../MatchTicketBanner'
import ActionButton from '../ActionButton/ActionButton'

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
	fanIdStatus?: string
}

function getShortWeekdayRu(dateStr: string): string {
	const months: Record<string, number> = {
		января: 0,
		февраля: 1,
		марта: 2,
		апреля: 3,
		мая: 4,
		июня: 5,
		июля: 6,
		августа: 7,
		сентября: 8,
		октября: 9,
		ноября: 10,
		декабря: 11,
	}
	const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
	const match = dateStr.match(/(\d{1,2}) ([а-я]+)/i)
	if (!match) return ''
	const day = parseInt(match[1], 10)
	const month = months[match[2].toLowerCase()]
	if (month === undefined) return ''
	const year = new Date().getFullYear()
	const date = new Date(year, month, day)
	return days[date.getDay()]
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
	fanIdStatus,
	// ticketLinkVip = '#',
}) => {
	const isSaranskStadium = stadium === 'Саранск. Мордовия Арена'

	return (
		<div
			className={`${styles.card} ${
				isSaranskStadium ? styles.saranskCard : ''
			} ${className || ''}`}
		>
			{/* Баннер статуса матча */}
			<MatchTicketBanner date={date} />

			<div className={styles.infoRow}>
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
			</div>
			<div className={styles.teams}>
				<span className={styles.team}>{homeTeam}</span>
				<span className={styles.divider}>—</span>
				<span className={styles.team}>{awayTeam}</span>
			</div>

			<div className={styles.info}>
				<span>
					{date} ({getShortWeekdayRu(date)})
				</span>
				<span>{time}</span>
			</div>
			<div className={styles.info}>
				<span className={isSaranskStadium ? styles.blinkingStadium : ''}>
					{stadium}
				</span>
			</div>

			<div className={styles.buttonsContainer}>
				<ActionButton
					href={ticketLink}
					title='Купить билеты'
					actionType='link'
					external={true}
					className={styles.button}
				/>
				{/* <Link href={ticketLinkVip} className={styles.button}>
					VIP A106
				</Link> */}
			</div>
		</div>
	)
}

export default CardMatch
