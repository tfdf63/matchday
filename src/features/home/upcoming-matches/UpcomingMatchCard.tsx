import Image from 'next/image'
import type { FC } from 'react'

import { MatchCardCalendarIcon } from '@/components/MatchCard/icons/MatchCardCalendarIcon'
import type { Game } from '@/data/games'
import { getTeamLogoPath } from '@/data/teamLogos'
import { DirectionsModalTrigger } from '@/features/home/directions-modal'
import { PromoCodesModalTrigger } from '@/features/home/home-modal'
import { formatPriceIncreaseLabel } from '@/lib/match/formatPriceIncreaseLabel'

import styles from './UpcomingMatchCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type UpcomingMatchCardProps = {
	game: Game
}

export const UpcomingMatchCard: FC<UpcomingMatchCardProps> = ({ game }) => {
	const homeLogo = getTeamLogoPath(game.homeTeam)
	const awayLogo = getTeamLogoPath(game.awayTeam)
	const ticket = game.ticketLink?.trim()
	const vip = game.ticketLinkVip?.trim()
	const skybox = game.ticketLinkSkybox?.trim()
	const isAway = game.venue === 'away'
	const priceLine =
		!isAway &&
		game.priceIncreaseDates &&
		formatPriceIncreaseLabel(game.priceIncreaseDates)
	const dateTimeLine = [game.dateCard?.trim(), game.time?.trim()]
		.filter(Boolean)
		.join(' ')
	const timeLocal = game.timeLocal?.trim()
	const showFanIdBadge = game.fanIdStatus === 'Fan id'
	const homeCity = game.homeTeamCity?.trim()
	const awayCity = game.awayTeamCity?.trim()

	const homeLogoNode = homeLogo ? (
		<Image
			src={homeLogo}
			alt=""
			width={100}
			height={100}
			className={styles.teamLogo}
		/>
	) : (
		<div className={styles.teamLogoPlaceholder} aria-hidden />
	)

	const awayLogoNode = awayLogo ? (
		<Image
			src={awayLogo}
			alt=""
			width={100}
			height={100}
			className={styles.teamLogo}
		/>
	) : (
		<div className={styles.teamLogoPlaceholder} aria-hidden />
	)

	return (
		<article
			className={cx(styles.root, showFanIdBadge && styles.rootWithFanBadge)}
		>
			{showFanIdBadge ? (
				<div className={cx(styles.fanIdBadge, 'font-mono')} role="note">
					FAN ID
				</div>
			) : null}

			<div className={styles.metaBlock}>
				{game.leagueInfo ? (
					<p className={cx(styles.leagueLine, 'font-mono')}>{game.leagueInfo}</p>
				) : null}
				{game.seasonTour ? (
					<p className={cx(styles.leagueLine, 'font-mono')}>{game.seasonTour}</p>
				) : null}
				{dateTimeLine ? (
					<div className={styles.dateRow}>
						<span className={styles.dateRowIcon} aria-hidden>
							<MatchCardCalendarIcon />
						</span>
						<p className={cx(styles.dateMain, 'font-mono')}>{dateTimeLine}</p>
					</div>
				) : null}
				{timeLocal ? (
					<p className={cx(styles.timeLocal, 'font-mono')}>{timeLocal}</p>
				) : null}
				{game.stadium ? (
					<p className={cx(styles.stadium, 'font-mono')}>{game.stadium}</p>
				) : null}
			</div>

			<div className={styles.teamsSection}>
				<div className={styles.teamsBlock}>
					<div className={styles.teamsRow}>
						<div className={styles.teamCol}>
							{homeLogoNode}
							<div className={styles.teamNameBlock}>
								{game.homeTeam ? (
									<p className={styles.teamName}>{game.homeTeam}</p>
								) : null}
								{homeCity ? (
									<p className={cx(styles.teamCity, 'font-mono')}>
										{homeCity}
									</p>
								) : null}
							</div>
						</div>
						<p className={styles.vs} aria-hidden>
							—
						</p>
						<div className={cx(styles.teamCol, styles.teamColAway)}>
							{awayLogoNode}
							<div className={styles.teamNameBlock}>
								{game.awayTeam ? (
									<p className={styles.teamName}>{game.awayTeam}</p>
								) : null}
								{awayCity ? (
									<p className={cx(styles.teamCity, 'font-mono')}>
										{awayCity}
									</p>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.actions}>
				<div className={styles.primaryStack}>
					{ticket ? (
						<a
							className={cx(styles.btnPrimary, 'font-mono')}
							href={ticket}
							target="_blank"
							rel="noopener noreferrer"
						>
							Купить билеты
						</a>
					) : null}
					{(vip || skybox) && (
						<div className={styles.outlineStack}>
							{vip ? (
								<a
									className={cx(styles.btnOutline, 'font-mono')}
									href={vip}
									target="_blank"
									rel="noopener noreferrer"
								>
									VIP
								</a>
							) : null}
							{skybox ? (
								<a
									className={cx(styles.btnOutline, 'font-mono')}
									href={skybox}
									target="_blank"
									rel="noopener noreferrer"
								>
									ложи
								</a>
							) : null}
						</div>
					)}
				</div>

				{priceLine ? (
					<p className={cx(styles.priceNote, 'font-mono')}>{priceLine}</p>
				) : null}

				{!isAway ? (
					<div className={styles.secondaryStack}>
						<PromoCodesModalTrigger
							buttonClassName={cx(styles.btnSecondary, 'font-mono')}
							iconClassName={cx(styles.secondaryIcon, styles.promoIcon)}
						/>
						<DirectionsModalTrigger
							buttonClassName={cx(styles.btnSecondary, 'font-mono')}
							iconClassName={styles.secondaryIcon}
						/>
					</div>
				) : null}
			</div>
		</article>
	)
}
