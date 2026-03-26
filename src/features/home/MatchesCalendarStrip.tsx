'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useEffect, useLayoutEffect, useRef } from 'react'

import {
	daysInMonth,
	monthNameRu,
	parseDateIsoLocal,
	RU_WEEKDAY_SHORT,
} from '@/data/calendarRu2026'
import { getOpponentTeamName, type Game } from '@/data/games'
import { getTeamLogoPath } from '@/data/teamLogos'

import styles from './MatchesCalendarStrip.module.scss'

const UPCOMING_MATCH_PANEL_ID = 'upcoming-match-panel'

/** Совпадает с шириной `.monthDivider` в SCSS. */
const CALENDAR_MONTH_COL_PX = 45
/** Активный матч — N-я видимая колонка дня (1-based). */
const CALENDAR_ACTIVE_DAY_SLOT = 3
const CALENDAR_MOBILE_MAX_BP = 767

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function sortByDateIso(games: Game[]): Game[] {
	return [...games].sort((a, b) => a.dateIso.localeCompare(b.dateIso))
}

type MonthGroup = {
	key: string
	year: number
	month: number
	monthLabel: string
	games: Game[]
}

function groupByMonth(sorted: Game[]): MonthGroup[] {
	const out: MonthGroup[] = []
	for (const g of sorted) {
		const year = Number(g.dateIso.slice(0, 4))
		const month = Number(g.dateIso.split('-')[1])
		const mStr = String(month).padStart(2, '0')
		const key = `${year}-${mStr}`
		const last = out[out.length - 1]
		if (last?.key === key) {
			last.games.push(g)
		} else {
			out.push({
				key,
				year,
				month,
				monthLabel: monthNameRu(month),
				games: [g],
			})
		}
	}
	return out
}

function indexGamesByDayOfMonth(
	games: Game[],
	year: number,
	month: number,
): Map<number, Game> {
	const map = new Map<number, Game>()
	for (const g of games) {
		const d = parseDateIsoLocal(g.dateIso)
		if (d.getFullYear() === year && d.getMonth() + 1 === month) {
			map.set(d.getDate(), g)
		}
	}
	return map
}

type StripItem =
	| { kind: 'month'; key: string; label: string }
	| {
			kind: 'day'
			key: string
			year: number
			month: number
			day: number
			game: Game | undefined
	  }

function buildStripItems(groups: MonthGroup[]): StripItem[] {
	const items: StripItem[] = []
	for (const g of groups) {
		const totalDays = daysInMonth(g.year, g.month)
		const byDay = indexGamesByDayOfMonth(g.games, g.year, g.month)
		items.push({
			kind: 'month',
			key: `m-${g.key}`,
			label: g.monthLabel,
		})
		for (let day = 1; day <= totalDays; day++) {
			items.push({
				kind: 'day',
				key: `${g.key}-${day}`,
				year: g.year,
				month: g.month,
				day,
				game: byDay.get(day),
			})
		}
	}
	return items
}

const MonthDivider: FC<{ label: string }> = ({ label }) => (
	<div className={styles.monthDivider}>
		<div className={styles.monthLabelCell}>
			<p className={cx(styles.monthLabel, 'font-mono')}>{label}</p>
		</div>
		<div className={styles.monthDividerFill} aria-hidden />
	</div>
)

type CalendarDayColumnProps = {
	game: Game
	isSelected: boolean
	onSelect: () => void
}

const CalendarDayColumn: FC<CalendarDayColumnProps> = ({
	game,
	isSelected,
	onSelect,
}) => {
	const d = parseDateIsoLocal(game.dateIso)
	const dayNum = d.getDate()
	const wd = RU_WEEKDAY_SHORT[d.getDay()] ?? ''
	const isHome = game.venue === 'home'
	const opponent = getOpponentTeamName(game)
	const logo = getTeamLogoPath(opponent)

	const dateClass = cx(
		styles.dateNum,
		styles.dateNumMatch,
		isHome &&
			(isSelected ? styles.dateNumActiveHome : styles.dateNumInactiveHome),
		!isHome &&
			(isSelected ? styles.dateNumActiveAway : styles.dateNumInactiveAway),
	)

	return (
		<button
			type="button"
			className={styles.dayTab}
			data-calendar-match-id={game.id}
			aria-pressed={isSelected}
			aria-controls={UPCOMING_MATCH_PANEL_ID}
			onClick={onSelect}
		>
			<div className={dateClass}>{dayNum}</div>
			<p
				className={cx(
					styles.weekday,
					'font-mono',
					isHome && isSelected && styles.weekdayActiveHome,
				)}
			>
				{wd}
			</p>
			<div
				className={cx(
					styles.logoCell,
					isHome && isSelected && styles.logoCellActiveHome,
				)}
			>
				{logo ? (
					<Image
						src={logo}
						alt=""
						width={28}
						height={28}
						className={styles.logo}
					/>
				) : null}
			</div>
		</button>
	)
}

