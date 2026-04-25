import type { FC, ReactElement } from 'react'
import Link from 'next/link'

import {
	merchShowcaseItems,
	merchStoreHref,
	merchSubtitleLines,
	merchSubtitleParagraph768,
	merchTitle,
	type MerchShowcaseItem,
} from '@/data/merch'

import styles from './Merch.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const HEADING_ID = 'merch-heading'

export type MerchSectionProps = {
	className?: string
}

const IMG_HERO_360 = { w: 320, h: 360 }
const IMG_SMALL_360 = { w: 152, h: 220 }
const DEFAULT_768 = { w: 334, h: 410 }
const DEFAULT_1024 = { w: 301, h: 440 }

function MerchProductCard({
	item,
	itemIndex,
}: {
	item: MerchShowcaseItem
	itemIndex: number
}): ReactElement {
	const href = item.productUrl ?? merchStoreHref
	const isMobileHero = itemIndex === 0
	const isMobileSmall = itemIndex > 0 && itemIndex < 3
	/** 4–6: только &lt; 768 скрыто */
	const isTabletRangeOnly = itemIndex >= 3 && itemIndex < 6
	/** 7–8: только ≥1024 */
	const isLgOnly = itemIndex >= 6
	const w360 = isMobileHero
		? IMG_HERO_360
		: isMobileSmall
			? IMG_SMALL_360
			: null
	const w768 = item.image768W ?? DEFAULT_768.w
	const h768 = item.image768H ?? DEFAULT_768.h
	const w1024 = item.image1024W ?? DEFAULT_1024.w
	const h1024 = item.image1024H ?? DEFAULT_1024.h
	const isHalfGradient = (item.gradient ?? 'tall') === 'half'

	const has1280 = item.image1280 != null
	const has1024 = item.image1024 != null
	const has768 = item.image768 != null
	const has360 = item.image360 != null

	function cardImageNode(): ReactElement {
		/* 7–8: 1024 и 1280, без 768 */
		if (has1024 && !has768) {
			return (
				<picture>
					{has1280 && (
						<source
							media="(min-width: 1280px)"
							srcSet={item.image1280}
						/>
					)}
					<img
						className={styles.cardImage}
						src={item.image1024}
						alt=""
						width={w1024}
						height={h1024}
						loading="lazy"
						decoding="async"
					/>
				</picture>
			)
		}

		/* 1–3: 360, 768, 1024, 1280 */
		if (has360 && has768) {
			return (
				<picture>
					{has1280 && (
						<source
							media="(min-width: 1280px)"
							srcSet={item.image1280}
						/>
					)}
					{has1024 && (
						<source
							media="(min-width: 1024px)"
							srcSet={item.image1024}
						/>
					)}
					<source media="(min-width: 767px)" srcSet={item.image768!} />
					<img
						className={styles.cardImage}
						src={item.image360}
						alt=""
						width={w360?.w}
						height={w360?.h}
						loading="lazy"
						decoding="async"
					/>
				</picture>
			)
		}

		/* 4–6: 768, 1024, 1280, без 360 */
		if (has768) {
			return (
				<picture>
					{has1280 && (
						<source
							media="(min-width: 1280px)"
							srcSet={item.image1280}
						/>
					)}
					{has1024 && (
						<source
							media="(min-width: 1024px)"
							srcSet={item.image1024}
						/>
					)}
					<source media="(min-width: 767px)" srcSet={item.image768} />
					<img
						className={styles.cardImage}
						src={item.image768}
						alt=""
						width={w768}
						height={h768}
						loading="lazy"
						decoding="async"
					/>
				</picture>
			)
		}

		return <></>
	}

	return (
		<Link
			href={href}
			className={cx(
				styles.card,
				isMobileHero && styles.cardHero,
				isMobileSmall && styles.cardSmall,
				isTabletRangeOnly && styles.cardTabletOnly,
				isLgOnly && styles.cardLgOnly,
			)}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className={styles.cardImageWrap}>
				{cardImageNode()}
				<div
					className={cx(
						styles.cardGradient,
						isHalfGradient && styles.cardGradientHalf,
					)}
					aria-hidden
				/>
			</div>
			<div className={styles.cardBody}>
				<p className={styles.cardTitle}>{item.title}</p>
				<p className={styles.cardPrice}>{item.price}</p>
			</div>
		</Link>
	)
}

export const MerchSection: FC<MerchSectionProps> = ({ className }) => {
	if (merchShowcaseItems.length < 1) {
		return null
	}

	return (
		<section
			id="merch"
			className={cx(styles.section, className)}
			aria-labelledby={HEADING_ID}
		>
			<div className={styles.inner}>
				<header className={styles.head}>
					<h2 id={HEADING_ID} className={styles.title}>
						{merchTitle}
					</h2>
					<div className={styles.subtitleBlock}>
						{merchSubtitleLines.map((line) => (
							<p
								key={line}
								className={cx(styles.subtitleLine, 'font-mono')}
							>
								{line}
							</p>
						))}
					</div>
					<p
						className={cx(styles.subtitleLine768, 'font-mono')}
					>
						{merchSubtitleParagraph768}
					</p>
				</header>

				<div className={styles.showcase}>
					<div className={styles.showcaseBento}>
						{merchShowcaseItems.map((item, index) => (
							<MerchProductCard
								key={item.id}
								item={item}
								itemIndex={index}
							/>
						))}
					</div>
					<Link
						href={merchStoreHref}
						className={cx(styles.cta, 'font-mono')}
						target="_blank"
						rel="noopener noreferrer"
					>
						Перейти в магазин
					</Link>
				</div>
			</div>
		</section>
	)
}
