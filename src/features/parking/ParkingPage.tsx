import type { FC } from 'react'

import { ParkingGuide } from './ParkingGuide'
import styles from './ParkingPage.module.scss'

export const ParkingPage: FC = () => {
	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<ParkingGuide />
			</div>
		</div>
	)
}
