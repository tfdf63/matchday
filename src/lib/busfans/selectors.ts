import type {
	BusFansDataset,
	BusManifest,
	MatchEvent,
	MatchListStatus,
	PassengerAssignment,
} from '@/data/busfans'

import { resolveRegistrationUrl } from './registrationUrl'
import {
	eventMatchKey,
	gameToPendingMatchEvent,
	getUpcomingCalendarGames,
} from './upcomingEvents'

export function resolveListStatus(event: MatchEvent): MatchListStatus {
	if (event.listStatus) return event.listStatus
	return event.busCount > 0 || event.passengerCount > 0 ? 'ready' : 'pending'
}

function withListStatus(event: MatchEvent): MatchEvent {
	return {
		...event,
		listStatus: resolveListStatus(event),
		registrationUrl: resolveRegistrationUrl(event),
	}
}

function compareMatchEventsByDate(a: MatchEvent, b: MatchEvent): number {
	const byDate = a.dateIso.localeCompare(b.dateIso)
	if (byDate !== 0) return byDate
	return a.title.localeCompare(b.title, 'ru')
}

function mergeImportedOntoPlaceholder(
	placeholder: MatchEvent,
	imported: MatchEvent,
): MatchEvent {
	return withListStatus({
		...placeholder,
		...imported,
		// календарь приоритетнее для отображения матча
		title: placeholder.title,
		homeTeam: placeholder.homeTeam,
		awayTeam: placeholder.awayTeam,
		venue: placeholder.venue !== 'unknown' ? placeholder.venue : imported.venue,
		dateIso: placeholder.dateIso,
		dateToIso: imported.dateToIso || placeholder.dateToIso,
		dateLabel: placeholder.dateLabel,
		dateCard: placeholder.dateCard ?? imported.dateCard,
		time: placeholder.time ?? imported.time,
		gameId: placeholder.gameId ?? imported.gameId,
		tournament: placeholder.tournament ?? imported.tournament,
		leagueInfo: placeholder.leagueInfo ?? imported.leagueInfo,
		seasonTour: placeholder.seasonTour ?? imported.seasonTour,
		fanIdStatus: placeholder.fanIdStatus ?? imported.fanIdStatus,
		registrationUrl:
			placeholder.registrationUrl ??
			imported.registrationUrl ??
			resolveRegistrationUrl({ ...placeholder, gameId: placeholder.gameId ?? imported.gameId }),
		// id из импорта — чтобы манифесты/пассажиры совпали
		id: imported.id,
		busCount: imported.busCount,
		passengerCount: imported.passengerCount,
		seatsAssigned: imported.seatsAssigned,
		scheduleMatchId: imported.scheduleMatchId,
	})
}

/** Карточки: ближайшие матчи из games.ts + остальные события из Excel. */
export function getMatchEvents(dataset: BusFansDataset): MatchEvent[] {
	const imported = dataset.events.map(withListStatus)
	const byGameId = new Map<string, MatchEvent>()
	const byKey = new Map<string, MatchEvent>()
	for (const event of imported) {
		if (event.gameId) byGameId.set(String(event.gameId), event)
		byKey.set(
			eventMatchKey({
				dateIso: event.dateIso,
				homeTeam: event.homeTeam,
				awayTeam: event.awayTeam,
			}),
			event,
		)
	}

	const usedIds = new Set<string>()
	const upcoming = getUpcomingCalendarGames().map((game) => {
		const placeholder = gameToPendingMatchEvent(game)
		const importedMatch =
			(placeholder.gameId
				? byGameId.get(String(placeholder.gameId))
				: undefined) ||
			byKey.get(
				eventMatchKey({
					dateIso: placeholder.dateIso,
					homeTeam: placeholder.homeTeam,
					awayTeam: placeholder.awayTeam,
				}),
			)
		if (importedMatch) {
			usedIds.add(importedMatch.id)
			return mergeImportedOntoPlaceholder(placeholder, importedMatch)
		}
		return placeholder
	})

	const extras = imported.filter((event) => !usedIds.has(event.id))

	return [...upcoming, ...extras].sort(compareMatchEventsByDate)
}

export function getMatchEventById(
	dataset: BusFansDataset,
	eventId: string,
): MatchEvent | undefined {
	return getMatchEvents(dataset).find((e) => e.id === eventId)
}

export function getManifestsForEvent(
	dataset: BusFansDataset,
	eventId: string,
): BusManifest[] {
	const event = getMatchEventById(dataset, eventId)
	const ids = new Set<string>([eventId])
	if (event?.gameId) {
		for (const e of dataset.events) {
			if (String(e.gameId) === String(event.gameId)) ids.add(e.id)
		}
	}
	return dataset.manifests.filter((m) => ids.has(m.eventId))
}

export function getPassengersForManifest(
	dataset: BusFansDataset,
	manifestId: string,
	nameFilter = '',
): PassengerAssignment[] {
	const q = nameFilter.trim().toLocaleLowerCase('ru-RU')
	const list = dataset.passengers.filter((p) => {
		if (p.manifestId !== manifestId) return false
		if (!q) return true
		return p.fullName.toLocaleLowerCase('ru-RU').includes(q)
	})

	// данные уже отсортированы при импорте; после фильтра пересчитываем №
	return list
		.slice()
		.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru'))
		.map((p, i) => ({ ...p, seq: i + 1 }))
}

export function countFilteredPassengers(
	dataset: BusFansDataset,
	eventId: string,
	nameFilter = '',
): number {
	const manifests = getManifestsForEvent(dataset, eventId)
	const manifestIds = new Set(manifests.map((m) => m.id))
	const q = nameFilter.trim().toLocaleLowerCase('ru-RU')
	return dataset.passengers.filter((p) => {
		if (!manifestIds.has(p.manifestId)) return false
		if (!q) return true
		return p.fullName.toLocaleLowerCase('ru-RU').includes(q)
	}).length
}

/** Нормализация ФИО для сравнения полных совпадений. */
export function normalizePassengerFullName(fullName: string): string {
	return fullName.trim().replace(/\s+/g, ' ').toLocaleLowerCase('ru-RU')
}

/** ФИО, встречающиеся в матче более одного раза (все автобусы). */
export function getDuplicateFullNamesForEvent(
	dataset: BusFansDataset,
	eventId: string,
): Set<string> {
	const manifests = getManifestsForEvent(dataset, eventId)
	const manifestIds = new Set(manifests.map((m) => m.id))
	const counts = new Map<string, number>()
	for (const p of dataset.passengers) {
		if (!manifestIds.has(p.manifestId)) continue
		const key = normalizePassengerFullName(p.fullName)
		if (!key) continue
		counts.set(key, (counts.get(key) ?? 0) + 1)
	}
	const duplicates = new Set<string>()
	for (const [name, count] of counts) {
		if (count > 1) duplicates.add(name)
	}
	return duplicates
}
