'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const C4Client: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Семейный',
		subtitle: 'Семейный футбол в тепле и комфорте!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c413c417.png'],
		features: [
			{
				title: 'Тёплая крытая зона',
				description:
					'Никакого ветра и дождя, только уют и отличный обзор поля.',
			},
			{
				title: 'Шаговая доступность к балкону',
				description: 'Места с панорамным видом на игру.',
			},
			{
				title: 'Развлечения для всей семьи',
				description:
					'Пока идёт матч, дети и взрослые могут отдыхать в специальных зонах!',
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
		subsectors: ['C413', 'C417'],
		tariffs: [
			{
				sector: 'C413-417',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c4.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default C4Client
