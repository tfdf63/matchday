import {
	STANDINGS_SEASON_IDS,
	getStandingsSeason,
	type StandingsSeasonId,
} from '@/data/standings'
import type {
	SeasonCalendarMatch,
	SeasonCalendarRow,
	SeasonMatchResult,
} from '@/data/standings/types'
import { enrichSeasonRows } from '@/lib/standings/seasonStats'

export type SeasonResultCell = SeasonMatchResult

export type MultiSeasonCalendarRow = SeasonCalendarRow & {
	seasonResults: Record<StandingsSeasonId, SeasonResultCell | null>
}

export type MultiSeasonColumn = {
	id: StandingsSeasonId
	label: string
	totalPts: number
}

function getRplMatches(seasonId: StandingsSeasonId): SeasonCalendarMatch[] {
	return getStandingsSeason(seasonId).matches.filter(
		(m) => m.competition !== 'cup',
	)
}

function opponentVenueKey(match: Pick<SeasonCalendarMatch, 'team' | 'venue'>) {
	return `${match.team}:${match.venue}`
}

function buildOpponentVenueMap(
	matches: SeasonCalendarMatch[],
): Map<string, SeasonCalendarMatch> {
	return new Map(matches.map((match) => [opponentVenueKey(match), match]))
}

function toResultCell(
	match: SeasonCalendarMatch | undefined,
): SeasonResultCell | null {
	if (!match) {
		return null
	}
	return match.match
}

/** Строки календаря с результатами прошлых сезонов по сопернику и дом/выезд. */
export function buildMultiSeasonCalendar(
	primarySeasonId: StandingsSeasonId,
): {
	rows: MultiSeasonCalendarRow[]
	columns: MultiSeasonColumn[]
} {
	const primaryMatches = getStandingsSeason(primarySeasonId).matches
	const primaryRows = enrichSeasonRows(primaryMatches)

	const opponentMaps = Object.fromEntries(
		STANDINGS_SEASON_IDS.map((id) => [
			id,
			buildOpponentVenueMap(getRplMatches(id)),
		]),
	) as Record<StandingsSeasonId, Map<string, SeasonCalendarMatch>>

	const rows: MultiSeasonCalendarRow[] = primaryRows.map((row) => {
		const lookupKey = opponentVenueKey(row)

		const seasonResults = Object.fromEntries(
			STANDINGS_SEASON_IDS.map((id) => {
				if (row.competition === 'cup') {
					return [
						id,
						id === '2627' ? (row.match as SeasonResultCell) : null,
					] as const
				}
				return [
					id,
					toResultCell(opponentMaps[id].get(lookupKey)),
				] as const
			}),
		) as Record<StandingsSeasonId, SeasonResultCell | null>

		return { ...row, seasonResults }
	})

	const columns: MultiSeasonColumn[] = STANDINGS_SEASON_IDS.map((id) => {
		const season = getStandingsSeason(id)
		const totalPts = getRplMatches(id).reduce(
			(sum, match) =>
				match.match.played && match.match.pts !== null
					? sum + match.match.pts
					: sum,
			0,
		)
		return { id, label: season.seasonLabel, totalPts }
	})

	return { rows, columns }
}
