'use client'

import type { FC, ReactNode } from 'react'

import { MenuParkingIcon } from '@/components/Menu/icons/MenuParkingIcon'

import { useParkingModal } from './parkingModalContext'

export type ParkingModalTriggerProps = {
	buttonClassName: string
	iconClassName?: string
	label?: ReactNode
}

export const ParkingModalTrigger: FC<ParkingModalTriggerProps> = ({
	buttonClassName,
	iconClassName,
	label = 'Парковка',
}) => {
	const { open } = useParkingModal()

	return (
		<button type="button" className={buttonClassName} onClick={open}>
			{iconClassName ? (
				<span className={iconClassName}>
					<MenuParkingIcon />
				</span>
			) : null}
			{label}
		</button>
	)
}
