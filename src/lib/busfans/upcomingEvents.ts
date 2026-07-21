import games, { PROMOTED_MAIN_CALENDAR_GAME_ID, type Game } from '@/data/games'
import type { MatchEvent, MatchVenue } from '@/data/busfans'

import { slugify } from './slugify'

/** Сколько ближайших матчей из календаря всегда показывать на /busfans. */
export const BUSFANS_UPCOMING_COUNT = 1

function formatDateLabel(dateIso: string): string {
	const [y, m, d] = dateIso.split('-')
	if (!y || !m || !d) return dateIso
	return `${d}.${m}.${y}`
}

function tournamentFromGame(game: Game): string | null {
	const info = (game.leagueInfo || '').toLowerCase()
	if (info.includes('кубок')) return 'Кубок'
	if (info.includes('премьер') || info.includes('рпл')) return 'РПЛ'
	if (game.promoType === 'cup') return 'Кубок'
	if (game.promoType === 'rpl') return 'РПЛ'
	return null
}

function fanIdFromGame(game: Game): MatchEvent['fanIdStatus'] {
	const tournament = tournamentFromGame(game)
	if (tournament === 'РПЛ') return 'Fan id'
	if (tournament === 'Кубок') return 'Без fan id'
	return game.fanIdStatus
}

export function matchTitleFromGame(game: Game): string {
	const home = game.homeTeam?.trim() || 'Акрон'
	const away = game.awayTeam?.trim() || ''
	return away ? `${home} - ${away}` : home
}

export function eventIdFromGame(game: Game): string {
	return `${game.dateIso}-${slugify(matchTitleFromGame(game))}`
}

export function gameToPendingMatchEvent(game: Game): MatchEvent {
	const homeTeam = game.homeTeam?.trim() || 'Акрон'
	const awayTeam = game.awayTeam?.trim() || ''
	const title = matchTitleFromGame(game)
	return {
		id: eventIdFromGame(game),
		title,
		homeTeam,
		awayTeam,
		venue: (game.venue as MatchVenue) || 'unknown',
		dateIso: game.dateIso,
		dateToIso: game.dateIso,
		dateLabel: formatDateLabel(game.dateIso),
		dateCard: game.dateCard ?? null,
		time: game.time?.trim() || null,
		gameId: game.id,
		scheduleMatchId: null,
		tournament: tournamentFromGame(game),
		leagueInfo: game.leagueInfo ?? null,
		seasonTour: game.seasonTour ?? null,
		fanIdStatus: fanIdFromGame(game),
		registrationUrl: game.busfansRegistrationUrl?.trim() || null,
		busCount: 0,
		passengerCount: 0,
		seatsAssigned: 0,
		listStatus: 'pending',
	}
}

/** Первые N матчей сезона от PROMOTED_MAIN_CALENDAR_GAME_ID. */
export function getUpcomingCalendarGames(
	count = BUSFANS_UPCOMING_COUNT,
): Game[] {
	const start = games.findIndex(g => g.id === PROMOTED_MAIN_CALENDAR_GAME_ID)
	const from = start >= 0 ? start : 0
	return games.slice(from, from + count)
}

export function normalizeTeamKey(name: string): string {
	return name.trim().toLowerCase().replaceAll('ё', 'е').replace(/\s+/g, ' ')
}

export function eventMatchKey(parts: {
	dateIso: string
	homeTeam: string
	awayTeam: string
}): string {
	return [
		parts.dateIso,
		normalizeTeamKey(parts.homeTeam),
		normalizeTeamKey(parts.awayTeam),
	].join('|')
}
