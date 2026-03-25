'use client'

import React from 'react'
import styles from './MatchTicketBanner.module.scss'
import { getMatchTicketBannerText, parseMatchDateRu } from '@/lib/match-dates'

interface MatchTicketBannerProps {
	date: string
	isGamesMatch?: boolean
}

const MatchTicketBanner: React.FC<MatchTicketBannerProps> = ({
	date,
	isGamesMatch = false,
}) => {
	const matchDate = parseMatchDateRu(date)
	if (!matchDate) {
		return null
	}

	const banner = getMatchTicketBannerText(matchDate)
	if (!banner) {
		return null
	}

	return (
		<div
			className={`${styles.banner} ${
				isGamesMatch ? styles.bannerGamesMatch : ''
			}`}
		>
			<div className={styles.bannerText}>{banner.text}</div>
		</div>
	)
}

export default MatchTicketBanner
