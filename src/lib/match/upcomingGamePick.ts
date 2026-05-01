import type { Game } from '@/data/games'

/** Локальная дата в формате YYYY-MM-DD (как `Game.dateIso`). */
export function getLocalDateIso(now: Date = new Date()): string {
	const y = now.getFullYear()
	const m = String(now.getMonth() + 1).padStart(2, '0')
	const d = String(now.getDate()).padStart(2, '0')
	return `${y}-${m}-${d}`
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
