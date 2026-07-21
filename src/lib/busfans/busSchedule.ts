/** Выезд: за 3 часа до начала матча. */
const DEPARTURE_OFFSET_MIN = -3 * 60
/** Обратно: через 2 ч 30 мин после начала матча. */
const RETURN_OFFSET_MIN = 2 * 60 + 30

export type BusScheduleTimes = {
	departure: string
	returnAt: string
}

function parseHhMm(time: string): { hours: number; minutes: number } | null {
	const match = time.match(/(\d{1,2}):(\d{2})/)
	if (!match) return null
	const hours = Number(match[1])
	const minutes = Number(match[2])
	if (
		!Number.isFinite(hours) ||
		!Number.isFinite(minutes) ||
		hours < 0 ||
		hours > 23 ||
		minutes < 0 ||
		minutes > 59
	) {
		return null
	}
	return { hours, minutes }
}

function formatHhMm(totalMinutes: number): string {
	const day = 24 * 60
	const normalized = ((totalMinutes % day) + day) % day
	const hours = Math.floor(normalized / 60)
	const minutes = normalized % 60
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/** Старт (−3 ч) и обратно (+2:30) от времени начала матча. */
export function getBusScheduleTimes(
	matchTime: string | null | undefined,
): BusScheduleTimes | null {
	if (!matchTime?.trim()) return null
	const parsed = parseHhMm(matchTime)
	if (!parsed) return null
	const kickoffMin = parsed.hours * 60 + parsed.minutes
	return {
		departure: formatHhMm(kickoffMin + DEPARTURE_OFFSET_MIN),
		returnAt: formatHhMm(kickoffMin + RETURN_OFFSET_MIN),
	}
}

export function formatMatchDateLine(parts: {
	dateCard?: string | null
	dateLabel?: string | null
	time?: string | null
}): string {
	const datePart = parts.dateCard?.trim() || parts.dateLabel?.trim() || ''
	const timePart = parts.time?.trim() || ''
	const base = [datePart, timePart].filter(Boolean).join(' ')
	return base ? `МАТЧ: ${base}` : ''
}

export function formatBusScheduleLine(
	matchTime: string | null | undefined,
): string | null {
	const schedule = getBusScheduleTimes(matchTime)
	if (!schedule) return null
	return `старт: ${schedule.departure} · обратно: ${schedule.returnAt}`
}
