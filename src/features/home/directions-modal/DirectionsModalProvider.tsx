'use client'

import type { FC, ReactNode } from 'react'

import { DirectionsModalStateProvider } from './directionsModalContext'
import { DirectionsModalView } from './DirectionsModalView'

export { useDirectionsModal } from './directionsModalContext'

export type DirectionsModalProviderProps = {
	children: ReactNode
}

export const DirectionsModalProvider: FC<DirectionsModalProviderProps> = ({
	children,
}) => {
	return (
		<DirectionsModalStateProvider>
			{children}
			<DirectionsModalView />
		</DirectionsModalStateProvider>
	)
}
