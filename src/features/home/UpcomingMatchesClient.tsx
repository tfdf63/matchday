'use client'

import type { FC } from 'react'
import { useMemo, useState } from 'react'

import type { Game } from '@/data/games'

import { MatchesCalendarStrip } from './MatchesCalendarStrip'
import styles from './UpcomingMatches.module.scss'
import { UpcomingMatchCard } from './UpcomingMatchCard'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const UPCOMING_MATCH_PANEL_ID = 'upcoming-match-panel'

export type UpcomingMatchesClientProps = {
	games: Game[]
	withBottomMenu?: boolean
}

const UpcomingMatchesClient: FC<UpcomingMatchesClientProps> = ({
	games,
	withBottomMenu = false,
}) => {
	const defaultGame = games[1] ?? games[0] ?? null
	const [selectedId, setSelectedId] = useState<string | null>(
		defaultGame?.id ?? null,
	)

	const selectedGame = useMemo(() => {
		if (!games.length) return null
		const found = games.find((g) => g.id === selectedId)
		return found ?? games[1] ?? games[0] ?? null
	}, [games, selectedId])

	const handleSelectGame = (game: Game) => {
		setSelectedId(game.id)
	}

	return (
		<section
			className={cx(
				styles.section,
				withBottomMenu && styles.sectionWithBottomMenu,
			)}
			aria-labelledby="upcoming-matches-heading"
		>
			<div className={styles.inner}>
				<h2 id="upcoming-matches-heading" className={styles.title}>
					Ближайшие матчи
				</h2>

				<div
					id={UPCOMING_MATCH_PANEL_ID}
					role="tabpanel"
					aria-live="polite"
					className={styles.cards}
				>
					{selectedGame ? (
						<UpcomingMatchCard key={selectedGame.id} game={selectedGame} />
					) : null}
				</div>

				<div className={styles.calendarWrap}>
					<MatchesCalendarStrip
						games={games}
						selectedGameId={selectedGame?.id ?? null}
						onSelectGame={handleSelectGame}
					/>
				</div>

				<div className={styles.legend}>
					<div className={styles.legendItem}>
						<span
							className={cx(styles.legendSwatch, styles.legendSwatchHome)}
							aria-hidden
						/>
						<p className={cx(styles.legendText, 'font-mono')}>
							— домашний матч
						</p>
					</div>
					<div className={styles.legendItem}>
						<span
							className={cx(styles.legendSwatch, styles.legendSwatchAway)}
							aria-hidden
						/>
						<p className={cx(styles.legendText, 'font-mono')}>
							— гостевой матч
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UpcomingMatchesClient
