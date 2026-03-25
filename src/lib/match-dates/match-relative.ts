import type { MatchTicketBannerText } from './ticket-banner-text'

function startOfDay(d: Date): Date {
	const x = new Date(d)
	x.setHours(0, 0, 0, 0)
	return x
}

export function isMatchWithinUpcomingWeek(matchDate: Date, now: Date = new Date()): boolean {
	const today = startOfDay(now)
	const weekFromNow = new Date(today)
	weekFromNow.setDate(today.getDate() + 7)
	weekFromNow.setHours(23, 59, 59, 999)

	const daysUntil = Math.ceil(
		(matchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	)

	return matchDate >= today && matchDate <= weekFromNow && daysUntil <= 7
}

export function isMatchOnCurrentCalendarWeek(matchDate: Date, now: Date = new Date()): boolean {
	const today = startOfDay(now)

	if (today.getDay() === 0) {
		const todayEnd = new Date(today)
		todayEnd.setHours(23, 59, 59, 999)
		return matchDate >= today && matchDate <= todayEnd
	}

	const endOfWeek = new Date(today)
	endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
	endOfWeek.setHours(23, 59, 59, 999)

	return matchDate >= today && matchDate <= endOfWeek
}

export function getDaysUntilMatch(matchDate: Date, now: Date = new Date()): number {
	const today = startOfDay(now)
	const matchDay = startOfDay(matchDate)
	const diffTime = matchDay.getTime() - today.getTime()
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getDayWordRu(days: number): string {
	if (days === 1) return 'день'
	if (days >= 2 && days <= 4) return 'дня'
	return 'дней'
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
	return startOfDay(a).getTime() === startOfDay(b).getTime()
}

export function isMatchToday(matchDate: Date, now: Date = new Date()): boolean {
	return isSameCalendarDay(matchDate, now)
}

export function isMatchTomorrow(matchDate: Date, now: Date = new Date()): boolean {
	const tomorrow = new Date(now)
	tomorrow.setDate(now.getDate() + 1)
	return isSameCalendarDay(matchDate, tomorrow)
}

export function isMatchDayAfterTomorrow(matchDate: Date, now: Date = new Date()): boolean {
	const d = new Date(now)
	d.setDate(now.getDate() + 2)
	return isSameCalendarDay(matchDate, d)
}

/** Текст баннера по дате матча (логика как в MatchTicketBanner). */
export function getMatchTicketBannerText(
	matchDate: Date,
	now: Date = new Date(),
): MatchTicketBannerText | null {
	if (!isMatchWithinUpcomingWeek(matchDate, now)) return null

	const daysUntilMatch = getDaysUntilMatch(matchDate, now)

	let text = `Через ${daysUntilMatch} ${getDayWordRu(daysUntilMatch)}`
	if (isMatchToday(matchDate, now)) {
		text = 'Сегодня!'
	} else if (isMatchTomorrow(matchDate, now)) {
		text = 'Уже завтра!'
	} else if (isMatchDayAfterTomorrow(matchDate, now)) {
		text = 'Послезавтра'
	} else if (isMatchOnCurrentCalendarWeek(matchDate, now)) {
		text = 'На этой неделе'
	}

	return { text }
}
