import games, { type Game } from '@/data/games'
import type { MatchVenue, SeasonCompetition } from '@/data/standings/types'

export type StandingsTicketButton = {
	label: string
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

function getRegistrationButton(game: Game): StandingsTicketButton | null {
	const url = game.busfansRegistrationUrl?.trim()
	if (!url) {
		return null
	}
	return {
		label: 'Регистрация на выезд',
		href: url,
		variant: 'outline',
	}
}

/** Кнопки билетов и регистрации на выезд для строки календаря. */
export function getStandingsActionButtons(game: Game): StandingsTicketButton[] {
	const buttons = getStandingsTicketButtons(game)
	const registration = getRegistrationButton(game)
	if (registration) {
		buttons.push(registration)
	}
	return buttons
}

/** Кнопки билетов для строки календаря (только непустые URL из games.ts). */
export function getStandingsTicketButtons(game: Game): StandingsTicketButton[] {
	const buttons: StandingsTicketButton[] = []

	const ticket = trimUrl(game.ticketLink)
	const vip = trimUrl(game.ticketLinkVip)
	const lodges = trimUrl(game.ticketLinkSkybox)
	const businessClub = trimUrl(game.ticketLinkBusinessClub)
	const vipLabel = game.ticketLinkVipLabel?.trim()
	const vipIsTicketLink = !vipLabel || vipLabel === 'VIP'

	if (vip && vipIsTicketLink) {
		buttons.push({ label: 'VIP', href: vip, variant: 'outline' })
	}
	if (ticket) {
		buttons.push({ label: 'Купить билеты', href: ticket, variant: 'primary' })
	}
	if (lodges) {
		buttons.push({ label: 'Ложи', href: lodges, variant: 'outline' })
	}
	if (businessClub) {
		buttons.push({
			label: 'Бизнес-клуб',
			href: businessClub,
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
