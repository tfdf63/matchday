import Image from 'next/image'
import type { CSSProperties, FC } from 'react'

import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import type { SectorPage as SectorPageData } from '@/data/sectorPages'

import styles from './SectorPage.module.scss'
import { SectorHeroHotspot } from './SectorHeroHotspot'
import { YandexDealerWidget } from './YandexDealerWidget'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type SectorPageProps = {
	page: SectorPageData
}

export const SectorPage: FC<SectorPageProps> = ({ page }) => {
	const schemaCropStyle = {
		'--schema-w': page.schema.width,
		'--schema-h': page.schema.height,
	} as CSSProperties

	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<Image
					src={page.hero.src}
					alt={page.hero.alt}
					width={page.hero.width}
					height={page.hero.height}
					className={styles.heroImage}
					sizes='100vw'
					priority
				/>
				{page.hotspots?.length ? (
					<SectorHeroHotspot
						hotspots={page.hotspots}
						className={styles.heroHotspots}
					/>
				) : null}
			</div>

			<div className={styles.inner}>
				<header className={styles.header}>
					<div className={styles.titleRow}>
						<h1 className={styles.title}>{page.heading}</h1>
						<a
							className={cx(
								matchCardStyles.btnPrimary,
								styles.buyBtn,
								'font-mono',
							)}
							href={page.buyHref}
						>
							{page.buyLabel}
						</a>
					</div>
					<p className={cx(styles.subtitle, 'font-mono')}>{page.subtitle}</p>
				</header>

				<div className={styles.schemaCrop} style={schemaCropStyle}>
					<Image
						src={page.schema.src}
						alt={page.schema.alt}
						width={page.schema.width}
						height={page.schema.height}
						className={styles.schemaImage}
						sizes='(min-width: 1280px) 1200px, 100vw'
					/>
				</div>

				<div className={styles.blocks}>
					{page.blocks.map((block) => (
						<section key={block.title} className={styles.block}>
							<h2 className={styles.blockTitle}>{block.title}</h2>
							<p className={cx(styles.blockText, 'font-mono')}>{block.text}</p>
						</section>
					))}
					<p className={cx(styles.closing, 'font-mono')}>{page.closing}</p>
				</div>

				<section
					id='buy'
					className={styles.buySection}
					aria-labelledby={`sector-buy-heading-${page.slug}`}
				>
					<h2
						id={`sector-buy-heading-${page.slug}`}
						className={styles.buyHeading}
					>
						{page.ticketsHeading}
					</h2>
					{page.dealerWidget ? (
						<YandexDealerWidget
							clientKey={page.dealerWidget.clientKey}
							regionId={page.dealerWidget.regionId}
							venueId={page.dealerWidget.venueId}
							height={page.dealerWidget.height}
							className={styles.widget}
						/>
					) : page.widgetSrc ? (
						<iframe
							className={styles.widget}
							src={page.widgetSrc}
							title={page.ticketsHeading}
							loading='lazy'
						/>
					) : (
						<div className={styles.widgetSlot} aria-hidden />
					)}
				</section>
			</div>
		</div>
	)
}
