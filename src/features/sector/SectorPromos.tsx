'use client'

import type { FC } from 'react'

import { PromoCodeCopy } from '@/features/home/home-modal/PromoCodeCopy'

import styles from './SectorPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const CLOSE_CODES = [
	{ code: 'AKRON2', text: 'от 2 билетов скидка 5%' },
	{ code: 'AKRON3', text: 'от 3 билетов скидка 10%' },
	{ code: 'AKRON4', text: 'от 4 билетов скидка 15%' },
] as const

export const SectorPromos: FC = () => {
	return (
		<div className={styles.promos}>
			<div className={styles.promoGroup}>
				<h3 className={styles.promoGroupTitle}>Для близких</h3>
				{CLOSE_CODES.map(({ code, text }) => (
					<p key={code} className={cx(styles.promoLine, 'font-mono')}>
						<PromoCodeCopy code={code} className={styles.promoCode} />
						{' — '}
						{text}
					</p>
				))}
			</div>

			<div className={styles.promoGroup}>
				<h3 className={styles.promoGroupTitle}>Для семей</h3>
				<p className={cx(styles.promoLine, 'font-mono')}>
					<PromoCodeCopy code='AKRKIDS' className={styles.promoCode} />
					{' — '}
					от 2-х билетов в С4, включая 1 детский — ещё -25%
				</p>
			</div>

			<div className={styles.promoGroup}>
				<h3 className={styles.promoGroupTitle}>Детский тариф</h3>
				<p className={cx(styles.promoLine, 'font-mono')}>
					Детский тариф (для детей до 14 лет включительно) на матчах МИР РПЛ
					предоставляет возможность взять билеты со скидкой 50%.
				</p>
			</div>
		</div>
	)
}
