'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const D116D112Client: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'За воротами',
		subtitle: 'Выгодный ракурс!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/d116d112.png'],
		features: [
			{
				title: 'Лучший вид на голевые моменты',
				description:
					'когда атака идёт на ваши ворота, вы видите каждый сейв вратаря и гол в упор!',
			},
			{
				title: 'Эффект погружения',
				description:
					'Мяч часто вылетает в эти секторы, создавая ощущение участия в игре.',
			},
			{
				title: 'Фото с уникальным ракурсом',
				description: 'снимите вратаря и защитников крупным планом!',
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
		subsectors: ['D116', 'D112'],
		tariffs: [
			{
				sector: 'D116',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
			{
				sector: 'D112',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-d116d112.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default D116D112Client
