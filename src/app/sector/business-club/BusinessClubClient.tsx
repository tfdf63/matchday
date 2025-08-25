'use client'

import React from 'react'
import CardInfo from '@/components/CardInfo/CardInfo'
import { subscriptionCards } from '@/data/subscriptions'

const BusinessClubClient: React.FC = () => {
	// Находим данные для бизнес-клуба
	const businessClubCard = subscriptionCards.find(card => card.id === 1)

	// Данные для CardInfo компонента
	const cardData = {
		id: 1,
		title: 'VIP',
		subtitle: 'Место, где рождается история матча!',
		sectors: subscriptionCards, // Все доступные сектора
		gallery: ['/images/sector/gallery/premium.png'],
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
			{
				benefit: 'Эксклюзивные впечатления',
				description:
					'– Участие в программе «Акрон on Air» и встречах с гостями трансляций\n– Автограф-сессии с игроками',
			},
			{
				benefit: 'Кто ценит удобство и атмосферу',
				description:
					'– Отдельная зона с комфортными местами и продуманной навигацией\n– Быстрый доступ к трибунам без очередей',
			},
			{
				benefit: 'Бизнес-формат отдыха',
				description:
					'– Зоны активности для общения и нетворкинга\n– Все условия для работы: Wi-Fi, удобные зоны переговоров',
			},
			{
				benefit: 'Семейный комфорт',
				description:
					'– Детская игровая зона – пока вы болеете, дети развлекаются\n– Удобный подъем на лифте и место для колясок',
			},
			{
				benefit: 'Всё под рукой',
				description:
					'– Кафе и точки питания в шаговой доступности\n– Магазин клубной атрибутики прямо на секторе',
			},
			{
				benefit: 'Безопасность и сервис',
				description:
					'– Пункты первой помощи и дежурные медики\n– Стюарды на каждом уровне – помогут с любой информацией',
			},
		],
		subsectors: ['A105', 'A106', 'A107'],
		tariffs: [
			{
				sector: 'А106',
				price1: '34 990 ₽',
				price2: '39 990 ₽',
				price3: '43 890 ₽',
			},
			{
				sector: 'А105',
				price1: '32 990 ₽',
				price2: '34 990 ₽',
				price3: '41 490 ₽',
			},
			{
				sector: 'А107',
				price1: '32 990 ₽',
				price2: '34 990 ₽',
				price3: '41 490 ₽',
			},
		],
		stadiumSchema: '/images/sector/shema-stadium/schema-business.png',
		buyButton: 'https://tickets.example.com/business-club',
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

			{/* Виджет Яндекс.Билетов */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
						/* Настройка */
						var dealerName = 'YandexTicketsDealer';
						var dealer = window[dealerName] = window[dealerName] || [];

						dealer.push(['setDefaultClientKey', '0046af24-2980-419c-bf99-c4d864c693e3']);
						dealer.push(['setDefaultRegionId', 51]);

						YandexTicketsDealer.push(['getDealer', function (dealer) {
							const widget = dealer.Widget('85000', 'venue', {
								target: document.getElementById('ya-widget-frame'),
								onRequestClose: function() {
									widget.unmount();
									widget.destroy();
								},
							});

							widget.mount({ style: { height: '700px' } });
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
		</>
	)
}

export default BusinessClubClient
