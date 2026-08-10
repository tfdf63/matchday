import type { FC } from 'react'

import type { SeasonCalendarData } from '@/data/standings'
import {
	enrichSeasonRows,
	getSeasonStats,
} from '@/lib/standings/seasonStats'

import { SeasonCalendarTable } from './SeasonCalendarTable'
import { SeasonSwitcher } from './SeasonSwitcher'
import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

type Props = {
	season: SeasonCalendarData
}

export const StandingsPage: FC<Props> = ({ season }) => {
	const rows = enrichSeasonRows(season.matches)
	const stats = getSeasonStats(season.matches)
	const hasCup = season.matches.some((m) => m.competition === 'cup')

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>Календарь сезона</h1>
					<SeasonSwitcher />
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
					totalPts={stats.totalPts}
				/>
			</div>
		</div>
	)
}
