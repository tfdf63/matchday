'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'
import styles from './MgnClient.module.scss'

const MgnClient: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'Социальный сектор',
		subtitle: 'Комфортные места для болельщиков с ограниченными возможностями.',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/mgn.png'],
		features: [
			{
				title: 'Доступная среда',
				description: 'Специально оборудованные места для комфортного просмотра',
			},
			{
				title: 'Бесплатные билеты',
				description:
					'Социальная поддержка для болельщиков с ограниченными возможностями',
			},
			{
				title: 'Отдельный вход',
				description: 'Удобный доступ без очередей и препятствий',
			},
			{
				title: '',
				description: 'Футбол доступен для всех!',
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
		subsectors: ['MGN'],
		tariffs: [
			{
				sector: 'MGN',
				price1: 'Бесплатно',
				price2: 'Бесплатно',
				price3: 'Бесплатно',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-mgn.png',
		buyButton: 'https://tickets.example.com/business-club',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<CardInfo card={cardData} />
			<div className={styles.cardInfo}>
				<h2
					style={{
						fontFamily: 'Akademia, sans-serif',
						fontSize: '2rem',
						marginBottom: '1rem',
						color: 'var(--foreground)',
						textAlign: 'left',
						width: '100%',
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
						width: '100%',
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

export default MgnClient
