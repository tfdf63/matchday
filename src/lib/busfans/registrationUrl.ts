import games from '@/data/games'
import type { MatchEvent } from '@/data/busfans'

const byGameId = new Map<string, string>()
for (const game of games) {
	const url = game.busfansRegistrationUrl?.trim()
	if (url) byGameId.set(game.id, url)
}

/** Матчи только из Excel, без записи в games.ts (по event.id). */
const byEventId: Record<string, string> = {
	'2026-03-21-lokomotiv-h-akron': 'http://localhost:3000/',
}

export function resolveRegistrationUrl(
	event: Pick<MatchEvent, 'id' | 'gameId' | 'registrationUrl'>,
): string | null {
	const direct = event.registrationUrl?.trim()
	if (direct) return direct
	if (event.gameId) {
		const fromGame = byGameId.get(String(event.gameId))
		if (fromGame) return fromGame
	}
	return byEventId[event.id] ?? null
}
