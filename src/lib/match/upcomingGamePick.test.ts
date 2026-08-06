import { describe, expect, it } from 'vitest'

import { PROMOTED_MAIN_CALENDAR_GAME_ID, type Game } from '@/data/games'

import {
	getGameEndDate,
	getHeroGameSwitchDate,
	pickHomeHeroGameByMatchEnd,
	pickHeroGameByMatchEnd,
	pickPromotedHeroGame,
	pickPromotedHomeHeroGame,
	sortGamesByDateIso,
} from './upcomingGamePick'

const makeGame = (
	id: string,
	dateIso: string,
	time: string,
	venue: Game['venue'] = 'home',
): Game => ({
	id,
	dateIso,
	time,
	venue,
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

describe('pickPromotedHeroGame', () => {
	it('prefers promoted game id before its end while an earlier match is still current', () => {
		const games = sortGamesByDateIso([
			makeGame('19', '2026-05-11', 'SAMT 14:00'),
			makeGame(PROMOTED_MAIN_CALENDAR_GAME_ID, '2026-05-17', 'SAMT 19:00', 'away'),
		])
		const now = new Date('2026-05-11T15:00:00+04:00')

		expect(pickPromotedHeroGame(games, now)?.id).toBe(
			PROMOTED_MAIN_CALENDAR_GAME_ID,
		)
	})
})

describe('pickPromotedHomeHeroGame', () => {
	it('если промо-матч гостевой — показываем ближайший домашний, а не промо', () => {
		const games = sortGamesByDateIso([
			makeGame('19', '2026-05-11', 'SAMT 14:00'),
			makeGame(PROMOTED_MAIN_CALENDAR_GAME_ID, '2026-05-17', 'SAMT 19:00', 'away'),
			makeGame('home-next', '2026-05-23', 'SAMT 19:30', 'home'),
		])
		const now = new Date('2026-05-17T12:00:00+04:00')

		expect(pickPromotedHomeHeroGame(games, now)?.id).toBe('home-next')
	})

	it('skips nearer away match and picks next home for calendar default', () => {
		const games = sortGamesByDateIso([
			makeGame('past-home', '2026-08-04', 'SAMT 17:15', 'home'),
			makeGame('away-next', '2026-08-08', 'SAMT 19:00', 'away'),
			makeGame('home-next', '2026-08-23', 'SAMT 19:00', 'home'),
		])
		const now = new Date('2026-08-06T12:00:00+04:00')

		expect(pickPromotedHomeHeroGame(games, now)?.id).toBe('home-next')
	})

	it('если промо-матч домашний и ещё идёт — показываем промо', () => {
		const games = sortGamesByDateIso([
			makeGame('19', '2026-05-11', 'SAMT 14:00'),
			makeGame(PROMOTED_MAIN_CALENDAR_GAME_ID, '2026-05-17', 'SAMT 19:00', 'home'),
		])
		const now = new Date('2026-05-11T15:00:00+04:00')

		expect(pickPromotedHomeHeroGame(games, now)?.id).toBe(
			PROMOTED_MAIN_CALENDAR_GAME_ID,
		)
	})
})

describe('pickHomeHeroGameByMatchEnd', () => {
	it('skips away matches and picks the nearest home match', () => {
		const games = sortGamesByDateIso([
			makeGame('away', '2026-05-17', 'SAMT 14:00', 'away'),
			makeGame('home', '2026-05-24', 'SAMT 18:00', 'home'),
		])
		const now = new Date('2026-05-16T12:00:00+04:00')

		expect(pickHomeHeroGameByMatchEnd(games, now)?.id).toBe('home')
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
