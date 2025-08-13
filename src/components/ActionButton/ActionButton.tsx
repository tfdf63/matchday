'use client'

import React from 'react'
import styles from './ActionButton.module.scss'

interface ActionButtonProps {
	href: string
	title: string
	className?: string
	actionType?: 'modal' | 'link' | 'internal'
	onModalOpen?: () => void
	external?: boolean // Новый проп для внешних ссылок
}

const ActionButton: React.FC<ActionButtonProps> = ({
	href,
	title,
	className,
	actionType = 'link',
	onModalOpen,
	external = false, // По умолчанию false
}) => {
	const handleClick = (e: React.MouseEvent) => {
		if (actionType === 'modal' && onModalOpen) {
			e.preventDefault()
			onModalOpen()
		}
		// Для actionType === 'link' и 'internal' используется стандартное поведение ссылки
	}

	// Определяем rel атрибут
	const getRelAttribute = () => {
		if (actionType === 'link') {
			return external ? 'noopener noreferrer nofollow' : 'noopener noreferrer'
		}
		return external ? 'nofollow' : undefined
	}

	return (
		<a
			href={href}
			target={actionType === 'link' ? '_blank' : undefined}
			rel={getRelAttribute()}
			className={`${styles.actionButton} ${className || ''}`}
			onClick={handleClick}
		>
			{title}
		</a>
	)
}

export default ActionButton
