import { describe, expect, it } from 'vitest'

import {
	formatMatchDateLine,
	getBusScheduleTimes,
} from './busSchedule'

describe('fan meeting display', () => {
	it('formats event date line', () => {
		expect(
			formatMatchDateLine({
				dateCard: '13.08 (ЧТ)',
				time: 'SAMT 17:00',
				kind: 'event',
			}),
		).toBe('СОБЫТИЕ: 13.08 (ЧТ) SAMT 17:00')
	})

	it('uses schedule override when match time is set', () => {
		expect(
			getBusScheduleTimes({
				matchTime: 'SAMT 17:00',
				eventId: '2026-08-13-vstrecha-s-bolelschikami-tolyatti',
			}),
		).toEqual({
			departure: 'ТЦ Озон 16:30 · Парк Хаус 16:50',
			returnAt: '20:30',
		})
	})
})
