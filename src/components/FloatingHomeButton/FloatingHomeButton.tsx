import Link from 'next/link'
import type { FC } from 'react'

import styles from './FloatingHomeButton.module.scss'

export const FloatingHomeButton: FC = () => {
	return (
		<Link href='/' className={styles.button} aria-label='Вернуться на главную'>
			<svg
				className={styles.icon}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
				aria-hidden
			>
				<path d='M3 10.5 12 3l9 7.5' />
				<path d='M5.5 9.8V21h13V9.8' />
				<path d='M10 21v-6h4v6' />
			</svg>
		</Link>
	)
}
