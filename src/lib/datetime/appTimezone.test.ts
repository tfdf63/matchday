import { describe, expect, it } from 'vitest'

import { getAppDateIso } from './appTimezone'

describe('getAppDateIso', () => {
	it('uses Europe/Samara regardless of machine timezone', () => {
		// 2026-08-05 22:30 UTC = 2026-08-06 02:30 SAMT
		const instant = new Date('2026-08-05T22:30:00.000Z')

		expect(getAppDateIso(instant)).toBe('2026-08-06')
	})

	it('formats midnight SAMT on the same calendar day', () => {
		const instant = new Date('2026-08-06T20:00:00.000Z') // 00:00 SAMT next day? 
		// 2026-08-06 20:00 UTC = 2026-08-07 00:00 SAMT
		expect(getAppDateIso(instant)).toBe('2026-08-07')
	})
})
