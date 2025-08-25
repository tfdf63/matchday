import React from 'react'
import { Metadata } from 'next'
import BusinessClubClient from './BusinessClubClient'

export const metadata: Metadata = {
	title: 'VIP',
	description:
		'Бизнес-клуб ФК Акрон — эксклюзивные места у скамейки запасных. Слышите указания тренера, видите реакции игроков. Премиум сервис, комфорт, нетворкинг.',
	keywords:
		'бизнес-клуб, премиум места, скамейка запасных, ФК Акрон, VIP, комфорт, нетворкинг, эксклюзив',
}

const BusinessClubPage: React.FC = () => {
	return <BusinessClubClient />
}

export default BusinessClubPage
