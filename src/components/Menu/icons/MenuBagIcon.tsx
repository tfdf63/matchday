import type { SVGProps } from 'react'

/** Геометрия из `public/icons/menu-bag.svg`. */
export function MenuBagIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			aria-hidden={true}
			{...props}
		>
			<path
				d='M8.18182 7.69231C8.18182 7.69231 8.18182 4 12 4C15.8182 4 15.8182 7.69231 15.8182 7.69231M5 7.69231V20H19V7.69231H5Z'
				stroke='currentColor'
				strokeWidth='0.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
