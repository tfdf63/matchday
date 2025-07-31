'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'
// import styles from './FansClient.module.scss'

const FansClient: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Фанатский',
		subtitle: 'Место для самых преданных болельщиков!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/fan.png'],
		features: [
			{
				title: 'Атмосфера поддержки',
				description: 'Здесь собираются самые преданные болельщики команды',
			},
			{
				title: 'Активная поддержка',
				description: 'Песни, кричалки, флаги — настоящая фан-культура',
			},
			{
				title: 'Эмоции на максимуме',
				description: 'Погружение в атмосферу настоящего футбола',
			},
			{
				title: '',
				description: 'Фан-зона — это не просто место, это состояние души!',
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
		subsectors: ['D114'],
		tariffs: [
			{
				sector: 'D114',
				price1: '3 990 ₽',
				price2: '5 990 ₽',
				price3: '7 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-d114.png',
		buyButton: '',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<CardInfo card={cardData} />
		</>
	)
}

export default FansClient
