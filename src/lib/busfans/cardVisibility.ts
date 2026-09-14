import type { MatchEvent } from '@/data/busfans'

/** Последний день, когда карточка матча видна в списке /busfans. */
export function getEventLastDisplayDateIso(
	event: Pick<MatchEvent, 'dateIso' | 'dateToIso'>,
): string {
	return event.dateToIso.localeCompare(event.dateIso) >= 0
		? event.dateToIso
		: event.dateIso
}

/** Скрываем с календарного дня после последнего дня матча (SAMT, YYYY-MM-DD). */
export function isBusfansCardVisible(
	event: Pick<MatchEvent, 'dateIso' | 'dateToIso'>,
	todayIso: string,
): boolean {
	return todayIso <= getEventLastDisplayDateIso(event)
}
