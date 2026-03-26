/**
 * Календарные подписи для полосы матчей (2026 и далее — те же названия месяцев).
 * При необходимости расширить на другие годы достаточно использовать те же имена.
 */
export const RU_MONTH_NAMES: readonly string[] = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
] as const

/** Число дней в месяце для 2026 (год невисокосный). */
export const DAYS_IN_MONTH_2026: readonly number[] = [
	31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
] as const

/** Короткие подписи дня недели: вс = 0 (как `Date#getDay()`). */
export const RU_WEEKDAY_SHORT: readonly string[] = [
	'ВС',
	'ПН',
	'ВТ',
	'СР',
	'ЧТ',
	'ПТ',
	'СБ',
] as const

export function monthNameRu(month1To12: number): string {
	return RU_MONTH_NAMES[month1To12 - 1] ?? ''
}

export function parseDateIsoLocal(iso: string): Date {
	const [y, m, d] = iso.split('-').map(Number)
	return new Date(y, m - 1, d)
}

/** Число дней в календарном месяце (month 1 = январь). */
export function daysInMonth(year: number, month1To12: number): number {
	return new Date(year, month1To12, 0).getDate()
}
