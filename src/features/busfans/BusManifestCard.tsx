import type { FC } from 'react'

import type { BusManifest, PassengerAssignment } from '@/data/busfans'
import { BUS_SALE_SEAT_CAPACITY } from '@/lib/busfans/busCapacity'
import { getBoardingStopDisplay } from '@/lib/busfans/boardingStopOverrides'
import { getBusPlateNumbers } from '@/lib/busfans/busPlates'

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
	eventId: string
	duplicateFullNames?: Set<string>
}

export const BusManifestCard: FC<BusManifestCardProps> = ({
	manifest,
	passengers,
	matchDateIso,
	eventId,
	duplicateFullNames,
}) => {
	const plateNumbers = getBusPlateNumbers(manifest.id)
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

			{plateNumbers.length > 0 ? (
				<div className={styles.platesBlock}>
					{plateNumbers.map((plate) => (
						<p key={plate} className={cx(styles.plateNumber, 'font-mono')}>
							{plate}
						</p>
					))}
				</div>
			) : null}

			{stops.length > 0 ? (
				<div className={styles.routeBlock}>
					<p className={cx(styles.routeLabel, 'font-mono')}>Маршрут</p>
					<ol className={styles.routeList}>
						{stops.map((stop) => {
							const display = getBoardingStopDisplay(stop, eventId)
							return (
								<li
									key={stop}
									className={cx(
										styles.routeStop,
										display.isReplacement && styles.routeStopReplacement,
										'font-mono',
									)}
								>
									{display.label}
								</li>
							)
						})}
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
