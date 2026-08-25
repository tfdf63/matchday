import { describe, expect, it } from 'vitest'

import { PROMOTED_MAIN_CALENDAR_GAME_ID, type Game } from '@/data/games'

import {
	getGameEndDate,
	getHeroGameSwitchDate,
	getHomeHeroTicketGamesSwitchDate,
	hasFilledMainHeroTicketLinks,
	pickHomeHeroGameByMatchEnd,
	pickHomeHeroGamesWithTicketLinks,
	pickHeroGameByMatchEnd,
	pickMainHeroMatchCards,
	pickPromotedHeroGame,
	pickPromotedHomeHeroGame,
	sortGamesByDateIso,
} from './upcomingGamePick'

const TICKET_TRIO = {
	ticketLink: 'https://tickets.example/regular',
	ticketLinkVip: 'https://tickets.example/vip',
	ticketLinkSkybox: 'https://tickets.example/skybox',
} as const

const makeGame = (
	id: string,
	dateIso: string,
	time: string,
	venue: Game['venue'] = 'home',
	extra: Partial<Game> = {},
): Game => ({
	id,
	dateIso,
	time,
	venue,
	fanIdStatus: 'Fan id',
	...extra,
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

describe('pickHomeHeroGamesWithTicketLinks', () => {
	const games = sortGamesByDateIso([
		makeGame('finished', '2026-08-23', 'SAMT 19:00', 'home', TICKET_TRIO),
		makeGame('away-tickets', '2026-08-26', 'SAMT 19:00', 'away', TICKET_TRIO),
		makeGame('missing-skybox', '2026-08-27', 'SAMT 19:00', 'home', {
			ticketLink: TICKET_TRIO.ticketLink,
			ticketLinkVip: TICKET_TRIO.ticketLinkVip,
			ticketLinkSkybox: '  ',
			ticketLinkC4: 'https://tickets.example/c4',
		}),
		makeGame('cska', '2026-08-28', 'SAMT 19:00', 'home', TICKET_TRIO),
		makeGame('loko', '2026-09-01', 'SAMT 17:15', 'home', TICKET_TRIO),
	])

	it('keeps unfinished home matches with all three ticket URLs', () => {
		const now = new Date('2026-08-25T12:00:00+04:00')

		expect(pickHomeHeroGamesWithTicketLinks(games, now).map((g) => g.id)).toEqual(
			['cska', 'loko'],
		)
	})

	it('keeps a home match until kickoff plus two hours', () => {
		const now = new Date('2026-08-23T20:59:00+04:00')

		expect(
			pickHomeHeroGamesWithTicketLinks(games, now).map((g) => g.id),
		).toEqual(['finished', 'cska', 'loko'])
	})

	it('drops a home match after kickoff plus two hours even if URLs remain', () => {
		const now = new Date('2026-08-23T21:00:00+04:00')

		expect(
			pickHomeHeroGamesWithTicketLinks(games, now).map((g) => g.id),
		).toEqual(['cska', 'loko'])
	})

	it('returns the earliest remaining match end as the switch date', () => {
		const now = new Date('2026-08-25T12:00:00+04:00')

		expect(getHomeHeroTicketGamesSwitchDate(games, now)?.toISOString()).toBe(
			'2026-08-28T17:00:00.000Z',
		)
	})
})

describe('hasFilledMainHeroTicketLinks', () => {
	it('ignores ticketLinkC4 and rejects a missing skybox URL', () => {
		const game = makeGame('34', '2026-09-17', 'SAMT 19:30', 'home', {
			ticketLink: TICKET_TRIO.ticketLink,
			ticketLinkVip: TICKET_TRIO.ticketLinkVip,
			ticketLinkSkybox: '',
			ticketLinkC4: 'https://tickets.example/c4',
		})

		expect(hasFilledMainHeroTicketLinks(game)).toBe(false)
	})
})

describe('pickMainHeroMatchCards', () => {
	it('prefers ticket-trio home matches over the single promoted card', () => {
		const games = sortGamesByDateIso([
			makeGame('cska', '2026-08-28', 'SAMT 19:00', 'home', TICKET_TRIO),
			makeGame('loko', '2026-09-01', 'SAMT 17:15', 'home', TICKET_TRIO),
			makeGame('home-empty', '2026-09-17', 'SAMT 19:30', 'home'),
		])
		const now = new Date('2026-08-25T12:00:00+04:00')

		expect(pickMainHeroMatchCards(games, now).map((g) => g.id)).toEqual([
			'cska',
			'loko',
		])
	})

	it('falls back to the promoted home match when no ticket trio remains', () => {
		const games = sortGamesByDateIso([
			makeGame('past-home', '2026-08-04', 'SAMT 17:15', 'home'),
			makeGame('home-next', '2026-09-17', 'SAMT 19:30', 'home', {
				ticketLink: '',
				ticketLinkVip: '',
				ticketLinkSkybox: '',
			}),
		])
		const now = new Date('2026-08-25T12:00:00+04:00')

		expect(pickMainHeroMatchCards(games, now).map((g) => g.id)).toEqual([
			'home-next',
		])
	})
})
