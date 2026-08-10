import season2425Json from './season2425.json'
import season2526Json from './season2526.json'
import season2627Json from './season2627.json'
import {
	buildCupMatchesFromGames,
	mergeSeasonWithCup,
} from '@/lib/standings/cupMatches'
import type { SeasonCalendarData } from './types'

export type {
	MatchVenue,
	SeasonCalendarData,
	SeasonCalendarMatch,
	SeasonCalendarRow,
	SeasonCalendarStats,
	SeasonCompetition,
	SeasonMatchResult,
	SeasonMatchWhen,
} from './types'

export type StandingsSeasonId = '2425' | '2526' | '2627'

export const CURRENT_STANDINGS_SEASON_ID: StandingsSeasonId = '2627'

export const STANDINGS_SEASON_IDS: StandingsSeasonId[] = [
	'2627',
	'2526',
	'2425',
]

const seasonsRecord = {
	'2425': season2425Json as unknown as SeasonCalendarData,
	'2526': season2526Json as unknown as SeasonCalendarData,
	'2627': season2627Json as unknown as SeasonCalendarData,
} satisfies Record<StandingsSeasonId, SeasonCalendarData>

export const standingsSeasons = seasonsRecord

export function getStandingsSeason(
	id: StandingsSeasonId,
): SeasonCalendarData {
	const base = standingsSeasons[id]
	if (id !== '2627') {
		return base
	}

	const cupMatches = buildCupMatchesFromGames('2026/2027')
	return {
		...base,
		matches: mergeSeasonWithCup(base.matches, cupMatches),
	}
}

export function isStandingsSeasonId(value: string): value is StandingsSeasonId {
	return value in standingsSeasons
}

export function getStandingsSeasonHref(id: StandingsSeasonId): string {
	return id === CURRENT_STANDINGS_SEASON_ID ? '/standings/' : `/standings/${id}/`
}

/** @deprecated используйте getStandingsSeason('2627') */
export const season2627 = standingsSeasons['2627']

/** @deprecated используйте getStandingsSeason('2526') */
export const season2526 = standingsSeasons['2526']

/** @deprecated используйте getStandingsSeason('2425') */
export const season2425 = standingsSeasons['2425']
