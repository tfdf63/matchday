import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './CupTourModal.module.scss'
import Image from 'next/image'

interface CupTourModalProps {
	isOpen: boolean
	onClose: () => void
}

const CupTourModal: React.FC<CupTourModalProps> = ({ isOpen, onClose }) => {
	// Блокируем скролл при открытом модальном окне
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		// Очищаем стили при размонтировании
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	// Обработчик нажатия Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose()
	}

	const modalContent = (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<button
					className={styles.closeButton}
					onClick={onClose}
					aria-label='Закрыть модальное окно'
				>
					×
				</button>
				<div className={styles.imageWrapper}>
					<Image
						src='/images/cuptour2.jpg'
						alt='Cup Tour'
						className={styles.cuptourImage}
						width={800}
						height={600}
						priority
					/>
				</div>
			</div>
		</div>
	)

	// Рендерим модальное окно в корне документа через портал
	return createPortal(modalContent, document.body)
}

export default CupTourModal
