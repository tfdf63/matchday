'use client'

import React from 'react'
import styles from './ActionButton.module.scss'

interface ActionButtonProps {
	href: string
	title: string
	className?: string
	actionType?: 'modal' | 'link' | 'internal'
	onModalOpen?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({
	href,
	title,
	className,
	actionType = 'link',
	onModalOpen,
}) => {
	const handleClick = (e: React.MouseEvent) => {
		if (actionType === 'modal' && onModalOpen) {
			e.preventDefault()
			onModalOpen()
		}
		// Для actionType === 'link' и 'internal' используется стандартное поведение ссылки
	}

	return (
		<a
			href={href}
			target={actionType === 'link' ? '_blank' : undefined}
			rel={actionType === 'link' ? 'noopener noreferrer' : undefined}
			className={`${styles.actionButton} ${className || ''}`}
			onClick={handleClick}
		>
			{title}
		</a>
	)
}

export default ActionButton
