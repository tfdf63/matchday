'use client'

import React from 'react'
import styles from './MatchTicketBanner.module.scss'

interface MatchTicketBannerProps {
	date: string
	isGamesMatch?: boolean
}

const MatchTicketBanner: React.FC<MatchTicketBannerProps> = ({
	date,
	isGamesMatch = false,
}) => {
	// Функция для парсинга даты из строки "29 июля"
	const parseDate = (dateStr: string): Date => {
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

		const match = dateStr.match(/(\d{1,2}) ([а-я]+)/i)
		if (!match) return new Date()

		const day = parseInt(match[1], 10)
		const month = months[match[2].toLowerCase()]
		if (month === undefined) return new Date()

		const year = new Date().getFullYear()
		return new Date(year, month, day)
	}

	// Функция для определения, находится ли матч в пределах недели
	const isWithinWeek = (matchDate: Date): boolean => {
		const now = new Date()
		const today = new Date(now)
		today.setHours(0, 0, 0, 0)

		const weekFromNow = new Date(today)
		weekFromNow.setDate(today.getDate() + 7) // Через неделю
		weekFromNow.setHours(23, 59, 59, 999)

		return matchDate >= today && matchDate <= weekFromNow
	}

	// Функция для определения, сегодня ли матч
	const isToday = (matchDate: Date): boolean => {
		const now = new Date()
		const today = new Date(now)
		today.setHours(0, 0, 0, 0)

		const matchDay = new Date(matchDate)
		matchDay.setHours(0, 0, 0, 0)

		return matchDay.getTime() === today.getTime()
	}

	// Функция для определения, завтра ли матч
	const isTomorrow = (matchDate: Date): boolean => {
		const now = new Date()
		const tomorrow = new Date(now)
		tomorrow.setDate(now.getDate() + 1)
		tomorrow.setHours(0, 0, 0, 0)

		const matchDay = new Date(matchDate)
		matchDay.setHours(0, 0, 0, 0)

		return matchDay.getTime() === tomorrow.getTime()
	}

	const matchDate = parseDate(date)
	const showBanner = isWithinWeek(matchDate)
	const isTodayMatch = isToday(matchDate)
	const isTomorrowMatch = isTomorrow(matchDate)

	if (!showBanner) {
		return null
	}

	// Определяем текст баннера с приоритетом: Сегодня > Завтра > На этой неделе
	let bannerText = 'На этой неделе'
	if (isTodayMatch) {
		bannerText = 'Сегодня!'
	} else if (isTomorrowMatch) {
		bannerText = 'Уже завтра!'
	}

	return (
		<div
			className={`${styles.banner} ${
				isGamesMatch ? styles.bannerGamesMatch : ''
			}`}
		>
			<div className={styles.bannerText}>{bannerText}</div>
		</div>
	)
}

export default MatchTicketBanner
