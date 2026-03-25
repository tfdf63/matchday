import type { Game } from '@/data/games'

/**
 * Целевая форма матча для нового контент-слоя (JSON/TS после редизайна).
 * Поля совпадают с legacy `Game`, пока данные не переедут в другой формат.
 */
export type ContentMatch = {
	id: string
	homeTeam?: string
	awayTeam?: string
	date?: string
	time?: string
	timeLocal?: string
	stadium?: string
	ticketLink?: string
	ticketLinkVip?: string
	ticketLinkSkybox?: string
	leagueInfo?: string
	priceIncreaseDates?: {
		first?: string
		second?: string
	}
	fanIdStatus?: Game['fanIdStatus']
	promoType?: Game['promoType']
}

/** Маппинг новой записи в текущий тип `Game` для существующих компонентов. */
export function contentMatchToGame(row: ContentMatch): Game {
	return {
		id: row.id,
		homeTeam: row.homeTeam,
		awayTeam: row.awayTeam,
		date: row.date,
		time: row.time,
		timeLocal: row.timeLocal,
		stadium: row.stadium,
		ticketLink: row.ticketLink,
		ticketLinkVip: row.ticketLinkVip,
		ticketLinkSkybox: row.ticketLinkSkybox,
		leagueInfo: row.leagueInfo,
		priceIncreaseDates: row.priceIncreaseDates,
		fanIdStatus: row.fanIdStatus ?? 'Без fan id',
		promoType: row.promoType,
	}
}
