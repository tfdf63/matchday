import { describe, expect, it } from 'vitest'
import {
	getDayWordRu,
	getMatchTicketBannerText,
	isMatchToday,
} from './match-relative'

describe('getDayWordRu', () => {
	it('declines days in Russian (same rules as legacy banner)', () => {
		expect(getDayWordRu(1)).toBe('день')
		expect(getDayWordRu(3)).toBe('дня')
		expect(getDayWordRu(5)).toBe('дней')
		expect(getDayWordRu(11)).toBe('дней')
		expect(getDayWordRu(21)).toBe('день')
		expect(getDayWordRu(22)).toBe('дня')
		expect(getDayWordRu(25)).toBe('дней')
	})
})

describe('isMatchToday', () => {
	it('returns true when calendar day matches', () => {
		const now = new Date(2025, 6, 15, 12, 0, 0)
		const match = new Date(2025, 6, 15, 8, 0, 0)
		expect(isMatchToday(match, now)).toBe(true)
	})
})

describe('getMatchTicketBannerText', () => {
	it('returns today label', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)
		const match = new Date(2025, 6, 20, 19, 0, 0)
		const b = getMatchTicketBannerText(match, now)
		expect(b).not.toBeNull()
		expect(b!.text).toBe('Сегодня!')
	})

	it('returns tomorrow and day-after-tomorrow labels before week label', () => {
		const now = new Date(2025, 6, 14, 10, 0, 0)

		expect(
			getMatchTicketBannerText(new Date(2025, 6, 15, 19, 0, 0), now)?.text,
		).toBe('Уже завтра!')
		expect(
			getMatchTicketBannerText(new Date(2025, 6, 16, 19, 0, 0), now)?.text,
		).toBe('Послезавтра')
	})

	it('returns current week label until nearest Sunday', () => {
		const now = new Date(2025, 6, 16, 10, 0, 0)
		const saturday = new Date(2025, 6, 19, 19, 0, 0)

		expect(getMatchTicketBannerText(saturday, now)?.text).toBe('На этой неделе')
	})

	it('does not return week label on Sunday except today', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)
		const monday = new Date(2025, 6, 21, 19, 0, 0)

		expect(getMatchTicketBannerText(monday, now)?.text).toBe('Уже завтра!')
	})

	it('returns relative day label inside seven-day window', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)
		const inFiveDays = new Date(2025, 6, 25, 19, 0, 0)

		expect(getMatchTicketBannerText(inFiveDays, now)?.text).toBe('Через 5 дней')
	})

	it('does not return a label outside seven-day window', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)
		const inEightDays = new Date(2025, 6, 28, 19, 0, 0)

		expect(getMatchTicketBannerText(inEightDays, now)).toBeNull()
	})
})
