'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CarouselNavChevron } from '@/components/CarouselNavChevron'
import { seasonTicketImages } from '@/data/seasonTickets'

import styles from './MainSeasonTicketsCard.module.scss'

const SCROLL_EPS = 3

const IMAGE_SIZES =
	'(min-width: 1920px) 444px, (min-width: 1280px) 365px, (min-width: 1024px) 301px, (min-width: 767px) 274px, min(320px, calc(100vw - 40px))'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function slideIndexFromScroll(
	viewport: HTMLElement,
	slides: HTMLElement[],
): number {
	if (slides.length === 0) return 0

	const { scrollLeft, scrollWidth, clientWidth } = viewport

	if (scrollLeft <= SCROLL_EPS) return 0

	if (scrollLeft + clientWidth >= scrollWidth - SCROLL_EPS) {
		return slides.length - 1
	}

	const center = scrollLeft + clientWidth / 2
	let idx = 0

	for (let i = 0; i < slides.length; i++) {
		const slideCenter = slides[i].offsetLeft + slides[i].offsetWidth / 2
		if (slideCenter <= center + SCROLL_EPS) idx = i
	}

	return idx
}

function readSlides(list: HTMLUListElement): HTMLElement[] {
	return [...list.querySelectorAll(':scope > li')] as HTMLElement[]
}

export function SeasonTicketsHeroCarousel() {
	const viewportRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const [swipeHintVisible, setSwipeHintVisible] = useState(true)

	const syncActiveIndex = useCallback(() => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list) return

		const slides = readSlides(list)
		if (!slides.length) return

		const index = slideIndexFromScroll(viewport, slides)
		setActiveIndex(index)

		if (index > 0 || viewport.scrollLeft > SCROLL_EPS) {
			setSwipeHintVisible(false)
		}
	}, [])

	useEffect(() => {
		const viewport = viewportRef.current
		if (!viewport) return

		syncActiveIndex()

		const onScroll = () => syncActiveIndex()
		viewport.addEventListener('scroll', onScroll, { passive: true })

		const ro = new ResizeObserver(() => syncActiveIndex())
		ro.observe(viewport)
		const list = listRef.current
		if (list) ro.observe(list)

		return () => {
			viewport.removeEventListener('scroll', onScroll)
			ro.disconnect()
		}
	}, [syncActiveIndex])

	const scrollToIndex = (index: number) => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list) return

		const slides = readSlides(list)
		const slide = slides[index]
		if (!slide) return

		viewport.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
		setActiveIndex(index)
	}

	return (
		<figure className={styles.heroFigure}>
			<div
				ref={viewportRef}
				className={styles.heroViewport}
				aria-roledescription='карусель'
				aria-label='Галерея абонементов — листайте свайпом'
			>
				<ul ref={listRef} className={styles.heroTrack}>
					{seasonTicketImages.map((src, index) => (
						<li
							key={src}
							className={styles.heroSlide}
							aria-hidden={index !== activeIndex}
						>
							<Image
								src={src}
								alt={`Абонемент ${index + 1} — сезон 2026-2027`}
								width={960}
								height={1200}
								className={styles.heroImage}
								sizes={IMAGE_SIZES}
								priority={index === 0}
								loading={index === 0 ? undefined : 'lazy'}
								draggable={false}
							/>
						</li>
					))}
				</ul>
			</div>
			{swipeHintVisible && activeIndex === 0 ? (
				<div className={styles.heroSwipeHint} aria-hidden>
					<span className={styles.heroSwipeHintIcon}>
						<CarouselNavChevron
							direction='left'
							className={styles.heroSwipeChevron}
						/>
						<CarouselNavChevron
							direction='left'
							className={styles.heroSwipeChevron}
						/>
					</span>
				</div>
			) : null}
			<div
				className={styles.heroDots}
				role='tablist'
				aria-label='Индикатор слайдов'
			>
				{seasonTicketImages.map((src, index) => (
					<button
						key={src}
						type='button'
						role='tab'
						aria-selected={index === activeIndex}
						aria-label={`Слайд ${index + 1} из ${seasonTicketImages.length}`}
						className={cx(
							styles.heroDot,
							index === activeIndex && styles.heroDotActive,
						)}
						onClick={() => scrollToIndex(index)}
					/>
				))}
			</div>
		</figure>
	)
}
