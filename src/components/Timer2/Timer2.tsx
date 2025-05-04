'use client'

import React, { useEffect, useState } from 'react'
import styles from './Timer2.module.scss'

interface Timer2Props {
	priceIncreaseDates: {
		first: string
		second: string
	}
}

const Timer2: React.FC<Timer2Props> = ({ priceIncreaseDates }) => {
	const [isFirstPassed, setIsFirstPassed] = useState(false)
	const [isSecondPassed, setIsSecondPassed] = useState(false)

	useEffect(() => {
		const checkDates = () => {
			const now = new Date()
			const firstDate = new Date(priceIncreaseDates.first)
			const secondDate = new Date(priceIncreaseDates.second)

			setIsFirstPassed(now > firstDate)
			setIsSecondPassed(now > secondDate)
		}

		// Проверяем даты сразу при монтировании
		checkDates()

		// Обновляем каждый день в полночь
		const now = new Date()
		const tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		)
		const timeToMidnight = tomorrow.getTime() - now.getTime()

		const timer = setInterval(checkDates, timeToMidnight)

		return () => clearInterval(timer)
	}, [priceIncreaseDates])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
		})
	}

	return (
		<div className={styles.timer}>
			<div className={styles.datesContainer}>
				<span className={styles.title}>Повышение цен:</span>
				<span
					className={`${styles.date} ${isFirstPassed ? styles.passed : ''}`}
				>
					{formatDate(priceIncreaseDates.first)}
				</span>
				<span className={styles.separator}>|</span>
				<span
					className={`${styles.date} ${isSecondPassed ? styles.passed : ''}`}
				>
					{formatDate(priceIncreaseDates.second)}
				</span>
			</div>
		</div>
	)
}

export default Timer2
