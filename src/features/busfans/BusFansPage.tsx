import type { FC } from 'react'

import { busFansDataset } from '@/data/busfans'
import { getMatchEvents } from '@/lib/busfans/selectors'

import styles from './BusFansPage.module.scss'
import { MatchEventCard } from './MatchEventCard'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const BusFansPage: FC = () => {
	const events = getMatchEvents(busFansDataset)

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>Фан-автобусы</h1>
					<p className={cx(styles.lead, 'font-mono')}>
						Списки пассажиров по матчам и автобусам
					</p>
					<p className={cx(styles.metaLine, 'font-mono')}>
						Матчей: {events.length} · болельщиков:{' '}
						{events.reduce((sum, e) => sum + e.passengerCount, 0)}
					</p>
				</header>

				<div className={styles.list}>
					{events.map((event) => (
						<MatchEventCard key={event.id} event={event} />
					))}
				</div>
			</div>
		</div>
	)
}
