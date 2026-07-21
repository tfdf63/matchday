import { describe, expect, it } from 'vitest'

import { isMinorOnMatchDate } from './passengerAge'

describe('isMinorOnMatchDate', () => {
	it('returns true when under 18 on match day', () => {
		expect(isMinorOnMatchDate('2010-07-26', '2026-07-25')).toBe(true)
		expect(isMinorOnMatchDate('2008-07-26', '2026-07-25')).toBe(true)
	})

	it('returns false on 18th birthday', () => {
		expect(isMinorOnMatchDate('2008-07-25', '2026-07-25')).toBe(false)
	})

	it('returns false when 18 or older on match day', () => {
		expect(isMinorOnMatchDate('2008-07-24', '2026-07-25')).toBe(false)
		expect(isMinorOnMatchDate('1990-01-01', '2026-07-25')).toBe(false)
	})

	it('returns false without birth date', () => {
		expect(isMinorOnMatchDate(null, '2026-07-25')).toBe(false)
		expect(isMinorOnMatchDate('', '2026-07-25')).toBe(false)
	})
})
