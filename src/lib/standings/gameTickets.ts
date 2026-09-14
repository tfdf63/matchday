import games, { type Game } from '@/data/games'
import type { MatchVenue, SeasonCompetition } from '@/data/standings/types'

export type StandingsTicketButton = {
	label: string
	priceFrom?: string
	href: string
	variant: 'primary' | 'outline'
}

/** @deprecated используйте StandingsTicketButton */
export type StandingsActionButton = StandingsTicketButton

/** Матч уже в прошлом по календарной дате (YYYY-MM-DD в SAMT). */
export function isStandingsMatchDatePast(
	dateIso: string,
	todayIso: string,
): boolean {
	return dateIso < todayIso
}

function trimUrl(value: string | undefined): string | undefined {
	const url = value?.trim()
	return url || undefined
}

function getOpponentName(game: Game): string | undefined {
	if (game.venue === 'home') {
		return game.awayTeam?.trim()
	}
	return game.homeTeam?.trim()
}

export function findGameForStandingsMatch(
	dateIso: string,
	opponent: string,
	venue: MatchVenue,
	competition?: SeasonCompetition,
): Game | undefined {
	const opponentName = opponent.trim()

	return games.find((game) => {
		if (game.dateIso !== dateIso || game.venue !== venue) {
			return false
		}
		if (competition === 'cup' && game.promoType !== 'cup') {
			return false
		}
		if (competition === 'rpl' && game.promoType === 'cup') {
			return false
		}
		return getOpponentName(game) === opponentName
	})
}

function getRegistrationButtons(game: Game): StandingsTicketButton[] {
	const samara = game.busfansRegistrationUrlSamara?.trim()
	const tolyatti =
		game.busfansRegistrationUrlTolyatti?.trim() ||
		game.busfansRegistrationUrl?.trim()

	const buttons: StandingsTicketButton[] = []
	if (tolyatti) {
		buttons.push({
			label: 'Выезд из Тольятти',
			href: tolyatti,
			variant: 'outline',
		})
	}
	if (samara) {
		buttons.push({
			label: 'Выезд из Самары',
			href: samara,
			variant: 'outline',
		})
	}
	return buttons
}

/** Кнопки билетов и регистрации на выезд для строки календаря. */
export function getStandingsActionButtons(game: Game): StandingsTicketButton[] {
	const buttons = getStandingsTicketButtons(game)
	const registration = getRegistrationButtons(game)
	if (registration.length) {
		buttons.push(...registration)
	}
	return buttons
}

/** Кнопки билетов для строки календаря (только непустые URL из games.ts). */
export function getStandingsTicketButtons(game: Game): StandingsTicketButton[] {
	const buttons: StandingsTicketButton[] = []

	const ticket = trimUrl(game.ticketLink)
	const fan = trimUrl(game.ticketLinkFanNew)
	const vip = trimUrl(game.ticketLinkVip)
	const businessClub = trimUrl(game.ticketLinkBusinessClub)
	const lodges = trimUrl(game.ticketLinkSkybox)
	const c4 = trimUrl(game.ticketLinkC4)
	const vipLabel = game.ticketLinkVipLabel?.trim()
	const vipIsTicketLink = !vipLabel || vipLabel === 'VIP'
	const ticketLabel = game.ticketLinkLabel?.trim() || 'Билеты'
	const ticketPriceFrom = game.ticketLinkPriceFrom?.trim() || undefined
	const fanPriceFrom =
		game.ticketLinkFanNewPriceFrom?.trim() || 'от 390 ₽'
	const vipPriceFrom = game.ticketLinkVipPriceFrom?.trim() || undefined
	const businessClubPriceFrom =
		game.ticketLinkBusinessClubPriceFrom?.trim() || undefined
	const lodgesPriceFrom = game.ticketLinkSkyboxPriceFrom?.trim() || undefined
	const c4PriceFrom = game.ticketLinkC4PriceFrom?.trim() || undefined

	if (ticket) {
		buttons.push({
			label: ticketLabel,
			priceFrom: ticketPriceFrom,
			href: ticket,
			variant: 'primary',
		})
	}
	if (fan) {
		buttons.push({
			label: 'Фанатский',
			priceFrom: fanPriceFrom,
			href: fan,
			variant: 'outline',
		})
	}
	if (c4) {
		buttons.push({
			label: 'Семейный',
			priceFrom: c4PriceFrom,
			href: c4,
			variant: 'outline',
		})
	}
	if (vip && vipIsTicketLink) {
		buttons.push({
			label: 'VIP',
			priceFrom: vipPriceFrom,
			href: vip,
			variant: 'outline',
		})
	}
	if (businessClub) {
		buttons.push({
			label: 'Бизнес',
			priceFrom: businessClubPriceFrom,
			href: businessClub,
			variant: 'outline',
		})
	}
	if (lodges) {
		buttons.push({
			label: 'Ложи',
			priceFrom: lodgesPriceFrom,
			href: lodges,
			variant: 'outline',
		})
	}

	return buttons
}

export function getStandingsTicketButtonsForMatch(
	dateIso: string,
	opponent: string,
	venue: MatchVenue,
	todayIso?: string,
	competition?: SeasonCompetition,
): StandingsTicketButton[] {
	if (todayIso && isStandingsMatchDatePast(dateIso, todayIso)) {
		return []
	}

	const game = findGameForStandingsMatch(
		dateIso,
		opponent,
		venue,
		competition,
	)
	if (!game) {
		return []
	}
	return getStandingsActionButtons(game)
}
