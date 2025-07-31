'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import ContactForm from '@/components/Skybox/ContactForm/ContactForm'
import { subscriptionCards } from '@/data/subscriptions'

const VipPageClient: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 13,
		title: 'Skybox',
		subtitle: 'Идеальный баланс приватности и полного погружения в футбол.',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/vip/interior.webp'],
		features: [
			{
				title: 'Эффект присутствия',
				description:
					'Угол обзора, при котором атаки и контратаки выглядят особенно зрелищно',
			},
			{
				title: 'Атмосфера без компромиссов',
				description: 'Полное погружение в игру, но с комфортом приватной зоны',
			},
			{
				title: 'Идеальный ракурс',
				description:
					'Отличный обзор атакующих действий и оборонительных построений вашей команды.',
			},
		],
		services: [
			{
				benefit: 'Комфорт с первых минут',
				description:
					'– Приоритетный VIP-вход и заезд на стадион\n– Гарантированная парковка (5 мест для вас и гостей)',
			},
			{
				benefit: 'Гастрономия премиум-уровня',
				description:
					'– Банкетное обслуживание с широким выбором блюд и напитков\n– Специальное «блюдо матча» на каждой игре',
			},
			{
				benefit: 'Идеальный обзор и приватность',
				description:
					'– Собственный выход на трибуну с лучшим видом на поле\n– Уединенная атмосфера в VIP-зоне\n– Высокоскоростной Wi-Fi на протяжении матча',
			},
			{
				benefit: 'Персональный сервис',
				description:
					'– Сопровождение хостес на протяжении матча\n– Обслуживание в VIP-ложе профессиональным официантом\n– Ваш персональный менеджер решит любые вопросы',
			},
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

export default VipPageClient
