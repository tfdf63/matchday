import games, { type Game } from '@/data/games'
import type { MatchEvent } from '@/data/busfans'

import { teamMatchKey } from './upcomingEvents'

/** Выезд раньше даты матча: допуск при привязке к games.ts. */
export const REGISTRATION_DATE_WINDOW_DAYS = 2

const byGameId = new Map<string, string>()
const gamesWithRegistrationUrl: Array<
	Pick<Game, 'id' | 'dateIso' | 'homeTeam' | 'awayTeam'> & { url: string }
> = []

for (const game of games) {
	const url = game.busfansRegistrationUrl?.trim()
	if (!url) continue
	byGameId.set(game.id, url)
	gamesWithRegistrationUrl.push({
		id: game.id,
		dateIso: game.dateIso,
		homeTeam: game.homeTeam,
		awayTeam: game.awayTeam,
		url,
	})
}

/** Матчи только из Excel, без записи в games.ts (по event.id). */
const byEventId: Record<string, string> = {
	'2026-03-21-lokomotiv-h-akron': 'http://localhost:3000/',
}

function daysBetween(dateA: string, dateB: string): number {
	const a = Date.parse(`${dateA}T12:00:00`)
	const b = Date.parse(`${dateB}T12:00:00`)
	if (!Number.isFinite(a) || !Number.isFinite(b)) return Number.POSITIVE_INFINITY
	return Math.abs(Math.round((a - b) / 86_400_000))
}

function findRegistrationUrlByTeamsAndDate(
	homeTeam: string,
	awayTeam: string,
	dateIso: string,
): string | null {
	const key = teamMatchKey(homeTeam, awayTeam)
	const candidates = gamesWithRegistrationUrl
		.filter((game) => teamMatchKey(game.homeTeam ?? '', game.awayTeam ?? '') === key)
		.map((game) => ({
			game,
			diff: daysBetween(game.dateIso, dateIso),
		}))
		.filter(({ diff }) => diff <= REGISTRATION_DATE_WINDOW_DAYS)
		.sort((a, b) => a.diff - b.diff)

	return candidates[0]?.game.url ?? null
}

export function resolveRegistrationUrl(
	event: Pick<
		MatchEvent,
		'id' | 'gameId' | 'registrationUrl' | 'homeTeam' | 'awayTeam' | 'dateIso'
	>,
): string | null {
	const direct = event.registrationUrl?.trim()
	if (direct) return direct
	if (event.gameId) {
		const fromGame = byGameId.get(String(event.gameId))
		if (fromGame) return fromGame
	}
	const fromTeams = findRegistrationUrlByTeamsAndDate(
		event.homeTeam,
		event.awayTeam,
		event.dateIso,
	)
	if (fromTeams) return fromTeams
	return byEventId[event.id] ?? null
}
