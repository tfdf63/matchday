'use client'

import type { FC, ReactNode } from 'react'

import { ParkingModalStateProvider } from './parkingModalContext'
import { ParkingModalView } from './ParkingModalView'

export { useParkingModal } from './parkingModalContext'

export type ParkingModalProviderProps = {
	children: ReactNode
}

export const ParkingModalProvider: FC<ParkingModalProviderProps> = ({
	children,
}) => {
	return (
		<ParkingModalStateProvider>
			{children}
			<ParkingModalView />
		</ParkingModalStateProvider>
	)
}
