'use client'

import Image from 'next/image'
import { useState } from 'react'

import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import { seasonTicketImages } from '@/data/seasonTickets'

import {
	SEASON_TICKETS_BUY_URL,
	SEASON_TICKETS_VIP_URL,
} from './mainHeroConfig'
import styles from './MainSeasonTicketsCard.module.scss'
import { SeasonTicketsDetailsModal } from './season-tickets-modal/SeasonTicketsDetailsModal'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function MainSeasonTicketsCard() {
	const [detailsOpen, setDetailsOpen] = useState(false)

	return (
		<>
			<article className={matchCardStyles.root}>
				<div className={matchCardStyles.inner}>
					<figure className={styles.heroFigure}>
						<Image
							src={seasonTicketImages[0]}
							alt='Абонементы сезон 2026-2027'
							width={960}
							height={1200}
							className={styles.heroImage}
							sizes='(min-width: 1920px) 444px, (min-width: 1280px) 365px, (min-width: 1024px) 301px, (min-width: 767px) 274px, min(320px, calc(100vw - 40px))'
							priority
						/>
					</figure>
					<div className={matchCardStyles.actions}>
						<div className={styles.buyRow}>
							<a
								className={cx(matchCardStyles.btnPrimary, 'font-mono')}
								href={SEASON_TICKETS_BUY_URL}
								target='_blank'
								rel='noopener noreferrer'
							>
								Купить
							</a>
							<a
								className={cx(matchCardStyles.btnOutline, 'font-mono')}
								href={SEASON_TICKETS_VIP_URL}
								target='_blank'
								rel='noopener noreferrer'
							>
								VIP
							</a>
						</div>
						<button
							type='button'
							className={cx(matchCardStyles.btnSecondary, 'font-mono')}
							onClick={() => setDetailsOpen(true)}
						>
							подробности
						</button>
					</div>
				</div>
			</article>
			<SeasonTicketsDetailsModal
				open={detailsOpen}
				onClose={() => setDetailsOpen(false)}
			/>
		</>
	)
}
