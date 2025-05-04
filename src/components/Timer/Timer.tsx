'use client'

import React, { useEffect, useState } from 'react'
import styles from './Timer.module.scss'

interface TimerProps {
	priceIncreaseDate: string
}

const Timer: React.FC<TimerProps> = ({ priceIncreaseDate }) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference =
				new Date(priceIncreaseDate).getTime() - new Date().getTime()

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				})
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
			}
		}

		// Вычисляем время сразу при монтировании
		calculateTimeLeft()

		// Обновляем каждую секунду
		const timer = setInterval(calculateTimeLeft, 1000)

		// Очищаем интервал при размонтировании
		return () => clearInterval(timer)
	}, [priceIncreaseDate])

	return (
		<div className={styles.timer}>
			<div className={styles.title}>До повышения цен</div>
			<div className={styles.countdown}>
				<div className={styles.timeBlock}>
					<span className={styles.number}>{timeLeft.days}</span>
					<span className={styles.label}>дней</span>
				</div>
				<div className={styles.timeBlock}>
					<span className={styles.number}>{timeLeft.hours}</span>
					<span className={styles.label}>часов</span>
				</div>
				<div className={styles.timeBlock}>
					<span className={styles.number}>{timeLeft.minutes}</span>
					<span className={styles.label}>минут</span>
				</div>
				<div className={styles.timeBlock}>
					<span className={styles.number}>{timeLeft.seconds}</span>
					<span className={styles.label}>секунд</span>
				</div>
			</div>
		</div>
	)
}

export default Timer
