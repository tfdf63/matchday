import { describe, expect, it } from 'vitest'

import {
	formatBusScheduleLine,
	getBusScheduleTimes,
} from './busSchedule'
import { getBusScheduleOverride } from './busScheduleOverrides'

describe('getBusScheduleOverride', () => {
	it('returns departure override for Rostov event', () => {
		expect(getBusScheduleOverride('2026-08-04-akron-h-rostov')).toEqual({
			departure: '14:45',
		})
	})

	it('returns schedule override for Lokomotiv away event', () => {
		expect(getBusScheduleOverride('2026-08-07-lokomotiv-h-akron')).toEqual({
			departure: '07.08 в 21:00',
			returnAt: 'после матча',
		})
	})

	it('returns schedule override for fan meeting', () => {
		expect(
			getBusScheduleOverride('2026-08-13-vstrecha-s-bolelschikami-tolyatti'),
		).toEqual({
			departure: '17:00',
			returnAt: '20:30',
		})
	})
})

describe('getBusScheduleTimes', () => {
	it('computes default schedule from match time', () => {
		expect(getBusScheduleTimes('SAMT 17:15')).toEqual({
			departure: '14:15',
			returnAt: '19:45',
		})
	})

	it('applies departure override for Rostov', () => {
		expect(
			getBusScheduleTimes({
				matchTime: 'SAMT 17:15',
				eventId: '2026-08-04-akron-h-rostov',
			}),
		).toEqual({
			departure: '14:45',
			returnAt: '19:45',
		})
	})

	it('formats schedule line with override', () => {
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 17:15',
				eventId: '2026-08-04-akron-h-rostov',
			}),
		).toBe('старт: 14:45 · обратно: 19:45')
	})

	it('formats Lokomotiv schedule with date and text return', () => {
		expect(
			getBusScheduleTimes({
				matchTime: 'SAMT 19:00',
				eventId: '2026-08-07-lokomotiv-h-akron',
			}),
		).toEqual({
			departure: '07.08 в 21:00',
			returnAt: 'после матча',
		})
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 19:00',
				eventId: '2026-08-07-lokomotiv-h-akron',
			}),
		).toBe('старт: 07.08 в 21:00 · обратно: после матча')
	})

	it('formats fan meeting schedule with override only', () => {
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 17:00',
				eventId: '2026-08-13-vstrecha-s-bolelschikami-tolyatti',
			}),
		).toBe('старт: 17:00 · обратно: 20:30')
	})
})
