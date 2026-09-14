import type { FC } from 'react'

import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import {
	BUS_FANS_PROMO_HREF,
	BUS_FANS_PROMO_IMAGE,
	busFansPromoContent,
} from '@/data/busFansPromo'
import { OfferBanner } from '@/features/home/offer/OfferBanner'
import offerStyles from '@/features/home/offer/Offer.module.scss'

import styles from './BusFansPromoSection.module.scss'

const SECTION_HEADING_ID = 'busfans-promo-heading'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const BusFansPromoSection: FC = () => {
	const {
		title,
		subtitle,
		description,
		imageAlt,
		ctaLabel,
		ctaNote,
	} = busFansPromoContent

	return (
		<section
			id='busfans-promo'
			className={styles.section}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={offerStyles.inner}>
				<OfferBanner
					title={title}
					subtitle={subtitle}
					description={description}
					headingId={SECTION_HEADING_ID}
					className={styles.card}
					imageWrapClassName={styles.imageWrap}
					pictureClassName={styles.picture}
					imageClassName={styles.image}
					imageSrc={BUS_FANS_PROMO_IMAGE}
					imageSrcTablet={BUS_FANS_PROMO_IMAGE}
					imageSrcWide={BUS_FANS_PROMO_IMAGE}
					imageSrcLaptop={BUS_FANS_PROMO_IMAGE}
					imageSrcDesktop={BUS_FANS_PROMO_IMAGE}
					imageSrcDesktopXl={BUS_FANS_PROMO_IMAGE}
					imageAlt={imageAlt}
					ctaLabel={ctaLabel}
					ctaHref={BUS_FANS_PROMO_HREF}
					ctaWrapClassName={styles.ctaWrap}
					ctaButtonClassName={cx(
						matchCardStyles.btnOutline,
						styles.ctaButton,
					)}
					ctaNote={ctaNote}
					ctaNoteClassName={cx(styles.ctaNote, 'font-mono')}
				/>
			</div>
		</section>
	)
}
