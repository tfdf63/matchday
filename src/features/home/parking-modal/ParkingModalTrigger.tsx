'use client'

import type { FC } from 'react'

import { MenuParkingIcon } from '@/components/Menu/icons/MenuParkingIcon'

import { useParkingModal } from './parkingModalContext'

export type ParkingModalTriggerProps = {
	buttonClassName: string
	iconClassName?: string
}

export const ParkingModalTrigger: FC<ParkingModalTriggerProps> = ({
	buttonClassName,
	iconClassName,
}) => {
	const { open } = useParkingModal()

	return (
		<button type="button" className={buttonClassName} onClick={open}>
			{iconClassName ? (
				<span className={iconClassName}>
					<MenuParkingIcon />
				</span>
			) : null}
			Парковка
		</button>
	)
}
