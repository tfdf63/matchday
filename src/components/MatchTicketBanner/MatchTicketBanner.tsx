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

	// Функция для определения, находится ли матч на текущей неделе
	const isCurrentWeek = (matchDate: Date): boolean => {
		const now = new Date()
		const today = new Date(now)
		today.setHours(0, 0, 0, 0)

		const endOfWeek = new Date(today)
		endOfWeek.setDate(today.getDate() + (7 - today.getDay())) // Конец текущей недели (воскресенье)
		endOfWeek.setHours(23, 59, 59, 999)

		return matchDate >= today && matchDate <= endOfWeek
	}

	// Функция для подсчета дней до матча
	const getDaysUntilMatch = (matchDate: Date): number => {
		const now = new Date()
		const today = new Date(now)
		today.setHours(0, 0, 0, 0)

		const matchDay = new Date(matchDate)
		matchDay.setHours(0, 0, 0, 0)

		const diffTime = matchDay.getTime() - today.getTime()
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		return diffDays
	}

	// Функция для правильного склонения слова "день"
	const getDayWord = (days: number): string => {
		if (days === 1) return 'день'
		if (days >= 2 && days <= 4) return 'дня'
		return 'дней'
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
	const isCurrentWeekMatch = isCurrentWeek(matchDate)
	const daysUntilMatch = getDaysUntilMatch(matchDate)

	if (!showBanner) {
		return null
	}

	// Определяем текст баннера с приоритетом: Сегодня > Завтра > На этой неделе > Через X дней
	let bannerText = `Через ${daysUntilMatch} ${getDayWord(daysUntilMatch)}`
	if (isTodayMatch) {
		bannerText = 'Сегодня!'
	} else if (isTomorrowMatch) {
		bannerText = 'Уже завтра!'
	} else if (isCurrentWeekMatch) {
		bannerText = 'На этой неделе'
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
