import games, { getOpponentTeamName, type Game } from '@/data/games'
import { formatMatchScore } from '@/lib/match/formatMatchGoals'
import type {
	SeasonCalendarMatch,
	SeasonMatchResult,
	SeasonMatchWhen,
} from '@/data/standings/types'

function parseSamtTime(time?: string): string | null {
	const match = time?.match(/SAMT\s+(\d{1,2}:\d{2})/i)
	return match?.[1] ?? null
}

function parseCupTour(seasonTour?: string): number | undefined {
	const match = seasonTour?.match(/(\d+)\s*ТУР/i)
	if (!match) return undefined
	return Number.parseInt(match[1], 10)
}

function buildWhenFromGame(game: Game): SeasonMatchWhen {
	const time = parseSamtTime(game.time)
	const label = game.dateCard ?? game.date ?? ''
	const text = time ? `${label}, ${time}` : label

	return {
		label,
		time,
		exact: true,
		text,
		range: false,
	}
}

function buildMatchResult(game: Game): SeasonMatchResult {
	const homeGoals = game.homeGoals
	const awayGoals = game.awayGoals

	if (homeGoals === undefined || awayGoals === undefined) {
		return { score: null, pts: null, played: false }
	}

	const akronIsHome = game.homeTeam?.trim() === 'Акрон'
	const akronGoals = akronIsHome ? homeGoals : awayGoals
	const opponentGoals = akronIsHome ? awayGoals : homeGoals
	const score = formatMatchScore(akronGoals, opponentGoals)

	return {
		score: score.penaltiesLine
			? `${score.main}\n${score.penaltiesLine}`
			: score.main,
		pts: null,
		played: true,
	}
}

function gameToCupMatch(game: Game): SeasonCalendarMatch | null {
	const opponent = getOpponentTeamName(game)
	if (!opponent) return null

	const cupTour = parseCupTour(game.seasonTour)

	return {
		tour: cupTour ?? 0,
		date: game.dateIso,
		team: opponent,
		venue: game.venue,
		match: buildMatchResult(game),
		when: buildWhenFromGame(game),
		competition: 'cup',
		cupTour,
	}
}

/** Кубковые матчи сезона из games.ts (promoType === 'cup'). */
export function buildCupMatchesFromGames(seasonPrefix: string): SeasonCalendarMatch[] {
	return games
		.filter(
			(game) =>
				game.promoType === 'cup' &&
				game.seasonTour?.startsWith(seasonPrefix),
		)
		.map(gameToCupMatch)
		.filter((row): row is SeasonCalendarMatch => row !== null)
		.sort((a, b) => a.date.localeCompare(b.date))
}

/** Объединяет РПЛ и кубок в один хронологический список. */
export function mergeSeasonWithCup(
	rplMatches: SeasonCalendarMatch[],
	cupMatches: SeasonCalendarMatch[],
): SeasonCalendarMatch[] {
	return [...rplMatches, ...cupMatches].sort((a, b) =>
		a.date.localeCompare(b.date),
	)
}
