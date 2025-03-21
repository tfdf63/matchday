'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Merch.module.scss'

interface MerchItem {
	id: number
	image: string
}

interface MerchProps {
	items?: MerchItem[]
	buttonText?: string
	buttonLink?: string
	className?: string
}

// Массив товаров по умолчанию
const defaultItems: MerchItem[] = [
	{ id: 1, image: '/images/merch/merch-1.jpg' },
	{ id: 2, image: '/images/merch/merch-2.jpg' },
	{ id: 3, image: '/images/merch/merch-3.jpg' },
	{ id: 4, image: '/images/merch/merch-4.jpg' },
	{ id: 5, image: '/images/merch/merch-5.jpg' },
	{ id: 6, image: '/images/merch/merch-6.jpg' },
	{ id: 7, image: '/images/merch/merch-7.jpg' },
	{ id: 8, image: '/images/merch/merch-8.jpg' },
	{ id: 9, image: '/images/merch/merch-9.jpg' },
	{ id: 10, image: '/images/merch/merch-10.jpg' },
	{ id: 11, image: '/images/merch/merch-11.jpg' },
	{ id: 12, image: '/images/merch/merch-12.jpg' },
	{ id: 13, image: '/images/merch/merch-13.jpg' },
	{ id: 14, image: '/images/merch/merch-14.jpg' },
	{ id: 15, image: '/images/merch/merch-15.jpg' },
]

const Merch: React.FC<MerchProps> = ({
	items = defaultItems,
	buttonText = 'Купить атрибутику',
	buttonLink = 'https://shop.fcakron.ru/',
	className = '',
}) => {
	const [displayItems, setDisplayItems] = useState<MerchItem[]>([])

	// Определение количества отображаемых элементов в зависимости от размера экрана
	useEffect(() => {
		const handleResize = () => {
			// Выбираем случайные элементы из массива
			const shuffled = [...items].sort(() => Math.random() - 0.5)
			const selectedItems = shuffled.slice(0, 5)
			setDisplayItems(selectedItems)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [items])

	return (
		<div className={`${styles.merchContainer} ${className}`}>
			<div className={styles.gallery}>
				{displayItems.map(item => (
					<div key={item.id} className={styles.imageContainer}>
						<Image
							src={item.image}
							alt={`Merchandise item ${item.id}`}
							width={300}
							height={400}
							className={styles.image}
						/>
					</div>
				))}
			</div>
			<div className={styles.buttonWrapper}>
				<a href={buttonLink} className={styles.button}>
					{buttonText}
				</a>
			</div>
		</div>
	)
}

export default Merch
