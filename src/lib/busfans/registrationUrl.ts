import games, { type Game } from '@/data/games'
import type { MatchEvent } from '@/data/busfans'

import { teamMatchKey } from './upcomingEvents'

/** Выезд раньше даты матча: допуск при привязке к games.ts. */
export const REGISTRATION_DATE_WINDOW_DAYS = 2

type RegistrationUrls = {
	samara: string | null
	tolyatti: string | null
}

function emptyRegistrationUrls(): RegistrationUrls {
	return { samara: null, tolyatti: null }
}

function getGameRegistrationUrls(game: Game): RegistrationUrls {
	const samara = game.busfansRegistrationUrlSamara?.trim() || null
	const tolyatti =
		game.busfansRegistrationUrlTolyatti?.trim() ||
		game.busfansRegistrationUrl?.trim() ||
		null
	return { samara, tolyatti }
}

const byGameId = new Map<string, RegistrationUrls>()
const gamesWithRegistrationUrl: Array<
	Pick<Game, 'id' | 'dateIso' | 'homeTeam' | 'awayTeam'> & { urls: RegistrationUrls }
> = []

for (const game of games) {
	const urls = getGameRegistrationUrls(game)
	if (!urls.samara && !urls.tolyatti) continue
	byGameId.set(game.id, urls)
	gamesWithRegistrationUrl.push({
		id: game.id,
		dateIso: game.dateIso,
		homeTeam: game.homeTeam,
		awayTeam: game.awayTeam,
		urls,
	})
}

/** Матчи только из Excel, без записи в games.ts (по event.id). */
const byEventId: Record<string, string> = {
	'2026-03-21-lokomotiv-h-akron': 'http://localhost:3000/',
	'2026-08-13-vstrecha-s-bolelschikami-tolyatti':
		'https://preview.atom-s.com/ded86cac-fdea-48f8-9e3a-8068a0efdd15-ac287d25b45e9bdab1b5ff9dbe27a55c',
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
): RegistrationUrls | null {
	const key = teamMatchKey(homeTeam, awayTeam)
	const candidates = gamesWithRegistrationUrl
		.filter((game) => teamMatchKey(game.homeTeam ?? '', game.awayTeam ?? '') === key)
		.map((game) => ({
			game,
			diff: daysBetween(game.dateIso, dateIso),
		}))
		.filter(({ diff }) => diff <= REGISTRATION_DATE_WINDOW_DAYS)
		.sort((a, b) => a.diff - b.diff)

	return candidates[0]?.game.urls ?? null
}

function normalizeRegistrationUrls(
	event: Pick<MatchEvent, 'registrationUrl' | 'registrationUrls'>,
): RegistrationUrls {
	const directSamara = event.registrationUrls?.samara?.trim() || null
	const directTolyatti =
		event.registrationUrls?.tolyatti?.trim() || event.registrationUrl?.trim() || null
	return { samara: directSamara, tolyatti: directTolyatti }
}

export function resolveRegistrationUrls(
	event: Pick<
		MatchEvent,
		| 'id'
		| 'gameId'
		| 'registrationUrl'
		| 'registrationUrls'
		| 'homeTeam'
		| 'awayTeam'
		| 'dateIso'
	>,
): RegistrationUrls | null {
	const direct = normalizeRegistrationUrls(event)
	if (direct.samara || direct.tolyatti) return direct
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
	const byEvent = byEventId[event.id]
	if (byEvent) return { samara: null, tolyatti: byEvent }
	return null
}

export function resolveRegistrationUrl(
	event: Pick<
		MatchEvent,
		| 'id'
		| 'gameId'
		| 'registrationUrl'
		| 'registrationUrls'
		| 'homeTeam'
		| 'awayTeam'
		| 'dateIso'
	>,
): string | null {
	const links = resolveRegistrationUrls(event) ?? emptyRegistrationUrls()
	return links.tolyatti || links.samara || null
}
