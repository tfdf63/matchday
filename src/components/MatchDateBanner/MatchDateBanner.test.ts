import { describe, expect, it } from 'vitest'

import type { Game } from '@/data/games'

import { getMatchDateBannerText } from './MatchDateBanner'

const makeGame = (date: string): Game => ({
	id: date,
	date,
	dateIso: '2025-07-20',
	venue: 'home',
	fanIdStatus: 'Fan id',
})

describe('getMatchDateBannerText', () => {
	it('parses game date with the current year from now', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)

		expect(getMatchDateBannerText(makeGame('21 июля'), now)).toBe(
			'Уже завтра!',
		)
	})

	it('returns null when game has no parseable date', () => {
		const now = new Date(2025, 6, 20, 10, 0, 0)

		expect(getMatchDateBannerText(makeGame('foo'), now)).toBeNull()
	})
})
