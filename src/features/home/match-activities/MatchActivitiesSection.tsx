import type { FC } from 'react'

import {
	defaultMatchActivitiesLead,
	matchActivitiesAll,
	MATCH_ACTIVITIES_INITIAL_VISIBLE,
	type MatchActivity,
} from '@/data/matchActivities'

import { MatchActivityCard } from './MatchActivityCard'
import styles from './MatchActivities.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const SECTION_HEADING_ID = 'match-activities-heading'

export type MatchActivitiesSectionProps = {
	/** Первая строка заголовка (Figma 4810:20773). */
	titleLine1?: string
	/** Вторая строка заголовка. */
	titleLine2?: string
	/** Первая строка лида с отступом (Figma 4810:20776). */
	leadFirstLine?: string
	/** Второй блок лида — абзацы через `\n` (Figma 4810:20775). */
	leadSecondLine?: string
	/** Полный список; если не передан — используется `matchActivitiesAll` из data. */
	activities?: MatchActivity[]
	className?: string
}

export const MatchActivitiesSection: FC<MatchActivitiesSectionProps> = ({
	titleLine1 = 'Активности',
	titleLine2 = 'на матче',
	leadFirstLine = defaultMatchActivitiesLead.firstLine,
	leadSecondLine = defaultMatchActivitiesLead.secondLine,
	activities: activitiesProp,
	className,
}) => {
	const fullList = activitiesProp ?? matchActivitiesAll
	const effectivePreview = fullList.slice(0, MATCH_ACTIVITIES_INITIAL_VISIBLE)

	return (
		<section
			className={cx(styles.section, className)}
			aria-labelledby={SECTION_HEADING_ID}
		>
			<div className={styles.inner}>
				<header className={styles.head}>
					<h2 id={SECTION_HEADING_ID} className={styles.heading}>
						<span className={styles.headingLine}>{titleLine1}</span>
						<br />
						<span className={styles.headingLine}>{titleLine2}</span>
					</h2>
					<div className={styles.leadWrap}>
						<p className={cx(styles.leadFirst, 'font-mono')}>{leadFirstLine}</p>
						<div className={styles.leadSecondGroup}>
							{leadSecondLine
								.split('\n')
								.filter((line) => line.trim().length > 0)
								.map((line, i) => (
									<p key={i} className={cx(styles.leadSecondPara, 'font-mono')}>
										{line.trim()}
									</p>
								))}
						</div>
					</div>
				</header>
				<ul className={styles.grid}>
					{effectivePreview.map((activity) => (
						<li key={activity.id} className={styles.gridItem}>
							<MatchActivityCard activity={activity} />
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
