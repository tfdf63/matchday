'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { MatchCard } from '@/components/MatchCard'
import type { Game } from '@/data/games'
import {
	getHeroGameSwitchDate,
	pickHeroGameByMatchEnd,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

export type MainMatchCardClientProps = {
	games: Game[]
	initialGame: Game
}

const MAX_TIMEOUT_MS = 2_147_000_000
const SWITCH_DELAY_BUFFER_MS = 1000

export function MainMatchCardClient({
	games,
	initialGame,
}: MainMatchCardClientProps) {
	const sortedGames = useMemo(() => sortGamesByDateIso(games), [games])
	const [game, setGame] = useState(initialGame)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		const refreshGame = () => {
			timeoutRef.current = null

			const now = new Date()
			const nextGame = pickHeroGameByMatchEnd(sortedGames, now)
			if (nextGame) setGame(nextGame)

			const switchDate = getHeroGameSwitchDate(sortedGames, now)
			if (!switchDate) return

			const delay = Math.min(
				Math.max(
					switchDate.getTime() - now.getTime() + SWITCH_DELAY_BUFFER_MS,
					SWITCH_DELAY_BUFFER_MS,
				),
				MAX_TIMEOUT_MS,
			)

			timeoutRef.current = window.setTimeout(refreshGame, delay)
		}

		refreshGame()

		return () => {
			if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
		}
	}, [sortedGames])

	return <MatchCard game={game} />
}
