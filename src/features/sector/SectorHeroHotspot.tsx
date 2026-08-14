'use client'

import Image from 'next/image'
import type { CSSProperties, FC } from 'react'
import { useMemo, useState } from 'react'

import { BaseModal } from '@/components/Modal'
import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'
import type { SectorPageHotspot } from '@/data/sectorPages'

import styles from './SectorHeroHotspot.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type SectorHeroHotspotProps = {
	hotspots: readonly SectorPageHotspot[]
	className?: string
}

export const SectorHeroHotspot: FC<SectorHeroHotspotProps> = ({
	hotspots,
	className,
}) => {
	const [openId, setOpenId] = useState<string | null>(null)

	const active = useMemo(
		() => hotspots.find(item => item.id === openId) ?? null,
		[hotspots, openId],
	)

	const modalItems = useMemo(() => {
		if (!active) return []
		return [
			{
				description: active.modalDescription,
				price: active.modalPrice,
				ctaLabel: active.modalCtaLabel,
				ctaHref: active.modalCtaHref,
				image: active.modalImage,
			},
			...(active.modalExtraItems ?? []),
		]
	}, [active])

	return (
		<>
			<div
				className={cx(styles.overlay, className)}
				aria-hidden={hotspots.length === 0}
			>
				{hotspots.map(hotspot => {
					const geometry = {
						'--x': hotspot.x,
						'--y': hotspot.y,
						'--w': hotspot.width,
						'--h': hotspot.height,
					} as CSSProperties

					return (
						<button
							key={hotspot.id}
							type='button'
							className={cx(
								styles.hotspot,
								openId === hotspot.id && styles.hotspotActive,
							)}
							style={geometry}
							aria-label={hotspot.label}
							onPointerEnter={event => {
								if (event.pointerType === 'mouse') {
									setOpenId(hotspot.id)
								}
							}}
							onClick={() => setOpenId(hotspot.id)}
						>
							<span className={styles.hotspotGlass} />
							<span className={styles.hotspotPointer} aria-hidden />
							<span className={cx(styles.hotspotCallout, 'font-mono')}>
								{hotspot.calloutLabel ?? hotspot.label}
							</span>
						</button>
					)
				})}
			</div>

			<BaseModal
				open={Boolean(active)}
				onClose={() => setOpenId(null)}
				title={active?.modalTitle ?? ''}
				panelClassName={styles.modalPanel}
				bodyClassName={styles.modalBody}
			>
				{active ? (
					<div className={styles.modalContent}>
						{modalItems.map((item, index) => (
							<div
								key={`${active.id}-${index}`}
								className={cx(
									styles.modalItem,
									index > 0 && styles.modalItemExtra,
								)}
							>
								{item.title ? (
									<h3 className={styles.modalItemTitle}>{item.title}</h3>
								) : null}
								<div className={styles.modalImageWrap}>
									<Image
										src={item.image.src}
										alt={item.image.alt}
										width={item.image.width}
										height={item.image.height}
										className={styles.modalImage}
										sizes='(min-width: 767px) 680px, 100vw'
									/>
								</div>
								<p className={cx(styles.modalDescription, 'font-mono')}>
									{item.description}
								</p>
								{item.price ? (
									<p className={cx(styles.modalPrice, 'font-mono')}>
										{item.price}
									</p>
								) : null}
								{item.ctaLabel && item.ctaHref ? (
									<a
										className={cx(
											matchCardStyles.btnPrimary,
											styles.modalBuyBtn,
											'font-mono',
										)}
										href={item.ctaHref}
										target='_blank'
										rel='noopener noreferrer'
									>
										{item.ctaLabel}
									</a>
								) : null}
							</div>
						))}
					</div>
				) : null}
			</BaseModal>
		</>
	)
}
