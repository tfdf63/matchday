'use client'

import { useCallback, useState, type FC } from 'react'

import type { PassengerAssignment } from '@/data/busfans'
import { isMinorOnMatchDate } from '@/lib/busfans/passengerAge'
import { normalizePassengerFullName } from '@/lib/busfans/selectors'

import styles from './BusFansPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function getRowHighlightClass(
	passenger: PassengerAssignment,
	options: {
		duplicateFullNames?: Set<string>
		matchDateIso: string
		highlightedOrderId: string | null
	},
): string | undefined {
	const orderActive = Boolean(options.highlightedOrderId)

	if (orderActive) {
		if (
			passenger.orderId &&
			passenger.orderId === options.highlightedOrderId
		) {
			return styles.tableRowSameOrder
		}
		return undefined
	}

	const isDuplicate = options.duplicateFullNames?.has(
		normalizePassengerFullName(passenger.fullName),
	)
	if (isDuplicate) return styles.tableRowDuplicate

	if (isMinorOnMatchDate(passenger.birthDateIso, options.matchDateIso)) {
		return styles.tableRowMinor
	}

	return undefined
}

export type PassengerTableProps = {
	passengers: PassengerAssignment[]
	matchDateIso: string
	duplicateFullNames?: Set<string>
}

export const PassengerTable: FC<PassengerTableProps> = ({
	passengers,
	matchDateIso,
	duplicateFullNames,
}) => {
	const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null)
	const [pinnedOrderId, setPinnedOrderId] = useState<string | null>(null)
	const highlightedOrderId = pinnedOrderId ?? hoveredOrderId

	const handleRowClick = useCallback((orderId: string | null | undefined) => {
		if (!orderId) return
		setPinnedOrderId((prev) => (prev === orderId ? null : orderId))
	}, [])

	const clearHover = useCallback(() => {
		setHoveredOrderId(null)
	}, [])

	if (!passengers.length) {
		return (
			<p className={cx(styles.empty, 'font-mono')}>
				Нет пассажиров по фильтру
			</p>
		)
	}

	return (
		<div className={styles.tableWrap}>
			<table className={cx(styles.table, 'font-mono')}>
				<thead>
					<tr>
						<th scope='col'>№</th>
						<th scope='col'>ФИО</th>
						<th scope='col'>Место</th>
					</tr>
				</thead>
				<tbody onMouseLeave={clearHover}>
					{passengers.map((p) => {
						const rowClass = getRowHighlightClass(p, {
							duplicateFullNames,
							matchDateIso,
							highlightedOrderId,
						})
						const hasOrder = Boolean(p.orderId)
						return (
							<tr
								key={`${p.manifestId}-${p.sourceRow}-${p.fullName}`}
								className={cx(
									rowClass,
									hasOrder && styles.tableRowOrderTarget,
								)}
								onMouseEnter={() => {
									if (p.orderId) setHoveredOrderId(p.orderId)
								}}
								onClick={() => handleRowClick(p.orderId)}
							>
								<td>{p.seq}</td>
								<td>{p.fullName}</td>
								<td>{p.seatNo?.trim() || '—'}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
