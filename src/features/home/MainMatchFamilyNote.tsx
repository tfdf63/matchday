'use client'

import { PromoCodeCopy } from '@/features/home/home-modal/PromoCodeCopy'

import {
	MAIN_MATCH_FAMILY_NOTE,
	MAIN_MATCH_FAMILY_PROMO_CODE,
} from './mainHeroConfig'
import styles from './MainMatchFamilyNote.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function MainMatchFamilyNote() {
	return (
		<p className={cx(styles.note, 'font-mono')}>
			{MAIN_MATCH_FAMILY_NOTE}{' '}
			<PromoCodeCopy code={MAIN_MATCH_FAMILY_PROMO_CODE} />
		</p>
	)
}
