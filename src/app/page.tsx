import React from 'react'

import games from '@/data/games'
import { faqItems } from '@/data/faq'
import { SeoJsonLd } from '@/components/SeoJsonLd/SeoJsonLd'
import Main, {
	DirectionsModalProvider,
	HomeInfoModalProvider,
	ParkingModalProvider,
	MatchActivitiesSection,
	SectorSection,
	TicketProgramSection,
	UpcomingMatches,
	OfferSection,
	defaultOfferContent,
	RulesSection,
	MerchSection,
	FanCardSection,
	FaqSection,
	MarqueeSection,
} from '@/features/home'
import {
	buildFaqPageJsonLd,
	buildSportsEventsJsonLd,
} from '@/lib/seo'
import MainPageClient from './MainPageClient'

const faqJsonLd = buildFaqPageJsonLd(faqItems)
const eventsJsonLd = buildSportsEventsJsonLd(games)

const MatchesPage: React.FC = () => {
	return (
		<ParkingModalProvider>
			<HomeInfoModalProvider>
				<DirectionsModalProvider>
					<main id='content'>
						<SeoJsonLd data={faqJsonLd} />
						<SeoJsonLd data={eventsJsonLd} />
						<Main withBottomMenu />
						<UpcomingMatches withBottomMenu />
						<OfferSection {...defaultOfferContent} />
						<MatchActivitiesSection />
						<TicketProgramSection />
						<SectorSection />
						<RulesSection />
						<MerchSection />
						<FanCardSection />
						<FaqSection />
						<MarqueeSection />
						<MainPageClient />
					</main>
				</DirectionsModalProvider>
			</HomeInfoModalProvider>
		</ParkingModalProvider>
	)
}

export default MatchesPage
