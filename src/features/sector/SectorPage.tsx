import Image from 'next/image'
import type { CSSProperties, FC, ReactNode } from 'react'

import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import { OfferBanner } from '@/features/home/offer/OfferBanner'
import type {
	SectorInlineSpan,
	SectorJoinStep,
	SectorPage as SectorPageData,
	SectorPageImage,
} from '@/data/sectorPages'

import styles from './SectorPage.module.scss'
import { SectorHeroHotspot } from './SectorHeroHotspot'
import { SectorPromos } from './SectorPromos'
import { YandexDealerWidget } from './YandexDealerWidget'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function SectorContentImage({ image }: { image: SectorPageImage }) {
	return (
		<figure className={styles.contentFigure}>
			<Image
				src={image.src}
				alt={image.alt}
				width={image.width}
				height={image.height}
				className={styles.contentImage}
				sizes='(min-width: 1920px) 1840px, (min-width: 1600px) 1520px, (min-width: 1280px) 1200px, (min-width: 1024px) 944px, (min-width: 767px) 704px, 320px'
			/>
		</figure>
	)
}

function SectorInlineSpans({
	spans,
}: {
	spans: readonly SectorInlineSpan[]
}) {
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

function JoinStepsList({ steps }: { steps: readonly SectorJoinStep[] }) {
	return (
		<ol className={cx(styles.joinList, 'font-mono')}>
			{steps.map((step, index) => (
				<li key={step.title ?? index} className={styles.joinItem}>
					<div className={styles.joinText}>
						{step.title ? (
							<p className={styles.joinStepTitle}>{step.title}</p>
						) : null}
						<p>
							<SectorInlineSpans spans={step.spans} />
						</p>
					</div>
				</li>
			))}
		</ol>
	)
}

export type SectorPageProps = {
	page: SectorPageData
}

export const SectorPage: FC<SectorPageProps> = ({ page }) => {
	const BlockHeading = page.introHeading ? 'h3' : 'h2'
	const schema = page.schema
	const schemaCropStyle = schema
		? ({
				'--schema-w': schema.width,
				'--schema-h': schema.height,
			} as CSSProperties)
		: undefined

	const schemaSection = schema ? (
		<section
			className={styles.schemaSection}
			aria-labelledby={
				page.schemaHeading
					? `sector-schema-heading-${page.slug}`
					: undefined
			}
		>
			{page.schemaHeading || page.schemaSubtitle ? (
				<header className={styles.schemaHeader}>
					{page.schemaHeading ? (
						<h2
							id={`sector-schema-heading-${page.slug}`}
							className={styles.schemaHeading}
						>
							{page.schemaHeading}
						</h2>
					) : null}
					{page.schemaSubtitle ? (
						<p className={cx(styles.schemaSubtitle, 'font-mono')}>
							{page.schemaSubtitle}
						</p>
					) : null}
				</header>
			) : null}

			<div
				className={cx(
					styles.schemaCrop,
					page.schemaAnchor === 'top' && styles.schemaCropTop,
					page.schemaAnchor === 'full' && styles.schemaFull,
				)}
				style={schemaCropStyle}
			>
				<Image
					src={schema.src}
					alt={schema.alt}
					width={schema.width}
					height={schema.height}
					className={cx(
						styles.schemaImage,
						page.schemaAnchor === 'top' && styles.schemaImageTop,
						page.schemaAnchor === 'full' && styles.schemaImageFull,
					)}
					sizes='(min-width: 1920px) 1840px, (min-width: 1600px) 1520px, (min-width: 1280px) 1200px, (min-width: 1024px) 944px, (min-width: 767px) 704px, 320px'
				/>
			</div>
		</section>
	) : null

	const hasBlocks =
		page.blocks.length > 0 ||
		Boolean(page.blocksImage) ||
		Boolean(page.blocksAside?.length) ||
		Boolean(page.blocksAsideWide) ||
		Boolean(page.closing)

	const blocksBody =
		page.blocks.length > 0 ||
		Boolean(page.blocksAside?.length) ||
		Boolean(page.blocksAsideWide) ||
		Boolean(page.closing)

	const blocksSection = hasBlocks ? (
		<>
			{page.blocksImage ? (
				<SectorContentImage image={page.blocksImage} />
			) : null}
			{blocksBody ? (
		<div
			className={cx(
				styles.blocksRow,
				Boolean(page.blocksAside?.length || page.blocksAsideWide) &&
					styles.blocksRowWithAside,
			)}
		>
			<div
				className={cx(
					styles.blocks,
					page.blocksLayout === 'grid' && styles.blocksGrid,
				)}
			>
				{page.blocks.map(block => (
					<section key={block.title} className={styles.block}>
						<BlockHeading className={styles.blockTitle}>
							{block.title}
						</BlockHeading>
						<p className={cx(styles.blockText, 'font-mono')}>{block.text}</p>
					</section>
				))}
				{page.closing ? (
					<p className={cx(styles.closing, 'font-mono')}>{page.closing}</p>
				) : null}
			</div>
			{page.blocksAside?.length ? (
				<div className={styles.blocksAside}>
					{page.blocksAside.map(image => (
						<Image
							key={image.src}
							src={image.src}
							alt={image.alt}
							width={image.width}
							height={image.height}
							className={styles.blocksAsideImage}
						/>
					))}
				</div>
			) : null}
			{page.blocksAsideWide ? (
				<div className={styles.blocksAsideWide}>
					<Image
						src={page.blocksAsideWide.src}
						alt={page.blocksAsideWide.alt}
						width={page.blocksAsideWide.width}
						height={page.blocksAsideWide.height}
						className={styles.blocksAsideWideImage}
						sizes='(min-width: 767px) 48vw, 0px'
					/>
				</div>
			) : null}
		</div>
			) : null}
		</>
	) : null

	const hasGuide =
		Boolean(page.joinHeading) ||
		Boolean(page.joinSteps?.length) ||
		Boolean(page.joinGroups?.length) ||
		Boolean(page.chantsHeading) ||
		Boolean(page.chants?.length) ||
		Boolean(page.chantsImage) ||
		Boolean(page.goldenSeason) ||
		Boolean(page.offer) ||
		Boolean(page.communityCta)

	const communityButtons = page.communityCta
		? page.communityCta.buttons ??
			(page.communityCta.label && page.communityCta.href
				? [
						{
							label: page.communityCta.label,
							href: page.communityCta.href,
						},
					]
				: [])
		: []

	const guideSection = hasGuide ? (
		<div className={styles.guide}>
			{page.offer ? (
				<OfferBanner
					title={page.offer.title}
					subtitle={page.offer.subtitle}
					description={page.offer.description}
					headingId={`sector-offer-heading-${page.slug}`}
					className={styles.offerCard}
					imageWrapClassName={styles.offerImageWrap}
					pictureClassName={styles.offerPicture}
					imageClassName={styles.offerImage}
					imageSrc={page.offer.image.src}
					imageSrcTablet={page.offer.image.src}
					imageSrcWide={page.offer.image.src}
					imageSrcLaptop={page.offer.image.src}
					imageSrcDesktop={page.offer.image.src}
					imageSrcDesktopXl={page.offer.image.src}
				/>
			) : null}
			{page.joinHeading ||
			page.joinSteps?.length ||
			page.joinGroups?.length ? (
				<section
					id='join'
					className={styles.guideSection}
					aria-labelledby={
						page.joinHeading
							? `sector-join-heading-${page.slug}`
							: undefined
					}
				>
					{page.joinHeading ? (
						<h2
							id={`sector-join-heading-${page.slug}`}
							className={styles.schemaHeading}
						>
							{page.joinHeading}
						</h2>
					) : null}
					{page.joinGroups?.length
						? page.joinGroups.map(group => (
								<div key={group.subtitle} className={styles.joinGroup}>
									<h3 className={cx(styles.seasonSubtitle, 'font-mono')}>
										{group.subtitle}
									</h3>
									{group.steps?.length ? (
										<JoinStepsList steps={group.steps} />
									) : null}
									{group.blocks?.length ? (
										<div className={styles.blocks}>
											{group.blocks.map(block => (
												<section
													key={block.title}
													className={styles.block}
												>
													<h4 className={styles.blockTitle}>
														{block.title}
													</h4>
													<p className={cx(styles.blockText, 'font-mono')}>
														{block.text}
													</p>
												</section>
											))}
										</div>
									) : null}
								</div>
							))
						: page.joinSteps?.length ? (
								<JoinStepsList steps={page.joinSteps} />
							) : null}
				</section>
			) : null}

			{page.chantsHeading || page.chants?.length || page.chantsImage ? (
				<section
					className={styles.guideSection}
					aria-labelledby={
						page.chantsHeading
							? `sector-chants-heading-${page.slug}`
							: undefined
					}
				>
					{page.chantsImage ? (
						<SectorContentImage image={page.chantsImage} />
					) : null}
					{page.chantsHeading ? (
						<h2
							id={`sector-chants-heading-${page.slug}`}
							className={styles.schemaHeading}
						>
							{page.chantsHeading}
						</h2>
					) : null}
					{page.chants?.length ? (
						<div className={styles.blocks}>
							{page.chants.map(chant => (
								<section key={chant.title} className={styles.block}>
									<h3 className={styles.blockTitle}>{chant.title}</h3>
									<p className={cx(styles.blockText, 'font-mono')}>
										{chant.text}
									</p>
								</section>
							))}
						</div>
					) : null}
				</section>
			) : null}

			{page.goldenSeason ? (
				<section
					className={styles.guideSection}
					aria-labelledby={`sector-golden-heading-${page.slug}`}
				>
					<h2
						id={`sector-golden-heading-${page.slug}`}
						className={styles.schemaHeading}
					>
						{page.goldenSeason.heading}
					</h2>
					<p className={cx(styles.blockText, 'font-mono')}>
						{page.goldenSeason.text}
					</p>
					<div className={styles.seasons}>
						{page.goldenSeason.seasons.map(season => (
							<div key={season.subtitle} className={styles.seasonGroup}>
								<h3 className={cx(styles.seasonSubtitle, 'font-mono')}>
									{season.subtitle}
								</h3>
								<ul className={cx(styles.seasonList, 'font-mono')}>
									{season.names.map(name => (
										<li key={name}>{name}</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<SectorContentImage image={page.goldenSeason.image} />
				</section>
			) : null}

			{communityButtons.length ? (
				<section
					className={styles.guideSection}
					aria-labelledby={
						page.communityCta?.heading
							? `sector-community-heading-${page.slug}`
							: undefined
					}
				>
					{page.communityCta?.heading ? (
						<h2
							id={`sector-community-heading-${page.slug}`}
							className={styles.schemaHeading}
						>
							{page.communityCta.heading}
						</h2>
					) : null}
					<div className={styles.communityBtns}>
						{communityButtons.map(button => (
							<a
								key={button.href}
								className={cx(
									matchCardStyles.btnPrimary,
									styles.communityBtn,
									'font-mono',
								)}
								href={button.href}
								target='_blank'
								rel='noopener noreferrer'
							>
								{button.label}
							</a>
						))}
					</div>
				</section>
			) : null}
		</div>
	) : null

	const mainSections: ReactNode = page.blocksBeforeSchema ? (
		<>
			{blocksSection}
			{schemaSection}
			{guideSection}
		</>
	) : (
		<>
			{schemaSection}
			{blocksSection}
			{guideSection}
		</>
	)

	return (
		<div className={cx(styles.page, page.slug === 'fan' && styles.pageFan)}>
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

				{page.introHeading || page.introSubtitle ? (
					<header
						className={styles.introHeader}
						aria-labelledby={
							page.introHeading
								? `sector-intro-heading-${page.slug}`
								: undefined
						}
					>
						{page.introHeading ? (
							<h2
								id={`sector-intro-heading-${page.slug}`}
								className={styles.introHeading}
							>
								{page.introHeading}
							</h2>
						) : null}
						{page.introSubtitle ? (
							<p className={cx(styles.introSubtitle, 'font-mono')}>
								{page.introSubtitle}
							</p>
						) : null}
					</header>
				) : null}

				{mainSections}

				{page.preTicketsImage || page.showPromos ? (
					<section
						className={styles.promosSection}
						aria-labelledby={
							page.promosHeading
								? `sector-promos-heading-${page.slug}`
								: undefined
						}
					>
						{page.promosHeading ? (
							<h2
								id={`sector-promos-heading-${page.slug}`}
								className={styles.promosHeading}
							>
								{page.promosHeading}
							</h2>
						) : null}
						<div
							className={cx(
								styles.promosRow,
								page.preTicketsImage &&
									page.showPromos &&
									styles.promosRowWithImage,
							)}
						>
							{page.showPromos ? <SectorPromos /> : null}
							{page.preTicketsImage ? (
								<figure className={styles.preTicketsFigure}>
									<Image
										src={page.preTicketsImage.src}
										alt={page.preTicketsImage.alt}
										width={page.preTicketsImage.width}
										height={page.preTicketsImage.height}
										className={styles.preTicketsImage}
										sizes='(min-width: 767px) 48vw, 320px'
									/>
								</figure>
							) : null}
						</div>
					</section>
				) : null}

				{page.ticketsHeading ? (
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
				) : null}
			</div>
		</div>
	)
}
