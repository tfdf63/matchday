import Link from 'next/link'
import type { FC } from 'react'

import {
	FOOTER_BITRIX_SUBSCRIBE_SLOT_ID,
	footerAgencyHref,
	footerAgencyName,
	footerAgencyPrefix,
	footerBrandMark,
	footerNavColumn1,
	footerNavColumn2,
	footerNewsletterLeadParagraphs,
	footerNewsletterTitle,
	footerSocialTg,
	footerSocialVk,
} from '@/data/footer'

import styles from './SiteFooter.module.scss'

const SiteFooter: FC = () => {
	const year = new Date().getFullYear()

	return (
		<footer
			className={styles.footer}
			role="contentinfo"
			aria-label="Подвал"
		>
			<div className={styles.inner}>
				<div className={styles.subscribe}>
					<div className={styles.headingGroup}>
						<p className={styles.title}>
							{footerNewsletterTitle}
						</p>
						{footerNewsletterLeadParagraphs.map((line, i) => (
							<p key={i} className={cx('font-mono', styles.lead)}>
								{line}
							</p>
						))}
					</div>
					{/* Bitrix: вставка формы подписки в этот контейнер */}
					<div
						id={FOOTER_BITRIX_SUBSCRIBE_SLOT_ID}
						className={styles.bitrixSlot}
					/>
				</div>

				<div className={styles.bottom}>
					<nav
						className={styles.navGrid}
						aria-label="Разделы сайта"
					>
						<div className={styles.navCol}>
							{footerNavColumn1.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={styles.navLink}
								>
									{item.label}
								</Link>
							))}
						</div>
						<div className={styles.navCol}>
							{footerNavColumn2.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={styles.navLink}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>

					{/* 4810:18885 — сетка 2×2: (ВК|агентство), (Телеграм|©) */}
					<div className={styles.meta}>
						<a
							href={footerSocialVk.href}
							className={cx('font-mono', styles.socialLink)}
							rel="noopener noreferrer"
						>
							{footerSocialVk.label}
						</a>
						<p
							className={cx(
								'font-mono',
								styles.creditAgency,
							)}
						>
							<span className={styles.creditLine}>
								{footerAgencyPrefix}
							</span>
							<a
								href={footerAgencyHref}
								className={styles.creditLineLink}
								rel="noopener noreferrer"
							>
								{footerAgencyName}
							</a>
						</p>
						<a
							href={footerSocialTg.href}
							className={cx('font-mono', styles.socialLink)}
							rel="noopener noreferrer"
						>
							{footerSocialTg.label}
						</a>
						<p
							className={cx(
								'font-mono',
								styles.copyright,
							)}
						>
							©{year}. Все права защищены
						</p>
					</div>
				</div>

				<p className={styles.brandMark} aria-hidden>
					{footerBrandMark}
				</p>
			</div>
		</footer>
	)
}

function cx(...parts: Array<string | false | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export default SiteFooter
