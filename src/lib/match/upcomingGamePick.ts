import { PROMOTED_MAIN_CALENDAR_GAME_ID, type Game } from '@/data/games'
import { getAppDateIso } from '@/lib/datetime/appTimezone'

const MATCH_END_OFFSET_MS = 2 * 60 * 60 * 1000

const MATCH_TIME_ZONE_OFFSETS: Record<string, string> = {
	MSK: '+03:00',
	SAMT: '+04:00',
}

/** Календарная «сегодня» в SAMT; формат YYYY-MM-DD (как `Game.dateIso`). */
export function getLocalDateIso(now: Date = new Date()): string {
	return getAppDateIso(now)
}

export function sortGamesByDateIso(games: Game[]): Game[] {
	return [...games].sort((a, b) => a.dateIso.localeCompare(b.dateIso))
}

/**
 * Индекс ближайшего матча с `dateIso >= todayIso`.
 * Если все матчи в прошлом — последний по календарю.
 */
export function indexNearestUpcoming(sorted: Game[], todayIso: string): number {
	if (!sorted.length) return -1
	const i = sorted.findIndex((g) => g.dateIso >= todayIso)
	if (i !== -1) return i
	return sorted.length - 1
}

/** Карточка героя / «следующий матч» относительно сегодня. */
export function pickHeroGame(sorted: Game[], todayIso: string): Game | null {
	const i = indexNearestUpcoming(sorted, todayIso)
	return i >= 0 ? sorted[i]! : null
}

export function getGameStartDate(game: Game): Date | null {
	const time = game.time?.trim()
	const match = time?.match(/^([A-Z]+)\s+(\d{1,2}):(\d{2})$/)
	const zone = match?.[1]
	const hours = match?.[2]
	const minutes = match?.[3]

	if (!zone || !hours || !minutes) return null

	const offset = MATCH_TIME_ZONE_OFFSETS[zone]
	const hoursNumber = Number(hours)
	const minutesNumber = Number(minutes)

	if (
		!offset ||
		hoursNumber < 0 ||
		hoursNumber > 23 ||
		minutesNumber < 0 ||
		minutesNumber > 59
	) {
		return null
	}

	return new Date(
		`${game.dateIso}T${hours.padStart(2, '0')}:${minutes}:00${offset}`,
	)
}

export function getGameEndDate(game: Game): Date | null {
	const startDate = getGameStartDate(game)
	if (!startDate) return null

	return new Date(startDate.getTime() + MATCH_END_OFFSET_MS)
}

/**
 * Карточка героя с учётом условного окончания матча: `time` + 2 часа.
 * Если время не распарсилось, матч живёт по прежнему правилу календарного дня.
 */
export function pickHeroGameByMatchEnd(
	sorted: Game[],
	now: Date = new Date(),
): Game | null {
	if (!sorted.length) return null

	const todayIso = getLocalDateIso(now)
	const nowMs = now.getTime()
	const i = sorted.findIndex((game) => {
		const endDate = getGameEndDate(game)
		if (endDate) return endDate.getTime() > nowMs
		return game.dateIso >= todayIso
	})

	if (i !== -1) return sorted[i]!
	return sorted[sorted.length - 1]!
}

export function getHeroGameSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	const game = pickHeroGameByMatchEnd(sorted, now)
	if (!game) return null

	const endDate = getGameEndDate(game)
	if (!endDate || endDate.getTime() <= now.getTime()) return null

	return endDate
}

/**
 * Карточка Main / «Календарь матчей»: пока не закончился промо-матч
 * (`PROMOTED_MAIN_CALENDAR_GAME_ID`), показываем его; иначе — общее правило `pickHeroGameByMatchEnd`.
 */
export function pickPromotedHeroGame(
	sorted: Game[],
	now: Date = new Date(),
): Game | null {
	const promoted = sorted.find(g => g.id === PROMOTED_MAIN_CALENDAR_GAME_ID)
	if (promoted) {
		const endDate = getGameEndDate(promoted)
		if (endDate) {
			if (endDate.getTime() > now.getTime()) return promoted
		} else if (promoted.dateIso >= getLocalDateIso(now)) {
			return promoted
		}
	}
	return pickHeroGameByMatchEnd(sorted, now)
}

export function getPromotedHeroGameSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	const game = pickPromotedHeroGame(sorted, now)
	if (!game) return null

	const endDate = getGameEndDate(game)
	if (!endDate || endDate.getTime() <= now.getTime()) return null

	return endDate
}

/** Карточка героя только для домашних матчей с учётом условного окончания. */
export function pickHomeHeroGameByMatchEnd(
	sorted: Game[],
	now: Date = new Date(),
): Game | null {
	return pickHeroGameByMatchEnd(
		sorted.filter((game) => game.venue === 'home'),
		now,
	)
}

