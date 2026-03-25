import { MONTHS_RU_GENITIVE } from './months-ru'

const DATE_RU_RE = /(\d{1,2}) ([а-яё]+)/iu

/**
 * Парсит строку вида «29 июля» / «3 августа» в дату (год — текущий или заданный).
 */
export function parseMatchDateRu(
	dateStr: string,
	year: number = new Date().getFullYear(),
): Date | null {
	const match = dateStr.match(DATE_RU_RE)
	if (!match) return null

	const day = parseInt(match[1], 10)
	const month = MONTHS_RU_GENITIVE[match[2].toLowerCase()]
	if (month === undefined) return null

	return new Date(year, month, day)
}
