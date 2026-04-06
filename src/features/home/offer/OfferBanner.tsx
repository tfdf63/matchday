import type { FC } from 'react'

import {
	OFFER_MASCOT_MOBILE,
	OFFER_MASCOT_TABLET,
} from './offerAssets'
import styles from './Offer.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type OfferBannerProps = {
	title: string
	subtitle: string
	description: string
	imageSrc?: string
	imageSrcTablet?: string
	className?: string
	headingId?: string
}

export const OfferBanner: FC<OfferBannerProps> = ({
	title,
	subtitle,
	description,
	imageSrc = OFFER_MASCOT_MOBILE,
	imageSrcTablet = OFFER_MASCOT_TABLET,
	className,
	headingId = 'offer-heading',
}) => {
	return (
		<article className={cx(styles.card, className)}>
			<div className={styles.cardMain}>
				<h2 id={headingId} className={styles.title}>
					{title}
				</h2>
				<div className={styles.textBlock}>
					<p className={styles.subtitle}>{subtitle}</p>
					<p className={cx(styles.description, 'font-mono')}>{description}</p>
				</div>
			</div>
			<div className={styles.imageWrap}>
				<picture className={styles.picture}>
					<source media="(min-width: 767px)" srcSet={imageSrcTablet} />
					<img
						className={styles.image}
						src={imageSrc}
						alt=""
						width={778}
						height={690}
						decoding="async"
						loading="lazy"
					/>
				</picture>
			</div>
		</article>
	)
}
