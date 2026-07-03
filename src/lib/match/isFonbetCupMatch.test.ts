import { describe, expect, it } from 'vitest'

import type { Game } from '@/data/games'

import { isFonbetCupMatch } from './isFonbetCupMatch'

const makeGame = (overrides: Partial<Game> = {}): Game => ({
	id: '1',
	dateIso: '2026-08-06',
	venue: 'home',
	fanIdStatus: 'Без fan id',
	...overrides,
})

describe('isFonbetCupMatch', () => {
	it('detects cup by promoType', () => {
		expect(isFonbetCupMatch(makeGame({ promoType: 'cup' }))).toBe(true)
	})

	it('detects cup by leagueInfo title', () => {
		expect(
			isFonbetCupMatch(
				makeGame({
					leagueInfo: 'Fonbet Кубок России по футболу',
				}),
			),
		).toBe(true)
	})

	it('returns false for RPL match', () => {
		expect(
			isFonbetCupMatch(
				makeGame({
					promoType: 'rpl',
					leagueInfo: 'Альфа-Банк РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
				}),
			),
		).toBe(false)
	})
})
