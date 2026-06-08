import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'

import {
	SEASON_TICKETS_BUY_URL,
	SEASON_TICKETS_VIP_URL,
} from './mainHeroConfig'
import styles from './MainSeasonTicketsCard.module.scss'
import { SeasonTicketsHeroCarousel } from './SeasonTicketsHeroCarousel'
import { SeasonTicketsPriceIncreaseBanner } from './SeasonTicketsPriceIncreaseBanner'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function MainSeasonTicketsCard() {
	return (
		<article
			className={cx(
				matchCardStyles.root,
				matchCardStyles.rootWithTopBadge,
				styles.seasonCard,
			)}
		>
			<SeasonTicketsPriceIncreaseBanner />
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
				</div>
			</div>
		</article>
	)
}
