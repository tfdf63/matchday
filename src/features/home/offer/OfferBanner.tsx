import type { FC } from 'react'

import {
	OFFER_MASCOT_MOBILE,
	OFFER_MASCOT_TABLET,
	OFFER_MASCOT_WIDE,
	OFFER_MASCOT_LAPTOP,
	OFFER_MASCOT_DESKTOP,
	OFFER_MASCOT_DESKTOP_XL,
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
	imageSrcWide?: string
	imageSrcLaptop?: string
	imageSrcDesktop?: string
	imageSrcDesktopXl?: string
	className?: string
	headingId?: string
	href?: string
	imageWrapClassName?: string
	pictureClassName?: string
	imageClassName?: string
	/** Кнопка после текста (вместо ссылки на всю карточку). */
	ctaLabel?: string
	ctaHref?: string
	ctaWrapClassName?: string
	ctaButtonClassName?: string
	ctaNote?: string
	ctaNoteClassName?: string
	imageAlt?: string
}

function isExternalUrl(href: string): boolean {
	return href.startsWith('http://') || href.startsWith('https://')
}

export const OfferBanner: FC<OfferBannerProps> = ({
	title,
	subtitle,
	description,
	imageSrc = OFFER_MASCOT_MOBILE,
	imageSrcTablet = OFFER_MASCOT_TABLET,
	imageSrcWide = OFFER_MASCOT_WIDE,
	imageSrcLaptop = OFFER_MASCOT_LAPTOP,
	imageSrcDesktop = OFFER_MASCOT_DESKTOP,
	imageSrcDesktopXl = OFFER_MASCOT_DESKTOP_XL,
	className,
	headingId = 'offer-heading',
	href,
	imageWrapClassName,
	pictureClassName,
	imageClassName,
	ctaLabel,
	ctaHref,
	ctaWrapClassName,
	ctaButtonClassName,
	ctaNote,
	ctaNoteClassName,
	imageAlt = '',
}) => {
	const cardHref = ctaLabel && ctaHref ? undefined : href
	const RootTag = cardHref ? 'a' : 'article'
	const cardExternal = cardHref ? isExternalUrl(cardHref) : false
	const ctaExternal = ctaHref ? isExternalUrl(ctaHref) : false

	return (
		<RootTag
			className={cx(styles.card, cardHref && styles.cardLink, className)}
			{...(cardHref
				? {
						href: cardHref,
						...(cardExternal
							? {
									target: '_blank',
									rel: 'noopener noreferrer',
								}
							: {}),
					}
				: {})}
		>
			<div className={styles.cardMain}>
				<h2 id={headingId} className={styles.title}>
					{title
						.split('\n')
						.filter(Boolean)
						.map((line, i) => (
							<span key={i} className={styles.titleLine}>
								{line}
							</span>
						))}
				</h2>
				<div className={styles.textBlock}>
					<p className={styles.subtitle}>{subtitle}</p>
					<p className={cx(styles.description, 'font-mono')}>{description}</p>
				</div>
				{ctaLabel && ctaHref ? (
					<div className={cx(styles.ctaWrap, ctaWrapClassName)}>
						<a
							className={cx(styles.ctaButton, ctaButtonClassName, 'font-mono')}
							href={ctaHref}
							{...(ctaExternal
								? {
										target: '_blank',
										rel: 'noopener noreferrer',
									}
								: {})}
						>
							{ctaLabel}
						</a>
						{ctaNote ? (
							<p className={ctaNoteClassName}>{ctaNote}</p>
						) : null}
					</div>
				) : null}
			</div>
			<div className={cx(styles.imageWrap, imageWrapClassName)}>
				<picture className={cx(styles.picture, pictureClassName)}>
					<source media="(min-width: 1920px)" srcSet={imageSrcDesktopXl} />
					<source media="(min-width: 1600px)" srcSet={imageSrcDesktop} />
					<source media="(min-width: 1280px)" srcSet={imageSrcLaptop} />
					<source media="(min-width: 1024px)" srcSet={imageSrcWide} />
					<source media="(min-width: 767px)" srcSet={imageSrcTablet} />
					<img
						className={cx(styles.image, imageClassName)}
						src={imageSrc}
						alt={imageAlt}
						width={2064}
						height={1358}
						decoding="async"
						loading="lazy"
					/>
				</picture>
			</div>
		</RootTag>
	)
}
