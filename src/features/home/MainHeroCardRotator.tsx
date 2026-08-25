'use client'

import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MAIN_HERO_ROTATE_INTERVAL_MS } from './mainHeroConfig'
import styles from './MainHeroCardRotator.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MainHeroCardSlide = {
	id: string
	label: string
	card: ReactNode
}

export type MainHeroCardRotatorProps = {
	slides: MainHeroCardSlide[]
	ariaLabel?: string
}

export const MainHeroCardRotator: FC<MainHeroCardRotatorProps> = ({
	slides,
	ariaLabel = 'Карточки домашних матчей',
}) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const intervalRef = useRef<number | null>(null)
	const canRotate = slides.length > 1

	const clearRotation = useCallback(() => {
		if (intervalRef.current !== null) {
			window.clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [])

	useEffect(() => {
		setActiveIndex((prev) => {
			if (slides.length === 0) return 0
			return Math.min(prev, slides.length - 1)
		})
	}, [slides.length])

	useEffect(() => {
		clearRotation()

		if (!canRotate || isPaused) return

		intervalRef.current = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % slides.length)
		}, MAIN_HERO_ROTATE_INTERVAL_MS)

		return clearRotation
	}, [canRotate, isPaused, slides.length, clearRotation])

	if (slides.length === 0) return null

	if (!canRotate) {
		return <>{slides[0]!.card}</>
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
				aria-label={ariaLabel}
			>
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={cx(
							styles.slide,
							index !== activeIndex && styles.slideHidden,
						)}
						aria-hidden={index !== activeIndex}
					>
						{slide.card}
					</div>
				))}
			</div>

			<div className={styles.dots} role='tablist' aria-label='Выбор матча'>
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						type='button'
						role='tab'
						className={cx(
							styles.dot,
							index === activeIndex && styles.dotActive,
						)}
						aria-selected={index === activeIndex}
						aria-label={slide.label}
						onClick={() => setActiveIndex(index)}
					/>
				))}
			</div>
		</div>
	)
}
