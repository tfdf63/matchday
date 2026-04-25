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
	const isTabletOnly = itemIndex >= 3
	const w360 = isMobileHero
		? IMG_HERO_360
		: isMobileSmall
			? IMG_SMALL_360
			: null
	const w768 = item.image768W ?? DEFAULT_768.w
	const h768 = item.image768H ?? DEFAULT_768.h
	const isHalfGradient = (item.gradient ?? 'tall') === 'half'

	return (
		<Link
			href={href}
			className={cx(
				styles.card,
				isMobileHero && styles.cardHero,
				isMobileSmall && styles.cardSmall,
				isTabletOnly && styles.cardTabletOnly,
			)}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className={styles.cardImageWrap}>
				{item.image360 != null ? (
					<picture>
						<source
							media="(min-width: 767px)"
							srcSet={item.image768}
						/>
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
				) : (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element -- позиции 4–6 только ≥767, один кроп 768 */}
						<img
							className={styles.cardImage}
							src={item.image768}
							alt=""
							width={w768}
							height={h768}
							loading="lazy"
							decoding="async"
						/>
					</>
				)}
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
		</section>
	)
}
