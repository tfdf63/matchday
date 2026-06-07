import type { Game } from '@/data/games'
import {
	getGameEndDate,
	getGameStartDate,
	getLocalDateIso,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import { SITE_NAME, SITE_URL } from './constants'

function buildEventName(game: Game): string {
	const home = game.homeTeam?.trim()
	const away = game.awayTeam?.trim()
	if (home && away) return `${home} — ${away}`
	return home || away || 'Матч ФК Акрон'
}

function isUpcomingTicketedGame(game: Game, now: Date): boolean {
	const ticketLink = game.ticketLink?.trim()
	if (!ticketLink) return false

	const startDate = getGameStartDate(game)
	const endDate = getGameEndDate(game)
	if (endDate && endDate.getTime() <= now.getTime()) return false
	if (startDate) return startDate.getTime() > now.getTime()

	return game.dateIso >= getLocalDateIso(now)
}

export function buildSportsEventsJsonLd(
	games: readonly Game[],
	now: Date = new Date(),
) {
	const events = sortGamesByDateIso([...games])
		.filter((game) => isUpcomingTicketedGame(game, now))
		.map((game) => {
			const startDate = getGameStartDate(game)
			const ticketLink = game.ticketLink!.trim()

			return {
				'@type': 'SportsEvent',
				name: buildEventName(game),
				startDate: startDate?.toISOString(),
				eventStatus: 'https://schema.org/EventScheduled',
				location: game.stadium
					? {
							'@type': 'Place',
							name: game.stadium,
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Самара',
								addressCountry: 'RU',
							},
						}
					: undefined,
				organizer: {
					'@type': 'SportsOrganization',
					name: SITE_NAME,
					url: SITE_URL,
				},
				offers: {
					'@type': 'Offer',
					url: ticketLink,
					availability: 'https://schema.org/InStock',
				},
			}
		})
		.filter((event) => Boolean(event.startDate))

	if (!events.length) return null

	return {
		'@context': 'https://schema.org',
		'@graph': events,
	}
}
