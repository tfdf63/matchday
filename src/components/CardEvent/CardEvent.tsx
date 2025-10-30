'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Card from '@/components/ui/Card/Card'
import { events, Event } from '@/data/events'
import styles from './CardEvent.module.scss'

// Функция для получения случайных элементов из массива
const getRandomEvents = (arr: Event[], count: number): Event[] => {
	// Создаем копию массива, чтобы не изменять оригинал
	const shuffled = [...arr].sort(() => Math.random() - 0.5)
	// Возвращаем первые count элементов
	return shuffled.slice(0, count)
}

const CardEvent: React.FC = () => {
	const [isClient, setIsClient] = useState(false)
	
	// На сервере показываем первые 6 элементов без перемешивания
	// На клиенте после гидратации показываем случайные
	const randomEvents = useMemo(() => {
		if (!isClient) {
			return events.slice(0, 6)
		}
		return getRandomEvents(events, 6)
	}, [isClient])
	
	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<section className={styles.cardEventSection}>
			<div className={styles.container}>
				<div className={styles.cardsGrid}>
					{randomEvents.map(event => (
						<Card
							key={event.id}
							image={event.image}
							title={event.title}
							imageAlt={event.title}
							className={styles.eventCard}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default CardEvent
