'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const C125C117Client: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Угловой',
		subtitle: 'Крутые места для тех, кто хочет особенных эмоций!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c125c117.png'],
		features: [
			{
				title: 'Лучший вид на стандарты',
				description:
					'отсюда идеально видно, как исполняются угловые и штрафные.',
			},
			{
				title: 'Эффект присутствия',
				description: 'Игроки разминаются в паре метров от вас',
			},
			{
				title: 'Эмоции крупным планом',
				description:
					'Видите радость, разочарование и драму футболистов вживую, чаще всего бегут праздновать голы в угол поля',
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
		subsectors: ['C125', 'C117'],
		tariffs: [
			{
				sector: 'C125',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
			{
				sector: 'C117',
				price1: '5 990 ₽',
				price2: '8 990 ₽',
				price3: '10 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c126c117.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default C125C117Client
