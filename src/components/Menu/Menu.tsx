'use client'

import React from 'react'
import Link from 'next/link'
import styles from './Menu.module.scss'

const Menu: React.FC = () => {
	return (
		<nav className={styles.menu}>
			{/* <Link href='/#ticket-program' className={styles.menuLink}>
				Билеты
			</Link>
			<span className={styles.separator}>|</span> */}
			<Link href='/bonuses' className={styles.menuLink}>
				Тарифы и скидки
			</Link>
			<span className={styles.separator}>|</span>
			<Link href='/road' className={styles.menuLink}>
				Как добраться
			</Link>
			<span className={styles.separator}>|</span>
			<Link href='/rules' className={styles.menuLink}>
				Правила игры
			</Link>
		</nav>
	)
}

export default Menu
