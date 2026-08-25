'use client'

import { useTicketLinks } from '@/lib/personalData'
import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'

import {
	SEASON_TICKETS_BUY_URL,
	SEASON_TICKETS_FAMILY_URL,
	SEASON_TICKETS_VIP_URL,
} from './mainHeroConfig'
import styles from './MainSeasonTicketsCard.module.scss'
import { SeasonTicketsFamilyNote } from './SeasonTicketsFamilyNote'
import { SeasonTicketsHeroCarousel } from './SeasonTicketsHeroCarousel'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function MainSeasonTicketsCard() {
	const { personalData, getTicketUrl, handleTicketClick } = useTicketLinks()

	return (
		<article
				className={cx(
					matchCardStyles.root,
					matchCardStyles.rootWithTopBadge,
					styles.seasonCard,
				)}
			>
				<div
					className={cx(
						matchCardStyles.fanIdBadge,
						styles.fanIdBadgeOverlay,
						'font-mono',
					)}
					role='note'
				>
					FAN ID
				</div>
				<div className={matchCardStyles.inner}>
					<SeasonTicketsHeroCarousel />
					<div className={matchCardStyles.actions}>
						<div className={styles.buyRow}>
							<a
								className={cx(matchCardStyles.btnPrimary, 'font-mono')}
								href={personalData ? getTicketUrl(SEASON_TICKETS_BUY_URL) : undefined}
								target='_blank'
								rel='noopener noreferrer'
								onClick={e => {
									if (handleTicketClick(SEASON_TICKETS_BUY_URL)) e.preventDefault()
								}}
							>
								Купить
							</a>
							<a
								className={cx(matchCardStyles.btnOutline, 'font-mono')}
								href={personalData ? getTicketUrl(SEASON_TICKETS_VIP_URL) : undefined}
								target='_blank'
								rel='noopener noreferrer'
								onClick={e => {
									if (handleTicketClick(SEASON_TICKETS_VIP_URL)) e.preventDefault()
								}}
							>
								VIP
							</a>
						</div>
						<div className={styles.familyBlock}>
							<a
								className={cx(matchCardStyles.btnSecondary, 'font-mono')}
								href={personalData ? getTicketUrl(SEASON_TICKETS_FAMILY_URL) : undefined}
								target='_blank'
								rel='noopener noreferrer'
								onClick={e => {
									if (handleTicketClick(SEASON_TICKETS_FAMILY_URL)) e.preventDefault()
								}}
							>
								семейный сектор С4
							</a>
							<SeasonTicketsFamilyNote />
						</div>
					</div>
				</div>
			</article>
	)
}
