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
	// {
	// 	id: 1,
	// 	image: 'schema-1.webp',
	// 	title: 'Схема прохода к теплой зоне',
	// },
	// {
	// 	id: 2,
	// 	image: 'schema-2.webp',
	// 	title: 'Наполнение теплой зоны',
	// },
	{
		id: 3,
		image: 'schema-3.webp',
		title: 'Схема парковок и входов',
	},
	{
		id: 4,
		image: 'schema-4.webp',
		title: 'Остановки общественного транспорта',
	},
]

const Stadium: React.FC<StadiumProps> = ({ className = '' }) => {
	const [activeSchema, setActiveSchema] = useState<SchemaImage>(
		stadiumSchemas[0]
	)

	return (
		<div className={`${styles.stadiumContainer} ${className}`}>
			<h2 className={styles.title}>Самара Солидарность Арена</h2>

			<div className={styles.schemaContainer}>
				<div className={styles.mainSchema}>
					<Image
						src={`/images/optimized/stadium/${activeSchema.image}`}
						alt={activeSchema.title}
						width={600}
						height={400}
						className={styles.mainSchemaImage}
					/>
					<p className={styles.schemaTitle}>{activeSchema.title}</p>
				</div>

				<div className={styles.thumbnails}>
					{stadiumSchemas.map((schema, index) => (
						<div
							key={schema.id}
							className={`${styles.thumbnail} ${
								activeSchema.id === schema.id ? styles.active : ''
							}`}
							onClick={() => setActiveSchema(schema)}
						>
							<Image
								src={`/images/optimized/stadium/${schema.image}`}
								alt={`Схема стадиона ${index + 1}`}
								width={120}
								height={80}
								className={styles.thumbnailImage}
							/>
						</div>
					))}
					<div className={styles.info}>
						<p className={styles.infoText}>
							Стадион «Самара Солидарность Арена» — современный футбольный
							стадион, построенный к Чемпионату мира по футболу 2018 года.
							Вместимость арены составляет 44 918 зрителей. На стадионе
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
