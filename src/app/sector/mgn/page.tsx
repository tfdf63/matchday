'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'
import styles from '@/components/CardInfo/CardInfo.module.scss'
import Head from 'next/head'

const BusinessClubPage: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Социальный',
		subtitle: 'Комфортные места с лучшим видом на игру!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/mgn.png'],
		features: [
			{
				title: 'Бесплатное посещение',
				description:
					'Для болельщиков, использующих кресло-коляску для передвижения, а также инвалиды 1-й и 2-й группы имеют право посещать любой домашний матч ФК «Акрон» на «Солидарность Самара Арена» бесплатно. Право на бесплатное посещение распространяется также на одного сопровождающего.',
			},
			{
				title: 'Отдельный вход',
				description:
					'Запуск болельщиков осуществляется через GATE 3. Он оборудован всем необходимым для маломобильных групп населения.',
			},
			{
				title: 'Электрокары',
				description:
					'Они располагаются в районе трамвайной остановки на Первой миле, а также на парковке P6. Подвоз обеспечивается до входа на стадион.',
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
		subsectors: ['Специальные места на каждом секторе'],
		tariffs: [
			{
				sector: 'Специальные места на каждом секторе',
				price1: 'по заявке',
				price2: 'по заявке',
				price3: 'по заявке',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-mgn.png',
		description:
			'Бизнес-клуб предлагает эксклюзивные условия для корпоративных клиентов с премиальным сервисом и комфортными условиями.',
		buyButton: ' ',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<Head>
				<title>
					Социальный сектор | ФК Акрон - Доступная среда для всех болельщиков
				</title>
				<meta
					name='description'
					content='Социальный сектор Акрон — комфортные места для болельщиков с ограниченными возможностями. Бесплатные билеты, отдельный вход, поддержка на стадионе.'
				/>
				<meta
					name='keywords'
					content='социальный сектор, Акрон, футбол, билеты, стадион, доступная среда, инвалид, комфорт'
				/>
			</Head>
			<CardInfo card={cardData} />
			<div className={styles.cardInfo} style={{ marginTop: 0 }}>
				<h2
					style={{
						fontFamily: 'Akademia, sans-serif',
						fontSize: '2rem',
						marginBottom: '1rem',
						color: 'var(--foreground)',
						textAlign: 'left',
					}}
				>
					Оставить заявку
				</h2>
				<p
					style={{
						fontSize: '1.1rem',
						lineHeight: 1.6,
						color: 'var(--foreground-secondary)',
						textAlign: 'left',
						fontFamily: 'var(--font-ibm-plex-mono), monospace',
					}}
				>
					Для заявки необходимо отправить сообщение в телеграм по номеру{' '}
					<b>89276879750</b> или через профиль{' '}
					<a
						href='https://t.me/slava_tfdf'
						target='_blank'
						rel='noopener noreferrer'
					>
						t.me/slava_tfdf
					</a>
					, написав: <q>заявка на соц. билет на матч {'{указать матч}'}</q>.
				</p>
			</div>
		</>
	)
}

export default BusinessClubPage
