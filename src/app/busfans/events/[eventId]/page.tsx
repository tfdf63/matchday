import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { busFansDataset } from '@/data/busfans'
import { EventDetailClient } from '@/features/busfans'
import {
	getMatchEventById,
	getMatchEvents,
} from '@/lib/busfans/selectors'
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants'

type PageProps = {
	params: Promise<{ eventId: string }>
}

export async function generateStaticParams() {
	return getMatchEvents(busFansDataset).map((event) => ({ eventId: event.id }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { eventId } = await params
	const event = getMatchEventById(busFansDataset, decodeURIComponent(eventId))
	if (!event) {
		return { title: 'Матч не найден' }
	}

	return {
		title: event.title,
		description: `Автобусы и списки пассажиров: ${event.title}`,
		alternates: {
			canonical: `/busfans/events/${event.id}`,
		},
		openGraph: {
			title: `${SITE_NAME} | ${event.title}`,
			url: `${SITE_URL}/busfans/events/${event.id}`,
		},
	}
}

export default async function BusFansEventPage({ params }: PageProps) {
	const { eventId } = await params
	const event = getMatchEventById(busFansDataset, decodeURIComponent(eventId))
	if (!event) notFound()

	return (
		<main id='content'>
			<EventDetailClient dataset={busFansDataset} event={event} />
		</main>
	)
}
