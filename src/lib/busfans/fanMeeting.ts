import type { MatchEvent } from '@/data/busfans'

export const FAN_MEETING_CLUB = 'Акрон'

/** Событие без второй команды — встреча с болельщиками и т.п. */
export function isFanMeetingEvent(
	event: Pick<MatchEvent, 'awayTeam'>,
): boolean {
	return !event.awayTeam.trim()
}

export function getFanMeetingDisplayTitle(title: string): string {
	return title.trim()
}
