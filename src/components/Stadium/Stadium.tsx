'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Stadium.module.scss'

interface SchemaImage {
	id: number
	image: string
	title: string
}

interface StadiumProps {
	className?: string
}

// Массив схем стадиона
const stadiumSchemas: SchemaImage[] = [
	{
		id: 1,
		image: '/images/stadium/schema-1.jpg',
		title: 'Схема прохода к теплой зоне',
	},
	// {
	// 	id: 2,
	// 	image: '/images/stadium/schema-2.jpg',
	// 	title: 'Наполнение теплой зоны',
	// },
	{
		id: 3,
		image: '/images/stadium/schema-3.jpg',
		title: 'Схема парковок и Gate',
	},
	{
		id: 4,
		image: '/images/stadium/schema-4.jpg',
		title: 'Схема остановок транспорта',
	},
]

const Stadium: React.FC<StadiumProps> = ({ className = '' }) => {
	const [activeSchema, setActiveSchema] = useState<SchemaImage>(
		stadiumSchemas[0]
	)

	return (
		<div className={`${styles.stadiumContainer} ${className}`}>
			<h2 className={styles.title}>Солидарность Самара Арена</h2>

			<div className={styles.schemaContainer}>
				<div className={styles.mainSchema}>
					<Image
						src={activeSchema.image}
						alt={activeSchema.title}
						width={300}
						height={200}
						className={styles.mainSchemaImage}
					/>
					<p className={styles.schemaTitle}>{activeSchema.title}</p>
				</div>

				<div className={styles.thumbnails}>
					{stadiumSchemas.map(schema => (
						<div
							key={schema.id}
							className={`${styles.thumbnail} ${
								activeSchema.id === schema.id ? styles.active : ''
							}`}
							onClick={() => setActiveSchema(schema)}
						>
							<Image
								src={schema.image}
								alt={schema.title}
								width={150}
								height={200}
								className={styles.thumbnailImage}
							/>
						</div>
					))}
					<div className={styles.info}>
						<p className={styles.infoText}>
							Стадион &ldquo;Солидарность Самара Арена&rdquo; — современный
							футбольный стадион, построенный к Чемпионату мира по футболу 2018
							года. Вместимость арены составляет 44 918 зрителей. На стадионе
							предусмотрены комфортные зоны для болельщиков, современные системы
							безопасности и прекрасный обзор поля с любого места.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Stadium
