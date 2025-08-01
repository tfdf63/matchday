'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const C121Client: React.FC = () => {
	// Находим данные для сектора C121
	const c121Card = subscriptionCards.find(card => card.url === '/sector/c121')

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Классический',
		subtitle: 'Здесь сохраняется аутентичная атмосфера большого спорта.',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c121.png'],
		features: [
			{
				title: 'Проверенный временем ракурс',
				description: 'Поколения болельщиков выбирали именно такие места',
			},
			{
				title: 'Баланс цены и впечатлений',
				description: 'Все преимущества центральной трибуны',
			},
			{
				title: '',
				description: 'Ваш семейный футбольный опыт начинается здесь!',
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
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c121.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!c121Card) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default C121Client
