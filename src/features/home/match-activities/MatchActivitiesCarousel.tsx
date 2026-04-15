'use client'

import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { MatchActivity } from '@/data/matchActivities'

import { MatchActivityCard } from './MatchActivityCard'
import styles from './MatchActivities.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SCROLL_EPS = 3

function slideIndexFromScroll(
	slides: HTMLElement[],
	scrollLeft: number,
): number {
	let idx = 0
	for (let i = 0; i < slides.length; i++) {
		if (slides[i].offsetLeft <= scrollLeft + SCROLL_EPS) idx = i
	}
	return idx
}

function readSlides(list: HTMLUListElement): HTMLElement[] {
	return [...list.querySelectorAll(':scope > li')] as HTMLElement[]
}

const CarouselChevron: FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
	const points =
		direction === 'left' ? '8,3.5 2,10 8,16.5' : '2,3.5 8,10 2,16.5'

	return (
		<svg
			className={styles.carouselNavIcon}
			width={10}
			height={20}
			viewBox="0 0 10 20"
			fill="none"
			aria-hidden
		>
			<polyline
				points={points}
				stroke="currentColor"
				strokeWidth={1.2}
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	)
}

export type MatchActivitiesCarouselProps = {
	activities: ReadonlyArray<MatchActivity>
	ariaLabelledBy: string
}

export const MatchActivitiesCarousel: FC<MatchActivitiesCarouselProps> = ({
	activities,
	ariaLabelledBy,
}) => {
	const viewportRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	/**
	 * Индекс для стрелок: не брать из scrollLeft во время smooth — иначе mid-scroll
	 * снова даёт 0 и второй «вперёд» не уходит со 2-й карточки.
	 */
	const navIndexRef = useRef(0)
	const [canPrev, setCanPrev] = useState(false)
	const [canNext, setCanNext] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

	const reconcileNavIndexFromScroll = useCallback(() => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list || activities.length === 0) return
		const slides = readSlides(list)
		if (slides.length === 0) return
		const idx = slideIndexFromScroll(slides, viewport.scrollLeft)
		navIndexRef.current = idx
		setActiveIndex(idx)
	}, [activities.length])

	const syncScrollChrome = useCallback(() => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list || activities.length === 0) return

		const { scrollLeft, scrollWidth, clientWidth } = viewport
		setCanPrev(scrollLeft > SCROLL_EPS)
		setCanNext(scrollLeft + clientWidth < scrollWidth - SCROLL_EPS)

		const slides = readSlides(list)
		if (slides.length === 0) return
		setActiveIndex(slideIndexFromScroll(slides, scrollLeft))
	}, [activities.length])

	useEffect(() => {
		const viewport = viewportRef.current
		if (!viewport) return

		reconcileNavIndexFromScroll()
		syncScrollChrome()

		const onScroll = () => syncScrollChrome()
		viewport.addEventListener('scroll', onScroll, { passive: true })

		const onScrollEnd = () => reconcileNavIndexFromScroll()
		viewport.addEventListener('scrollend', onScrollEnd)

		const ro = new ResizeObserver(() => {
			syncScrollChrome()
			reconcileNavIndexFromScroll()
		})
		ro.observe(viewport)
		const list = listRef.current
		if (list) ro.observe(list)

		return () => {
			viewport.removeEventListener('scroll', onScroll)
			viewport.removeEventListener('scrollend', onScrollEnd)
			ro.disconnect()
		}
	}, [reconcileNavIndexFromScroll, syncScrollChrome])

	const scrollByStride = useCallback((direction: -1 | 1) => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list) return
		const slides = readSlides(list)
		if (slides.length === 0) return
		const next = navIndexRef.current + direction
		if (next < 0 || next >= slides.length) return
		navIndexRef.current = next
		setActiveIndex(next)
		viewport.scrollTo({
			left: slides[next].offsetLeft,
			behavior: 'smooth',
		})
	}, [])

	const scrollToIndex = useCallback((index: number) => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list) return
		const slides = readSlides(list)
		const slide = slides[index]
		if (!slide) return
		navIndexRef.current = index
		setActiveIndex(index)
		viewport.scrollTo({
			left: slide.offsetLeft,
			behavior: 'smooth',
		})
	}, [])

	return (
		<div
			className={styles.carouselBlock}
			role="region"
			aria-roledescription="карусель"
			aria-labelledby={ariaLabelledBy}
		>
			<div ref={viewportRef} className={styles.carouselViewport}>
				<ul ref={listRef} className={styles.carouselList}>
					{activities.map((activity) => (
						<li key={activity.id} className={styles.carouselSlide}>
							<MatchActivityCard activity={activity} />
						</li>
					))}
				</ul>
			</div>
			<div className={styles.carouselChrome}>
				<button
					type="button"
					className={styles.carouselNavBtn}
					aria-label="Предыдущая активность"
					disabled={!canPrev}
					onClick={() => scrollByStride(-1)}
				>
					<CarouselChevron direction="left" />
				</button>
				<div className={styles.carouselDots} aria-label="Номер слайда">
					{activities.map((activity, i) => (
						<button
							key={activity.id}
							type="button"
							className={cx(
								styles.carouselDot,
								i === activeIndex && styles.carouselDotActive,
							)}
							aria-label={`Слайд ${i + 1} из ${activities.length}`}
							aria-current={i === activeIndex ? 'true' : undefined}
							onClick={() => scrollToIndex(i)}
						/>
					))}
				</div>
				<button
					type="button"
					className={styles.carouselNavBtn}
					aria-label="Следующая активность"
					disabled={!canNext}
					onClick={() => scrollByStride(1)}
				>
					<CarouselChevron direction="right" />
				</button>
			</div>
		</div>
	)
}
