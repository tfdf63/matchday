'use client'

import type { FC } from 'react'
import { useMemo, useState } from 'react'

import {
	rules,
	rulesLeadFirst,
	rulesLeadSecond,
	rulesTitle,
	type Rule,
} from '@/data/rules'

import styles from './Rules.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_HEADING_ID = 'rules-heading'

export type RulesSectionProps = {
	rulesList?: Rule[]
	className?: string
}

export const RulesSection: FC<RulesSectionProps> = ({ rulesList, className }) => {
	const list = rulesList ?? rules
	const [activeId, setActiveId] = useState(list[0]?.id ?? 0)
	const activeIndex = useMemo(
		() => list.findIndex((rule) => rule.id === activeId),
		[list, activeId],
	)
	const activeRule = useMemo(
		() => list.find((rule) => rule.id === activeId) ?? list[0],
		[list, activeId],
	)
	const canGoPrev = activeIndex > 0
	const canGoNext = activeIndex >= 0 && activeIndex < list.length - 1

	const handlePrev = (): void => {
		if (!canGoPrev) return
		const nextRule = list[activeIndex - 1]
		if (nextRule) setActiveId(nextRule.id)
	}

	const handleNext = (): void => {
		if (!canGoNext) return
		const nextRule = list[activeIndex + 1]
		if (nextRule) setActiveId(nextRule.id)
	}

	if (!activeRule) {
		return null
	}

	return (
		<section
			id="rules"
			className={cx(styles.section, className)}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<div className={styles.leftSection}>
					<header className={styles.head}>
						<h2 id={SECTION_HEADING_ID} className={styles.heading}>
							<span className={styles.headingLine}>{rulesTitle.line1}</span>
							<br />
							<span className={styles.headingLine}>{rulesTitle.line2}</span>
						</h2>
						<div className={styles.leadBlock}>
							<p className={cx(styles.leadFirst, 'font-mono')}>{rulesLeadFirst}</p>
							<p className={cx(styles.leadSecond, 'font-mono')}>{rulesLeadSecond}</p>
						</div>
					</header>
					<div className={styles.navArrows} aria-label="Навигация по правилам">
						<button
							type="button"
							className={cx(styles.navArrowButton, !canGoPrev && styles.navArrowDisabled)}
							disabled={!canGoPrev}
							aria-label="Предыдущее правило"
							onClick={handlePrev}
						>
							<span className={cx(styles.navArrowIcon, styles.navArrowIconLeft)} />
						</button>
						<button
							type="button"
							className={cx(styles.navArrowButton, !canGoNext && styles.navArrowDisabled)}
							disabled={!canGoNext}
							aria-label="Следующее правило"
							onClick={handleNext}
						>
							<span className={cx(styles.navArrowIcon, styles.navArrowIconRight)} />
						</button>
					</div>
				</div>

				<div className={styles.rightSection}>
					<div className={styles.body}>
						<article className={styles.activeCard} aria-live="polite">
							<div className={styles.cardContent}>
								<div className={styles.titleRow}>
									<h3 className={styles.cardTitle}>{activeRule.title}</h3>
									<span className={cx(styles.indexLabel, 'font-mono')}>
										{activeRule.indexLabel}
									</span>
								</div>
								<p className={cx(styles.cardDescription, 'font-mono')}>
									{activeRule.description}
								</p>
							</div>
							<div className={styles.cardImageWrap}>
								<picture className={styles.cardPicture}>
									<source
										media="(min-width: 1600px)"
										srcSet={
											activeRule.image1600 ??
											activeRule.image1280 ??
											activeRule.image1024 ??
											activeRule.image768 ??
											activeRule.image
										}
									/>
									<source
										media="(min-width: 1280px)"
										srcSet={
											activeRule.image1280 ??
											activeRule.image1024 ??
											activeRule.image768 ??
											activeRule.image
										}
									/>
									<source
										media="(min-width: 1024px)"
										srcSet={
											activeRule.image1024 ??
											activeRule.image768 ??
											activeRule.image
										}
									/>
									<source
										media="(min-width: 767px)"
										srcSet={activeRule.image768 ?? activeRule.image}
									/>
									<img src={activeRule.image} alt="" className={styles.cardImage} />
								</picture>
							</div>
						</article>
						<div className={styles.menuViewport}>
							<div className={styles.menuScroll}>
								<ul className={styles.menuList} aria-label="Основные правила">
									{list
										.filter((rule) => rule.id !== activeRule.id)
										.map((rule) => {
											const titleParts = rule.title.split(' / ')

											return (
												<li key={rule.id} className={styles.menuItem}>
													<button
														type="button"
														className={styles.menuButton}
														onClick={() => {
															setActiveId(rule.id)
														}}
													>
														<span className={styles.menuButtonTitle}>
															{titleParts.length > 1 ? (
																<>
																	<span>{titleParts[0]}</span>
																	<span
																		className={
																			styles.menuButtonTitleSuffix
																		}
																	>
																		{' / '}
																		{titleParts
																			.slice(1)
																			.join(' / ')}
																	</span>
																</>
															) : (
																rule.title
															)}
														</span>
														<span
															className={cx(
																styles.menuButtonIndex,
																'font-mono',
															)}
														>
															{rule.indexLabel}
														</span>
													</button>
												</li>
											)
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
