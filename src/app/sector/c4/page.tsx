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
		title: 'Развлекательный',
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
				title: 'Шаговая доступность к местам',
				description: 'Панорамный вид на игру',
			},
			{
				title: 'Развлечения для всей семьи',
				description:
					'Пока идёт матч, дети и взрослые могут отдыхать в специальных зонах.',
			},
			{
				title: '',
				description:
					'Берите билеты на 4-й этаж трибуны С – здесь футбол становится настоящим семейным приключением. Для детей – развлечения, для родителей – комфортный просмотр!',
			},
		],
		services: [
			'Детская игровая зона',
			'Автограф-сессии',
			'Фотозона',
			'Аквагрим',
			'Lounge зона для родителей',
			'Отдельная концессия с питанием и детским меню',
			'Презентации и выставки',
			'Игровые приставки',
			'Музыка или DJ',
			'Удобная навигация по трибунам',
			'Магазин продажи атрибутики',
			'Туалеты расположенные в близи от сектора',
			'Возможность подняться на лифте и оставить коляску наверху у входа на сектор',
			'Пункты первой медицинской помощи и дежурные медики',
			'Стюарды на каждом секторе, у которых можно уточнить информацию по стадиону',
		],
		subsectors: ['C413', 'C414', 'C415', 'C416', 'C417'],
		tariffs: [
			{
				sector: 'C413-417',
				price1: '17 490 ₽',
				price2: '20 990 ₽',
				price3: '24 990 ₽',
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

export default BusinessClubPage
