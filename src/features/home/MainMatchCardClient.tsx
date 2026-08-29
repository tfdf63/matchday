'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { MatchCard } from '@/components/MatchCard'
import { getOpponentTeamName, type Game } from '@/data/games'
import {
	getMainHeroMatchCardsSwitchDate,
	pickMainHeroMatchCards,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import { MainHeroCardRotator } from './MainHeroCardRotator'

export type MainMatchCardClientProps = {
	games: Game[]
	initialGames: Game[]
}

const MAX_TIMEOUT_MS = 2_147_000_000
const SWITCH_DELAY_BUFFER_MS = 1000

function heroSlideLabel(game: Game): string {
	const opponent = getOpponentTeamName(game)
	return opponent ? `Домашний матч с ${opponent}` : 'Домашний матч'
}

export function MainMatchCardClient({
	games,
	initialGames,
}: MainMatchCardClientProps) {
	const sortedGames = useMemo(() => sortGamesByDateIso(games), [games])
	const [heroGames, setHeroGames] = useState(initialGames)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		const refreshGames = () => {
			timeoutRef.current = null

			const now = new Date()
			const nextGames = pickMainHeroMatchCards(sortedGames, now)
			if (nextGames.length > 0) setHeroGames(nextGames)

			const switchDate = getMainHeroMatchCardsSwitchDate(sortedGames, now)
			if (!switchDate) return

			const delay = Math.min(
				Math.max(
					switchDate.getTime() - now.getTime() + SWITCH_DELAY_BUFFER_MS,
					SWITCH_DELAY_BUFFER_MS,
				),
				MAX_TIMEOUT_MS,
			)

			timeoutRef.current = window.setTimeout(refreshGames, delay)
		}

		refreshGames()

		return () => {
			if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
		}
	}, [sortedGames])

	return (
		<MainHeroCardRotator
			slides={heroGames.map((game) => ({
				id: game.id,
				label: heroSlideLabel(game),
				card: (
					<MatchCard
						game={game}
						variant='mainShop'
						hideSecondaryActions
					/>
				),
			}))}
		/>
	)
}