export function getHomeHeroGameSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	const homeGames = sorted.filter((game) => game.venue === 'home')
	const game = pickHeroGameByMatchEnd(homeGames, now)
	if (!game) return null

	const endDate = getGameEndDate(game)
	if (!endDate || endDate.getTime() <= now.getTime()) return null

	return endDate
}

/**
 * Карточка Main: следующий домашний матч с учётом условного окончания.
 * Промо (`PROMOTED_MAIN_CALENDAR_GAME_ID`) учитывается только если это домашний матч;
 * иначе — `pickHomeHeroGameByMatchEnd`.
 */
export function pickPromotedHomeHeroGame(
	sorted: Game[],
	now: Date = new Date(),
): Game | null {
	const promoted = sorted.find((g) => g.id === PROMOTED_MAIN_CALENDAR_GAME_ID)
	if (promoted?.venue === 'home') {
		const endDate = getGameEndDate(promoted)
		if (endDate) {
			if (endDate.getTime() > now.getTime()) return promoted
		} else if (promoted.dateIso >= getLocalDateIso(now)) {
			return promoted
		}
	}
	return pickHomeHeroGameByMatchEnd(sorted, now)
}

export function getPromotedHomeHeroGameSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	const game = pickPromotedHomeHeroGame(sorted, now)
	if (!game) return null

	const endDate = getGameEndDate(game)
	if (!endDate || endDate.getTime() <= now.getTime()) return null

	return endDate
}

function isNonEmptyUrl(value: string | undefined): boolean {
	return Boolean(value?.trim())
}

/** Три ссылки героя Main: обычные, VIP и skybox. `ticketLinkC4` не учитывается. */
export function hasFilledMainHeroTicketLinks(game: Game): boolean {
	return (
		isNonEmptyUrl(game.ticketLink) &&
		isNonEmptyUrl(game.ticketLinkVip) &&
		isNonEmptyUrl(game.ticketLinkSkybox)
	)
}

function isGameStillUpcomingForHero(game: Game, now: Date): boolean {
	const endDate = getGameEndDate(game)
	if (endDate) return endDate.getTime() > now.getTime()
	return game.dateIso >= getLocalDateIso(now)
}

/**
 * Домашние матчи с заполненными `ticketLink` / `ticketLinkVip` / `ticketLinkSkybox`,
 * ещё не закончившиеся (kickoff + 2 ч, как у `pickPromotedHomeHeroGame`).
 */
export function pickHomeHeroGamesWithTicketLinks(
	sorted: Game[],
	now: Date = new Date(),
): Game[] {
	return sorted.filter(
		(game) =>
			game.venue === 'home' &&
			hasFilledMainHeroTicketLinks(game) &&
			isGameStillUpcomingForHero(game, now),
	)
}

export function getHomeHeroTicketGamesSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	const ends = pickHomeHeroGamesWithTicketLinks(sorted, now)
		.map(getGameEndDate)
		.filter(
			(endDate): endDate is Date =>
				endDate != null && endDate.getTime() > now.getTime(),
		)
	if (!ends.length) return null
	return new Date(Math.min(...ends.map((endDate) => endDate.getTime())))
}

/**
 * Карточки героя Main: все домашние матчи с тройкой ссылок на билеты;
 * если таких нет — один матч по `pickPromotedHomeHeroGame`.
 */
export function pickMainHeroMatchCards(
	sorted: Game[],
	now: Date = new Date(),
): Game[] {
	const withTickets = pickHomeHeroGamesWithTicketLinks(sorted, now)
	if (withTickets.length > 0) return withTickets
	const fallback = pickPromotedHomeHeroGame(sorted, now)
	return fallback ? [fallback] : []
}

export function getMainHeroMatchCardsSwitchDate(
	sorted: Game[],
	now: Date = new Date(),
): Date | null {
	if (pickHomeHeroGamesWithTicketLinks(sorted, now).length > 0) {
		return getHomeHeroTicketGamesSwitchDate(sorted, now)
	}
	return getPromotedHomeHeroGameSwitchDate(sorted, now)
}

/**
 * Последний сыгранный матч: с наибольшим `dateIso`, строго меньшим `todayIso`.
 * Если все матчи не раньше сегодняшнего дня — `null`.
 */
export function pickLastPastGame(
	sorted: Game[],
	todayIso: string,
): Game | null {
	for (let j = sorted.length - 1; j >= 0; j--) {
		if (sorted[j]!.dateIso < todayIso) return sorted[j]!
	}
	return null
}

/**
 * Блок «Ближайшие матчи»: матч **после** ближайшего к сегодня (следующий по календарю).
 * Если одного только ближайшего — он же.
 */
export function pickFollowingUpcomingGame(
	sorted: Game[],
	todayIso: string,
): Game | null {
	const i = indexNearestUpcoming(sorted, todayIso)
	if (i < 0) return null
	if (i + 1 < sorted.length) return sorted[i + 1]!
	return sorted[i]!
}
