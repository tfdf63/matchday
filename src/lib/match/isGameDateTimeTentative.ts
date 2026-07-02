import type { Game } from '@/data/games'

/** С этой даты расписание сезона 2026/2027 — ориентировочное (из akron-schedule). */
export const TENTATIVE_SCHEDULE_FROM_DATE_ISO = '2026-07-26'

export const GAME_DATE_TIME_TENTATIVE_LABEL =
	'дата и время не утверждены' as const

export function isGameDateTimeTentative(game: Game): boolean {
	return game.dateIso >= TENTATIVE_SCHEDULE_FROM_DATE_ISO
}
