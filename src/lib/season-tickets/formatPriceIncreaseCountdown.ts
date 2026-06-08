import { getDayWordRu, getDaysUntilMatch } from '@/lib/match-dates'

function parseIsoDateLocal(iso: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
	if (!match) return null

	const year = Number(match[1])
	const month = Number(match[2])
	const day = Number(match[3])

	if (month < 1 || month > 12 || day < 1 || day > 31) return null

	return new Date(year, month - 1, day)
}

function getNextPriceIncreaseDate(
	dates: readonly string[],
	now: Date = new Date(),
): Date | null {
	const candidates = dates
		.map(parseIsoDateLocal)
		.filter((date): date is Date => date !== null)
		.sort((a, b) => a.getTime() - b.getTime())

	for (const date of candidates) {
		if (getDaysUntilMatch(date, now) >= 0) return date
	}

	return null
}

/** «до повышения — N дней» для жёлтого баннера; `null` — все даты в прошлом. */
export function formatSeasonTicketsPriceIncreaseCountdown(
	dates: readonly string[],
	now: Date = new Date(),
): string | null {
	const nextDate = getNextPriceIncreaseDate(dates, now)
	if (!nextDate) return null

	const days = getDaysUntilMatch(nextDate, now)

	if (days === 0) return 'до повышения — сегодня'

	return `до повышения — ${days} ${getDayWordRu(days)}`
}
