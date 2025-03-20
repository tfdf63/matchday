import React, { useMemo } from 'react'
import Image from 'next/image'
import styles from './Slider.module.scss'

interface SlideItem {
	id: number
	image: string
	description: string
}

interface SliderProps {
	items?: SlideItem[]
	duration?: number // в секундах
	className?: string
}

const defaultItems: SlideItem[] = [
	{
		id: 1,
		image: `/images/slider1.jpg`,
		description: 'Описание 1',
	},
	{
		id: 2,
		image: `/images/slider2.jpg`,
		description: 'Описание 2',
	},
	{
		id: 3,
		image: `/images/slider3.jpg`,
		description: 'Описание 3',
	},
	{
		id: 4,
		image: `/images/slider4.jpg`,
		description: 'Описание 4',
	},
	{
		id: 6,
		image: `/images/slider5.jpg`,
		description: 'Описание 5',
	},
	{
		id: 7,
		image: `/images/slider1.jpg`,
		description: 'Описание 6',
	},
	{
		id: 8,
		image: `/images/slider2.jpg`,
		description: 'Описание 7',
	},
	{
		id: 9,
		image: `/images/slider3.jpg`,
		description: 'Описание 8',
	},
	{
		id: 10,
		image: `/images/slider4.jpg`,
		description: 'Описание 9',
	},
	{
		id: 11,
		image: `/images/slider5.jpg`,
		description: 'Описание 10',
	},
	{
		id: 12,
		image: `/images/slider1.jpg`,
		description: 'Описание 11',
	},
	{
		id: 13,
		image: `/images/slider2.jpg`,
		description: 'Описание 12',
	},
	{
		id: 14,
		image: `/images/slider3.jpg`,
		description: 'Описание 13',
	},
	{
		id: 15,
		image: `/images/slider4.jpg`,
		description: 'Описание 14',
	},
	{
		id: 5,
		image: `/images/slider5.jpg`,
		description: 'Описание 15',
	},
]

// Функция для получения случайных элементов из массива
const getRandomItems = (array: SlideItem[], count: number): SlideItem[] => {
	const shuffled = [...array].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count)
}

const Slider: React.FC<SliderProps> = ({
	items = defaultItems,
	duration = 20,
	className = '',
}) => {
	// Используем useMemo для кэширования случайных элементов
	const randomItems = useMemo(() => {
		const selectedItems = getRandomItems(items, 7)
		return [...selectedItems, ...selectedItems] // Дублируем для бесконечной анимации
	}, [items])

	return (
		<div
			className={`${styles.sliderContainer} ${className}`}
			style={{ '--duration': `${duration}s` } as React.CSSProperties}
		>
			<div className={styles.slider}>
				{randomItems.map((item, index) => (
					<div key={`${item.id}-${index}`} className={styles.slide}>
						<div className={styles.imageWrapper}>
							<Image
								src={item.image}
								alt={item.description}
								width={200}
								height={200}
								className={styles.image}
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
