import { describe, expect, it } from 'vitest'

import {
	isSeasonTicketsHeroActive,
	SEASON_TICKETS_SALE_UNTIL_ISO,
} from './mainHeroConfig'

describe('isSeasonTicketsHeroActive', () => {
	it('returns true on or before sale end date', () => {
		expect(isSeasonTicketsHeroActive(SEASON_TICKETS_SALE_UNTIL_ISO)).toBe(true)
		expect(isSeasonTicketsHeroActive('2026-07-10')).toBe(true)
	})

	it('returns false after sale end date', () => {
		expect(isSeasonTicketsHeroActive('2026-09-01')).toBe(false)
	})
})
