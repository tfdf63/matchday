'use client'

import type { FC, ReactNode } from 'react'

import {
	marqueePhrase,
	marqueeSeparator,
	MARQUEE_SECTION_LABEL,
} from '@/data/marquee'

import styles from './MarqueeSection.module.scss'

const PAIR_COUNT = 12

function makePairs(keyPrefix: string): ReactNode {
	const nodes: ReactNode[] = []
	for (let i = 0; i < PAIR_COUNT; i += 1) {
		const key = `${keyPrefix}-${i}`
		nodes.push(
			<span key={`${key}-p`} className={styles.phrase}>
				{marqueePhrase}
			</span>,
			<span key={`${key}-s`} className={styles.separator} aria-hidden>
				{marqueeSeparator}
			</span>,
		)
	}
	return <>{nodes}</>
}

/**
 * Бесконечная бегущая строка: дубликат сегмента + translateX(-50%).
 * При prefers-reduced-motion: reduce — одна лента по центру, без анимации.
 */
export const MarqueeSection: FC = () => {
	return (
		<section className={styles.section} aria-label={MARQUEE_SECTION_LABEL}>
			<div className={styles.inner} aria-hidden>
				<div className={styles.track}>
					<div className={styles.chunk}>{makePairs('a')}</div>
					<div className={styles.chunk}>{makePairs('b')}</div>
				</div>
			</div>
		</section>
	)
}
