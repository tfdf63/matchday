'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import {
	CURRENT_STANDINGS_SEASON_ID,
	STANDINGS_SEASON_IDS,
	getStandingsSeason,
	getStandingsSeasonHref,
	type StandingsSeasonId,
} from '@/data/standings'

import styles from './StandingsPage.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function resolveActiveSeasonId(pathname: string): StandingsSeasonId {
	const segment = pathname.replace(/\/$/, '').split('/').pop()
	if (segment && STANDINGS_SEASON_IDS.includes(segment as StandingsSeasonId)) {
		return segment as StandingsSeasonId
	}
	return CURRENT_STANDINGS_SEASON_ID
}

export const SeasonSwitcher: FC = () => {
	const pathname = usePathname() ?? '/standings/'
	const activeId = resolveActiveSeasonId(pathname)

	return (
		<nav className={styles.seasonSwitcher} aria-label='Сезоны'>
			{STANDINGS_SEASON_IDS.map((id) => {
				const season = getStandingsSeason(id)
				const isActive = id === activeId

				return (
					<Link
						key={id}
						href={getStandingsSeasonHref(id)}
						className={cx(
							styles.seasonTab,
							isActive && styles.seasonTabActive,
							'font-mono',
						)}
						aria-current={isActive ? 'page' : undefined}
					>
						{season.seasonLabel}
					</Link>
				)
			})}
		</nav>
	)
}
