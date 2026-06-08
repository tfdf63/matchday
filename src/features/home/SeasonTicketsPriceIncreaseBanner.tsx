'use client'

import { seasonTicketsPriceIncreaseDates } from '@/data/seasonTickets'
import { formatSeasonTicketsPriceIncreaseCountdown } from '@/lib/season-tickets/formatPriceIncreaseCountdown'

import styles from './MainSeasonTicketsCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function SeasonTicketsPriceIncreaseBanner() {
	const label = formatSeasonTicketsPriceIncreaseCountdown(
		seasonTicketsPriceIncreaseDates,
	)

	if (!label) return null

	return (
		<div className={styles.priceIncreaseBanner} role='status'>
			<span className={cx(styles.priceIncreaseBannerLabel, 'font-mono')}>
				{label}
			</span>
		</div>
	)
}
