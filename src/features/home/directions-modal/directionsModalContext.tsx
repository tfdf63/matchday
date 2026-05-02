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

import type { DirectionsModalTabId } from '@/data/directionsModal'

export type DirectionsModalContextValue = {
	variant: DirectionsModalTabId | null
	open: (v: DirectionsModalTabId) => void
	close: () => void
}

const DirectionsModalContext =
	createContext<DirectionsModalContextValue | null>(null)

export function useDirectionsModal(): DirectionsModalContextValue {
	const ctx = useContext(DirectionsModalContext)
	if (!ctx) {
		throw new Error(
			'useDirectionsModal must be used within DirectionsModalProvider',
		)
	}
	return ctx
}

export type DirectionsModalStateProviderProps = {
	children: ReactNode
}

export const DirectionsModalStateProvider: FC<
	DirectionsModalStateProviderProps
> = ({ children }) => {
	const [variant, setVariant] = useState<DirectionsModalTabId | null>(null)

	const open = useCallback((v: DirectionsModalTabId) => {
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
		<DirectionsModalContext.Provider value={value}>
			{children}
		</DirectionsModalContext.Provider>
	)
}
