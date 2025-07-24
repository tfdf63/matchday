'use client'

import React from 'react'
import Image from 'next/image'
import styles from './Stadium.module.scss'

const thumbnails = [
	{
		id: 2,
		image: 'Stadium2.webp',
		title: 'Схема парковок и входов',
	},
	{
		id: 1,
		image: 'Stadium4.webp',
		title: 'Остановки общественного транспорта',
	},
	{
		id: 3,
		image: 'Stadium.webp',
		title: 'Схема прохода к теплой зоне',
	},
	{
		id: 4,
		image: 'Stadium7.webp',
		title: 'Наполнение теплой зоны',
	},
	{
		id: 5,
		image: 'Stadium6.webp',
		title: 'Наполнение теплой зоны',
	},
	{
		id: 6,
		image: 'Stadium5.webp',
		title: 'Схема прохода к теплой зоне',
	},
]

const Stadium: React.FC = () => {
	return (
		<div className={styles.stadiumNewContainer}>
			<div className={styles.backgroundWrapper}>
				<Image
					src={'/images/optimized/stadium/Stadium32.webp'}
					alt='Стадион Самара Солидарность Арена'
					fill
					className={styles.backgroundImage}
					priority
				/>
				<h2 className={styles.titleOnImage}>
					<span>Стадион Чемпионата Мира 2018</span>
					<span className={styles.city}>Самара</span>
				</h2>
			</div>
			<div className={styles.thumbsGrid}>
				{thumbnails.map(thumb => (
					<div className={styles.thumbCell} key={thumb.id}>
						<Image
							src={`/images/optimized/stadium/${thumb.image}`}
							alt={thumb.title}
							fill
							className={styles.thumbImage}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Stadium
