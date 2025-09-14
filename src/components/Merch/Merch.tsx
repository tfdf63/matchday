'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Merch.module.scss'
import { MerchItem, merchItems } from '../../data/merch'

interface MerchProps {
	items?: MerchItem[]
	buttonText?: string
	buttonLink?: string
	className?: string
}

const Merch: React.FC<MerchProps> = ({
	items = merchItems,
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
					<a
						key={item.id}
						href={item.url}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.imageContainer}
					>
						<Image
							src={item.image}
							alt={`Merchandise item ${item.id}`}
							width={300}
							height={400}
							className={styles.image}
						/>
					</a>
				))}
			</div>
		</div>
	)
}

export default Merch
