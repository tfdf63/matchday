import type { FC } from 'react'

import {
	LOYALTY_PROGRAM_HREF,
	loyaltyProgramContent,
} from '@/data/loyaltyProgram'
import { OfferBanner } from '@/features/home/offer/OfferBanner'
import offerStyles from '@/features/home/offer/Offer.module.scss'

import { LOYALTY_MASCOT } from './loyaltyAssets'
import styles from './LoyaltyProgramSection.module.scss'

const LOYALTY_HEADING_ID = 'loyalty-program-heading'

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
					href={LOYALTY_PROGRAM_HREF}
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
				/>
			</div>
		</section>
	)
}
