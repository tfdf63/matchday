import { describe, expect, it } from 'vitest'

import { getStandingsSeason } from '@/data/standings'
import {
	enrichSeasonRows,
	formatWhenDisplay,
	formatWhenText,
	getPtsClass,
	getSeasonStats,
} from './seasonStats'

const season2627 = getStandingsSeason('2627')
const season2526 = getStandingsSeason('2526')

describe('seasonStats', () => {
	it('считает накопительные очки и итог', () => {
		const rows = enrichSeasonRows(season2627.matches)
		const played = rows.filter(
			(r) => r.match.played && r.competition !== 'cup',
		)

		expect(played).toHaveLength(5)
		expect(played.map((r) => r.cumulativePts)).toEqual([0, 0, 1, 2, 2])

		const stats = getSeasonStats(season2627.matches)
		expect(stats).toEqual({
			playedCount: 5,
			homePts: 0,
			awayPts: 2,
			totalPts: 2,
		})
	})

	it('классифицирует очки', () => {
		expect(getPtsClass(3)).toBe('win')
		expect(getPtsClass(1)).toBe('draw')
		expect(getPtsClass(0)).toBe('loss')
		expect(getPtsClass(null)).toBeNull()
	})

	it('форматирует дату матча', () => {
		const first = season2627.matches[0]
		expect(formatWhenText(first.date, first.when)).toBe('25.07 (сб) 17:15')
		expect(formatWhenDisplay(first.date, first.when)).toEqual({
			kind: 'lines',
			dateLine: '25.07 (сб)',
			timeLine: '17:15',
		})

		const range = season2627.matches.find((m) => m.when.range)
		expect(range).toBeDefined()
		expect(formatWhenText(range!.date, range!.when)).toBe(range!.when.label)
		expect(formatWhenDisplay(range!.date, range!.when)).toEqual({
			kind: 'range',
			label: range!.when.label,
		})
	})

	it('считает итог прошлого сезона 25/26', () => {
		const stats = getSeasonStats(season2526.matches)
		expect(stats).toEqual({
			playedCount: 30,
			homePts: 10,
			awayPts: 17,
			totalPts: 27,
		})
	})

	it('считает итог сезона 24/25', () => {
		const stats = getSeasonStats(getStandingsSeason('2425').matches)
		expect(stats).toEqual({
			playedCount: 30,
			homePts: 19,
			awayPts: 16,
			totalPts: 35,
		})
	})

	it('не учитывает кубок в статистике РПЛ', () => {
		const season = getStandingsSeason('2627')
		const stats = getSeasonStats(season.matches)
		expect(stats.playedCount).toBe(5)
		expect(season.matches.filter((m) => m.competition === 'cup')).toHaveLength(
			6,
		)
	})
})
