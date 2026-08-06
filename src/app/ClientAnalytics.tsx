'use client'

import { useEffect, useState } from 'react'

import { AnalyticsScripts } from '@/lib/analytics/AnalyticsScripts'

/** Скрипты счётчиков — только после гидрации, чтобы не ломать SSR. */
export function ClientAnalytics() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return <AnalyticsScripts />
}
