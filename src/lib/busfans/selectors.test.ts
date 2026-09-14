import { describe, expect, it } from 'vitest'

import { busFansDataset } from '@/data/busfans'

import games from '@/data/games'

import {
	getDuplicateFullNamesForEvent,
	getManifestsForEvent,
	getMatchEvents,
	getPassengersForManifest,
	getVisibleMatchEvents,
	resolveListStatus,
} from './selectors'

describe('busfans selectors', () => {
	it('sorts match events by date ascending', () => {
		const events = getMatchEvents(busFansDataset)
		expect(events.length).toBeGreaterThanOrEqual(1)

		for (let i = 1; i < events.length; i++) {
			expect(
				events[i - 1]!.dateIso.localeCompare(events[i]!.dateIso),
			).toBeLessThanOrEqual(0)
		}
	})

	it('includes calendar games with bus registration when excel is empty', () => {
		const events = getMatchEvents({
			...busFansDataset,
			events: [],
			manifests: [],
			passengers: [],
		})
		const akhmat = events.find((e) => e.gameId === '34')
		expect(akhmat).toBeTruthy()
		expect(akhmat!.registrationUrls?.purchase).toContain('atomstravel.com')
		expect(akhmat!.registrationPriceFrom).toBe('от 490 ₽')
		expect(resolveListStatus(akhmat!)).toBe('pending')
	})

	it('filters out cards from the day after the last day of the event', () => {
		const visible = getVisibleMatchEvents(
			busFansDataset,
			new Date('2026-09-15T12:00:00+04:00'),
		)
		expect(
			visible.find((e) => e.id === '2026-09-12-krasnodar-h-akron'),
		).toBeUndefined()
		expect(visible.some((e) => e.gameId === '34')).toBe(true)
	})

	it('includes only games with registration links in calendar-only list', () => {
		const empty = getMatchEvents({
			...busFansDataset,
			events: [],
			manifests: [],
			passengers: [],
		})
		const withReg = games.filter(
			(g) =>
				g.busfansRegistrationUrlSamara?.trim() ||
				g.busfansRegistrationUrlTolyatti?.trim() ||
				g.busfansRegistrationUrl?.trim(),
		)
		expect(empty.length).toBe(withReg.length)
	})

	it('marks imported excel events as ready with manifests', () => {
		const events = getMatchEvents(busFansDataset)
		const krasnodar = events.find(
			(e) => e.id === '2026-09-12-krasnodar-h-akron',
		)
		expect(krasnodar).toBeTruthy()
		expect(resolveListStatus(krasnodar!)).toBe('ready')
		expect(getManifestsForEvent(busFansDataset, krasnodar!.id).length).toBeGreaterThan(0)
	})

	it('keeps imported events with passenger lists', () => {
		const events = getMatchEvents(busFansDataset)
		const ready = events.filter((e) => resolveListStatus(e) === 'ready')
		expect(ready.length).toBeGreaterThanOrEqual(1)
		const event = ready[0]!
		const manifest = getManifestsForEvent(busFansDataset, event.id)[0]
		expect(manifest).toBeTruthy()
		const list = getPassengersForManifest(busFansDataset, manifest!.id)
		expect(list.length).toBeGreaterThan(0)
		for (let i = 1; i < list.length; i++) {
			expect(
				list[i - 1]!.fullName.localeCompare(list[i]!.fullName, 'ru'),
			).toBeLessThanOrEqual(0)
			expect(list[i]!.seq).toBe(i + 1)
		}
	})

	it('finds duplicate full names across event manifests', () => {
		const events = getMatchEvents(busFansDataset)
		const ready = events.find((e) => resolveListStatus(e) === 'ready')
		expect(ready).toBeTruthy()
		const duplicates = getDuplicateFullNamesForEvent(busFansDataset, ready!.id)
		expect(duplicates).toBeInstanceOf(Set)
	})

	it('enriches fan meeting with display time and title', () => {
		const events = getMatchEvents({
			...busFansDataset,
			events: [
				{
					id: '2026-08-13-vstrecha-s-bolelschikami-tolyatti',
					title: 'Встреча с болельщиками Тольятти',
					homeTeam: 'Акрон',
					awayTeam: '',
					venue: 'home',
					dateIso: '2026-08-13',
					dateToIso: '2026-08-13',
					dateLabel: '13.08.2026',
					dateCard: null,
					time: null,
					gameId: null,
					scheduleMatchId: null,
					busCount: 0,
					passengerCount: 0,
					seatsAssigned: 0,
				},
			],
		})
		const fanMeeting = events.find(
			(e) => e.id === '2026-08-13-vstrecha-s-bolelschikami-tolyatti',
		)
		expect(fanMeeting).toBeTruthy()
		expect(fanMeeting!.title).toBe('Встреча с болельщиками Тольятти')
		expect(fanMeeting!.dateCard).toBe('13.08 (ЧТ)')
		expect(fanMeeting!.time).toBe('SAMT 17:00')
		expect(fanMeeting!.awayTeam).toBe('')
	})
})
