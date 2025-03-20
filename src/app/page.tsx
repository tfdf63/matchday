import React from 'react'
import styles from './page.module.scss'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
const MatchesPage = () => {
	return (
		<>
			<div className={styles.container}>
				<Main />
			</div>
			<Games />
		</>
	)
}

export default MatchesPage
