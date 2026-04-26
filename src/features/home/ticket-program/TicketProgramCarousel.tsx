'use client'

import type { FC } from 'react'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import { CarouselNavChevron } from '@/components/CarouselNavChevron'
import type { TicketProgramCard as TicketProgramCardData } from '@/data/ticketProgram'

import { TicketProgramCard } from './TicketProgramCard'
import styles from './TicketProgram.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SCROLL_EPS = 3

/** Как в MatchActivitiesCarousel: chrome при max-width 1023px. */
const CAROUSEL_CHROME_MQ = '(max-width: 1023px)'

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

export type TicketProgramCarouselProps = {
	cards: ReadonlyArray<TicketProgramCardData>
	ariaLabelledBy: string
}

export const TicketProgramCarousel: FC<TicketProgramCarouselProps> = ({
	cards,
	ariaLabelledBy,
}) => {
	const viewportRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	const navIndexRef = useRef(0)
	const [canPrev, setCanPrev] = useState(false)
	const [canNext, setCanNext] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const [showCarouselChrome, setShowCarouselChrome] = useState(true)

	useLayoutEffect(() => {
		const mq = window.matchMedia(CAROUSEL_CHROME_MQ)
		const apply = () => setShowCarouselChrome(mq.matches)
		apply()
		mq.addEventListener('change', apply)
		return () => mq.removeEventListener('change', apply)
	}, [])

	const reconcileNavIndexFromScroll = useCallback(() => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list || cards.length === 0) return
		const slides = readSlides(list)
		if (slides.length === 0) return
		const idx = slideIndexFromScroll(slides, viewport.scrollLeft)
		navIndexRef.current = idx
		setActiveIndex(idx)
	}, [cards.length])

	const syncScrollChrome = useCallback(() => {
		const viewport = viewportRef.current
		const list = listRef.current
		if (!viewport || !list || cards.length === 0) return

		const { scrollLeft, scrollWidth, clientWidth } = viewport
		setCanPrev(scrollLeft > SCROLL_EPS)
		setCanNext(scrollLeft + clientWidth < scrollWidth - SCROLL_EPS)

		const slides = readSlides(list)
		if (slides.length === 0) return
		setActiveIndex(slideIndexFromScroll(slides, scrollLeft))
	}, [cards.length])

	useEffect(() => {
		if (!showCarouselChrome) return
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
	}, [showCarouselChrome, reconcileNavIndexFromScroll, syncScrollChrome])

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
			aria-roledescription={
				showCarouselChrome ? 'карусель' : undefined
			}
			aria-labelledby={ariaLabelledBy}
		>
			<div ref={viewportRef} className={styles.carouselViewport}>
				<ul ref={listRef} className={styles.carouselList}>
					{cards.map((card) => (
						<li key={card.id} className={styles.carouselSlide}>
							<TicketProgramCard card={card} />
						</li>
					))}
				</ul>
			</div>
			{showCarouselChrome ? (
				<div className={styles.carouselChrome}>
					<button
						type="button"
						className={styles.carouselNavBtn}
						aria-label="Предыдущая карточка билетной программы"
						disabled={!canPrev}
						onClick={() => scrollByStride(-1)}
					>
						<CarouselNavChevron
							direction="left"
							className={styles.carouselNavIcon}
						/>
					</button>
					<div className={styles.carouselDots} aria-label="Номер слайда">
						{cards.map((card, i) => (
							<button
								key={card.id}
								type="button"
								className={cx(
									styles.carouselDot,
									i === activeIndex && styles.carouselDotActive,
								)}
								aria-label={`Слайд ${i + 1} из ${cards.length}`}
								aria-current={i === activeIndex ? 'true' : undefined}
								onClick={() => scrollToIndex(i)}
							/>
						))}
					</div>
					<button
						type="button"
						className={styles.carouselNavBtn}
						aria-label="Следующая карточка билетной программы"
						disabled={!canNext}
						onClick={() => scrollByStride(1)}
					>
						<CarouselNavChevron
							direction="right"
							className={styles.carouselNavIcon}
						/>
					</button>
				</div>
			) : null}
		</div>
	)
}
