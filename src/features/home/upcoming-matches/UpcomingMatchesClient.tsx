'use client'

import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { Game } from '@/data/games'
import {
	getLocalDateIso,
	pickFollowingUpcomingGame,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import { MatchesCalendarStrip } from './MatchesCalendarStrip'
import styles from './UpcomingMatches.module.scss'
import { UpcomingMatchCard } from './UpcomingMatchCard'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const UPCOMING_MATCH_PANEL_ID = 'upcoming-match-panel'

const MatchNavChevron: FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
	const points =
		direction === 'left' ? '8,3.5 2,10 8,16.5' : '2,3.5 8,10 2,16.5'

	return (
		<svg
			className={styles.matchNavIcon}
			width={10}
			height={20}
			viewBox="0 0 10 20"
			fill="none"
			aria-hidden
		>
			<polyline
				points={points}
				stroke="currentColor"
				strokeWidth={1.2}
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	)
}

export type UpcomingMatchesClientProps = {
	games: Game[]
	withBottomMenu?: boolean
}

const UpcomingMatchesClient: FC<UpcomingMatchesClientProps> = ({
	games,
	withBottomMenu = false,
}) => {
	const sortedGames = useMemo(() => sortGamesByDateIso(games), [games])
	const todayIso = useMemo(() => getLocalDateIso(), [])

	const [selectedId, setSelectedId] = useState<string | null>(() => {
		const sorted = sortGamesByDateIso(games)
		return pickFollowingUpcomingGame(sorted, getLocalDateIso())?.id ?? null
	})

	const selectedGame = useMemo(() => {
		if (!sortedGames.length) return null
		const found = selectedId
			? sortedGames.find((g) => g.id === selectedId)
			: undefined
		if (found) return found
		return (
			pickFollowingUpcomingGame(sortedGames, todayIso) ??
			sortedGames[0] ??
			null
		)
	}, [sortedGames, selectedId, todayIso])

	const selectedIndex = useMemo(() => {
		if (!selectedGame) return -1
		return sortedGames.findIndex((g) => g.id === selectedGame.id)
	}, [selectedGame, sortedGames])

	const showMatchNav = sortedGames.length > 1

	const canGoPrev = selectedIndex > 0
	const canGoNext =
		selectedIndex >= 0 && selectedIndex < sortedGames.length - 1

	const goPrevMatch = useCallback(() => {
		if (!canGoPrev) return
		setSelectedId(sortedGames[selectedIndex - 1]!.id)
	}, [canGoPrev, selectedIndex, sortedGames])

	const goNextMatch = useCallback(() => {
		if (!canGoNext) return
		setSelectedId(sortedGames[selectedIndex + 1]!.id)
	}, [canGoNext, selectedIndex, sortedGames])

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

				<div className={styles.cards}>
					<div
						id={UPCOMING_MATCH_PANEL_ID}
						role="tabpanel"
						aria-live="polite"
						className={styles.cardWithNav}
					>
						<div className={styles.cardRow}>
							{showMatchNav ? (
								<button
									type="button"
									className={styles.matchNavBtn}
									aria-label="Предыдущий матч"
									disabled={!canGoPrev}
									onClick={goPrevMatch}
								>
									<MatchNavChevron direction="left" />
								</button>
							) : null}
							<div className={styles.cardPanel}>
								{selectedGame ? (
									<UpcomingMatchCard
										key={selectedGame.id}
										game={selectedGame}
									/>
								) : null}
							</div>
							{showMatchNav ? (
								<button
									type="button"
									className={styles.matchNavBtn}
									aria-label="Следующий матч"
									disabled={!canGoNext}
									onClick={goNextMatch}
								>
									<MatchNavChevron direction="right" />
								</button>
							) : null}
						</div>
					</div>
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
