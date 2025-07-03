'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import ContactForm from '@/components/Skybox/ContactForm/ContactForm'
import { subscriptionCards } from '@/data/subscriptions'

const BusinessClubPage: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 13,
		title: 'Skybox',
		subtitle: 'Место, где рождается история матча!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/vip/interior.webp'],
		features: [
			{
				title: 'Эксклюзивная близость',
				description:
					'Слышите указания тренера, видите реакции игроков и всё, что скрыто от обычных зрителей.',
			},
			{
				title: 'Главные эмоции',
				description:
					'Именно здесь разворачиваются горячие споры с арбитром, триумфальные выходы замен и нерв скамейки в решающие минуты.',
			},
			{
				title: 'Идеальный ракурс',
				description:
					'Отличный обзор атакующих действий и оборонительных построений вашей команды.',
			},
			{
				title: 'Премиальная атмосфера',
				description: 'Комфортные мягкие кресла.',
			},
			{
				title: '',
				description:
					'Это не просто билет на матч – это пропуск за кулисы большого футбола.',
			},
		],
		services: [
			'VIP-заезд/вход на стадион',
			'Приоритетная парковка (5 мест)',
			'Банкетная категория питания с широким выбором холодных закусок, десертов, салатов и горячих блюд. Также в категории представлены горячие и холодные напитки. На каждой игре добавляется блюдо матча',
			'Обслуживание VIP-ложи во время матча официантом',
			'Сопровождение хостес при проведении матча',
			'Собственный выход на трибуну арены',
			'Приватная обстановка с лучшим видом на поле',
			'Доступ к Wi-fi во время матча',
			'Персональный менеджер',
		],
		subsectors: ['A S301-310', 'A S311-320', 'C S330-357'],
		tariffs: [
			{
				sector: 'S301-315',
				price1: 'по заявке',
				price2: 'по заявке',
				price3: 'по заявке',
			},
			{
				sector: 'S320-351',
				price1: 'по заявке',
				price2: 'по заявке',
				price3: 'по заявке',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-vip.png',
		// buyButton: ' ',
	}

	if (!businessClubCard) {
		return <div>Абонемент не найден</div>
	}

	return (
		<>
			<CardInfo card={cardData} />
			<ContactForm />
		</>
	)
}

export default BusinessClubPage
