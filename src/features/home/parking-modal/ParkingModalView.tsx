'use client'

import type { FC } from 'react'

import { BaseModal } from '@/components/Modal'
import { ParkingGuide } from '@/features/parking/ParkingGuide'

import { useParkingModal } from './parkingModalContext'
import styles from './ParkingModal.module.scss'

export const ParkingModalView: FC = () => {
	const { isOpen, close } = useParkingModal()

	return (
		<BaseModal
			open={isOpen}
			onClose={close}
			titleId='parking-modal-title'
			chrome='fullBleed'
			panelClassName={styles.panel}
		>
			<div className={styles.shell}>
				<div className={styles.scroll}>
					<ParkingGuide
						headingLevel='h2'
						titleId='parking-modal-title'
						compact
					/>
				</div>
			</div>
		</BaseModal>
	)
}
