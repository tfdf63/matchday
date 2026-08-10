import type { Metadata } from 'next'

import {
	CURRENT_STANDINGS_SEASON_ID,
	getStandingsSeason,
} from '@/data/standings'
import { StandingsPage } from '@/features/standings'
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants'

const season = getStandingsSeason(CURRENT_STANDINGS_SEASON_ID)

export const metadata: Metadata = {
	title: 'Календарь сезона',
	description: `Календарь матчей ФК «Акрон» в РПЛ: результаты, очки и расписание сезона ${season.seasonLabel}.`,
	alternates: {
		canonical: '/standings/',
	},
	openGraph: {
		title: `${SITE_NAME} | Календарь сезона`,
		description: `Календарь матчей ФК «Акрон» в РПЛ: результаты, очки и расписание сезона ${season.seasonLabel}.`,
		url: `${SITE_URL}/standings/`,
	},
}

export default function StandingsRoutePage() {
	return (
		<main id='content'>
			<StandingsPage />
		</main>
	)
}
