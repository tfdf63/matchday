import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
	STANDINGS_SEASON_IDS,
	CURRENT_STANDINGS_SEASON_ID,
	getStandingsSeason,
	isStandingsSeasonId,
} from '@/data/standings'
import { StandingsPage } from '@/features/standings'
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants'

type PageProps = {
	params: Promise<{ seasonId: string }>
}

export function generateStaticParams() {
	return STANDINGS_SEASON_IDS.filter(
		(id) => id !== CURRENT_STANDINGS_SEASON_ID,
	).map((seasonId) => ({ seasonId }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { seasonId } = await params
	if (!isStandingsSeasonId(seasonId)) {
		return { title: 'Календарь сезона' }
	}

	const season = getStandingsSeason(seasonId)
	const path = `/standings/${seasonId}/`

	return {
		title: `Календарь сезона ${season.seasonLabel}`,
		description: `Календарь матчей ФК «Акрон» в РПЛ: результаты, очки и расписание сезона ${season.seasonLabel}.`,
		alternates: { canonical: path },
		openGraph: {
			title: `${SITE_NAME} | Календарь сезона ${season.seasonLabel}`,
			description: `Календарь матчей ФК «Акрон» в РПЛ: результаты, очки и расписание сезона ${season.seasonLabel}.`,
			url: `${SITE_URL}${path}`,
		},
	}
}

export default async function StandingsSeasonRoutePage({ params }: PageProps) {
	const { seasonId } = await params

	if (!isStandingsSeasonId(seasonId)) {
		notFound()
	}

	return (
		<main id='content'>
			<StandingsPage season={getStandingsSeason(seasonId)} />
		</main>
	)
}
