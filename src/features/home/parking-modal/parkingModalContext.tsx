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

export type ParkingModalContextValue = {
	open: () => void
	close: () => void
	isOpen: boolean
}

const ParkingModalContext = createContext<ParkingModalContextValue | null>(null)

export function useParkingModal(): ParkingModalContextValue {
	const ctx = useContext(ParkingModalContext)
	if (!ctx) {
		throw new Error('useParkingModal must be used within ParkingModalProvider')
	}
	return ctx
}

export type ParkingModalStateProviderProps = {
	children: ReactNode
}

export const ParkingModalStateProvider: FC<ParkingModalStateProviderProps> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const open = useCallback(() => {
		setIsOpen(true)
	}, [])

	const close = useCallback(() => {
		setIsOpen(false)
	}, [])

	const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

	return (
		<ParkingModalContext.Provider value={value}>
			{children}
		</ParkingModalContext.Provider>
	)
}
