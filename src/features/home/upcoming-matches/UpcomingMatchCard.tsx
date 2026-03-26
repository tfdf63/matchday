import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { LocationArrowIcon } from '@/components/Button/icons/LocationArrowIcon'
import { PromoBadgeIcon } from '@/components/Button/icons/PromoBadgeIcon'
import { MatchCardCalendarIcon } from '@/components/MatchCard/icons/MatchCardCalendarIcon'
import type { Game } from '@/data/games'
import { getTeamLogoPath } from '@/data/teamLogos'
import { formatPriceIncreaseLabel } from '@/lib/match/formatPriceIncreaseLabel'

import styles from './UpcomingMatchCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type UpcomingMatchCardProps = {
	game: Game
	promoHref?: string
	directionsHref?: string
}

export const UpcomingMatchCard: FC<UpcomingMatchCardProps> = ({
	game,
	promoHref = '/',
	directionsHref = '/',
}) => {
	const homeLogo = getTeamLogoPath(game.homeTeam)
	const awayLogo = getTeamLogoPath(game.awayTeam)
	const ticket = game.ticketLink?.trim()
	const vip = game.ticketLinkVip?.trim()
	const skybox = game.ticketLinkSkybox?.trim()
	const priceLine =
		game.priceIncreaseDates &&
		formatPriceIncreaseLabel(game.priceIncreaseDates)
	const dateTimeLine = [game.dateCard?.trim(), game.time?.trim()]
		.filter(Boolean)
		.join(' ')
	const timeLocal = game.timeLocal?.trim()
	const showFanIdBadge = game.fanIdStatus === 'Fan id'

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
					</div>
				</div>
				<p className={styles.vs} aria-hidden>
					—
				</p>
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

				<div className={styles.secondaryStack}>
					<Link
						href={promoHref}
						className={cx(styles.btnSecondary, 'font-mono')}
					>
						<span className={cx(styles.secondaryIcon, styles.promoIcon)}>
							<PromoBadgeIcon width={17} height={17} />
						</span>
						Промокоды
					</Link>
					<Link
						href={directionsHref}
						className={cx(styles.btnSecondary, 'font-mono')}
					>
						<span className={styles.secondaryIcon}>
							<LocationArrowIcon />
						</span>
						Как добраться
					</Link>
				</div>
			</div>
		</article>
	)
}
