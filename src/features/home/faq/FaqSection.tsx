'use client'

import type { FC } from 'react'
import { useId, useState } from 'react'

import { CarouselNavChevron } from '@/components/CarouselNavChevron'
import { faqItems, faqTitle } from '@/data/faq'

import styles from './FaqSection.module.scss'

const SECTION_HEADING_ID = 'faq-heading'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const FaqSection: FC = () => {
	const baseId = useId()
	const [openIndex, setOpenIndex] = useState(0)

	return (
		<section
			id="faq"
			className={styles.section}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<div className={styles.head}>
					<h2 id={SECTION_HEADING_ID} className={styles.title}>
						<span className={styles.titleLine}>{faqTitle.line1}</span>
						<span className={styles.titleLine}>{faqTitle.line2}</span>
						<span className={styles.titleLine}>{faqTitle.line3}</span>
					</h2>
				</div>

				<div className={styles.listBlock}>
					<ul className={styles.list} role="list">
					{faqItems.map((item, index) => {
						const isOpen = openIndex === index
						const trId = `${baseId}-tr-${item.id}`
						const panId = `${baseId}-panel-${item.id}`
						return (
							<li key={item.id} className={styles.item}>
								<div
									className={cx(
										styles.itemCard,
										isOpen && styles.itemCardOpen,
									)}
								>
									<button
										type="button"
										id={trId}
										className={styles.trigger}
										aria-expanded={isOpen}
										aria-controls={panId}
										onClick={() => {
											setOpenIndex((prev) =>
												prev === index ? -1 : index,
											)
										}}
									>
										<span className={styles.question}>
											{item.questionLines.map((line, li) => (
												<span
													key={`${item.id}-q${li}`}
													className={styles.questionLine}
												>
													{line}
												</span>
											))}
										</span>
										<span
											className={cx(
												styles.arrowSlot,
												isOpen ? styles.arrowOpen : styles.arrowClosed,
											)}
											aria-hidden
										>
											<CarouselNavChevron
												direction="right"
												className={styles.arrowIcon}
											/>
										</span>
									</button>

									<div
										id={panId}
										className={styles.panel}
										role="region"
										aria-labelledby={trId}
										hidden={!isOpen}
									>
										{item.answer.map((p, i) => (
											<p
												key={`${item.id}-a-${i}`}
												className={cx(styles.answer, 'font-mono')}
											>
												{p}
											</p>
										))}
									</div>
								</div>
							</li>
						)
					})}
					</ul>
				</div>
			</div>
		</section>
	)
}
