'use client'

import React, { useState, useEffect } from 'react'
import styles from './Timer.module.scss'

interface TimerProps {
	targetDate: string // Дата в формате '2024-12-31T23:59:59'
	className?: string
}

const Timer: React.FC<TimerProps> = ({ targetDate, className = '' }) => {
	const [timeLeft, setTimeLeft] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const calculateTimeLeft = () => {
			// Получаем текущее время
			const now = new Date()

			// Парсим целевую дату (уже в локальном времени)
			const target = new Date(targetDate)

			const difference = target.getTime() - now.getTime()

			if (difference > 0) {
				const hours = Math.floor(difference / (1000 * 60 * 60))
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				)
				const seconds = Math.floor((difference % (1000 * 60)) / 1000)

				setTimeLeft({ hours, minutes, seconds })
			} else {
				setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
			}
		}

		calculateTimeLeft()
		const timer = setInterval(calculateTimeLeft, 1000)

		return () => clearInterval(timer)
	}, [targetDate])

	const formatTime = (time: number) => {
		return time.toString().padStart(2, '0')
	}

	return (
		<div className={`${styles.timer} ${className}`}>
			<span className={styles.timerText}>до повышения цен осталось:</span>
			<span className={styles.timerValue} suppressHydrationWarning>
				{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
				{formatTime(timeLeft.seconds)}
			</span>
		</div>
	)
}

export default Timer
