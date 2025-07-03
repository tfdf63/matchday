'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from './BackToHome.module.scss'

const BackToHome: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	// Не показываем кнопку на главной странице
	if (pathname === '/') {
		return null
	}

	const handleBackToHome = () => {
		router.push('/')
	}

	return (
		<button
			className={styles.backButton}
			onClick={handleBackToHome}
			aria-label='Вернуться на главную'
		>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
			>
				<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
				<polyline points='9,22 9,12 15,12 15,22' />
			</svg>
		</button>
	)
}

export default BackToHome
