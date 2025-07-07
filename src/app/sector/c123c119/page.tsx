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
		title: 'Стратегический',
		subtitle: 'Лучший ракурс для понимания игры.',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c123c119.png'],
		features: [
			{
				title: 'Идеальная точка для анализа',
				description: 'Видите всю расстановку команд как на схеме.',
			},
			{
				title: 'Лучший обзор атакующих комбинаций',
				description: 'Все передачи и забегания как на ладони.',
			},
			{
				title: 'Видите то, что скрыто от других зрителей',
				description:
					'Как нападающие выбирают позицию, как защитники перекрывают зоны.',
			},
			{
				title: '',
				description:
					'Это места для тех, кто любит не просто болеть, а разбираться в футболе. Видеть не только голы, но и то, как они рождаются.',
			},
		],
		services: [
			'Удобная навигация по трибунам',
			'Зоны активности для болельщиков',
			'Точки питания в шаговой доступности',
			'Магазин или мобильные пункты продажи атрибутики',
			'Туалеты расположенные в близи от сектора',
			'Возможность подняться на лифте и оставить коляску наверху у входа на сектор',
			'Стюарды на каждом секторе, у которых можно уточнить информацию по стадиону',
		],
		subsectors: ['C123', 'C119'],
		tariffs: [
			{
				sector: 'C123-119',
				price1: '7 990 ₽',
				price2: '10 990 ₽',
				price3: '13 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c123c119.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default BusinessClubPage
