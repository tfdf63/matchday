import React from 'react'
import { Metadata } from 'next'

import games from '@/data/games'
import Main, {
	DirectionsModalProvider,
	FonbetTicketBanner,
	HomeInfoModalProvider,
	MatchActivitiesSection,
	SectorSection,
	TicketProgramSection,
	UpcomingMatches,
	OfferSection,
	defaultOfferContent,
	StarPlayerSection,
	RulesSection,
	MerchSection,
	FanCardSection,
	// FaqSection,
	MarqueeSection,
} from '@/features/home'
import MainPageClient from './MainPageClient'

export const metadata: Metadata = {
	description:
		'Купить билеты на матчи ФК Акрон в Самаре. Расписание игр, абонементы, VIP-ложи. Официальный сайт клуба с актуальными ценами и бронированием.',
	keywords:
		'ФК Акрон, билеты на футбол, матчи Акрон, стадион Самара, купить билет, абонемент, VIP, расписание игр',
}

const MatchesPage: React.FC = () => {
	return (
		<HomeInfoModalProvider>
			<DirectionsModalProvider>
				<>
					<Main withBottomMenu />
					<FonbetTicketBanner />
					<UpcomingMatches withBottomMenu />
					<OfferSection {...defaultOfferContent} />
					<MatchActivitiesSection />
					<TicketProgramSection />
					<SectorSection />
					<StarPlayerSection games={games} />
					<RulesSection />
					<MerchSection />
					<FanCardSection />
					{/* <FaqSection /> */}
					<MarqueeSection />
					<MainPageClient />
				</>
			</DirectionsModalProvider>
		</HomeInfoModalProvider>
	)
}

export default MatchesPage
