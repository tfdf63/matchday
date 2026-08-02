import { describe, expect, it } from 'vitest'

import { busFansDataset } from '@/data/busfans'

import {
	getDuplicateFullNamesForEvent,
	getManifestsForEvent,
	getMatchEvents,
	getPassengersForManifest,
	resolveListStatus,
} from './selectors'

describe('busfans selectors', () => {
	it('sorts imported match events by date ascending', () => {
		const events = getMatchEvents(busFansDataset)
		expect(events.length).toBeGreaterThanOrEqual(2)

		for (let i = 1; i < events.length; i++) {
			expect(
				events[i - 1]!.dateIso.localeCompare(events[i]!.dateIso),
			).toBeLessThanOrEqual(0)
		}

		const rostov = events.find((e) => e.gameId === '25')
		const lokomotiv = events.find((e) => e.gameId === '26')
		expect(rostov).toBeTruthy()
		expect(lokomotiv).toBeTruthy()
		expect(events.indexOf(rostov!)).toBeLessThan(events.indexOf(lokomotiv!))
	})

	it('returns empty list when there is no imported excel data', () => {
		const events = getMatchEvents({
			...busFansDataset,
			events: [],
			manifests: [],
			passengers: [],
		})
		expect(events).toEqual([])
	})

	it('does not show calendar games without excel import', () => {
		const events = getMatchEvents({
			...busFansDataset,
			events: [],
			manifests: [],
			passengers: [],
		})
		expect(events.find((e) => e.gameId === '23')).toBeUndefined()
	})

	it('merges games.ts fields for imported event with gameId', () => {
		const events = getMatchEvents(busFansDataset)
		const lokomotiv = events.find((e) => e.gameId === '26')
		expect(lokomotiv).toBeTruthy()
		expect(resolveListStatus(lokomotiv!)).toBe('ready')
		expect(lokomotiv!.registrationUrl).toContain('preview.atom-s.com')
		expect(getManifestsForEvent(busFansDataset, lokomotiv!.id).length).toBeGreaterThan(0)
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
})
