import type { FC } from 'react'

import type { BusManifest, PassengerAssignment } from '@/data/busfans'
import { BUS_SALE_SEAT_CAPACITY } from '@/lib/busfans/busCapacity'
import { formatBoardingStopLabel } from '@/lib/busfans/boardingStopAliases'

import styles from './BusFansPage.module.scss'
import { PassengerTable } from './PassengerTable'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function formatBusLabel(label: string): string {
	const parts = label.split(/\s+-\s+/)
	if (parts.length < 2) return label.toLocaleUpperCase('ru-RU')
	const [head, ...rest] = parts
	return `${head} - ${rest.join(' - ').toLocaleUpperCase('ru-RU')}`
}

export type BusManifestCardProps = {
	manifest: BusManifest
	passengers: PassengerAssignment[]
	matchDateIso: string
	duplicateFullNames?: Set<string>
}

export const BusManifestCard: FC<BusManifestCardProps> = ({
	manifest,
	passengers,
	matchDateIso,
	duplicateFullNames,
}) => {
	const stops =
		manifest.boardingStops?.filter(Boolean) ??
		[
			...new Set(
				passengers
					.map((p) => p.boardingPlace?.trim().replace(/,\s*$/, ''))
					.filter((s): s is string => Boolean(s)),
			),
		]

	return (
		<section className={styles.busCard} aria-label={manifest.label}>
			<div className={styles.busHeader}>
				<h2 className={styles.busTitle}>{formatBusLabel(manifest.label)}</h2>
				<p className={cx(styles.busMeta, 'font-mono')}>
					{manifest.passengerCount} из {BUS_SALE_SEAT_CAPACITY} мест
				</p>
			</div>

			{stops.length > 0 ? (
				<div className={styles.routeBlock}>
					<p className={cx(styles.routeLabel, 'font-mono')}>Маршрут</p>
					<ol className={styles.routeList}>
						{stops.map((stop) => (
							<li key={stop} className={cx(styles.routeStop, 'font-mono')}>
								{formatBoardingStopLabel(stop)}
							</li>
						))}
					</ol>
				</div>
			) : null}

			<PassengerTable
				passengers={passengers}
				matchDateIso={matchDateIso}
				duplicateFullNames={duplicateFullNames}
			/>
		</section>
	)
}
