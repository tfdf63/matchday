'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './FanCard.module.scss'

const FanCard = () => {
	const [activeTab, setActiveTab] = useState(0)

	const steps = [
		{
			id: 1,
			title: 'Оформление карты',
			description:
				'Карта болельщика необходима всем посетителям матча, включая детей. Для лиц младше 14 лет карту оформляют родители.',
			icon: '/images/fan-card-1.svg',
			details: [
				'Если хотите посетить матч вместе с ребенком до 14 лет, то вам необходимо оформить её в своём личном кабинете на портале «Госуслуг». Для этого при заполнении заявления нужно указать данные и загрузить фото ребенка.',
				'Чтобы подтвердить данные, обратитесь в удобный вам МФЦ. Возьмите с собой оригиналы паспорта и свидетельства о рождении. Если вы оформляете карту как представитель, вам также понадобится нотариальная доверенность.',
				'Ребенку старше 14 лет необходимо зарегистрироваться на портале «Госуслуг» и самостоятельно оформить карту болельщика.',
			],
		},
		{
			id: 2,
			title: 'Подтверждение личности',
			description:
				'Подтвердите личность одним из удобных способов: в МФЦ или дистанционно по загранпаспорту нового образца.',
			icon: '/images/fan-card-2.svg',
			details: [
				'Посетите любой МФЦ с паспортом или подтвердите через загранпаспорт',
				'Могу ли я оформить карту болельщика на стадионе в день матча?',
				'Да, рядом со входом №3 расположен мобильный МФЦ, который открывается за 3 часа до матча. Там можно подтвердить личность при наличии паспорта и оформить карту болельщика.',
			],
		},
		{
			id: 3,
			title: 'Передача билетов',
			description: 'Через портал «Госуслуги»',
			icon: '/images/fan-card-3.svg',
			details: [
				'Перейдите в раздел Карта болельщика → Билеты → Выберите билет → Сменить владельца, введите данные нового владельца: номер карты болельщика.',
				'Проверьте инициалы человека, которому передаёте билет. Если всё верно, нажмите «Назначить владельцем». В личном кабинете нового владельца после передачи билета будет сформирован QR-код, который надо предъявить при входе на стадион.',
				'Что делать, если на стадионе не сработал QR-код входного билета с «Госуслуг»?',
				'В дни матчей на «Солидарность Самара Арене» работают центры обслуживания болельщиков. В случае возникновения проблемы со входом сотрудники стадиона помогут разобраться обладателям билетов и абонементов, если у вас оформлена карта болельщика.',
			],
		},
		{
			id: 4,
			title: 'Мобильное приложение',
			description:
				'Используйте приложение "Карта болельщика" для управления билетами и быстрого входа на стадион.',
			icon: '/images/fan-card-4.svg',
			details: [
				'Скачайте приложение',
				'Войдите через Госуслуги',
				'Управляйте билетами',
				'Используйте QR-код для входа',
			],
		},
	]

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Карта болельщика</h2>

			{/* Мобильные табы */}
			<div className={styles.tabs}>
				{steps.map((step, index) => (
					<button
						key={step.id}
						className={`${styles.tab} ${
							activeTab === index ? styles.active : ''
						}`}
						onClick={() => setActiveTab(index)}
					>
						{step.title}
					</button>
				))}
			</div>

			{/* Контент */}
			<div className={styles.content}>
				<div className={styles.step}>
					<div className={styles.stepHeader}>
						<Image
							src={steps[activeTab].icon}
							alt={steps[activeTab].title}
							width={64}
							height={64}
							className={styles.stepIcon}
						/>
						<h3 className={styles.stepTitle}>{steps[activeTab].title}</h3>
					</div>
					<p className={styles.stepDescription}>
						{steps[activeTab].description}
					</p>
					<ul className={styles.stepList}>
						{steps[activeTab].details.map((detail, index) => (
							<li key={index} className={styles.stepItem}>
								{detail}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Индикатор прогресса для мобильных */}
			<div className={styles.progress}>
				{steps.map((_, index) => (
					<div
						key={index}
						className={`${styles.progressDot} ${
							activeTab === index ? styles.active : ''
						}`}
					/>
				))}
			</div>
		</div>
	)
}

export default FanCard
