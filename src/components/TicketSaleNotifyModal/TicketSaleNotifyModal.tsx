'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './TicketSaleNotifyModal.module.scss'

const B24_LOADER_URL =
	'https://cdn-ru.bitrix24.ru/b20300478/crm/form/loader_209.js'

interface TicketSaleNotifyModalProps {
	isOpen: boolean
	onClose: () => void
}

const TicketSaleNotifyModal: React.FC<TicketSaleNotifyModalProps> = ({
	isOpen,
	onClose,
}) => {
	const formContainerRef = useRef<HTMLDivElement>(null)

	// Блокируем скролл при открытом модальном окне
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

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

	// Загрузка формы Bitrix24 при открытии модалки
	useEffect(() => {
		if (!isOpen || !formContainerRef.current) return

		const container = formContainerRef.current

		// Создаём скрипт с атрибутами Bitrix24
		const script = document.createElement('script')
		script.setAttribute('data-b24-form', 'inline/209/3qp612')
		script.setAttribute('data-skip-moving', 'true')
		script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${B24_LOADER_URL}');`

		container.appendChild(script)

		return () => {
			script.remove()
		}
	}, [isOpen])

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
				<h2 className={styles.modalTitle}>
					Не пропустите старт продажи билетов
				</h2>
				<div
					ref={formContainerRef}
					id='b24-ticket-notify-form'
					className={styles.formContainer}
				/>
			</div>
		</div>
	)

	return createPortal(modalContent, document.body)
}

export default TicketSaleNotifyModal
