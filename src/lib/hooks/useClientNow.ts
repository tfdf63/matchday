'use client'

import { useEffect, useState } from 'react'

/** Текущее время только на клиенте — null на SSR и первом проходе гидрации. */
export function useClientNow(): Date | null {
	const [now, setNow] = useState<Date | null>(null)

	useEffect(() => {
		setNow(new Date())
	}, [])

	return now
}
