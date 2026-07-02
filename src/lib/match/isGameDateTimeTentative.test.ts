import { describe, expect, it } from 'vitest'

import type { Game } from '@/data/games'

import {
	isGameDateTimeTentative,
	TENTATIVE_SCHEDULE_FROM_DATE_ISO,
} from './isGameDateTimeTentative'

const makeGame = (dateIso: string): Game => ({
	id: '1',
	dateIso,
	venue: 'home',
	fanIdStatus: 'Fan id',
})

describe('isGameDateTimeTentative', () => {
	it('returns false before season 2026/2027 cutoff', () => {
		expect(isGameDateTimeTentative(makeGame('2026-07-25'))).toBe(false)
		expect(isGameDateTimeTentative(makeGame('2026-04-04'))).toBe(false)
	})

	it('returns true from cutoff date inclusive', () => {
		expect(isGameDateTimeTentative(makeGame(TENTATIVE_SCHEDULE_FROM_DATE_ISO))).toBe(
			true,
		)
		expect(isGameDateTimeTentative(makeGame('2027-05-23'))).toBe(true)
	})
})
