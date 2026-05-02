'use client'

import type { FC } from 'react'

import { BaseModal } from '@/components/Modal'
import {
	HOME_OFFERS_MODAL_LEAD,
	HOME_OFFERS_TABS,
	type HomeInfoModalVariant,
} from '@/data/homeInfoModals'

import { useHomeInfoModal } from './homeInfoModalContext'
import { HomeOffersModalContent } from './HomeOffersModalContent'
import styles from './HomeInfoModal.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_ORDER: HomeInfoModalVariant[] = [
	'promo',
	'tariffs',
	'socialTickets',
]

/** Figma 4810:33923 / 4810:33925 — weui Expand_right; слева с scaleX(-1) */
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

export const HomeInfoModalView: FC = () => {
	const { variant, open, close } = useHomeInfoModal()
	const isOpen = variant !== null
	const active = variant ?? 'promo'
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
			titleId="home-offers-modal-title"
			chrome="fullBleed"
		>
			<div className={styles.shell}>
				<div className={styles.scroll}>
					<h2 id="home-offers-modal-title" className={styles.mainTitle}>
						<span className={styles.titleLine}>Промокоды, тарифы,</span>
						<span className={styles.titleLine}>скидки</span>
					</h2>
					<div className={styles.leadBlock}>
						<p className={styles.leadKicker}>{HOME_OFFERS_MODAL_LEAD.kicker}</p>
						<p className={styles.leadBody}>{HOME_OFFERS_MODAL_LEAD.body}</p>
					</div>
					<div className={styles.tabs} role="tablist" aria-label="Разделы предложений">
						{HOME_OFFERS_TABS.map(tab => {
							const selected = active === tab.id
							return (
								<button
									key={tab.id}
									id={`home-offers-tab-${tab.id}`}
									type="button"
									role="tab"
									aria-selected={selected}
									className={cx(
										styles.tabBtn,
										selected ? styles.tabBtnActive : styles.tabBtnInactive,
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
						id={`home-offers-panel-${active}`}
						aria-labelledby={`home-offers-tab-${active}`}
					>
						<HomeOffersModalContent section={active} />
					</div>
				</div>
				<div className={styles.footerNav}>
					<button
						type="button"
						className={styles.navBtn}
						aria-label="Предыдущий раздел"
						onClick={goPrev}
					>
						<NavChevron flipped />
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
