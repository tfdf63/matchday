import type { Game, MatchVenue } from '@/data/games'

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
	seasonTour?: string
	dateCard?: string
	dateIso?: string
	venue?: MatchVenue
	priceIncreaseDates?: {
		first?: string
		second?: string
	}
	fanIdStatus?: Game['fanIdStatus']
	promoType?: Game['promoType']
}

function venueFromHomeTeam(homeTeam: string | undefined): MatchVenue {
	return homeTeam?.trim() === 'Акрон' ? 'home' : 'away'
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
		seasonTour: row.seasonTour,
		dateCard: row.dateCard,
		dateIso: row.dateIso ?? '1970-01-01',
		venue: row.venue ?? venueFromHomeTeam(row.homeTeam),
		priceIncreaseDates: row.priceIncreaseDates,
		fanIdStatus: row.fanIdStatus ?? 'Без fan id',
		promoType: row.promoType,
	}
}
