import busScheduleOverridesJson from '@/data/busfans/busScheduleOverrides.json'

export type BusScheduleOverride = {
	departure?: string
	returnAt?: string
}

const byEventId = busScheduleOverridesJson as Readonly<
	Record<string, BusScheduleOverride>
>

/** Ручные правки старта/обратно по id события (не затираются импортом Excel). */
export function getBusScheduleOverride(
	eventId: string,
): BusScheduleOverride | null {
	return byEventId[eventId] ?? null
}
