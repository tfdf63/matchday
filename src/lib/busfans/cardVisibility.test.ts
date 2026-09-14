import { describe, expect, it } from 'vitest'

import { busFansDataset } from '@/data/busfans'

import { getEventBusfansHideAtMs, isBusfansCardVisible } from './cardVisibility'
import { getVisibleMatchEvents } from './selectors'

function samaraInstant(dateIso: string, time: string): Date {
	return new Date(`${dateIso}T${time}:00+04:00`)
}

describe('cardVisibility', () => {
	it('hideAt is 23:00 SAMT on the match day (dateIso)', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-12' }
		expect(getEventBusfansHideAtMs(event)).toBe(
			samaraInstant('2026-09-12', '23:00').getTime(),
		)
	})

	it('shows the card before 23:00 on the match day', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-12' }
		expect(
			isBusfansCardVisible(event, samaraInstant('2026-09-12', '22:59')),
		).toBe(true)
	})

	it('hides from 23:00 on the match day (SAMT)', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-12' }
		expect(
			isBusfansCardVisible(event, samaraInstant('2026-09-12', '23:00')),
		).toBe(false)
	})

	it('hides on the day after the match', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-12' }
		expect(
			isBusfansCardVisible(event, samaraInstant('2026-09-13', '10:00')),
		).toBe(false)
	})

	it('ignores dateToIso (trip end) when hiding after the match', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-14' }
		expect(
			isBusfansCardVisible(event, samaraInstant('2026-09-12', '23:00')),
		).toBe(false)
		expect(
			isBusfansCardVisible(event, samaraInstant('2026-09-14', '12:00')),
		).toBe(false)
	})

	it('hides Krasnodar away on 2026-09-15 even with dateToIso 2026-09-14', () => {
		const now = samaraInstant('2026-09-15', '12:00')
		const visible = getVisibleMatchEvents(busFansDataset, now)
		expect(
			visible.find((e) => e.id === '2026-09-12-krasnodar-h-akron'),
		).toBeUndefined()
	})
})
