'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const BusinessClubPage: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Семейный',
		subtitle: 'Идеальное место для футбола в кругу близких!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c118.png'],
		features: [
			{
				title: 'Творческая зона',
				description:
					'Где можно сделать плакат для поддержки команды или нарисовать аквагримм в клубных цветах.',
			},
			{
				title: 'Семейное фото с талисманом',
				description:
					'Сделать крутое фото всей семьей вместе с талисманом команды, который обязательно заглянет на сектор.',
			},
			{
				title: '',
				description: 'Ваш семейный футбольный опыт начинается здесь!',
			},
		],
		services: [
			'Бесплатная парковка',
			'Детская игровая зона',
			'«Акрон» он Эйр» и гости трансляции',
			'Автограф-сессии',
		],
		subsectors: ['C118'],
		tariffs: [
			{
				sector: 'C118',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c118.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default BusinessClubPage
