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
		title: 'Центральный',
		subtitle: 'Лучший ракурс для истинных ценителей футбола!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c121.png'],
		features: [
			{
				title: 'Безупречный обзор',
				description:
					'Вся тактика, перепасовки и ключевые моменты как на ладони.',
			},
			{
				title: 'Близко к действию',
				description: 'Отличная видимость обеих половин поля.',
			},
			{
				title: 'Идеальный ракурс',
				description:
					'Отличный обзор атакующих действий и оборонительных построений вашей команды.',
			},
			{
				title: '',
				description:
					'Это место для тех, кто ценит красоту футбола и хочет насладиться игрой по-настоящему.',
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
		subsectors: ['C121'],
		tariffs: [
			{
				sector: 'C121',
				price1: '12 490 ₽',
				price2: '17 990 ₽',
				price3: '21 550 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c121.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default BusinessClubPage
