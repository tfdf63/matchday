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
		title: 'VIP ложа',
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
			<div
				id='ya-widget-frame'
				style={{
					width: '100%',
					maxWidth: '1200px',
					margin: '0 auto 20px auto',
					padding: '0 1rem',
				}}
			></div>

			{/* Виджет Яндекс.Билетов для VIP */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
						/* Настройка */
						var dealerName = 'YandexTicketsDealer';
						var dealer = window[dealerName] = window[dealerName] || [];

						dealer.push(['setDefaultClientKey', 'f524515c-ae22-419d-9b15-80eea470a53b']);
						dealer.push(['setDefaultRegionId', 51]);

						YandexTicketsDealer.push(['getDealer', function (dealer) {
							const widget = dealer.Widget('85005', 'venue', {
								target: document.getElementById('ya-widget-frame'),
								onRequestClose: function() {
									widget.unmount();
									widget.destroy();
								},
							});

							widget.mount({ style: { height: '800px' } });
						}]);

						/* Загрузка */
						(function () {
							var rnd = '?' + new Date().getTime() * Math.random();
							var script = document.createElement('script');
							var target = document.getElementsByTagName('script')[0];
							script.async = true;
							script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js'+rnd;
							target.parentNode.insertBefore(script, target);
						})();
					`,
				}}
			/>
			<ContactForm />
		</>
	)
}

export default VipPageClient
