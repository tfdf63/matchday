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

	it('returns null for unknown event', () => {
		expect(getBusScheduleOverride('unknown-event')).toBeNull()
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
})
