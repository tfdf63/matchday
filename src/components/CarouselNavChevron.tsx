import type { FC, SVGProps } from 'react'

export type CarouselNavChevronProps = SVGProps<SVGSVGElement> & {
	/** weui:arrow-outlined / 4810:18411 — V-шеврон в 10×20 */
	direction: 'left' | 'right'
}

/**
 * Иконка стрелок карусели: Билетная программа, Активности, Карта болельщика (планшет).
 * Геометрия под Figma: контур внутри 10×20, кнопка 48×48.
 */
export const CarouselNavChevron: FC<CarouselNavChevronProps> = ({
	direction,
	...rest
}) => {
	const d =
		direction === 'right' ? 'M1 1.5L8.5 10 1 18.5' : 'M9 1.5L1.5 10 9 18.5'
	return (
		<svg
			viewBox="0 0 10 20"
			width="10"
			height="20"
			fill="none"
			aria-hidden
			{...rest}
		>
			<path
				d={d}
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
