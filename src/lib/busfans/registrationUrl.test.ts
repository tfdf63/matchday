import { describe, expect, it } from 'vitest'

import { busFansDataset } from '@/data/busfans'

import {
	REGISTRATION_DATE_WINDOW_DAYS,
	resolveRegistrationUrl,
} from './registrationUrl'
import { getMatchEvents } from './selectors'

describe('resolveRegistrationUrl', () => {
	it('resolves Lokomotiv away event by teams within date window', () => {
		const url = resolveRegistrationUrl({
			id: '2026-08-07-lokomotiv-h-akron',
			gameId: null,
			registrationUrl: null,
			homeTeam: 'Локомотив',
			awayTeam: 'Акрон',
			dateIso: '2026-08-07',
		})
		expect(url).toBeTruthy()
		expect(url).toContain('preview.atom-s.com')
		expect(url).toContain('26c1feeb7d1ed127a855af7b2787b49a')
	})

	it('does not match when date diff exceeds window', () => {
		const url = resolveRegistrationUrl({
			id: 'test',
			gameId: null,
			registrationUrl: null,
			homeTeam: 'Локомотив',
			awayTeam: 'Акрон',
			dateIso: '2026-08-01',
		})
		expect(url).toBeNull()
	})

	it('prefers gameId when present', () => {
		const url = resolveRegistrationUrl({
			id: 'test',
			gameId: '24',
			registrationUrl: null,
			homeTeam: 'Акрон',
			awayTeam: 'Рубин',
			dateIso: '2026-08-01',
		})
		expect(url).toContain('ac287d25b45e9bdab1b5ff9dbe27a55c')
	})

	it('exposes 2-day window constant', () => {
		expect(REGISTRATION_DATE_WINDOW_DAYS).toBe(2)
	})
})

describe('getMatchEvents registration', () => {
	it('includes registration url for imported Rodina match', () => {
		const events = getMatchEvents(busFansDataset)
		const rodina = events.find((e) => e.id === '2026-08-14-rodina-h-akron')
		expect(rodina).toBeTruthy()
		expect(rodina!.registrationUrl).toContain('preview.atom-s.com')
	})

	it('includes registration url for fan meeting', () => {
		const events = getMatchEvents(busFansDataset)
		const fanMeeting = events.find(
			(e) => e.id === '2026-08-13-vstrecha-s-bolelschikami-tolyatti',
		)
		expect(fanMeeting).toBeTruthy()
		expect(fanMeeting!.registrationUrl).toContain('preview.atom-s.com')
		expect(fanMeeting!.registrationUrl).toContain('ac287d25b45e9bdab1b5ff9dbe27a55c')
	})
})
