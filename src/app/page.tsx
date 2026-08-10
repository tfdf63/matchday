import React from 'react'

import games from '@/data/games'
import { faqItems } from '@/data/faq'
import { SeoJsonLd } from '@/components/SeoJsonLd/SeoJsonLd'
import Main, {
	MatchActivitiesSection,
	SectorSection,
	TicketProgramSection,
	LoyaltyProgramSection,
	UpcomingMatches,
	OfferSection,
	defaultOfferContent,
	RulesSection,
	MerchSection,
	FanCardSection,
	FaqSection,
	MarqueeSection,
} from '@/features/home'
import { buildFaqPageJsonLd, buildSportsEventsJsonLd } from '@/lib/seo'
import MainPageClient from './MainPageClient'

const faqJsonLd = buildFaqPageJsonLd(faqItems)
const eventsJsonLd = buildSportsEventsJsonLd(games)

const MatchesPage: React.FC = () => {
	return (
		<main id='content'>
			<SeoJsonLd data={faqJsonLd} />
			<SeoJsonLd data={eventsJsonLd} />
			<Main withBottomMenu />
			<LoyaltyProgramSection />
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
	)
}

export default MatchesPage
