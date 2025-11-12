'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './GamesMatch.module.scss'
import Timer2 from '../Timer2/Timer2'
import MatchTicketBanner from '../MatchTicketBanner'
import ActionButton from '../ActionButton'
import PromoCodesModal from '../PromoCodesModal/PromoCodesModal'

interface CardMatchProps {
	homeTeam?: string
	awayTeam?: string
	date?: string
	time?: string
	timeLocal?: string
	stadium?: string
	className?: string
	ticketLink?: string
	ticketLinkVip?: string
	ticketLinkSkybox?: string
	leagueInfo?: string
	priceIncreaseDates?: {
		first?: string
		second?: string
	}
	fanIdStatus?: string
	promoType?: 'cup' | 'rpl'
}

function getShortWeekdayRu(dateStr: string): string {
	// Ожидается формат '29 июля' или '3 августа'
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
	homeTeam = 'Команда 1',
	awayTeam = 'Команда 2',
	date = '12 марта',
	time = '19:30',
	timeLocal,
	stadium = 'Стадион',
	className,
	ticketLink = '#',
	ticketLinkVip = '#',
	ticketLinkSkybox = '#',
	leagueInfo = '',
	priceIncreaseDates = {
		first: '2025-05-18',
		second: '2025-05-22',
	},
	fanIdStatus,
	promoType,
}) => {
	const [isPromoOpen, setPromoOpen] = useState(false)
	const isCupMatch = promoType === 'cup'
	const isRplMatch = promoType === 'rpl'

	// Отладочная информация
	// console.log(
	// 	'GamesMatch promoType:',
	// 	promoType,
	// 	'isCupMatch:',
	// 	isCupMatch,
	// 	'isRplMatch:',
	// 	isRplMatch
	// )

	const isSaranskStadium = stadium === 'Саранск. Мордовия Арена'

	return (
		<div
			className={`${styles.card} ${
				isSaranskStadium ? styles.saranskCard : ''
			} ${className || ''}`}
		>
			{/* Баннер статуса матча */}
			<MatchTicketBanner date={date} isGamesMatch={true} />

			{/* Новый flex-контейнер для leagueInfo и fanIdStatus */}
			{(leagueInfo || fanIdStatus) && (
				<div className={styles.infoRow}>
					{leagueInfo && (
						<div className={styles.leagueInfo}>
							<span>{leagueInfo}</span>
						</div>
					)}
					{fanIdStatus && (
						<Link href='#fan-card' className={styles.fanIdStatus}>
							{fanIdStatus === 'Без fan id' ? 'без fan id' : 'fan id'}
						</Link>
					)}
				</div>
			)}
			<div className={styles.teams}>
				<span className={styles.team}>{homeTeam}</span>
				<span className={styles.divider}>—</span>
				<span className={styles.team}>{awayTeam}</span>
			</div>

			<div className={styles.info}>
				<span>
					{date} ({getShortWeekdayRu(date)})
				</span>
				<div className={styles.time}>
					<span>{time}</span>
					{timeLocal && <span>{timeLocal}</span>}
				</div>
			</div>
			<div className={styles.info}>
				<span className={isSaranskStadium ? styles.blinkingStadium : ''}>
					{stadium}
				</span>
			</div>

			<div className={styles.buttonsContainer}>
				{ticketLink && ticketLink !== '#' && (
					<ActionButton
						href={ticketLink}
						title='Купить билеты'
						actionType='link'
						external={true}
						className={`${styles.button} ${styles.buttonMain}`}
					/>
				)}
				{ticketLinkVip && ticketLinkVip !== '#' && (
					<Link
						href={ticketLinkVip}
						className={`${styles.button} ${styles.buttonVip}`}
						target='_blank'
						rel='noopener noreferrer'
					>
						VIP
					</Link>
				)}
				{ticketLinkSkybox && ticketLinkSkybox !== '#' && (
					<Link
						href={ticketLinkSkybox}
						className={`${styles.button} ${styles.buttonSkybox}`}
						target='_blank'
						rel='noopener noreferrer'
					>
						Ложи
					</Link>
				)}
			</div>

			{/* Кнопка промокодов */}
			{(isCupMatch || isRplMatch) && (
				<ActionButton
					href='#'
					title='Промокоды для друзей'
					actionType='modal'
					onModalOpen={() => setPromoOpen(true)}
					className={styles.promoButton}
				/>
			)}

			<div className={styles.timerWrapper}>
				<Timer2 priceIncreaseDates={priceIncreaseDates} />
			</div>

			{/* Модальное окно промокодов */}
			<PromoCodesModal
				isOpen={isPromoOpen}
				onClose={() => setPromoOpen(false)}
				promoType={promoType}
			/>
		</div>
	)
}

export default CardMatch
