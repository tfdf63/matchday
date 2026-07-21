import type { Metadata } from 'next'

import { BusFansPage } from '@/features/busfans'
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants'

export const metadata: Metadata = {
	title: 'Фан-автобусы',
	description: 'Фан-автобусы ФК Акрон: маршруты и расписание.',
	alternates: {
		canonical: '/busfans',
	},
	openGraph: {
		title: `${SITE_NAME} | Фан-автобусы`,
		description: 'Фан-автобусы ФК Акрон: маршруты и расписание.',
		url: `${SITE_URL}/busfans`,
	},
}

export default function BusFansRoutePage() {
	return (
		<main id='content'>
			<BusFansPage />
		</main>
	)
}
