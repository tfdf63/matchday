'use client'

import type { FC } from 'react'
import Link from 'next/link'

import { useTicketLinks } from '@/lib/personalData'

import type { TicketProgramCard as TicketProgramCardData } from '@/data/ticketProgram'

import styles from './TicketProgram.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const variantClass = {
	solid_dark: styles.cardSolid_dark,
	solid_red: styles.cardSolid_red,
	pattern: styles.cardPattern,
} as const

export type TicketProgramCardProps = {
	card: TicketProgramCardData
	className?: string
}

export const TicketProgramCard: FC<TicketProgramCardProps> = ({
	card,
	className,
}) => {
	const { personalData, getTicketUrl, handleTicketClick } = useTicketLinks()
	const { titleLines, description, variant, ctaLabel, ctaHref } = card

	const headingId = `ticket-program-card-${card.id}-title`
	const titleForAria = titleLines.join(' ').trim()

	const isExternal = ctaHref.startsWith('http')
	const isTicketLink = ctaHref.includes('widget.afisha.yandex.ru')
	const href = personalData && isTicketLink ? getTicketUrl(ctaHref) : ctaHref

	return (
		<article
				className={cx(styles.card, variantClass[variant], className)}
				data-variant={variant}
				aria-labelledby={headingId}
			>
				<div className={styles.cardTop}>
					<div className={styles.cardGrid}>
						<h3 id={headingId} className={styles.cardTitle}>
							{titleLines.map((line, i) => (
								<span key={i} className={styles.cardTitleLine}>
									{i > 0 ? <br /> : null}
									{line}
								</span>
							))}
						</h3>
						<p className={cx(styles.cardDesc, 'font-mono')}>{description}</p>
					</div>
				</div>
				{!isTicketLink || personalData ? (
					isExternal ? (
						<a
							href={href}
							className={cx(styles.cardCta, 'font-mono')}
							aria-label={`${titleForAria}: ${ctaLabel}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							{ctaLabel}
						</a>
					) : (
						<Link
							href={href}
							className={cx(styles.cardCta, 'font-mono')}
							aria-label={`${titleForAria}: ${ctaLabel}`}
						>
							{ctaLabel}
						</Link>
					)
				) : (
					<a
						href={ctaHref}
						className={cx(styles.cardCta, 'font-mono')}
						aria-label={`${titleForAria}: ${ctaLabel}`}
						target='_blank'
						rel='noopener noreferrer'
						onClick={e => {
							if (handleTicketClick(ctaHref)) e.preventDefault()
						}}
					>
						{ctaLabel}
					</a>
				)}
		</article>
	)
}
