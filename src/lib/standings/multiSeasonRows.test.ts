import { describe, expect, it } from 'vitest'

import { getStandingsSeason } from '@/data/standings'

import { buildMultiSeasonCalendar } from './multiSeasonRows'

describe('multiSeasonRows', () => {
	it('сопоставляет результаты по сопернику и дом/выезд', () => {
		const { rows } = buildMultiSeasonCalendar('2627')
		const zenitHome = rows.find(
			(r) => r.tour === 1 && r.competition !== 'cup',
		)
		expect(zenitHome?.team).toBe('Зенит')
		expect(zenitHome?.venue).toBe('home')
		expect(zenitHome?.seasonResults['2627']).toEqual({
			score: '0:5',
			pts: 0,
			played: true,
		})
		expect(zenitHome?.seasonResults['2526']).toEqual({
			score: '1:1',
			pts: 1,
			played: true,
		})
		expect(zenitHome?.seasonResults['2425']).toEqual({
			score: '0:5',
			pts: 0,
			played: true,
		})
	})

	it('для Крыльев в туре 30 показывает их матчи, а не чужой тур', () => {
		const { rows } = buildMultiSeasonCalendar('2627')
		const kryliaAway = rows.find(
			(r) => r.tour === 30 && r.team === 'Крылья Советов',
		)
		expect(kryliaAway?.venue).toBe('away')
		expect(kryliaAway?.seasonResults['2526']).toEqual({
			score: '1:4',
			pts: 0,
			played: true,
		})
		expect(kryliaAway?.seasonResults['2425']).toEqual({
			score: '2:0',
			pts: 3,
			played: true,
		})
	})

	it('для кубка показывает результат только в колонке 26/27', () => {
		const { rows } = buildMultiSeasonCalendar('2627')
		const cup = rows.find((r) => r.competition === 'cup')
		expect(cup).toBeDefined()
		expect(cup!.seasonResults['2627']?.score).toBe('0:4')
		expect(cup!.seasonResults['2526']).toBeNull()
		expect(cup!.seasonResults['2425']).toBeNull()
	})

	it('считает сумму очков по сезонам только из РПЛ', () => {
		const { columns } = buildMultiSeasonCalendar('2627')
		expect(columns.map((c) => c.label)).toEqual(['26/27', '25/26', '24/25'])
		expect(columns.find((c) => c.id === '2425')?.totalPts).toBe(35)
		expect(columns.find((c) => c.id === '2526')?.totalPts).toBe(27)
		expect(columns.find((c) => c.id === '2627')?.totalPts).toBe(2)
	})

	it('использует календарь выбранного сезона как основу строк', () => {
		const { rows } = buildMultiSeasonCalendar('2526')
		expect(rows).toHaveLength(30)
		expect(rows.every((r) => r.competition !== 'cup')).toBe(true)
		expect(getStandingsSeason('2526').matches[0]?.team).toBe(rows[0]?.team)
	})
})
