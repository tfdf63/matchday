import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
	CURRENT_STANDINGS_SEASON_ID,
	isStandingsSeasonId,
} from '@/data/standings'
import { StandingsPage } from '@/features/standings'

type PageProps = {
	params: Promise<{ seasonId: string }>
}

/** Старые URL сезонов — та же страница, что и /standings/ */
export function generateStaticParams() {
	return [{ seasonId: '2526' }, { seasonId: '2425' }]
}

export const metadata: Metadata = {
	robots: { index: false, follow: true },
}

export default async function StandingsSeasonRoutePage({ params }: PageProps) {
	const { seasonId } = await params

	if (!isStandingsSeasonId(seasonId) || seasonId === CURRENT_STANDINGS_SEASON_ID) {
		notFound()
	}

	return (
		<main id='content'>
			<StandingsPage />
		</main>
	)
}
