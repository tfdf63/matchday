import React from 'react'
import { Metadata } from 'next'

import Main, {
	MatchActivitiesSection,
	SectorSection,
	TicketProgramSection,
	UpcomingMatches,
	OfferSection,
	defaultOfferContent,
	StarPlayerSection,
	RulesSection,
	MerchSection,
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
		<>
			<Main withBottomMenu />
			<UpcomingMatches withBottomMenu />
			<OfferSection {...defaultOfferContent} />
			<MatchActivitiesSection />
			<TicketProgramSection />
			<SectorSection />
			<StarPlayerSection />
			<RulesSection />
			<MerchSection />
			<MainPageClient />
		</>
	)
}

export default MatchesPage
