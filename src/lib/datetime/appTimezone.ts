/** Календарные даты матчей и «сегодня» — по времени Самары (SAMT). */
export const APP_TIME_ZONE = 'Europe/Samara'

/** Локальная дата в формате YYYY-MM-DD в часовом поясе приложения. */
export function getAppDateIso(now: Date = new Date()): string {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: APP_TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(now)
}
