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
		title: 'Игровая панорама',
		subtitle: 'Вы получаете идеальный баланс обзора и атмосферы.',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/c122c120.png'],
		features: [
			{
				title: 'Тактический взгляд на игру',
				description:
					'Здесь открывается панорама всего поля - вы увидите, как строится атака от защиты и как игроки перестраиваются в зависимости от ситуации.',
			},
			{
				title: 'Развивай футбольную интуицию',
				description:
					'С этого сектора хорошо читаются заготовленные комбинации и направления атак. Уже через пару матчей вы начнёте предвосхищать голевые моменты за несколько секунд до их развития.',
			},
			{
				title: 'Секрет профессионалов',
				description:
					'Именно такие места часто выбирают скауты и аналитики - отсюда лучше всего видна игровая дисциплина и тактические схемы. Попробуйте и вы посмотреть матч "глазами специалиста".',
			},
		],
		services: [
			'Удобная навигация по трибунам',
			'Зоны активности для болельщиков',
			'Точки питания в шаговой доступности',
			'Магазин или мобильные пункты продажи атрибутики',
			'Туалеты расположенные в близи от сектора',
			'Возможность подняться на лифте и оставить коляску наверху у входа на сектор',
			'Пункты первой медицинской помощи и дежурные медики',
			'Стюарды на каждом секторе, у которых можно уточнить информацию по стадиону',
		],
		subsectors: ['C122', 'C120'],
		tariffs: [
			{
				sector: 'C122-120',
				price1: '9 990 ₽',
				price2: '12 990 ₽',
				price3: '15 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-c122c120.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default BusinessClubPage
