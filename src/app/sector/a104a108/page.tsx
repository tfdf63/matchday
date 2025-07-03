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
		title: 'За скамейкой',
		subtitle: 'Ваш пропуск за кулисы большого футбола!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/a104a108.png'],
		features: [
			{
				title: 'Видите живые тренерские эмоции',
				description:
					'Указания игрокам, реакцию на забитые голы и как принимаются ключевые тактические решения.',
			},
			{
				title: 'Видите разминку звёзд перед выходом',
				description: 'Их фирменные ритуалы и подготовку к игре.',
			},
			{
				title: 'Близко к игрокам',
				description:
					'Шанс поймать взгляд или получить автограф при выходе игроков в тоннель.',
			},
			{
				title: '',
				description:
					'Это не просто трибуна — это мастер-класс по футбольной психологии!',
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
		subsectors: ['A104', 'A108'],
		tariffs: [
			{
				sector: 'A104-108',
				price1: '16 990 ₽',
				price2: '18 990 ₽',
				price3: '22 890 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-a104a108.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return <CardInfo card={cardData} />
}

export default BusinessClubPage
