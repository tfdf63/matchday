import Image from 'next/image'
import { Home, Plane } from 'lucide-react'
import { Fragment, type FC } from 'react'

import { CURRENT_STANDINGS_SEASON_ID } from '@/data/standings'
import { getTeamLogoPath } from '@/data/teamLogos'
import type {
	MultiSeasonCalendarRow,
	MultiSeasonColumn,
	SeasonResultCell,
} from '@/lib/standings/multiSeasonRows'
import {
	formatWhenDisplay,
	getPtsClass,
} from '@/lib/standings/seasonStats'

import { StandingsMatchTickets } from './StandingsMatchTickets'

import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

type Props = {
	seasonLabel: string
	timezone: string
	rows: MultiSeasonCalendarRow[]
	columns: MultiSeasonColumn[]
}

function MatchMetaLine({
	dateIso,
	when,
	venue,
}: {
	dateIso: string
	when: MultiSeasonCalendarRow['when']
	venue: MultiSeasonCalendarRow['venue']
}) {
	const display = formatWhenDisplay(dateIso, when)
	const VenueIcon = venue === 'home' ? Home : Plane
	const venueLabel = venue === 'home' ? 'Дома' : 'В гостях'

	return (
		<div className={cx(styles.matchMeta, 'font-mono')}>
			<VenueIcon
				className={styles.matchMetaIcon}
				aria-label={venueLabel}
			/>
			{display.kind === 'range' ? (
				<span className={styles.matchMetaRange}>{display.label}</span>
			) : (
				<span className={styles.matchMetaWhen}>
					<span>{display.dateLine}</span>
					{display.timeLine ? (
						<>
							<span className={styles.matchMetaSep} aria-hidden>
								·
							</span>
							<span className={styles.matchMetaTime}>
								{display.timeLine}
							</span>
						</>
					) : null}
				</span>
			)}
		</div>
	)
}

function SeasonResultCell({
	result,
	isCupRow,
}: {
	result: SeasonResultCell | null
	isCupRow: boolean
}) {
	if (!result?.played || !result.score) {
		return <span className={styles.dash}>—</span>
	}

	const ptsClass = getPtsClass(result.pts)
	const showPts = !isCupRow && result.pts !== null

	return (
		<div className={styles.resultCell}>
			<span className={styles.score}>{result.score}</span>
			{showPts ? (
				<span
					className={cx(
						styles.pts,
						ptsClass === 'win' && styles.ptsWin,
						ptsClass === 'draw' && styles.ptsDraw,
						ptsClass === 'loss' && styles.ptsLoss,
					)}
				>
					{result.pts}
				</span>
			) : null}
		</div>
	)
}

export const SeasonCalendarTable: FC<Props> = ({
	seasonLabel,
	timezone,
	rows,
	columns,
}) => {
	const hasCup = rows.some((row) => row.competition === 'cup')
	const ticketColSpan = 3 + columns.length
	const activeSeasonId = CURRENT_STANDINGS_SEASON_ID

	return (
		<section className={styles.seasonBlock}>
			<h2 className={styles.seasonTitle}>
				Сезон {seasonLabel} · {timezone}
			</h2>

			<div className={styles.legend}>
				<span>
					<Home className={styles.legendIcon} aria-hidden />
					Дома
				</span>
				<span>
					<Plane className={styles.legendIcon} aria-hidden />
					В гостях
				</span>
				{hasCup ? (
					<span>
						<span className={styles.legendCupSwatch} aria-hidden />
						Кубок
					</span>
				) : null}
			</div>

			<div className={styles.tableWrap}>
				<table
					className={cx(styles.table, styles.tableMultiSeason, 'font-mono')}
				>
					<colgroup>
						<col className={styles.colTour} />
						<col className={styles.colLogo} />
						<col className={styles.colTeam} />
						{columns.map((column) => (
							<col
								key={column.id}
								className={styles.colSeason}
							/>
						))}
					</colgroup>
					<thead>
						<tr>
							<th scope='col' className={styles.colTour}>
								Тур
							</th>
							<th scope='col' className={styles.colLogo}>
								<span className={styles.srOnly}>Логотип</span>
							</th>
							<th scope='col' className={styles.colTeam}>
								Соперник
							</th>
							{columns.map((column) => (
								<th
									key={column.id}
									scope='col'
									className={cx(
										styles.colSeason,
										column.id === activeSeasonId &&
											styles.colSeasonActive,
									)}
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							const logo = getTeamLogoPath(row.team)
							const isCup = row.competition === 'cup'
							const rowKey = `${row.competition ?? 'rpl'}-${row.date}-${row.team}-${row.venue}`

							return (
								<Fragment key={rowKey}>
									<tr
										className={cx(
											isCup
												? styles.rowCup
												: row.venue === 'home'
													? styles.rowHome
													: styles.rowAway,
										)}
									>
										<td className={styles.colTour}>
											{isCup ? (
												<span
													className={styles.cupTour}
													title='Кубок России'
												>
													К{row.cupTour ?? row.tour}
												</span>
											) : (
												row.tour
											)}
										</td>
										<td className={styles.colLogo}>
											{logo ? (
												<Image
													src={logo}
													alt=''
													width={32}
													height={32}
													className={styles.teamLogo}
												/>
											) : (
												<span
													className={styles.teamLogoPlaceholder}
													aria-hidden
												/>
											)}
										</td>
										<td className={styles.colTeam}>
											<div className={styles.matchCell}>
												<span className={styles.teamName}>
													{row.team}
												</span>
												<MatchMetaLine
													dateIso={row.date}
													when={row.when}
													venue={row.venue}
												/>
											</div>
										</td>
										{columns.map((column) => (
											<td
												key={column.id}
												className={cx(
													styles.colSeason,
													column.id === activeSeasonId &&
														styles.colSeasonActive,
												)}
											>
												<SeasonResultCell
													result={
														row.seasonResults[column.id]
													}
													isCupRow={isCup}
												/>
											</td>
										))}
									</tr>
									<StandingsMatchTickets
										dateIso={row.date}
										opponent={row.team}
										venue={row.venue}
										competition={row.competition}
										isHomeRow={row.venue === 'home'}
										isCupRow={isCup}
										colSpan={ticketColSpan}
									/>
								</Fragment>
							)
						})}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={3} className={styles.sumLabel}>
								Сумма
							</td>
							{columns.map((column) => (
								<td
									key={column.id}
									className={cx(
										styles.colSeason,
										column.id === activeSeasonId &&
											styles.colSeasonActive,
									)}
								>
									<span className={styles.pts}>
										{column.totalPts}
									</span>
								</td>
							))}
						</tr>
					</tfoot>
				</table>
			</div>
		</section>
	)
}
