import React from 'react'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<h1 className={styles.logo}>MatchDay</h1>
				<nav className={styles.nav}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							<a href='/' className={styles.navLink}>
								Главная
							</a>
						</li>
						<li className={styles.navItem}>
							<a href='/matches' className={styles.navLink}>
								Матчи
							</a>
						</li>
						<li className={styles.navItem}>
							<a href='/teams' className={styles.navLink}>
								Команды
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
