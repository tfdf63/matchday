'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Slider.module.scss'

interface SlideItem {
	id: number
	image: string
	description: string
}

interface SliderProps {
	items?: SlideItem[]
	className?: string
}

const defaultItems: SlideItem[] = [
	{
		id: 1,
		image: `/images/slider1.jpg`,
		description: 'Яркий аквагримм',
	},
	{
		id: 2,
		image: `/images/slider2.jpg`,
		description: 'Настольный футбол',
	},
	{
		id: 3,
		image: `/images/slider3.jpg`,
		description: 'Сидячий футбол',
	},
	{
		id: 4,
		image: `/images/slider4.jpg`,
		description: 'DJ и музыка',
	},
	{
		id: 5,
		image: `/images/slider5.jpg`,
		description: 'Сыграй в приставку PS5',
	},
	{
		id: 6,
		image: `/images/slider6.jpg`,
		description: 'Мягкая детская площадка',
	},
	{
		id: 7,
		image: `/images/slider7.jpg`,
		description: 'Лектории и мастер-классы',
	},
	{
		id: 8,
		image: `/images/slider8.jpg`,
		description: 'Встреча с маскотом',
	},
	{
		id: 9,
		image: `/images/slider9.jpg`,
		description: 'Энергичные ведущие',
	},
	{
		id: 10,
		image: `/images/slider10.jpg`,
		description: 'Настольный теннис',
	},
	{
		id: 11,
		image: `/images/slider11.jpg`,
		description: 'Магазин атрибутики',
	},
	{
		id: 12,
		image: `/images/slider12.jpg`,
		description: 'Площадки от партнёров',
	},
	{
		id: 13,
		image: `/images/slider13.jpg`,
		description: 'Автограф сессии с игроком',
	},
	{
		id: 14,
		image: `/images/slider14.jpg`,
		description: 'Посети тёплую зону',
	},
	{
		id: 15,
		image: `/images/slider15.jpg`,
		description: 'Нарисуй плакат поддержки',
	},
]

const MOBILE_BREAKPOINT = 768
const MOBILE_DURATION = 30
const DESKTOP_DURATION = 30

const Slider: React.FC<SliderProps> = ({
	items = defaultItems,
	className = '',
}) => {
	const [animationDuration, setAnimationDuration] = useState(DESKTOP_DURATION)
	const [displayItems, setDisplayItems] = useState<
		(SlideItem & { uniqueId: string })[]
	>([])

	useEffect(() => {
		// Генерируем случайные элементы только на клиенте
		const randomItems = [...items].sort(() => Math.random() - 0.5).slice(0, 7)

		const tripleItems = [...randomItems, ...randomItems, ...randomItems].map(
			(item, index) => ({
				...item,
				uniqueId: `slide-${item.id}-${index}`,
			})
		)

		setDisplayItems(tripleItems)
	}, [items])

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
			setAnimationDuration(isMobile ? MOBILE_DURATION : DESKTOP_DURATION)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Показываем пустой контейнер, пока не сгенерированы элементы
	if (displayItems.length === 0) {
		return <div className={styles.sliderContainer} />
	}

	return (
		<div
			className={`${styles.sliderContainer} ${className}`}
			style={{ '--duration': `${animationDuration}s` } as React.CSSProperties}
		>
			<div className={styles.slider}>
				{displayItems.map(item => (
					<div key={item.uniqueId} className={styles.slide}>
						<div className={styles.imageWrapper}>
							<Image
								src={item.image}
								alt={item.description}
								width={200}
								height={200}
								className={styles.image}
								priority={true}
							/>
						</div>
						<p className={styles.description}>{item.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Slider
