'use client'

import React from 'react'
import styles from './FonbetBanner.module.scss'

const FONBET_LINK =
	'https://clicks.af-ru2e2e.com/click?offer_id=803&partner_id=19262&landing_id=6723&utm_medium=sponsorship&sub_1={banner}&sub_2={ticket}'

const FonbetBanner: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<a
				href={FONBET_LINK}
				target='_blank'
				rel='noopener noreferrer'
				className={styles.link}
			>
				<img
					src='/images/fonbetticket1.png'
					alt='FONBET'
					className={styles.image}
				/>
			</a>
		</div>
	)
}

export default FonbetBanner
