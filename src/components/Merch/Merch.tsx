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
	{ id: 1, image: '/images/merch/optimized/merch-1.webp' },
	{ id: 2, image: '/images/merch/optimized/merch-2.webp' },
	{ id: 3, image: '/images/merch/optimized/merch-3.webp' },
	{ id: 4, image: '/images/merch/optimized/merch-4.webp' },
	{ id: 5, image: '/images/merch/optimized/merch-5.webp' },
	{ id: 6, image: '/images/merch/optimized/merch-6.webp' },
	{ id: 7, image: '/images/merch/optimized/merch-7.webp' },
	{ id: 8, image: '/images/merch/optimized/merch-8.webp' },
	{ id: 9, image: '/images/merch/optimized/merch-9.webp' },
	{ id: 10, image: '/images/merch/optimized/merch-10.webp' },
	{ id: 11, image: '/images/merch/optimized/merch-11.webp' },
	{ id: 12, image: '/images/merch/optimized/merch-12.webp' },
	{ id: 13, image: '/images/merch/optimized/merch-13.webp' },
	{ id: 14, image: '/images/merch/optimized/merch-14.webp' },
	{ id: 15, image: '/images/merch/optimized/merch-15.webp' },
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
			// Определяем, является ли устройство мобильным
			const mobile = window.innerWidth <= 768

			// Выбираем случайные элементы из массива
			const shuffled = [...items].sort(() => Math.random() - 0.5)
			// Выбираем 5 элементов для десктопа и 3 для мобильных устройств
			const selectedItems = shuffled.slice(0, mobile ? 3 : 5)
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
