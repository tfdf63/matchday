'use client'

import {
	createContext,
	type FC,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import type { HomeInfoModalVariant } from '@/data/homeInfoModals'

export type HomeInfoModalContextValue = {
	variant: HomeInfoModalVariant | null
	open: (v: HomeInfoModalVariant) => void
	close: () => void
}

const HomeInfoModalContext = createContext<HomeInfoModalContextValue | null>(
	null,
)

export function useHomeInfoModal(): HomeInfoModalContextValue {
	const ctx = useContext(HomeInfoModalContext)
	if (!ctx) {
		throw new Error(
			'useHomeInfoModal must be used within HomeInfoModalProvider',
		)
	}
	return ctx
}

export type HomeInfoModalStateProviderProps = {
	children: ReactNode
}

export const HomeInfoModalStateProvider: FC<
	HomeInfoModalStateProviderProps
> = ({ children }) => {
	const [variant, setVariant] = useState<HomeInfoModalVariant | null>(null)

	const open = useCallback((v: HomeInfoModalVariant) => {
		setVariant(v)
	}, [])

	const close = useCallback(() => {
		setVariant(null)
	}, [])

	const value = useMemo(
		() => ({ variant, open, close }),
		[variant, open, close],
	)

	return (
		<HomeInfoModalContext.Provider value={value}>
			{children}
		</HomeInfoModalContext.Provider>
	)
}
