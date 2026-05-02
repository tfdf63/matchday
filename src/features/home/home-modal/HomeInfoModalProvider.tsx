'use client'

import type { FC, ReactNode } from 'react'

import { HomeInfoModalStateProvider } from './homeInfoModalContext'
import { HomeInfoModalView } from './HomeInfoModalView'

export { useHomeInfoModal } from './homeInfoModalContext'

export type HomeInfoModalProviderProps = {
	children: ReactNode
}

export const HomeInfoModalProvider: FC<HomeInfoModalProviderProps> = ({
	children,
}) => {
	return (
		<HomeInfoModalStateProvider>
			{children}
			<HomeInfoModalView />
		</HomeInfoModalStateProvider>
	)
}
