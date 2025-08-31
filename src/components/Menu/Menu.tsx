'use client'

import React from 'react'
import Link from 'next/link'
import styles from './Menu.module.scss'

const Menu: React.FC = () => {
	return (
		<nav className={styles.menu}>
			<Link href='/sector/c121' className={styles.menuLink}>
				Билеты
			</Link>
			<span className={styles.separator}>|</span>
			<Link href='/fans' className={styles.menuLink}>
				Болельщики
			</Link>
			<span className={styles.separator}>|</span>
			<Link href='/bonuses' className={styles.menuLink}>
				Бонусы
			</Link>
		</nav>
	)
}

export default Menu
