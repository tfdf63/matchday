import type {
	SeasonCalendarMatch,
	SeasonCalendarRow,
	SeasonCalendarStats,
} from '@/data/standings/types'

export function enrichSeasonRows(
	matches: SeasonCalendarMatch[],
): SeasonCalendarRow[] {
	let cumulative = 0

	return matches.map((row) => {
		if (row.competition === 'cup') {
			return { ...row, cumulativePts: null }
		}

		const { match } = row
		if (match.played && match.pts !== null) {
			cumulative += match.pts
			return { ...row, cumulativePts: cumulative }
		}
		return { ...row, cumulativePts: null }
	})
}

export function getSeasonStats(
	matches: SeasonCalendarMatch[],
): SeasonCalendarStats {
	let totalPts = 0
	let homePts = 0
	let awayPts = 0
	let playedCount = 0

	for (const row of matches) {
		if (row.competition === 'cup') {
			continue
		}
		if (!row.match.played || row.match.pts === null) {
			continue
		}
		playedCount += 1
		totalPts += row.match.pts
		if (row.venue === 'home') {
			homePts += row.match.pts
		} else {
			awayPts += row.match.pts
		}
	}

	return { playedCount, homePts, awayPts, totalPts }
}

export function getPtsClass(pts: number | null): 'win' | 'draw' | 'loss' | null {
	if (pts === 3) return 'win'
	if (pts === 1) return 'draw'
	if (pts === 0) return 'loss'
	return null
}

const DOW_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'] as const

function parseIsoDateParts(dateIso: string): {
	dd: string
	mm: string
	dow: string
} {
	const [year, month, day] = dateIso.split('-').map(Number)
	const date = new Date(year, month - 1, day)
	return {
		dd: String(day).padStart(2, '0'),
		mm: String(month).padStart(2, '0'),
		dow: DOW_SHORT[date.getDay()],
	}
}

/** dd.mm hh:mm (дн) для точных дат; диапазоны — как в данных. */
export function formatWhenText(
	dateIso: string,
	when: SeasonCalendarMatch['when'],
): string {
	const display = formatWhenDisplay(dateIso, when)
	if (display.kind === 'range') {
		return display.label
	}
	if (display.timeLine) {
		return `${display.dateLine} ${display.timeLine}`
	}
	return display.dateLine
}

export type WhenDisplay =
	| { kind: 'lines'; dateLine: string; timeLine: string | null }
	| { kind: 'range'; label: string }

/** Дата и время отдельными строками: «08.08 (сб)» + «18:00». */
export function formatWhenDisplay(
	dateIso: string,
	when: SeasonCalendarMatch['when'],
): WhenDisplay {
	if (when.range || !when.exact) {
		return { kind: 'range', label: when.label }
	}

	const { dd, mm, dow } = parseIsoDateParts(dateIso)
	return {
		kind: 'lines',
		dateLine: `${dd}.${mm} (${dow})`,
		timeLine: when.time,
	}
}
