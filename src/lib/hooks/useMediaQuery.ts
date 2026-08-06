'use client'

import { useLayoutEffect, useState } from 'react'

/**
 * matchMedia с безопасной для SSR начальной фазой (defaultValue).
 * На сервере и при гидрации — defaultValue, затем фактическое значение.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
	const [matches, setMatches] = useState(defaultValue)

	useLayoutEffect(() => {
		const mq = window.matchMedia(query)
		const apply = () => setMatches(mq.matches)
		apply()
		mq.addEventListener('change', apply)
		return () => mq.removeEventListener('change', apply)
	}, [query])

	return matches
}
