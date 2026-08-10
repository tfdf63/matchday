import Image from 'next/image'
import { Home, Plane } from 'lucide-react'
import { Fragment, type FC } from 'react'

import type { SeasonCalendarRow } from '@/data/standings'
import { getTeamLogoPath } from '@/data/teamLogos'
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
	rows: SeasonCalendarRow[]
	totalPts: number
}

function MatchMetaLine({
	dateIso,
	when,
	venue,
}: {
	dateIso: string
	when: SeasonCalendarRow['when']
	venue: SeasonCalendarRow['venue']
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

export const SeasonCalendarTable: FC<Props> = ({
	seasonLabel,
	timezone,
	rows,
	totalPts,
}) => {
	const lastCumulative =
		[...rows].reverse().find((r) => r.cumulativePts !== null)?.cumulativePts ??
		0
	const hasCup = rows.some((row) => row.competition === 'cup')

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
				<table className={cx(styles.table, 'font-mono')}>
					<colgroup>
						<col className={styles.colTour} />
						<col className={styles.colLogo} />
						<col className={styles.colTeam} />
						<col className={styles.colNum} />
						<col className={styles.colNum} />
						<col className={styles.colNum} />
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
							<th scope='col' className={styles.colNum} title='Счёт'>
								С
							</th>
							<th scope='col' className={styles.colNum} title='Очки'>
								О
							</th>
							<th scope='col' className={styles.colNum}>
								Σ
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							const logo = getTeamLogoPath(row.team)
							const ptsClass = getPtsClass(row.match.pts)
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
													width={48}
													height={48}
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
										<td className={styles.colNum}>
											{row.match.played && row.match.score ? (
												<span className={styles.score}>
													{row.match.score}
												</span>
											) : (
												<span className={styles.dash}>—</span>
											)}
										</td>
										<td className={styles.colNum}>
											{!isCup &&
											row.match.played &&
											row.match.pts !== null ? (
												<span
													className={cx(
														styles.pts,
														ptsClass === 'win' && styles.ptsWin,
														ptsClass === 'draw' && styles.ptsDraw,
														ptsClass === 'loss' && styles.ptsLoss,
													)}
												>
													{row.match.pts}
												</span>
											) : (
												<span className={styles.dash}>—</span>
											)}
										</td>
										<td className={styles.colNum}>
											{!isCup && row.cumulativePts !== null ? (
												<span className={styles.cum}>
													{row.cumulativePts}
												</span>
											) : (
												<span className={styles.dash}>—</span>
											)}
										</td>
									</tr>
									<StandingsMatchTickets
										dateIso={row.date}
										opponent={row.team}
										venue={row.venue}
										competition={row.competition}
										isHomeRow={row.venue === 'home'}
										isCupRow={isCup}
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
							<td className={styles.colNum}>
								<span className={styles.dash}>—</span>
							</td>
							<td className={styles.colNum}>
								<span className={styles.pts}>{totalPts}</span>
							</td>
							<td className={styles.colNum}>
								<span className={styles.cum}>{lastCumulative}</span>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</section>
	)
}
