import { describe, expect, it } from 'vitest'

import type { Game } from '@/data/games'

import {
	getGameEndDate,
	getHeroGameSwitchDate,
	pickHeroGameByMatchEnd,
	sortGamesByDateIso,
} from './upcomingGamePick'

const makeGame = (id: string, dateIso: string, time: string): Game => ({
	id,
	dateIso,
	time,
	venue: 'home',
	fanIdStatus: 'Fan id',
})

describe('pickHeroGameByMatchEnd', () => {
	const games = sortGamesByDateIso([
		makeGame('18', '2026-05-03', 'SAMT 18:00'),
		makeGame('19', '2026-05-11', 'SAMT 14:00'),
	])

	it('keeps the match until the conditional end time', () => {
		const now = new Date('2026-05-03T19:59:00+04:00')

		expect(pickHeroGameByMatchEnd(games, now)?.id).toBe('18')
	})

	it('switches to the next match after start time plus two hours', () => {
		const now = new Date('2026-05-03T20:00:00+04:00')

		expect(pickHeroGameByMatchEnd(games, now)?.id).toBe('19')
	})

	it('returns the switch date for the currently selected match', () => {
		const now = new Date('2026-05-03T12:00:00+04:00')

		expect(getHeroGameSwitchDate(games, now)?.toISOString()).toBe(
			'2026-05-03T16:00:00.000Z',
		)
	})
})

describe('getGameEndDate', () => {
	it('parses SAMT time and adds two hours', () => {
		const game = makeGame('18', '2026-05-03', 'SAMT 18:00')

		expect(getGameEndDate(game)?.toISOString()).toBe(
			'2026-05-03T16:00:00.000Z',
		)
	})
})
