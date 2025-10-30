'use client'

import React from 'react'
import CardRules from '@/components/CardRules'
import styles from './RulesPageClient.module.scss'

const RulesPageClient: React.FC = () => {
	return (
		<div className={styles.rulesPage}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1 className={styles.title}>
					Не были на футболе?
					<br />
					основные правила игры
				</h1>
				<CardRules />
			</div>
		</div>
	)
}

export default RulesPageClient
