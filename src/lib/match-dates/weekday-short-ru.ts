import { parseMatchDateRu } from './parse-match-date-ru'

const SHORT_DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

/** Короткий день недели для подписи к дате в формате «29 июля». */
export function getShortWeekdayRu(dateStr: string): string {
	const parsed = parseMatchDateRu(dateStr)
	if (!parsed) return ''
	return SHORT_DAYS[parsed.getDay()]
}
