import boardingStopOverridesJson from '@/data/busfans/boardingStopOverrides.json'

import {
	formatBoardingStopLabel,
	normalizeBoardingStopKey,
} from './boardingStopAliases'

export type BoardingStopOverride = {
	label: string
	replacement?: boolean
}

export type BoardingStopDisplay = {
	label: string
	isReplacement: boolean
}

type OverridesByEvent = Readonly<
	Record<string, Readonly<Record<string, BoardingStopOverride>>>
>

const byEventId = boardingStopOverridesJson as OverridesByEvent

const normalizedByEventId: Readonly<
	Record<string, Readonly<Record<string, BoardingStopOverride>>>
> = Object.fromEntries(
	Object.entries(byEventId).map(([eventId, stops]) => [
		eventId,
		Object.fromEntries(
			Object.entries(stops).map(([stop, override]) => [
				normalizeBoardingStopKey(stop),
				override,
			]),
		),
	]),
)

/** Ручная замена подписи остановки на конкретном матче (не затирается импортом Excel). */
export function getBoardingStopOverride(
	eventId: string,
	stop: string,
): BoardingStopOverride | null {
	return normalizedByEventId[eventId]?.[normalizeBoardingStopKey(stop)] ?? null
}

export function getBoardingStopDisplay(
	stop: string,
	eventId?: string,
): BoardingStopDisplay {
	const override = eventId ? getBoardingStopOverride(eventId, stop) : null
	const label = override?.label.trim()
	if (label) {
		return {
			label,
			isReplacement: Boolean(override?.replacement),
		}
	}
	return {
		label: formatBoardingStopLabel(stop),
		isReplacement: false,
	}
}
