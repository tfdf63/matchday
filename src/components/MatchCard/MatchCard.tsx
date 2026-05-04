import Image from 'next/image'

import {
	MatchDateBanner,
	getMatchDateBannerText,
} from '@/components/MatchDateBanner'
import type { Game } from '@/data/games'
import { DirectionsModalTrigger } from '@/features/home/directions-modal'
import { PromoCodesModalTrigger } from '@/features/home/home-modal'
import { getTeamLogoPath } from '@/data/teamLogos'
import { formatPriceIncreaseLabel } from '@/lib/match/formatPriceIncreaseLabel'
import { formatGoalCell } from '@/lib/match/formatMatchGoals'

import { MatchCardCalendarIcon } from './icons/MatchCardCalendarIcon'
import styles from './MatchCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MatchCardProps = {
	game: Game
	title?: string
}

export function MatchCard({ game, title = 'Следующий матч' }: MatchCardProps) {
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
	const now = new Date()
	const matchDateBannerText = getMatchDateBannerText(game, now)
	const showTopBadges = showFanIdBadge || Boolean(matchDateBannerText)

	return (
		<article
			className={cx(styles.root, showTopBadges && styles.rootWithTopBadge)}
		>
			{matchDateBannerText ? (
				<MatchDateBanner
					game={game}
					now={now}
					className={styles.matchDateBanner}
				/>
			) : null}

			{showFanIdBadge ? (
				<div className={cx(styles.fanIdBadge, 'font-mono')} role="note">
					FAN ID
				</div>
			) : null}

			<div className={styles.inner}>
				<h2 className={styles.title}>{title}</h2>

				<div className={styles.metaBlock}>
					{game.leagueInfo ? (
						<p className={cx(styles.leagueLine, 'font-mono')}>
							{game.leagueInfo}
						</p>
					) : null}
					{game.seasonTour ? (
						<p className={cx(styles.leagueLine, 'font-mono')}>
							{game.seasonTour}
						</p>
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

				<div className={styles.teamsRow}>
					<div className={styles.teamCol}>
						{homeLogo ? (
							<Image
								src={homeLogo}
								alt=""
								width={60}
								height={60}
								className={styles.teamLogo}
							/>
						) : (
							<div className={styles.teamLogoPlaceholder} aria-hidden />
						)}
						<div className={styles.teamNameBlock}>
							{game.homeTeam ? (
								<p className={styles.teamName}>{game.homeTeam}</p>
							) : null}
							{game.homeTeamCity ? (
								<p className={cx(styles.teamCity, 'font-mono')}>
									{game.homeTeamCity}
								</p>
							) : null}
						</div>
					</div>
					<div
						className={styles.scoreRow}
						role="group"
						aria-label={`Счёт: ${formatGoalCell(game.homeGoals)} ${formatGoalCell(game.awayGoals)}`}
					>
						<span className={cx(styles.scoreCell, 'font-mono')}>
							{formatGoalCell(game.homeGoals)}
						</span>
						<span className={styles.scoreSep} aria-hidden>
							:
						</span>
						<span className={cx(styles.scoreCell, 'font-mono')}>
							{formatGoalCell(game.awayGoals)}
						</span>
					</div>
					<div className={cx(styles.teamCol, styles.teamColAway)}>
						{awayLogo ? (
							<Image
								src={awayLogo}
								alt=""
								width={60}
								height={60}
								className={styles.teamLogo}
							/>
						) : (
							<div className={styles.teamLogoPlaceholder} aria-hidden />
						)}
						<div className={styles.teamNameBlock}>
							{game.awayTeam ? (
								<p className={styles.teamName}>{game.awayTeam}</p>
							) : null}
							{game.awayTeamCity ? (
								<p className={cx(styles.teamCity, 'font-mono')}>
									{game.awayTeamCity}
								</p>
							) : null}
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
			</div>
		</article>
	)
}
