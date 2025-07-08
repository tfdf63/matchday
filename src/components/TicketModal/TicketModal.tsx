'use client'

import React from 'react'
import { initYandexWidget } from './yandexWidget'
import styles from './TicketModal.module.scss'

interface TicketModalProps {
	isOpen: boolean
	onClose: () => void
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
	React.useEffect(() => {
		if (isOpen) {
			// Инициализируем виджет после открытия модального окна
			setTimeout(() => {
				initYandexWidget()
			}, 100)
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<path d='M18 6L6 18M6 6l12 12' />
					</svg>
				</button>
				<div className={styles.modalBody}>
					<h2 className={styles.modalTitle}>Купить билеты и абонементы</h2>
					<div className={styles.widgetContainer}>
						<div id='ya-widget-frame' className={styles.widgetFrame}></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketModal
