'use client'

import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MAIN_HERO_ROTATE_INTERVAL_MS } from './mainHeroConfig'
import styles from './MainHeroCardRotator.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MainHeroSlide = 'seasonTickets' | 'match'

export type MainHeroCardRotatorProps = {
	showSeasonTickets: boolean
	seasonTicketsCard: ReactNode
	matchCard: ReactNode
}

export const MainHeroCardRotator: FC<MainHeroCardRotatorProps> = ({
	showSeasonTickets,
	seasonTicketsCard,
	matchCard,
}) => {
	const [activeSlide, setActiveSlide] = useState<MainHeroSlide>('seasonTickets')
	const [isPaused, setIsPaused] = useState(false)
	const intervalRef = useRef<number | null>(null)

	const clearRotation = useCallback(() => {
		if (intervalRef.current !== null) {
			window.clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [])

	useEffect(() => {
		if (!showSeasonTickets) {
			setActiveSlide('match')
			clearRotation()
			return
		}

		setActiveSlide('seasonTickets')
	}, [showSeasonTickets, clearRotation])

	useEffect(() => {
		clearRotation()

		if (!showSeasonTickets || isPaused) return

		intervalRef.current = window.setInterval(() => {
			setActiveSlide((prev) =>
				prev === 'seasonTickets' ? 'match' : 'seasonTickets',
			)
		}, MAIN_HERO_ROTATE_INTERVAL_MS)

		return clearRotation
	}, [showSeasonTickets, isPaused, clearRotation])

	const selectSlide = (slide: MainHeroSlide) => {
		setActiveSlide(slide)
	}

	return (
		<div
			className={styles.root}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocusCapture={() => setIsPaused(true)}
			onBlurCapture={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
					setIsPaused(false)
				}
			}}
		>
			<div
				className={styles.viewport}
				aria-live='polite'
				aria-atomic='true'
				aria-label='Карточки абонемента и ближайшего матча'
			>
				{showSeasonTickets ? (
					<div
						className={cx(
							styles.slide,
							activeSlide !== 'seasonTickets' && styles.slideHidden,
						)}
						aria-hidden={activeSlide !== 'seasonTickets'}
					>
						{seasonTicketsCard}
					</div>
				) : null}
				<div
					className={cx(
						styles.slide,
						showSeasonTickets &&
							activeSlide !== 'match' &&
							styles.slideHidden,
					)}
					aria-hidden={showSeasonTickets && activeSlide !== 'match'}
				>
					{matchCard}
				</div>
			</div>

			{showSeasonTickets ? (
				<div
					className={styles.dots}
					role='tablist'
					aria-label='Выбор карточки'
				>
					<button
						type='button'
						role='tab'
						className={cx(
							styles.dot,
							activeSlide === 'seasonTickets' && styles.dotActive,
						)}
						aria-selected={activeSlide === 'seasonTickets'}
						aria-label='Абонементы'
						onClick={() => selectSlide('seasonTickets')}
					/>
					<button
						type='button'
						role='tab'
						className={cx(
							styles.dot,
							activeSlide === 'match' && styles.dotActive,
						)}
						aria-selected={activeSlide === 'match'}
						aria-label='Ближайший домашний матч'
						onClick={() => selectSlide('match')}
					/>
				</div>
			) : null}
		</div>
	)
}
