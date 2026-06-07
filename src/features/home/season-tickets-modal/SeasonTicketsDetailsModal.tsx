'use client'

import Image from 'next/image'
import type { FC } from 'react'

import { BaseModal } from '@/components/Modal'
import {
	seasonTicketImages,
	seasonTicketsModalTitle,
} from '@/data/seasonTickets'

import styles from './SeasonTicketsDetailsModal.module.scss'

export type SeasonTicketsDetailsModalProps = {
	open: boolean
	onClose: () => void
}

export const SeasonTicketsDetailsModal: FC<SeasonTicketsDetailsModalProps> = ({
	open,
	onClose,
}) => {
	return (
		<BaseModal
			open={open}
			onClose={onClose}
			title={seasonTicketsModalTitle}
			titleId='season-tickets-modal-title'
			panelClassName={styles.panel}
			bodyClassName={styles.body}
		>
			<div className={styles.gallery}>
				{seasonTicketImages.map((src, index) => (
					<figure key={src} className={styles.figure}>
						<Image
							src={src}
							alt={`Абонемент ${index + 1}`}
							width={960}
							height={1200}
							className={styles.image}
							sizes='(min-width: 1920px) 920px, (min-width: 1600px) 840px, (min-width: 1280px) 760px, (min-width: 1024px) 680px, (min-width: 767px) 600px, calc(100vw - 40px)'
						/>
					</figure>
				))}
			</div>
		</BaseModal>
	)
}
