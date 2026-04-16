import type { FC } from 'react'
import Link from 'next/link'

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
	const { titleLines, description, variant, ctaLabel, ctaHref } = card

	const headingId = `ticket-program-card-${card.id}-title`
	const titleForAria = titleLines.join(' ').trim()

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
			<Link
				href={ctaHref}
				className={cx(styles.cardCta, 'font-mono')}
				aria-label={`${titleForAria}: ${ctaLabel}`}
			>
				{ctaLabel}
			</Link>
		</article>
	)
}
