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
			departure: 'ТЦ Озон 16:30 · Парк Хаус 16:50',
			returnAt: '20:30',
		})
	})

	it('returns schedule override for Rodina away event', () => {
		expect(getBusScheduleOverride('2026-08-14-rodina-h-akron')).toEqual({
			departure: '14.08 в 20:00',
			returnAt: 'после матча',
		})
	})

	it('returns schedule override for CSKA away event', () => {
		expect(getBusScheduleOverride('2026-08-17-cska-h-akron')).toEqual({
			departure: '17.08 в 21:00',
			returnAt: 'после матча',
		})
	})

	it('returns departure override for CSKA home event', () => {
		expect(getBusScheduleOverride('2026-08-28-akron-h-cska')).toEqual({
			departure: '16:30',
		})
	})

	it('returns schedule override for Lokomotiv home event', () => {
		expect(getBusScheduleOverride('2026-09-01-akron-h-lokomotiv')).toEqual({
			departure: '14:45',
			returnAt: '19:45',
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
		).toBe('старт: ТЦ Озон 16:30 · Парк Хаус 16:50 · обратно: 20:30')
	})

	it('formats Rodina schedule with date and text return', () => {
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 15:00',
				eventId: '2026-08-14-rodina-h-akron',
			}),
		).toBe('старт: 14.08 в 20:00 · обратно: после матча')
	})

	it('formats CSKA schedule with date and text return', () => {
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 19:30',
				eventId: '2026-08-17-cska-h-akron',
			}),
		).toBe('старт: 17.08 в 21:00 · обратно: после матча')
	})

	it('applies departure override for CSKA home', () => {
		expect(
			getBusScheduleTimes({
				matchTime: 'SAMT 19:00',
				eventId: '2026-08-28-akron-h-cska',
			}),
		).toEqual({
			departure: '16:30',
			returnAt: '21:30',
		})
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 19:00',
				eventId: '2026-08-28-akron-h-cska',
			}),
		).toBe('старт: 16:30 · обратно: 21:30')
	})

	it('applies schedule override for Lokomotiv home', () => {
		expect(
			getBusScheduleTimes({
				matchTime: 'SAMT 17:15',
				eventId: '2026-09-01-akron-h-lokomotiv',
			}),
		).toEqual({
			departure: '14:45',
			returnAt: '19:45',
		})
		expect(
			formatBusScheduleLine({
				matchTime: 'SAMT 17:15',
				eventId: '2026-09-01-akron-h-lokomotiv',
			}),
		).toBe('старт: 14:45 · обратно: 19:45')
	})
})
