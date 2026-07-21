import { describe, expect, it } from 'vitest'

import { busFansDataset } from '@/data/busfans'

import {
	getDuplicateFullNamesForEvent,
	getManifestsForEvent,
	getMatchEvents,
	getPassengersForManifest,
	resolveListStatus,
} from './selectors'
import {
	BUSFANS_UPCOMING_COUNT,
	getUpcomingCalendarGames,
} from './upcomingEvents'

describe('busfans selectors', () => {
	it('includes upcoming calendar placeholders first', () => {
		const events = getMatchEvents(busFansDataset)
		const upcoming = getUpcomingCalendarGames()
		expect(upcoming).toHaveLength(BUSFANS_UPCOMING_COUNT)
		expect(events.length).toBeGreaterThanOrEqual(BUSFANS_UPCOMING_COUNT)

		for (let i = 0; i < upcoming.length; i++) {
			const game = upcoming[i]!
			const event = events[i]!
			expect(event.gameId).toBe(game.id)
			expect(event.homeTeam).toBe(game.homeTeam)
			expect(event.awayTeam).toBe(game.awayTeam)
		}
	})

	it('marks calendar slot without excel as pending when unmatched', () => {
		const events = getMatchEvents({ ...busFansDataset, events: [], manifests: [], passengers: [] })
		const pending = events.find((e) => e.gameId === '23')
		expect(pending).toBeTruthy()
		expect(resolveListStatus(pending!)).toBe('pending')
		expect(getManifestsForEvent({ ...busFansDataset, events: [], manifests: [], passengers: [] }, pending!.id)).toHaveLength(0)
	})

	it('merges imported excel for upcoming calendar game', () => {
		const events = getMatchEvents(busFansDataset)
		const zenit = events.find((e) => e.gameId === '23')
		expect(zenit).toBeTruthy()
		expect(resolveListStatus(zenit!)).toBe('ready')
		expect(getManifestsForEvent(busFansDataset, zenit!.id).length).toBeGreaterThan(0)
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
