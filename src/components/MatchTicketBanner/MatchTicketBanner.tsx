'use client'

import React from 'react'
import styles from './MatchTicketBanner.module.scss'

interface MatchTicketBannerProps {
	date: string
}

const MatchTicketBanner: React.FC<MatchTicketBannerProps> = ({ date }) => {
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

	// Функция для определения, находится ли матч на этой неделе
	const isThisWeek = (matchDate: Date): boolean => {
		const now = new Date()
		const startOfWeek = new Date(now)
		startOfWeek.setDate(now.getDate() - now.getDay()) // Начало недели (воскресенье)
		startOfWeek.setHours(0, 0, 0, 0)

		const endOfWeek = new Date(startOfWeek)
		endOfWeek.setDate(startOfWeek.getDate() + 6) // Конец недели (суббота)
		endOfWeek.setHours(23, 59, 59, 999)

		return matchDate >= startOfWeek && matchDate <= endOfWeek
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
	const showBanner = isThisWeek(matchDate)
	const isTomorrowMatch = isTomorrow(matchDate)

	if (!showBanner) {
		return null
	}

	return (
		<div className={styles.banner}>
			<div className={styles.bannerText}>
				{isTomorrowMatch ? 'Уже завтра!' : 'На этой неделе'}
			</div>
		</div>
	)
}

export default MatchTicketBanner
