import type { FC } from 'react'

import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import {
	LOYALTY_PROGRAM_HREF,
	loyaltyProgramContent,
} from '@/data/loyaltyProgram'
import { OfferBanner } from '@/features/home/offer/OfferBanner'
import offerStyles from '@/features/home/offer/Offer.module.scss'

import { LOYALTY_MASCOT } from './loyaltyAssets'
import styles from './LoyaltyProgramSection.module.scss'

const LOYALTY_HEADING_ID = 'loyalty-program-heading'
const LOYALTY_CTA_LABEL = 'Присоединиться'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const LoyaltyProgramSection: FC = () => {
	const { title, subtitle, description } = loyaltyProgramContent

	return (
		<section
			id='loyalty-program'
			className={styles.section}
			aria-labelledby={LOYALTY_HEADING_ID}
		>
			<div className={offerStyles.inner}>
				<OfferBanner
					title={title}
					subtitle={subtitle}
					description={description}
					headingId={LOYALTY_HEADING_ID}
					className={styles.loyaltyCard}
					imageWrapClassName={styles.imageWrap}
					pictureClassName={styles.picture}
					imageClassName={styles.image}
					imageSrc={LOYALTY_MASCOT}
					imageSrcTablet={LOYALTY_MASCOT}
					imageSrcWide={LOYALTY_MASCOT}
					imageSrcLaptop={LOYALTY_MASCOT}
					imageSrcDesktop={LOYALTY_MASCOT}
					imageSrcDesktopXl={LOYALTY_MASCOT}
					ctaLabel={LOYALTY_CTA_LABEL}
					ctaHref={LOYALTY_PROGRAM_HREF}
					ctaWrapClassName={styles.ctaWrap}
					ctaButtonClassName={cx(
						matchCardStyles.btnOutline,
						styles.ctaButton,
					)}
				/>
			</div>
		</section>
	)
}
