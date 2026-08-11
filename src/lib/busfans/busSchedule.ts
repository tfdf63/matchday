import { getBusScheduleOverride } from './busScheduleOverrides'

/** Выезд: за 3 часа до начала матча. */
const DEPARTURE_OFFSET_MIN = -3 * 60
/** Обратно: через 2 ч 30 мин после начала матча. */
const RETURN_OFFSET_MIN = 2 * 60 + 30

export type BusScheduleTimes = {
	departure: string
	returnAt: string
}

export type BusScheduleInput = {
	matchTime?: string | null
	eventId?: string | null
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

function getDefaultBusScheduleTimes(
	matchTime: string,
): BusScheduleTimes | null {
	const parsed = parseHhMm(matchTime)
	if (!parsed) return null
	const kickoffMin = parsed.hours * 60 + parsed.minutes
	return {
		departure: formatHhMm(kickoffMin + DEPARTURE_OFFSET_MIN),
		returnAt: formatHhMm(kickoffMin + RETURN_OFFSET_MIN),
	}
}

/** Старт (−3 ч) и обратно (+2:30) от времени начала матча; оверрайд — busScheduleOverrides.json. */
export function getBusScheduleTimes(
	input: BusScheduleInput | string | null | undefined,
): BusScheduleTimes | null {
	const matchTime =
		typeof input === 'string' || input == null
			? input
			: input.matchTime
	const eventId = typeof input === 'object' && input != null ? input.eventId : null
	const override = eventId ? getBusScheduleOverride(eventId) : null

	if (!matchTime?.trim()) {
		if (override?.departure && override.returnAt) {
			return { departure: override.departure, returnAt: override.returnAt }
		}
		return null
	}

	const defaults = getDefaultBusScheduleTimes(matchTime)
	if (!defaults) return null

	if (!override) return defaults

	return {
		departure: override.departure?.trim() || defaults.departure,
		returnAt: override.returnAt?.trim() || defaults.returnAt,
	}
}

export function formatMatchDateLine(parts: {
	dateCard?: string | null
	dateLabel?: string | null
	time?: string | null
	kind?: 'match' | 'event'
}): string {
	const datePart = parts.dateCard?.trim() || parts.dateLabel?.trim() || ''
	const timePart = parts.time?.trim() || ''
	const base = [datePart, timePart].filter(Boolean).join(' ')
	if (!base) return ''
	const prefix = parts.kind === 'event' ? 'СОБЫТИЕ' : 'МАТЧ'
	return `${prefix}: ${base}`
}

export function formatBusScheduleLine(
	input: BusScheduleInput | string | null | undefined,
): string | null {
	const schedule = getBusScheduleTimes(input)
	if (!schedule) return null
	return `старт: ${schedule.departure} · обратно: ${schedule.returnAt}`
}
