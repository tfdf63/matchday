import Image from 'next/image'
import type { ReactNode } from 'react'

import type {
	SectorGoldenSeason,
	SectorInlineSpan,
	SectorJoinStep,
	SectorPageBlock,
	SectorPageImage,
} from '@/data/sectorPages'

import pageStyles from './SectorPage.module.scss'
import modalStyles from './SectorGuideBlocksModal.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

type GuideStylesVariant = 'page' | 'modal'

function getGuideStyles(variant: GuideStylesVariant) {
	return variant === 'modal' ? modalStyles : pageStyles
}

export function SectorContentImage({
	image,
	variant = 'page',
}: {
	image: SectorPageImage
	variant?: GuideStylesVariant
}) {
	const styles = getGuideStyles(variant)

	return (
		<figure
			className={cx(
				styles.contentFigure,
				variant === 'modal' && modalStyles.modalFigure,
			)}
		>
			<Image
				src={image.src}
				alt={image.alt}
				width={image.width}
				height={image.height}
				className={cx(
					styles.contentImage,
					variant === 'modal' && modalStyles.modalFigureImage,
				)}
				sizes={
					variant === 'modal'
						? '(min-width: 767px) 640px, 100vw'
						: '(min-width: 1920px) 1840px, (min-width: 1600px) 1520px, (min-width: 1280px) 1200px, (min-width: 1024px) 944px, (min-width: 767px) 704px, 320px'
				}
			/>
		</figure>
	)
}

export function SectorInlineSpans({
	spans,
	variant = 'page',
}: {
	spans: readonly SectorInlineSpan[]
	variant?: GuideStylesVariant
}) {
	const styles = getGuideStyles(variant)

	return (
		<>
			{spans.map((span, index) =>
				span.type === 'link' ? (
					<a
						key={index}
						href={span.href}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.inlineLink}
					>
						{span.label}
					</a>
				) : (
					<span key={index}>{span.text}</span>
				),
			)}
		</>
	)
}

export function JoinStepsList({
	steps,
	variant = 'page',
}: {
	steps: readonly SectorJoinStep[]
	variant?: GuideStylesVariant
}) {
	const styles = getGuideStyles(variant)

	return (
		<ol className={cx(styles.joinList, 'font-mono')}>
			{steps.map((step, index) => (
				<li key={step.title ?? index} className={styles.joinItem}>
					<div className={styles.joinText}>
						{step.title ? (
							<p className={styles.joinStepTitle}>{step.title}</p>
						) : null}
						<p>
							<SectorInlineSpans spans={step.spans} variant={variant} />
						</p>
					</div>
				</li>
			))}
		</ol>
	)
}

export function SectorStructuredBlocks({
	blocks,
	variant = 'page',
}: {
	blocks: readonly SectorPageBlock[]
	variant?: GuideStylesVariant
}) {
	const styles = getGuideStyles(variant)

	return (
		<div className={styles.blocks}>
			{blocks.map(block => (
				<section key={block.title} className={styles.block}>
					<h3 className={styles.blockTitle}>{block.title}</h3>
					<p className={cx(styles.blockText, 'font-mono')}>{block.text}</p>
				</section>
			))}
		</div>
	)
}

export function SectorGoldenSeasonSection({
	goldenSeason,
	variant = 'page',
	headingId,
}: {
	goldenSeason: SectorGoldenSeason
	variant?: GuideStylesVariant
	headingId?: string
}) {
	const styles = getGuideStyles(variant)
	const HeadingTag = variant === 'modal' ? 'h3' : 'h2'

	return (
		<section
			className={cx(
				styles.guideSection,
				variant === 'modal' && styles.guideSectionGolden,
			)}
			aria-labelledby={headingId}
		>
			<HeadingTag
				id={headingId}
				className={cx(
					variant === 'page' ? styles.schemaHeading : styles.modalGuideHeading,
					variant === 'modal' && 'font-mono',
				)}
			>
				{goldenSeason.heading}
			</HeadingTag>
			<p className={cx(styles.blockText, 'font-mono')}>{goldenSeason.text}</p>
			<div className={styles.seasons}>
				{goldenSeason.seasons.map(season => (
					<div key={season.subtitle} className={styles.seasonGroup}>
						<h4 className={cx(styles.seasonSubtitle, 'font-mono')}>
							{season.subtitle}
						</h4>
						<ul className={cx(styles.seasonList, 'font-mono')}>
							{season.names.map(name => (
								<li key={name}>{name}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<SectorContentImage image={goldenSeason.image} variant={variant} />
		</section>
	)
}

export function SectorFanGuideContent({
	joinHeading,
	joinSteps,
	chantsHeading,
	chants,
	chantsImage,
	goldenSeason,
	variant = 'page',
	slug = 'fan',
}: {
	joinHeading?: string
	joinSteps?: readonly SectorJoinStep[]
	chantsHeading?: string
	chants?: readonly SectorPageBlock[]
	chantsImage?: SectorPageImage
	goldenSeason?: SectorGoldenSeason
	variant?: GuideStylesVariant
	slug?: string
}): ReactNode {
	const styles = getGuideStyles(variant)
	const JoinHeadingTag = variant === 'modal' ? 'h3' : 'h2'
	const ChantsHeadingTag = variant === 'modal' ? 'h3' : 'h2'

	return (
		<>
			{joinHeading || joinSteps?.length ? (
				<section
					className={styles.guideSection}
					aria-labelledby={
						joinHeading ? `sector-join-heading-${slug}` : undefined
					}
				>
					{joinHeading ? (
						<JoinHeadingTag
							id={`sector-join-heading-${slug}`}
							className={cx(
								variant === 'page'
									? styles.schemaHeading
									: styles.modalGuideHeading,
								variant === 'modal' && 'font-mono',
							)}
						>
							{joinHeading}
						</JoinHeadingTag>
					) : null}
					{joinSteps?.length ? (
						<JoinStepsList steps={joinSteps} variant={variant} />
					) : null}
				</section>
			) : null}

			{chantsHeading || chants?.length || chantsImage ? (
				<section
					className={styles.guideSection}
					aria-labelledby={
						chantsHeading ? `sector-chants-heading-${slug}` : undefined
					}
				>
					{chantsImage ? (
						<SectorContentImage image={chantsImage} variant={variant} />
					) : null}
					{chantsHeading ? (
						<ChantsHeadingTag
							id={`sector-chants-heading-${slug}`}
							className={cx(
								variant === 'page'
									? styles.schemaHeading
									: styles.modalGuideHeading,
								variant === 'modal' && 'font-mono',
							)}
						>
							{chantsHeading}
						</ChantsHeadingTag>
					) : null}
					{chants?.length ? (
						<SectorStructuredBlocks blocks={chants} variant={variant} />
					) : null}
				</section>
			) : null}

			{goldenSeason ? (
				<SectorGoldenSeasonSection
					goldenSeason={goldenSeason}
					variant={variant}
					headingId={`sector-golden-heading-${slug}`}
				/>
			) : null}
		</>
	)
}
