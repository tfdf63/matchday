import type { FC } from 'react'

import type { StandingsTicketButton } from '@/lib/standings/gameTickets'

import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

type Props = {
	buttons: StandingsTicketButton[]
}

export const MatchTicketButtons: FC<Props> = ({ buttons }) => {
	if (!buttons.length) {
		return null
	}

	const count = buttons.length

	return (
		<div
			className={cx(
				styles.ticketActions,
				count === 1 && styles.ticketActionsSolo,
				'font-mono',
			)}
		>
			{buttons.map((button) => (
				<a
					key={button.label}
					className={cx(
						button.variant === 'primary'
							? styles.btnPrimary
							: styles.btnOutline,
					)}
					href={button.href}
					target='_blank'
					rel='noopener noreferrer'
				>
					{button.label}
				</a>
			))}
		</div>
	)
}
