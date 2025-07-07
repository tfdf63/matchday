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
			<CardInfo card={cardData} />
			<ContactForm email='ticket@fcakron.ru' />
		</>
	)
}

export default BusinessClubPage
