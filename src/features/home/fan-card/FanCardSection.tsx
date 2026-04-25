'use client'

import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import {
	fanCardItems,
	fanCardLeadFirst,
	fanCardLeadSecond,
	fanCardTitle,
	type FanCardBlock,
	type FanCardTextPart,
} from '@/data/fanCard'

import styles from './FanCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_HEADING_ID = 'fan-card-heading'

const wrapLabel = (id: number) => `fan-card-tab-${id}`
const wrapPanel = (id: number) => `fan-card-panel-${id}`

function renderRichLine(parts: FanCardTextPart[], key: string): ReactNode {
	return (
		<span key={key} className={styles.bodyRich}>
			{parts.map((part, i) => {
				if (part.link) {
					return (
						<span key={`${key}-${i}`} className={styles.linkWithQuotes}>
							<span className={styles.guillemet}>«</span>
							<a
								className={styles.bodyLink}
								href={part.link.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{part.link.label}
							</a>
							<span className={styles.guillemet}>»</span>
						</span>
					)
				}
				return <span key={`${key}-t-${i}`}>{part.text}</span>
			})}
		</span>
	)
}

function renderBlock(block: FanCardBlock, key: string): ReactNode {
	switch (block.type) {
		case 'hero':
			return (
				<div key={key} className={styles.cardHero}>
					<p className={styles.cardHeroLineTop}>{block.lineTop}</p>
					<p className={styles.cardHeroLine}>{block.line1}</p>
				</div>
			)
		case 'bodyRich':
			return (
				<p key={key} className={cx(styles.bodyParagraph, 'font-mono')}>
					{renderRichLine(block.parts, key)}
				</p>
			)
		case 'emphasis':
			return (
				<p key={key} className={styles.emphasisBlock}>
					{block.text}
				</p>
			)
		case 'body':
			return (
				<p key={key} className={cx(styles.bodyParagraph, 'font-mono')}>
					{block.text}
				</p>
			)
		default:
			return null
	}
}

export type FanCardSectionProps = {
	className?: string
}

export const FanCardSection: FC<FanCardSectionProps> = ({ className }) => {
	const list = fanCardItems
	const [activeId, setActiveId] = useState(list[0]?.id ?? 1)
	const activeIndex = useMemo(() => {
		const i = list.findIndex((it) => it.id === activeId)
		return i < 0 ? 0 : i
	}, [list, activeId])
	const active = useMemo(
		() => list.find((it) => it.id === activeId) ?? list[0],
		[list, activeId],
	)

	if (!active) {
		return null
	}

	const n = list.length
	const canGoPrev = activeIndex > 0
	const canGoNext = activeIndex >= 0 && activeIndex < n - 1
	const goPrev = (): void => {
		if (!canGoPrev) return
		const next = list[activeIndex - 1]
		if (next) setActiveId(next.id)
	}
	const goNext = (): void => {
		if (!canGoNext) return
		const next = list[activeIndex + 1]
		if (next) setActiveId(next.id)
	}

	return (
		<section
			id="fan-card"
			className={cx(styles.section, className)}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<header className={styles.head}>
					<h2 id={SECTION_HEADING_ID} className={styles.heading}>
						<span className={styles.headingLine}>{fanCardTitle.line1}</span>
						<br />
						<span className={styles.headingLine}>{fanCardTitle.line2}</span>
					</h2>
					<div className={styles.leadBlock}>
						<p className={cx(styles.leadFirst, 'font-mono')}>{fanCardLeadFirst}</p>
						<p className={cx(styles.leadSecond, 'font-mono')}>{fanCardLeadSecond}</p>
					</div>
				</header>

				<div className={styles.body}>
					<div
						className={styles.menu}
						role="tablist"
						aria-label="Разделы о карте болельщика"
					>
						{list.map((item) => {
							const selected = item.id === activeId
							return (
								<button
									key={item.id}
									type="button"
									id={wrapLabel(item.id)}
									role="tab"
									aria-selected={selected}
									aria-controls={wrapPanel(item.id)}
									className={cx(
										styles.menuButton,
										selected && styles.menuButtonActive,
									)}
									onClick={() => {
										setActiveId(item.id)
									}}
								>
									<span className={styles.menuButtonTitle}>{item.menuLabel}</span>
									<span className={cx(styles.menuIndex, 'font-mono')}>
										{item.indexLabel}
									</span>
								</button>
							)
						})}
					</div>

					<div
						role="tabpanel"
						id={wrapPanel(active.id)}
						aria-labelledby={wrapLabel(active.id)}
						className={styles.panel}
						aria-live="polite"
					>
						<article className={styles.contentArticle}>
							{active.blocks.map((block, i) => renderBlock(block, `b-${active.id}-${i}`))}
						</article>

						<div
							className={styles.navRow}
							aria-label="Переключение разделов"
						>
							<button
								type="button"
								className={cx(
									styles.navArrowButton,
									!canGoPrev && styles.navArrowDisabled,
								)}
								aria-label="Предыдущий раздел"
								disabled={!canGoPrev}
								onClick={goPrev}
							>
								<span className={cx(styles.navArrowIcon, styles.navArrowIconLeft)} />
							</button>
							<div
								className={styles.pager}
								aria-hidden="true"
							>
								{list.map((item) => {
									const on = item.id === activeId
									return (
										<span
											key={item.id}
											className={cx(
												styles.pagerDot,
												on && styles.pagerDotOn,
											)}
										/>
									)
								})}
							</div>
							<button
								type="button"
								className={cx(
									styles.navArrowButton,
									!canGoNext && styles.navArrowDisabled,
								)}
								aria-label="Следующий раздел"
								disabled={!canGoNext}
								onClick={goNext}
							>
								<span className={cx(styles.navArrowIcon, styles.navArrowIconRight)} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
