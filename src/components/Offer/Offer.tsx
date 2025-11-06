'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Offer.module.scss'

export interface OfferItem {
	text: string
	highlight?: boolean // Для выделения особо важных предложений
}

interface OfferProps {
	items: OfferItem[]
	title?: string
	href?: string // Ссылка для перехода при клике
}

const Offer: React.FC<OfferProps> = ({ items, href }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		if (items.length === 0) return

		const interval = setInterval(() => {
			// Сначала скрываем текущий элемент
			setIsVisible(false)

			// После анимации исчезновения переключаем на следующий элемент
			setTimeout(() => {
				setCurrentIndex(prevIndex => (prevIndex + 1) % items.length)
				setIsVisible(true)
			}, 500) // Время анимации исчезновения
		}, 3000) // Интервал 1.5 секунды

		return () => clearInterval(interval)
	}, [items.length])

	if (items.length === 0) return null

	const currentItem = items[currentIndex]

	const content = (
		<div className={styles.offer}>
			<div className={styles.offerContainer}>
				<div className={styles.offerItems}>
					<div
						className={`${styles.offerItem} ${
							currentItem.highlight ? styles.offerItemHighlight : ''
						} ${isVisible ? styles.offerItemVisible : styles.offerItemHidden}`}
					>
						<div className={styles.offerItemContent}>
							<span className={styles.offerItemText}>{currentItem.text}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	if (href) {
		return (
			<Link href={href} className={styles.offerLink}>
				{content}
			</Link>
		)
	}

	return content
}

export default Offer
