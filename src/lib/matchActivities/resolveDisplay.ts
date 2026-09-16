import games from '@/data/games'
import type { MatchActivity } from '@/data/matchActivities'
import { getGameStartDate } from '@/lib/match/upcomingGamePick'

/** Карточка «Автограф-сессия» на главной. */
export const AUTOGRAPH_MATCH_ACTIVITY_ID = '1'

/** Акрон — Ахмат (дом): промо Милутина до стартового свистка. */
export const AUTOGRAPH_PROMO_GAME_ID = '34'

export const autographActivityDefaultCopy = {
	titleLine1: 'Автограф-сессии',
	titleLine2: '',
	subtitle:
		'Живая встреча с игроками команды. Подписываем мерч, делаем быстрые селфи и общаемся вживую перед стартовым свистком.',
} as const

export const autographActivityPromoCopy = {
	titleLine1: 'Автограф-сессия',
	titleLine2: 'Милутина Видосавлевича',
	subtitle:
		'В четверг знакомимся с новичком ближе. Милутин будет ждать тебя в «Семейном секторе» С4 в 18:30.',
} as const

export function getAutographPromoKickoffMs(): number | null {
	const game = games.find((g) => g.id === AUTOGRAPH_PROMO_GAME_ID)
	if (!game) return null
	const start = getGameStartDate(game)
	return start?.getTime() ?? null
}

export function shouldShowAutographPromoCopy(now: Date = new Date()): boolean {
	const kickoffMs = getAutographPromoKickoffMs()
	if (kickoffMs === null) return false
	return now.getTime() < kickoffMs
}

export function applyMatchActivitiesDisplayRules(
	activities: MatchActivity[],
	now: Date = new Date(),
): MatchActivity[] {
	const promo = shouldShowAutographPromoCopy(now)
	const copy = promo ? autographActivityPromoCopy : autographActivityDefaultCopy

	return activities.map((activity) =>
		activity.id === AUTOGRAPH_MATCH_ACTIVITY_ID
			? { ...activity, ...copy }
			: activity,
	)
}
