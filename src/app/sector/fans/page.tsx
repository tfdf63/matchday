'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'
import Head from 'next/head'

const BusinessClubPage: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 12,
		title: 'Фанатский',
		subtitle: 'Здесь рождается дух стадиона!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/fan.png'],
		features: [
			{
				title: 'Станьте частью большого',
				description: 'Хор голосов, барабаны, флаги и бесконечная поддержка!',
			},
			{
				title: 'Зрелищные перфомансы',
				description:
					'Только здесь вы можете стать участником фирменного шоу от фанатов клуба.',
			},
			{
				title: 'Знакомства с единомышленниками',
				description:
					'Здесь болеют самые преданные, готовые поддержать команду даже в трудный момент.',
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
				price1: '4 490 ₽',
				price2: '4 990 ₽',
				price3: '5 990 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-d114.png',
		description:
			'Бизнес-клуб предлагает эксклюзивные условия для корпоративных клиентов с премиальным сервисом и комфортными условиями.',
		buyButton: 'https://vk.com/fcakron_fans',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<Head>
				<title>
					Фанатский сектор | ФК Акрон - Атмосфера настоящих болельщиков
				</title>
				<meta
					name='description'
					content='Фанатский сектор D114 на стадионе Акрон — место для настоящих болельщиков. Хор голосов, барабаны, флаги, перформансы. Станьте частью большой футбольной семьи!'
				/>
				<meta
					name='keywords'
					content='фанатский сектор, D114, Акрон, футбол, болельщики, поддержка, перформанс, атмосфера, билеты'
				/>
			</Head>
			<CardInfo card={cardData} />
		</>
	)
}

export default BusinessClubPage
