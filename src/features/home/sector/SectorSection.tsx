'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
	defaultSectorLeadFirst,
	defaultSectorLeadSecond,
	defaultSectorTitle,
	sectors,
	type Sector,
} from '@/data/sector'

import styles from './Sector.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_HEADING_ID = 'sector-heading'

export type SectorSectionProps = {
	sectorsList?: Sector[]
	className?: string
}

export const SectorSection: FC<SectorSectionProps> = ({
	sectorsList: sectorsProp,
	className,
}) => {
	const list = sectorsProp ?? sectors
	const [activeId, setActiveId] = useState(list[0]?.id ?? '')

	const active = useMemo(
		() => list.find((s) => s.id === activeId) ?? list[0],
		[list, activeId],
	)

	const menuSectors = useMemo(
		() => list.filter((s) => s.id !== active.id),
		[list, active.id],
	)

	const menuScrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = menuScrollRef.current
		if (el) el.scrollTop = 0
	}, [active.id])

	const titleId = active ? `sector-card-title-${active.id}` : undefined

	if (!active) {
		return null
	}

	return (
		<section
			id="sector"
			className={cx(styles.section, className)}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<header className={styles.head}>
					<h2 id={SECTION_HEADING_ID} className={styles.heading}>
						<span className={styles.headingLine}>{defaultSectorTitle.line1}</span>
						<br />
						<span className={styles.headingLine}>{defaultSectorTitle.line2}</span>
					</h2>
					<div className={styles.leadBlock}>
						<p className={cx(styles.leadFirst, 'font-mono')}>
							{defaultSectorLeadFirst}
						</p>
						<p className={cx(styles.leadSecond, 'font-mono')}>
							{defaultSectorLeadSecond}
						</p>
					</div>
				</header>
				<div className={styles.body}>
					<article
						className={styles.activeCard}
						aria-labelledby={titleId}
						aria-live="polite"
					>
						<div className={styles.imageWrap}>
							<Image
								src={active.imageSrc}
								alt=""
								fill
								className={styles.image}
								sizes="288px"
							/>
						</div>
						<div className={styles.cardBody}>
							<div className={styles.titleRow}>
								<h3 id={titleId} className={styles.cardTitle}>
									{active.title}
								</h3>
								<span className={cx(styles.indexLabel, 'font-mono')}>
									{active.indexLabel}
								</span>
							</div>
							<p className={styles.price}>{active.priceLabel}</p>
							<p className={cx(styles.description, 'font-mono')}>
								{active.description}
							</p>
						</div>
						<Link
							href={active.ctaHref}
							className={cx(styles.cardCta, 'font-mono')}
						>
							{active.ctaLabel}
						</Link>
					</article>
					<div className={styles.menuShell}>
						<div className={styles.menuViewport}>
							<div
								ref={menuScrollRef}
								className={styles.menuScroll}
							>
								<ul
									className={styles.menuList}
									aria-label="Другие сектора"
								>
									{menuSectors.map((s) => (
										<li key={s.id}>
											<button
												type="button"
												className={styles.menuButton}
												aria-label={`${s.title} ${s.indexLabel}`}
												onClick={() => setActiveId(s.id)}
											>
												<span className={styles.menuButtonTitle}>
													{s.title}
												</span>
												<span
													className={cx(
														styles.menuButtonIndex,
														'font-mono',
													)}
												>
													{s.indexLabel}
												</span>
											</button>
										</li>
									))}
								</ul>
							</div>
							<div className={styles.menuGradient} aria-hidden />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
