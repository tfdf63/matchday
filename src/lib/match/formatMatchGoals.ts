/** Отображение гола в ячейке счёта: число, строка (в т.ч. с пенальти) или «-». */
export function formatGoalCell(value: number | string | undefined): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value)
	}
	if (typeof value === 'string') {
		const normalized = value.trim().replace(/\s+/g, ' ')
		return normalized || '-'
	}
	return '-'
}

type ParsedGoal = {
	main: string
	penalties: string | null
}

const GOAL_WITH_PENALTIES_RE = /^(\d+)\s*\((\d+)\)$/

function parseGoalWithPenalties(value: number | string | undefined): ParsedGoal | null {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return { main: String(value), penalties: null }
	}
	if (typeof value !== 'string') return null
	const normalized = value.trim().replace(/\s+/g, ' ')
	if (!normalized) return null
	const match = normalized.match(GOAL_WITH_PENALTIES_RE)
	if (!match) return { main: normalized, penalties: null }
	return { main: match[1], penalties: match[2] }
}

export function formatMatchScore(home: number | string | undefined, away: number | string | undefined): {
	main: string
	penaltiesLine: string | null
	ariaLabel: string
} {
	const homeParsed = parseGoalWithPenalties(home)
	const awayParsed = parseGoalWithPenalties(away)

	const main = `${homeParsed?.main ?? '-'}:${awayParsed?.main ?? '-'}`
	if (homeParsed?.penalties && awayParsed?.penalties) {
		const penalties = `${homeParsed.penalties}:${awayParsed.penalties}`
		return {
			main,
			penaltiesLine: penalties,
			ariaLabel: `Счёт: ${main}, пенальти: ${penalties}`,
		}
	}

	return {
		main,
		penaltiesLine: null,
		ariaLabel: `Счёт: ${main}`,
	}
}
