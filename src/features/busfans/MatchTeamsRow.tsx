import Image from 'next/image'
import type { FC } from 'react'

import { getTeamLogoPath } from '@/data/teamLogos'
import {
	FAN_MEETING_CLUB,
	getFanMeetingDisplayTitle,
	isFanMeetingEvent,
} from '@/lib/busfans/fanMeeting'

import styles from './BusFansPage.module.scss'

const LOGO_SIZE = 28

export type MatchTeamsRowProps = {
	homeTeam: string
	awayTeam: string
}

export const MatchTeamsRow: FC<MatchTeamsRowProps> = ({
	homeTeam,
	awayTeam,
}) => {
	if (isFanMeetingEvent({ awayTeam })) {
		const logo = getTeamLogoPath(FAN_MEETING_CLUB)
		const title = getFanMeetingDisplayTitle(homeTeam)

		return (
			<div
				className={styles.teamsRow}
				role='group'
				aria-label='Событие клуба'
			>
				<div className={styles.teamCol}>
					{logo ? (
						<Image
							src={logo}
							alt='Логотип ФК Акрон'
							width={LOGO_SIZE}
							height={LOGO_SIZE}
							className={styles.teamLogo}
						/>
					) : (
						<div className={styles.teamLogoPlaceholder} aria-hidden />
					)}
					<p className={styles.teamName}>{title}</p>
				</div>
			</div>
		)
	}

	const homeLogo = getTeamLogoPath(homeTeam)
	const awayLogo = getTeamLogoPath(awayTeam)

	return (
		<div className={styles.teamsRow} role='group' aria-label='Команды матча'>
			<div className={styles.teamCol}>
				{homeLogo ? (
					<Image
						src={homeLogo}
						alt={`Логотип ${homeTeam}`}
						width={LOGO_SIZE}
						height={LOGO_SIZE}
						className={styles.teamLogo}
					/>
				) : (
					<div className={styles.teamLogoPlaceholder} aria-hidden />
				)}
				<p className={styles.teamName}>{homeTeam}</p>
			</div>
			<div className={styles.teamCol}>
				{awayLogo ? (
					<Image
						src={awayLogo}
						alt={`Логотип ${awayTeam}`}
						width={LOGO_SIZE}
						height={LOGO_SIZE}
						className={styles.teamLogo}
					/>
				) : (
					<div className={styles.teamLogoPlaceholder} aria-hidden />
				)}
				<p className={styles.teamName}>{awayTeam}</p>
			</div>
		</div>
	)
}
