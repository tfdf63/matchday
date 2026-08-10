import type { FC } from 'react'

import {
	CURRENT_STANDINGS_SEASON_ID,
	getStandingsSeason,
} from '@/data/standings'
import { buildMultiSeasonCalendar } from '@/lib/standings/multiSeasonRows'
import { getSeasonStats } from '@/lib/standings/seasonStats'

import { SeasonCalendarTable } from './SeasonCalendarTable'
import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const StandingsPage: FC = () => {
	const season = getStandingsSeason(CURRENT_STANDINGS_SEASON_ID)
	const { rows, columns } = buildMultiSeasonCalendar(CURRENT_STANDINGS_SEASON_ID)
	const stats = getSeasonStats(
		season.matches.filter((m) => m.competition !== 'cup'),
	)
	const hasCup = season.matches.some((m) => m.competition === 'cup')

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>Календарь сезона</h1>
					<p className={cx(styles.lead, 'font-mono')}>
						{hasCup
							? `Матчи ФК «Акрон» в РПЛ и Кубке · сезон ${season.seasonLabel}`
							: `Матчи ФК «Акрон» в РПЛ · сезон ${season.seasonLabel}`}
					</p>
					<p className={cx(styles.metaLine, 'font-mono')}>
						Сыграно: {stats.playedCount} / дома: {stats.homePts} / в гостях:{' '}
						{stats.awayPts} / сумма: {stats.totalPts}
					</p>
				</header>

				<SeasonCalendarTable
					seasonLabel={season.seasonLabel}
					timezone={season.timezone}
					rows={rows}
					columns={columns}
				/>
			</div>
		</div>
	)
}
