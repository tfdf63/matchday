'use client'

import React from 'react'
import styles from './PricingTables.module.scss'

// Данные для таблицы цен
const pricingData = [
	{
		sectorName: 'Центральный',
		sectorCode: 'C121',
		price1: '12 490 ₽',
		price2: '17 990 ₽',
		price3: '21 550 ₽',
	},
	{
		sectorName: 'Игровая панорама',
		sectorCode: 'C122-120',
		price1: '9 990 ₽',
		price2: '12 990 ₽',
		price3: '15 990 ₽',
	},
	{
		sectorName: 'Стратегический',
		sectorCode: 'C123-119',
		price1: '7 990 ₽',
		price2: '10 990 ₽',
		price3: '13 990 ₽',
	},
	{
		sectorName: 'Семейный',
		sectorCode: 'C124-118',
		price1: '5 990 ₽',
		price2: '8 990 ₽',
		price3: '10 990 ₽',
	},
	{
		sectorName: 'Угловой',
		sectorCode: 'C125-117',
		price1: '4 990 ₽',
		price2: '6 990 ₽',
		price3: '8 990 ₽',
	},
	{
		sectorName: 'Развлекательный',
		sectorCode: 'C413-417',
		price1: '17 490 ₽',
		price2: '20 990 ₽',
		price3: '24 990 ₽',
	},
	{
		sectorName: 'Бизнес-клуб',
		sectorCode: 'А105-107',
		price1: '32 990 ₽',
		price2: '39 990 ₽',
		price3: '43 890 ₽',
	},
	{
		sectorName: 'За скамейкой',
		sectorCode: 'А104-108',
		price1: '16 990 ₽',
		price2: '18 990 ₽',
		price3: '22 890 ₽',
	},
	{
		sectorName: 'За воротами',
		sectorCode: 'D116-112',
		price1: '4 490 ₽',
		price2: '5 990 ₽',
		price3: '7 990 ₽',
	},
	{
		sectorName: 'Фанатский',
		sectorCode: 'D114*',
		price1: '4 490 ₽',
		price2: '4 990 ₽',
		price3: '5 990 ₽',
	},
]

// Данные для таблицы выгоды
const benefitsData = [
	{
		benefit: 'Больше матчей',
		description: '3 матча группового этапа Fonbet Кубка России в подарок',
	},
	{
		benefit: 'Выгоднее, чем разовые билеты',
		description: 'Скидка 20–40% в зависимости от сектора',
	},
	{
		benefit: 'Ваши любимые места',
		description: 'Закрепите за собой лучшие кресла на весь сезон',
	},
	{
		benefit: 'Больше никакой рутины',
		description: 'Забудьте о покупке билетов перед каждой игрой',
	},
	{
		benefit: 'Приводите детей – для них особые условия!',
		description: 'Детский абонемент (7–14 лет) со скидкой 25–50%',
	},
	{
		benefit: 'Билет не пропадёт!',
		description:
			'Если не сможете прийти – просто передайте билет друзьям или родным',
	},
]

const PricingTables: React.FC = () => {
	return (
		<div className={styles.pricingTables}>
			{/* Таблица с ценами */}
			<div className={styles.pricingSection}>
				<h2 className={styles.sectionTitle}>Цены на абонементы</h2>
				<div className={styles.pricingTable}>
					{/* Десктопная версия */}
					<table className={`${styles.table} ${styles.desktopTable}`}>
						<thead>
							<tr>
								<th>Сектор</th>
								<th>До 06.07</th>
								<th>07-13.07</th>
								<th>После 13.07</th>
							</tr>
						</thead>
						<tbody>
							{pricingData.map((item, index) => (
								<tr key={index}>
									<td>
										{item.sectorName && (
											<div className={styles.sectorName}>{item.sectorName}</div>
										)}
										<div className={styles.sectorCode}>{item.sectorCode}</div>
									</td>
									<td>{item.price1}</td>
									<td>{item.price2}</td>
									<td>{item.price3}</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Мобильная версия */}
					<div className={styles.mobileTable}>
						<div className={styles.mobileHeaders}>
							<div className={styles.mobileHeader}>До 06.07</div>
							<div className={styles.mobileHeader}>07-13.07</div>
							<div className={styles.mobileHeader}>После 13.07</div>
						</div>
						{pricingData.map((item, index) => (
							<div
								key={index}
								className={`${styles.mobileRow} ${
									item.sectorName === 'Бизнес-клуб'
										? styles.businessClub
										: styles.regularSector
								}`}
							>
								<div className={styles.mobileSector}>
									{item.sectorName && (
										<div className={styles.mobileSectorName}>
											{item.sectorName}
										</div>
									)}
									<div className={styles.mobileSectorCode}>
										{item.sectorCode}
									</div>
								</div>
								<div className={styles.mobilePrices}>
									<div className={styles.mobilePrice}>{item.price1}</div>
									<div className={styles.mobilePrice}>{item.price2}</div>
									<div className={styles.mobilePrice}>{item.price3}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Таблица с выгодой */}
			<div className={styles.benefitsSection}>
				<h2 className={styles.sectionTitle}>Ваши преимущества</h2>
				<div className={styles.benefitsList}>
					<ul className={styles.servicesList}>
						{benefitsData.map((item, index) => (
							<li key={index} className={styles.serviceItem}>
								<strong>{item.benefit}</strong>
								<div className={styles.benefitDescription}>
									{item.description}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default PricingTables
