import type { FC } from 'react'

import games from '@/data/games'

import UpcomingMatchesClient from './UpcomingMatchesClient'

export type UpcomingMatchesProps = {
	withBottomMenu?: boolean
}

const UpcomingMatches: FC<UpcomingMatchesProps> = ({
	withBottomMenu = false,
}) => {
	return (
		<UpcomingMatchesClient games={games} withBottomMenu={withBottomMenu} />
	)
}

export default UpcomingMatches
