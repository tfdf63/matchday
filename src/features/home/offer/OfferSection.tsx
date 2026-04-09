import type { FC } from 'react'

import { OfferBanner } from './OfferBanner'
import styles from './Offer.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type OfferSectionProps = {
	title: string
	subtitle: string
	description: string
	imageSrc?: string
	imageSrcTablet?: string
	imageSrcWide?: string
	imageSrcLaptop?: string
	imageSrcDesktop?: string
	className?: string
}

export const OfferSection: FC<OfferSectionProps> = ({
	title,
	subtitle,
	description,
	imageSrc,
	imageSrcTablet,
	imageSrcWide,
	imageSrcLaptop,
	imageSrcDesktop,
	className,
}) => {
	return (
		<section
			className={cx(styles.section, className)}
			aria-labelledby="offer-heading"
		>
			<div className={styles.inner}>
				<OfferBanner
					title={title}
					subtitle={subtitle}
					description={description}
					imageSrc={imageSrc}
					imageSrcTablet={imageSrcTablet}
					imageSrcWide={imageSrcWide}
					imageSrcLaptop={imageSrcLaptop}
					imageSrcDesktop={imageSrcDesktop}
				/>
			</div>
		</section>
	)
}
