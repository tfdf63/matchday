import type { FC, ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
	merchShowcaseItems,
	merchStoreHref,
	merchSubtitleLines,
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

const heroItem = merchShowcaseItems.find((i) => i.layout === 'hero')
const topRight = merchShowcaseItems.find(
	(i) => i.layout === 'smallStaggerTopRight',
)
const bottomLeft = merchShowcaseItems.find(
	(i) => i.layout === 'smallStaggerBottomLeft',
)

function MerchProductCard({
	item,
	variant,
	staggerClass,
}: {
	item: MerchShowcaseItem
	variant: 'hero' | 'small'
	staggerClass?: string
}): ReactElement {
	const href = item.productUrl ?? merchStoreHref

	return (
		<Link
			href={href}
			className={cx(
				styles.card,
				variant === 'hero' && styles.cardHero,
				variant === 'small' && styles.cardSmall,
				staggerClass,
			)}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className={styles.cardImageWrap}>
				<Image
					className={styles.cardImage}
					src={item.image}
					alt=''
					fill
					sizes={variant === 'hero' ? '320px' : '152px'}
				/>
				<div className={styles.cardGradient} aria-hidden />
			</div>
			<div className={styles.cardBody}>
				<p className={styles.cardTitle}>{item.title}</p>
				<p className={styles.cardPrice}>{item.price}</p>
			</div>
		</Link>
	)
}

export const MerchSection: FC<MerchSectionProps> = ({ className }) => {
	if (!heroItem || !topRight || !bottomLeft) {
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
				</header>

				<div className={styles.showcase}>
					<MerchProductCard item={heroItem} variant="hero" />

					<div className={styles.stagger}>
						<MerchProductCard
							item={topRight}
							variant="small"
							staggerClass={styles.cardTopRight}
						/>
						<MerchProductCard
							item={bottomLeft}
							variant="small"
							staggerClass={styles.cardBottomLeft}
						/>
					</div>
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
