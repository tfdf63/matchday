import type { Game } from '@/data/games'

/** С этой даты расписание сезона 2026/2027 — ориентировочное (из akron-schedule). */
export const TENTATIVE_SCHEDULE_FROM_DATE_ISO = '2026-07-26'

export const GAME_DATE_TIME_TENTATIVE_LABEL =
	'дата и время не утверждены' as const

/** Матчи с утверждённым расписанием — без плашки «дата и время не утверждены». */
export const CONFIRMED_GAME_IDS = new Set(['23', '24', '26', '27', '29'])

export function isGameDateTimeTentative(game: Game): boolean {
	if (CONFIRMED_GAME_IDS.has(game.id)) return false
	return game.dateIso >= TENTATIVE_SCHEDULE_FROM_DATE_ISO
}
