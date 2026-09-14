import type { MatchEvent } from '@/data/busfans'

import { getSamaraDayStartMs } from '@/lib/datetime/appTimezone'

/** Скрываем карточку с этого момента (SAMT): полночь даты матча + 23 ч. */
export const BUSFANS_CARD_HIDE_HOURS_AFTER_MATCH_DAY = 23

export function getEventBusfansHideAtMs(
	event: Pick<MatchEvent, 'dateIso'>,
): number {
	return (
		getSamaraDayStartMs(event.dateIso) +
		BUSFANS_CARD_HIDE_HOURS_AFTER_MATCH_DAY * 60 * 60 * 1000
	)
}

/** Карточка видна, пока «сейчас» (SAMT) раньше даты матча + 23 ч. */
export function isBusfansCardVisible(
	event: Pick<MatchEvent, 'dateIso'>,
	now: Date = new Date(),
): boolean {
	return now.getTime() < getEventBusfansHideAtMs(event)
}
