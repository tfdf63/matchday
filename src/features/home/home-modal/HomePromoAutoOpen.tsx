'use client'

import { useEffect } from 'react'

import { useHomeInfoModal } from './homeInfoModalContext'

export const HOME_PROMO_AUTO_OPEN_STORAGE_KEY =
	'matchday-promo-modal-auto-opened' as const

const AUTO_OPEN_DELAY_MS = 2000

function hasAutoOpenedThisSession(): boolean {
	try {
		return sessionStorage.getItem(HOME_PROMO_AUTO_OPEN_STORAGE_KEY) === '1'
	} catch {
		return false
	}
}

function markAutoOpenedThisSession(): void {
	try {
		sessionStorage.setItem(HOME_PROMO_AUTO_OPEN_STORAGE_KEY, '1')
	} catch {
		// private mode / disabled storage
	}
}

/** На главной: через 2 с открыть «Промокоды», один раз за вкладку. */
export function HomePromoAutoOpen() {
	const { open } = useHomeInfoModal()

	useEffect(() => {
		if (hasAutoOpenedThisSession()) return

		const timerId = window.setTimeout(() => {
			markAutoOpenedThisSession()
			open('promo')
		}, AUTO_OPEN_DELAY_MS)

		return () => window.clearTimeout(timerId)
	}, [open])

	return null
}
