import fanMeetingOverridesJson from '@/data/busfans/fanMeetingOverrides.json'

export type FanMeetingOverride = {
	dateCard?: string
	time?: string
	displayTitle?: string
}

const byEventId = fanMeetingOverridesJson as Readonly<
	Record<string, FanMeetingOverride>
>

/** Ручные поля отображения для встреч с болельщиками (не затираются импортом Excel). */
export function getFanMeetingOverride(
	eventId: string,
): FanMeetingOverride | null {
	return byEventId[eventId] ?? null
}
