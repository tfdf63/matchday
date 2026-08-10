export type MatchVenue = 'home' | 'away'

export type SeasonCompetition = 'rpl' | 'cup'

export type SeasonMatchResult = {
	score: string | null
	pts: number | null
	played: boolean
}

export type SeasonMatchWhen = {
	label: string
	time: string | null
	exact: boolean
	text: string
	range: boolean
}

export type SeasonCalendarMatch = {
	tour: number
	date: string
	team: string
	venue: MatchVenue
	match: SeasonMatchResult
	when: SeasonMatchWhen
	/** По умолчанию — матч РПЛ. */
	competition?: SeasonCompetition
	/** Номер тура кубковой группы (для competition === 'cup'). */
	cupTour?: number
}

export type SeasonCalendarData = {
	season: string
	seasonLabel: string
	timezone: 'SAMT'
	matches: SeasonCalendarMatch[]
}

export type SeasonCalendarRow = SeasonCalendarMatch & {
	cumulativePts: number | null
}

export type SeasonCalendarStats = {
	playedCount: number
	homePts: number
	awayPts: number
	totalPts: number
}
