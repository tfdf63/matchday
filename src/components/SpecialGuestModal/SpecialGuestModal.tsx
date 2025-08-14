'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './SpecialGuestModal.module.scss'

interface SpecialGuestModalProps {
	isOpen: boolean
	onClose: () => void
}

const SpecialGuestModal: React.FC<SpecialGuestModalProps> = ({
	isOpen,
	onClose,
}) => {
	// Обработчик нажатия Escape
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			// Блокируем скролл страницы
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			// Восстанавливаем скролл страницы
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	// Обработчик клика по фону
	const handleBackdropClick = () => {
		console.log('Backdrop clicked')
		onClose()
	}

	if (!isOpen) return null

	const modalContent = (
		<div className={styles.modalOverlay} onClick={handleBackdropClick}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<div className={styles.guestImage}>
					<Image
						src='/images/specialguest/morozov/morozov3.webp'
						alt='Слава и Настя Морозовы'
						width={260}
						height={347}
						className={styles.image}
					/>
				</div>

				<div className={styles.description}>
					<p>
						Поболеть за «Акрон» в Самару приедут актеры, блогеры и просто
						классная семья Морозовых. Слава и Настя уже поддерживали любимый
						клуб в Москве, а 18 августа у зрителей «Солидарность Самара Арены»
						будет возможность увидеться с ними лично.
					</p>
					<p className={styles.rememberText}>Запоминай время:</p>
				</div>

				<div className={styles.schedule}>
					<div className={styles.scheduleItem}>
						<span className={styles.time}>13:30</span>
						<span className={styles.event}>автограф-сессия</span>
					</div>
					<div className={styles.scheduleItem}>
						<span className={styles.time}>14:30</span>
						<span className={styles.event}>символический удар</span>
					</div>
				</div>
			</div>
		</div>
	)

	return createPortal(modalContent, document.body)
}

export default SpecialGuestModal
