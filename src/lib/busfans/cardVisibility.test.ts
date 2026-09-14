import { describe, expect, it } from 'vitest'

import {
	getEventLastDisplayDateIso,
	isBusfansCardVisible,
} from './cardVisibility'

describe('cardVisibility', () => {
	it('uses the later of dateIso and dateToIso as last visible day', () => {
		expect(
			getEventLastDisplayDateIso({
				dateIso: '2026-09-12',
				dateToIso: '2026-09-14',
			}),
		).toBe('2026-09-14')
	})

	it('shows the card on the last day of the match', () => {
		expect(
			isBusfansCardVisible(
				{ dateIso: '2026-09-12', dateToIso: '2026-09-12' },
				'2026-09-12',
			),
		).toBe(true)
	})

	it('hides from the day after the match', () => {
		expect(
			isBusfansCardVisible(
				{ dateIso: '2026-09-12', dateToIso: '2026-09-12' },
				'2026-09-13',
			),
		).toBe(false)
	})

	it('shows until dateToIso for multi-day events', () => {
		const event = { dateIso: '2026-09-12', dateToIso: '2026-09-14' }
		expect(isBusfansCardVisible(event, '2026-09-14')).toBe(true)
		expect(isBusfansCardVisible(event, '2026-09-15')).toBe(false)
	})
})