type CalendarEmptyDayColumnProps = {
	year: number
	month: number
	day: number
}

const CalendarEmptyDayColumn: FC<CalendarEmptyDayColumnProps> = ({
	year,
	month,
	day,
}) => {
	const d = new Date(year, month - 1, day)
	const wd = RU_WEEKDAY_SHORT[d.getDay()] ?? ''

	return (
		<div className={styles.col}>
			<div className={styles.dateNum}>{day}</div>
			<p className={cx(styles.weekday, 'font-mono')}>{wd}</p>
			<div className={styles.logoCell} aria-hidden />
		</div>
	)
}

export type MatchesCalendarStripProps = {
	games: Game[]
	selectedGameId: string | null
	onSelectGame: (game: Game) => void
}

export const MatchesCalendarStrip: FC<MatchesCalendarStripProps> = ({
	games,
	selectedGameId,
	onSelectGame,
}) => {
	const items = buildStripItems(groupByMonth(sortByDateIso(games)))
	const scrollerRef = useRef<HTMLDivElement>(null)
	const didInitialMobileAnchor = useRef(false)
	const prevSelectedForEnsureRef = useRef<string | null>(null)

	useLayoutEffect(() => {
		if (!scrollerRef.current || !selectedGameId) return
		if (didInitialMobileAnchor.current) return
		didInitialMobileAnchor.current = true

		if (
			typeof window === 'undefined' ||
			!window.matchMedia(`(max-width: ${CALENDAR_MOBILE_MAX_BP}px)`).matches
		) {
			return
		}

		const scroller = scrollerRef.current
		const el = scroller.querySelector<HTMLElement>(
			`[data-calendar-match-id="${selectedGameId}"]`,
		)
		if (!el) return

		const elLeft =
			el.getBoundingClientRect().left -
			scroller.getBoundingClientRect().left +
			scroller.scrollLeft
		const slotW = el.offsetWidth
		const target =
			elLeft -
			CALENDAR_MONTH_COL_PX -
			(CALENDAR_ACTIVE_DAY_SLOT - 1) * slotW
		const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
		scroller.scrollLeft = Math.max(0, Math.min(target, maxScroll))
	}, [selectedGameId])

	useEffect(() => {
		if (!selectedGameId) return
		const scroller = scrollerRef.current
		if (!scroller) return
		const el = scroller.querySelector<HTMLElement>(
			`[data-calendar-match-id="${selectedGameId}"]`,
		)
		if (!el) return

		const prev = prevSelectedForEnsureRef.current
		prevSelectedForEnsureRef.current = selectedGameId
		if (prev === null || prev === selectedGameId) return

		const scrollerRect = scroller.getBoundingClientRect()
		const elRect = el.getBoundingClientRect()
		const pad = 8
		if (elRect.left < scrollerRect.left + pad) {
			scroller.scrollLeft -= scrollerRect.left + pad - elRect.left
		} else if (elRect.right > scrollerRect.right - pad) {
			scroller.scrollLeft += elRect.right - (scrollerRect.right - pad)
		}
	}, [selectedGameId])

	return (
		<div className={styles.strip}>
			<div ref={scrollerRef} className={styles.scroller}>
				{items.map((item) =>
					item.kind === 'month' ? (
						<MonthDivider key={item.key} label={item.label} />
					) : item.game ? (
						<CalendarDayColumn
							key={item.key}
							game={item.game}
							isSelected={item.game.id === selectedGameId}
							onSelect={() => onSelectGame(item.game!)}
						/>
					) : (
						<CalendarEmptyDayColumn
							key={item.key}
							year={item.year}
							month={item.month}
							day={item.day}
						/>
					),
				)}
			</div>
		</div>
	)
}
