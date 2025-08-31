import React from 'react'
import BonusesPageClient from './BonusesPageClient'

export const metadata = {
	title: 'Бонусы | ФК Акрон',
	description:
		'Бонусы, скидки и промокоды ФК Акрон. Специальные предложения для болельщиков команды.',
}

const BonusesPage: React.FC = () => {
	return <BonusesPageClient />
}

export default BonusesPage
