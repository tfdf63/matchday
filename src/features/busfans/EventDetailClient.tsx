'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { useMemo, useState } from 'react'

import type { BusFansDataset, MatchEvent } from '@/data/busfans'
import {
	formatBusScheduleLine,
	formatMatchDateLine,
} from '@/lib/busfans/busSchedule'
import { isFanMeetingEvent } from '@/lib/busfans/fanMeeting'
import {
	countFilteredPassengers,
	getDuplicateFullNamesForEvent,
	getManifestsForEvent,
	getPassengersForManifest,
	resolveListStatus,
} from '@/lib/busfans/selectors'

import { BusManifestCard } from './BusManifestCard'
import styles from './BusFansPage.module.scss'
import { MatchTeamsRow } from './MatchTeamsRow'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type EventDetailClientProps = {
	dataset: BusFansDataset
	event: MatchEvent
}

export const EventDetailClient: FC<EventDetailClientProps> = ({
	dataset,
	event,
}) => {
	const [filter, setFilter] = useState('')
	const listStatus = resolveListStatus(event)
	const isPending = listStatus === 'pending'
	const manifests = useMemo(
		() => getManifestsForEvent(dataset, event.id),
		[dataset, event.id],
	)
	const filteredTotal = useMemo(
		() => countFilteredPassengers(dataset, event.id, filter),
		[dataset, event.id, filter],
	)
	const duplicateFullNames = useMemo(
		() => getDuplicateFullNamesForEvent(dataset, event.id),
		[dataset, event.id],
	)

	const isFanMeeting = isFanMeetingEvent(event)
	const dateLine = formatMatchDateLine({
		dateCard: event.dateCard,
		dateLabel: event.dateLabel,
		time: event.time,
		kind: isFanMeeting ? 'event' : 'match',
	})
	const busLine = formatBusScheduleLine({
		matchTime: event.time,
		eventId: event.id,
	})

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<div className={styles.toolbar}>
					<Link href='/busfans' className={cx(styles.backBtn, 'font-mono')}>
						← К матчам
					</Link>
					{!isPending ? (
						<input
							type='search'
							className={styles.filterInput}
							placeholder='Фильтр по ФИО'
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							aria-label='Фильтр по ФИО'
						/>
					) : null}
				</div>

				<header className={styles.eventHeading}>
					{(event.leagueInfo || event.seasonTour) && (
						<div className={styles.metaCol}>
							{event.leagueInfo ? (
								<p className={cx(styles.leagueLine, 'font-mono')}>
									{event.leagueInfo}
								</p>
							) : null}
							{event.seasonTour ? (
								<p className={cx(styles.leagueLine, 'font-mono')}>
									{event.seasonTour}
								</p>
							) : null}
						</div>
					)}

					{dateLine ? (
						<p className={cx(styles.dateLine, 'font-mono')}>{dateLine}</p>
					) : null}
					{busLine ? (
						<p className={cx(styles.dateLine, 'font-mono')}>{busLine}</p>
					) : null}

					<MatchTeamsRow
						homeTeam={isFanMeeting ? event.title : event.homeTeam}
						awayTeam={event.awayTeam}
					/>

					{!isPending ? (
						<p className={cx(styles.metaLine, 'font-mono')}>
							Автобусов: {manifests.length} · показано болельщиков:{' '}
							{filteredTotal}
						</p>
					) : null}
				</header>

				{isPending ? (
					<p className={cx(styles.pendingNotice, 'font-mono')}>
						Список обновляется
					</p>
				) : (
					<div className={styles.busList}>
						{manifests.map((manifest) => (
							<BusManifestCard
								key={manifest.id}
								manifest={manifest}
								matchDateIso={event.dateIso}
								duplicateFullNames={duplicateFullNames}
								passengers={getPassengersForManifest(
									dataset,
									manifest.id,
									filter,
								)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
