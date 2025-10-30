'use client'

import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import styles from './NavCard.module.scss'

interface NavCardProps {
	title: string
	href: string
	icon: LucideIcon
	className?: string
}

const NavCard: React.FC<NavCardProps> = ({
	title,
	href,
	icon: Icon,
	className,
}) => {
	// Разделяем текст на строки для многострочного отображения
	const titleLines = title.split(' ').reduce(
		(acc, word, index, array) => {
			if (index < array.length / 2) {
				acc[0] += (acc[0] ? ' ' : '') + word
			} else {
				acc[1] += (acc[1] ? ' ' : '') + word
			}
			return acc
		},
		['', '']
	)

	return (
		<Link href={href} className={`${styles.navCard} ${className || ''}`}>
			<div className={styles.iconWrapper}>
				<Icon className={styles.icon} />
			</div>
			<h2 className={styles.title}>
				{titleLines[0]}
				<br />
				{titleLines[1]}
			</h2>
		</Link>
	)
}

export default NavCard
