import type { Game } from '@/data/games'

export const CALENDAR_FON_CUP_ICON_SRC = '/icons/calendar-foncup.svg'

/** Матч Fonbet Кубка России — для иконки в полосе календаря. */
export function isFonbetCupMatch(game: Game): boolean {
	if (game.promoType === 'cup') return true
	return /кубок/i.test(game.leagueInfo ?? '')
}
