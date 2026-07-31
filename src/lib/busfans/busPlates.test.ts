import { describe, expect, it } from 'vitest'

import { getBusPlateNumbers } from './busPlates'

describe('getBusPlateNumbers', () => {
	it('returns plates for known manifest', () => {
		expect(getBusPlateNumbers('2026-07-25-akron-h-zenit-bus-5')).toEqual([
			'К050РТ763',
		])
	})

	it('returns empty array for unknown manifest', () => {
		expect(getBusPlateNumbers('unknown-bus')).toEqual([])
	})

	it('assigns one plate per park haus bus', () => {
		const ids = [
			'2026-07-25-akron-h-zenit-bus-1',
			'2026-07-25-akron-h-zenit-bus-2',
			'2026-07-25-akron-h-zenit-bus-3',
		]
		const all = ids.flatMap((id) => [...getBusPlateNumbers(id)])
		expect(all.sort()).toEqual(['М893ХМ763', 'Х212АТ763', 'Х288РК763'].sort())
		expect(new Set(all).size).toBe(3)
	})

	it('returns plates for Rubin match buses', () => {
		expect(getBusPlateNumbers('2026-08-01-akron-h-rubin-bus-1')).toEqual([
			'Х212АТ763',
		])
		expect(getBusPlateNumbers('2026-08-01-akron-h-rubin-bus-2')).toEqual([
			'М416АО763',
		])
		expect(getBusPlateNumbers('2026-08-01-akron-h-rubin-bus-4')).toEqual([
			'В002АА763',
		])
		expect(getBusPlateNumbers('2026-08-01-akron-h-rubin-bus-5')).toEqual([
			'Х039АТ763',
		])
	})
})
