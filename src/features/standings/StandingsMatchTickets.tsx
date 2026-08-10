'use client'

import { getAppDateIso } from '@/lib/datetime/appTimezone'
import { useClientNow } from '@/lib/hooks/useClientNow'
import type { MatchVenue, SeasonCompetition } from '@/data/standings/types'
import { getStandingsTicketButtonsForMatch } from '@/lib/standings/gameTickets'

import { MatchTicketButtons } from './MatchTicketButtons'
import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

type Props = {
	dateIso: string
	opponent: string
	venue: MatchVenue
	competition?: SeasonCompetition
	isHomeRow: boolean
	isCupRow?: boolean
}

export function StandingsMatchTickets({
	dateIso,
	opponent,
	venue,
	competition,
	isHomeRow,
	isCupRow,
}: Props) {
	const now = useClientNow()
	if (!now) {
		return null
	}

	const buttons = getStandingsTicketButtonsForMatch(
		dateIso,
		opponent,
		venue,
		getAppDateIso(now),
		competition,
	)

	if (!buttons.length) {
		return null
	}

	return (
		<tr
			className={cx(
				styles.ticketRow,
				isCupRow
					? styles.rowCup
					: isHomeRow
						? styles.rowHome
						: styles.rowAway,
			)}
		>
			<td colSpan={6}>
				<MatchTicketButtons buttons={buttons} />
			</td>
		</tr>
	)
}
