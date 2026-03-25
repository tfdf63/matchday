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
})
