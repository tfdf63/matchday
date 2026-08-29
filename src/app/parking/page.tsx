import type { Metadata } from 'next'

import { ParkingPage } from '@/features/parking/ParkingPage'
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants'

export const metadata: Metadata = {
	title: 'Парковка на матч',
	description:
		'Официальная парковка на домашние матчи ФК «Акрон»: стоимость, схема проезда и правила въезда.',
	alternates: {
		canonical: '/parking',
	},
	openGraph: {
		title: `${SITE_NAME} | Парковка на матч`,
		description:
			'Купить парковочное место на домашний матч ФК «Акрон» и посмотреть схему проезда.',
		url: `${SITE_URL}/parking`,
	},
}

export default function ParkingRoutePage() {
	return (
		<main id='content'>
			<ParkingPage />
		</main>
	)
}
