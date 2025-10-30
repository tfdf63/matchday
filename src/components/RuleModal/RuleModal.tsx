'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Rule } from '@/data/rules'
import styles from './RuleModal.module.scss'

interface RuleModalProps {
	isOpen: boolean
	onClose: () => void
	rule: Rule | null
}

const RuleModal: React.FC<RuleModalProps> = ({ isOpen, onClose, rule }) => {
	// Блокируем скролл при открытом модальном окне и сохраняем позицию
	useEffect(() => {
		if (isOpen) {
			// Сохраняем текущую позицию скролла
			const scrollY = window.scrollY
			
			// Фиксируем body и сохраняем позицию
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflow = 'hidden'

			// При закрытии восстанавливаем позицию
			return () => {
				document.body.style.position = ''
				document.body.style.top = ''
				document.body.style.width = ''
				document.body.style.overflow = ''
				
				// Восстанавливаем скролл
				window.scrollTo(0, scrollY)
			}
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

	if (!isOpen || !rule) return null

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
						src={rule.image}
						alt={rule.title}
						className={styles.ruleImage}
						width={600}
						height={400}
						priority
					/>
				</div>
				<div className={styles.contentWrapper}>
					<h2 className={styles.title}>{rule.title}</h2>
					<p className={styles.description}>{rule.description}</p>
				</div>
			</div>
		</div>
	)

	// Рендерим модальное окно в корне документа через портал
	return createPortal(modalContent, document.body)
}

export default RuleModal

