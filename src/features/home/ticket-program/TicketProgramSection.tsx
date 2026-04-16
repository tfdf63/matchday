import type { FC } from 'react'

import {
	defaultTicketProgramLead,
	defaultTicketProgramTitle,
	ticketProgramCards,
	type TicketProgramCard as TicketProgramCardData,
} from '@/data/ticketProgram'

import { TicketProgramCarousel } from './TicketProgramCarousel'
import styles from './TicketProgram.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_HEADING_ID = 'ticket-program-heading'

export type TicketProgramSectionProps = {
	/** Заголовок секции (4810:21127). */
	title?: string
	/** Подзаголовок под заголовком (4810:21128). */
	lead?: string
	cards?: TicketProgramCardData[]
	className?: string
}

export const TicketProgramSection: FC<TicketProgramSectionProps> = ({
	title = defaultTicketProgramTitle,
	lead = defaultTicketProgramLead,
	cards: cardsProp,
	className,
}) => {
	const cards = cardsProp ?? ticketProgramCards

	return (
		<section
			id="ticket-program"
			className={cx(styles.section, className)}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<header className={styles.head}>
					<h2 id={SECTION_HEADING_ID} className={styles.heading}>
						{title}
					</h2>
					<p className={cx(styles.lead, 'font-mono')}>{lead}</p>
				</header>
				<TicketProgramCarousel
					cards={cards}
					ariaLabelledBy={SECTION_HEADING_ID}
				/>
			</div>
		</section>
	)
}
