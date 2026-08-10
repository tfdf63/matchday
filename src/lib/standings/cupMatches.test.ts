import { describe, expect, it } from 'vitest'

import { getStandingsSeason } from '@/data/standings'

import {
	buildCupMatchesFromGames,
	mergeSeasonWithCup,
} from './cupMatches'

describe('cupMatches', () => {
	it('собирает 6 кубковых матчей сезона 26/27', () => {
		const cup = buildCupMatchesFromGames('2026/2027')
		expect(cup).toHaveLength(6)
		expect(cup.every((m) => m.competition === 'cup')).toBe(true)
	})

	it('включает результат сыгранного матча', () => {
		const cup = buildCupMatchesFromGames('2026/2027')
		const rostov = cup.find(
			(m) => m.team === 'Ростов' && m.date === '2026-08-04',
		)
		expect(rostov?.match).toEqual({
			score: '0:4',
			pts: null,
			played: true,
		})
	})

	it('вставляет кубок в хронологию сезона 26/27', () => {
		const season = getStandingsSeason('2627')
		expect(season.matches.length).toBe(36)

		const cupIndices = season.matches
			.map((m, i) => (m.competition === 'cup' ? i : -1))
			.filter((i) => i >= 0)

		expect(cupIndices.length).toBe(6)
		expect(cupIndices.every((i) => i > 0)).toBe(true)
	})

	it('сортирует объединённый список по дате', () => {
		const rpl = getStandingsSeason('2627').matches.filter(
			(m) => m.competition !== 'cup',
		)
		const cup = buildCupMatchesFromGames('2026/2027')
		const merged = mergeSeasonWithCup(rpl, cup)

		for (let i = 1; i < merged.length; i += 1) {
			expect(merged[i].date >= merged[i - 1].date).toBe(true)
		}
	})
})
