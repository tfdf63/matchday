'use client'

import React from 'react'
import Head from 'next/head'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const BusinessClubPage: React.FC = () => {
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
					'Отсюда идеально видно, как исполняются угловые и штрафные.',
			},
			{
				title: 'Эффект присутствия',
				description: 'Игроки разминаются в паре метров от вас.',
			},
			{
				title: 'Эмоции крупным планом',
				description:
					'Видите радость, разочарование и драму футболистов вживую, чаще всего бегут праздновать голы в угол поля.',
			},
			{
				title: '',
				description: 'Угловые секторы — это особый взгляд на футбол!',
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
		subsectors: ['С126', 'С117'],
		tariffs: [
			{
				sector: 'C125-117',
				price1: '4 990 ₽',
				price2: '6 990 ₽',
				price3: '8 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c126c117.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<Head>
				<title>
					Угловые секторы C125-C117 | ФК Акрон - Лучший вид на стандарты и
					эмоции
				</title>
				<meta
					name='description'
					content='Угловые секторы C125-C117 — уникальные места для наблюдения за стандартами и эмоциями игроков. Игроки разминаются в паре метров, празднуют голы прямо перед вами.'
				/>
				<meta
					name='keywords'
					content='угловые секторы, C125, C117, стандарты, эмоции, ФК Акрон, футбол, угловые, штрафные, разминка'
				/>
			</Head>
			<CardInfo card={cardData} />
		</>
	)
}

export default BusinessClubPage
