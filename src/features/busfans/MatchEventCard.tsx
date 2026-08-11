'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { MatchEvent } from '@/data/busfans'
import {
	formatBusScheduleLine,
	formatMatchDateLine,
} from '@/lib/busfans/busSchedule'
import { isFanMeetingEvent } from '@/lib/busfans/fanMeeting'
import { CALENDAR_FON_CUP_ICON_SRC } from '@/lib/match/isFonbetCupMatch'

import styles from './BusFansPage.module.scss'
import { MatchTeamsRow } from './MatchTeamsRow'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function isCupMatchEvent(event: MatchEvent): boolean {
	if (event.tournament === 'Кубок') return true
	return /кубок/i.test(event.leagueInfo ?? '')
}

export type MatchEventCardProps = {
	event: MatchEvent
}

export const MatchEventCard: FC<MatchEventCardProps> = ({ event }) => {
	const eventHref = `/busfans/events/${encodeURIComponent(event.id)}`
	const venueLabel =
		event.venue === 'home'
			? 'Домашний'
			: event.venue === 'away'
				? 'Гостевой'
				: null
	// РПЛ (дома/гости) — всегда FAN ID; кубок и явный «Без fan id» — без.
	const resolvedFanId =
		event.tournament === 'РПЛ' || event.fanIdStatus === 'Fan id'
			? 'Fan id'
			: event.fanIdStatus === 'Без fan id' || event.tournament === 'Кубок'
				? 'Без fan id'
				: event.fanIdStatus
	const fanIdLabel =
		resolvedFanId === 'Fan id'
			? 'FAN ID'
			: resolvedFanId === 'Без fan id'
				? 'Без fan id'
				: null
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
	const hasMeta = Boolean(
		event.leagueInfo || event.seasonTour || dateLine || busLine,
	)
	const hasBadges = Boolean(venueLabel || fanIdLabel)
	const showCupUnderlay = isCupMatchEvent(event)

	return (
		<div className={styles.card}>
			{showCupUnderlay ? (
				<span className={styles.cardCupUnderlay} aria-hidden>
					<Image
						src={CALENDAR_FON_CUP_ICON_SRC}
						alt=''
						width={139}
						height={161}
						className={styles.cardCupIcon}
					/>
				</span>
			) : null}

			<div className={styles.cardContent}>
				{(hasMeta || hasBadges) && (
					<Link href={eventHref} className={styles.cardLinkSection}>
						<div className={styles.cardTop}>
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
								{dateLine ? (
									<p className={cx(styles.dateLine, 'font-mono')}>{dateLine}</p>
								) : null}
								{busLine ? (
									<p className={cx(styles.dateLine, 'font-mono')}>{busLine}</p>
								) : null}
							</div>

							{hasBadges ? (
								<div className={styles.badgeRow}>
									{venueLabel ? (
										<span
											className={cx(
												styles.venueBadge,
												'font-mono',
												event.venue === 'away' && styles.venueBadgeAway,
											)}
										>
											{venueLabel}
										</span>
									) : null}
									{fanIdLabel ? (
										<span
											className={cx(
												styles.fanIdBadge,
												'font-mono',
												resolvedFanId === 'Без fan id' &&
													styles.fanIdBadgeMuted,
											)}
										>
											{fanIdLabel}
										</span>
									) : null}
								</div>
							) : null}
						</div>
					</Link>
				)}

				<div className={styles.matchRow}>
					<Link href={eventHref} className={styles.cardLinkSection}>
						<MatchTeamsRow
							homeTeam={
								isFanMeeting ? event.title : event.homeTeam
							}
							awayTeam={event.awayTeam}
						/>
					</Link>

					<div className={styles.kpiCol}>
						<Link href={eventHref} className={styles.cardLinkSection}>
							<div className={styles.kpiRow}>
								<div className={styles.kpi}>
									<p className={cx(styles.kpiValue, 'font-mono')}>
										{event.busCount}
									</p>
									<p className={cx(styles.kpiLabel, 'font-mono')}>автобусы</p>
								</div>
								<div className={styles.kpi}>
									<p className={cx(styles.kpiValue, 'font-mono')}>
										{event.passengerCount}
									</p>
									<p className={cx(styles.kpiLabel, 'font-mono')}>
										болельщики
									</p>
								</div>
							</div>
						</Link>
						{event.registrationUrl ? (
							<a
								href={event.registrationUrl}
								target='_blank'
								rel='noopener noreferrer'
								className={cx(styles.registerBtn, 'font-mono')}
							>
								Регистрация
							</a>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}
