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

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<Head>
				<title>
					Сектор C121 | ФК Акрон - Классические места центральной трибуны
				</title>
				<meta
					name='description'
					content='Сектор C121 на стадионе Акрон — классические места центральной трибуны. Отличный обзор поля, аутентичная атмосфера футбола, доступные цены.'
				/>
				<meta
					name='keywords'
					content='сектор C121, центральная трибуна, ФК Акрон, футбол, классические места, стадион'
				/>
			</Head>
			<CardInfo card={cardData} />
		</>
	)
}

export default BusinessClubPage
