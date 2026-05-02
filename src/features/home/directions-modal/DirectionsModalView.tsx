'use client'

import type { FC } from 'react'

import { BaseModal } from '@/components/Modal'
import {
	DIRECTIONS_MODAL_LEAD,
	DIRECTIONS_MODAL_TABS,
	DIRECTIONS_MODAL_TITLE_LINES,
	type DirectionsModalTabId,
} from '@/data/directionsModal'

import { DirectionsModalContent } from './DirectionsModalContent'
import { useDirectionsModal } from './directionsModalContext'
import styles from './DirectionsModal.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_ORDER: DirectionsModalTabId[] = ['tolyatti', 'samara']

function NavChevron({ flipped }: { flipped: boolean }) {
	return (
		<svg
			className={cx(styles.navChevron, flipped && styles.navChevronFlip)}
			width={40}
			height={40}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M10 6l6 6-6 6" />
		</svg>
	)
}

export const DirectionsModalView: FC = () => {
	const { variant, open, close } = useDirectionsModal()
	const isOpen = variant !== null
	const active = variant ?? 'tolyatti'
	const activeIndex = SECTION_ORDER.indexOf(active)

	const goPrev = () => {
		const i = SECTION_ORDER.indexOf(active)
		open(SECTION_ORDER[(i - 1 + SECTION_ORDER.length) % SECTION_ORDER.length]!)
	}

	const goNext = () => {
		const i = SECTION_ORDER.indexOf(active)
		open(SECTION_ORDER[(i + 1) % SECTION_ORDER.length]!)
	}

	return (
		<BaseModal
			open={isOpen}
			onClose={close}
			titleId="directions-modal-title"
			chrome="fullBleed"
		>
			<div className={styles.shell}>
				<div className={styles.scroll}>
					<h2 id="directions-modal-title" className={styles.mainTitle}>
						{DIRECTIONS_MODAL_TITLE_LINES.map(line => (
							<span key={line} className={styles.titleLine}>
								{line}
							</span>
						))}
					</h2>
					<div className={styles.leadBlock}>
						<p className={styles.leadLine1}>{DIRECTIONS_MODAL_LEAD.line1}</p>
						<p className={styles.leadLine2}>{DIRECTIONS_MODAL_LEAD.line2}</p>
					</div>
					<div className={styles.tabs} role="tablist" aria-label="Маршруты">
						{DIRECTIONS_MODAL_TABS.map((tab, tabIndex) => {
							const selected = active === tab.id
							const inactiveNeedsTopBorder =
								!selected && tabIndex === 0 && activeIndex === 1
							return (
								<button
									key={tab.id}
									id={`directions-tab-${tab.id}`}
									type="button"
									role="tab"
									aria-selected={selected}
									className={cx(
										styles.tabBtn,
										selected ? styles.tabBtnActive : styles.tabBtnInactive,
										inactiveNeedsTopBorder && styles.tabBtnInactiveWithTopBorder,
									)}
									onClick={() => open(tab.id)}
								>
									<span className={styles.tabLabel}>{tab.label}</span>
									<span className={styles.tabIndex}>{tab.indexLabel}</span>
								</button>
							)
						})}
					</div>
					<div
						role="tabpanel"
						id={`directions-panel-${active}`}
						aria-labelledby={`directions-tab-${active}`}
					>
						<DirectionsModalContent section={active} />
					</div>
				</div>
				<div className={styles.footerNav}>
					<button
						type="button"
						className={styles.navBtn}
						aria-label="Предыдущий раздел"
						onClick={goPrev}
					>
						<span className={styles.navChevronWrapDirectionsPrev}>
							<NavChevron flipped />
						</span>
					</button>
					<div
						className={styles.footerDots}
						role="status"
						aria-label={`Раздел ${activeIndex + 1} из ${SECTION_ORDER.length}`}
					>
						{SECTION_ORDER.map((id, i) => (
							<span
								key={id}
								className={cx(
									styles.footerDot,
									i === activeIndex && styles.footerDotActive,
								)}
								aria-hidden
							/>
						))}
					</div>
					<button
						type="button"
						className={styles.navBtn}
						aria-label="Следующий раздел"
						onClick={goNext}
					>
						<NavChevron flipped={false} />
					</button>
				</div>
			</div>
		</BaseModal>
	)
}
