import type { SVGProps } from 'react'

/** Иконка фан-автобусов; геометрия согласована с `MatchCardBusFansIcon`. */
export function MenuBusIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			aria-hidden={true}
			{...props}
		>
			<path
				d='M3.6 9C3.6 7.008 5.208 5.4 7.2 5.4H16.8C18.792 5.4 20.4 7.008 20.4 9V16.2H3.6V9Z'
				stroke='currentColor'
				strokeWidth='0.8'
			/>
			<path d='M3.6 12.6H20.4' stroke='currentColor' strokeWidth='0.8' />
			<circle
				cx='7.5'
				cy='17.7'
				r='1.5'
				stroke='currentColor'
				strokeWidth='0.8'
			/>
			<circle
				cx='16.5'
				cy='17.7'
				r='1.5'
				stroke='currentColor'
				strokeWidth='0.8'
			/>
			<path
				d='M5.4 9.9H7.8M16.2 9.9H18.6'
				stroke='currentColor'
				strokeWidth='0.8'
				strokeLinecap='round'
			/>
		</svg>
	)
}
