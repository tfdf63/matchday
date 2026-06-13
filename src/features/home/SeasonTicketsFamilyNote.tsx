'use client'

import {
	seasonTicketsFamilyNote,
	seasonTicketsFamilyPromoCode,
} from '@/data/seasonTickets'
import { PromoCodeCopy } from '@/features/home/home-modal/PromoCodeCopy'

import styles from './MainSeasonTicketsCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function SeasonTicketsFamilyNote() {
	return (
		<p className={cx(styles.familyNote, 'font-mono')}>
			{seasonTicketsFamilyNote}{' '}
			<PromoCodeCopy code={seasonTicketsFamilyPromoCode} />
		</p>
	)
}
