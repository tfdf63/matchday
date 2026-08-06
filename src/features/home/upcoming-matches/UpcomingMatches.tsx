import type { FC } from 'react'

import games from '@/data/games'
import {
	pickPromotedHomeHeroGame,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import UpcomingMatchesClient from './UpcomingMatchesClient'

export type UpcomingMatchesProps = {
	withBottomMenu?: boolean
}

const UpcomingMatches: FC<UpcomingMatchesProps> = ({
	withBottomMenu = false,
}) => {
	const sortedGames = sortGamesByDateIso(games)
	const initialSelectedId =
		pickPromotedHomeHeroGame(sortedGames)?.id ?? null

	return (
		<UpcomingMatchesClient
			games={games}
			initialSelectedId={initialSelectedId}
			withBottomMenu={withBottomMenu}
		/>
	)
}

export default UpcomingMatches
