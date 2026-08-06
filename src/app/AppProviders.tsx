'use client'

import type { ReactNode } from 'react'

import { DirectionsModalProvider } from '@/features/home/directions-modal'
import { HomeInfoModalProvider } from '@/features/home/home-modal'
import { ParkingModalProvider } from '@/features/home/parking-modal'

export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<HomeInfoModalProvider>
			<ParkingModalProvider>
				<DirectionsModalProvider>{children}</DirectionsModalProvider>
			</ParkingModalProvider>
		</HomeInfoModalProvider>
	)
}
