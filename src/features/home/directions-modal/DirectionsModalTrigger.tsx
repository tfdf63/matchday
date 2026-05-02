'use client'

import type { FC } from 'react'

import { LocationArrowIcon } from '@/components/Button/icons/LocationArrowIcon'

import { useDirectionsModal } from './directionsModalContext'

export type DirectionsModalTriggerProps = {
	buttonClassName: string
	iconClassName: string
}

export const DirectionsModalTrigger: FC<DirectionsModalTriggerProps> = ({
	buttonClassName,
	iconClassName,
}) => {
	const { open } = useDirectionsModal()

	return (
		<button
			type="button"
			className={buttonClassName}
			onClick={() => open('tolyatti')}
		>
			<span className={iconClassName}>
				<LocationArrowIcon />
			</span>
			Как добраться
		</button>
	)
}
