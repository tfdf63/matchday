import Image from 'next/image'
import type { FC } from 'react'

import {
	MatchDateBanner,
	getMatchDateBannerText,
} from '@/components/MatchDateBanner'
import { MatchCardCalendarIcon } from '@/components/MatchCard/icons/MatchCardCalendarIcon'
import type { Game } from '@/data/games'
import { getTeamLogoPath } from '@/data/teamLogos'
import { DirectionsModalTrigger } from '@/features/home/directions-modal'
import { PromoCodesModalTrigger } from '@/features/home/home-modal'
import { useClientNow } from '@/lib/hooks/useClientNow'
import { formatPriceIncreaseLabel } from '@/lib/match/formatPriceIncreaseLabel'
import { formatGoalCell } from '@/lib/match/formatMatchGoals'
import {
	GAME_DATE_TIME_TENTATIVE_LABEL,
	isGameDateTimeTentative,
} from '@/lib/match/isGameDateTimeTentative'

import styles from './UpcomingMatchCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type UpcomingMatchCardProps = {
	game: Game
	/** Скрыть «Промокоды» и «Как добраться» в календаре матчей. */
	hideSecondaryActions?: boolean
}

export const UpcomingMatchCard: FC<UpcomingMatchCardProps> = ({
	game,
	hideSecondaryActions = false,
}) => {
	const homeLogo = getTeamLogoPath(game.homeTeam)
	const awayLogo = getTeamLogoPath(game.awayTeam)
	const ticket = game.ticketLink?.trim()
	const vip = game.ticketLinkVip?.trim()
	const skybox = game.ticketLinkSkybox?.trim()
	const ticketLinkCount = [ticket, vip, skybox].filter(Boolean).length
	const hasExtraTicketLinks = ticketLinkCount > 1
	const vipLabel = game.ticketLinkVipLabel?.trim() || 'VIP'
	const isAway = game.venue === 'away'
	const priceLine =
		!isAway &&
		game.priceIncreaseDates &&
		formatPriceIncreaseLabel(game.priceIncreaseDates)
	const dateTimeLine = [game.dateCard?.trim(), game.time?.trim()]
		.filter(Boolean)
		.join(' ')
	const timeLocal = game.timeLocal?.trim()
	const showFanIdBadge =
		game.fanIdStatus === 'Fan id' || game.fanIdStatus === 'Без fan id'
	const fanIdBadgeText = game.fanIdStatus === 'Fan id' ? 'FAN ID' : 'Без fan id'
	const homeCity = game.homeTeamCity?.trim()
	const awayCity = game.awayTeamCity?.trim()
	const now = useClientNow()
	const matchDateBannerText = now ? getMatchDateBannerText(game, now) : null
	const showTopBadges = showFanIdBadge || Boolean(matchDateBannerText)
	const showDateTimeTentativeBadge = isGameDateTimeTentative(game)

	const homeLogoNode = homeLogo ? (
		<Image
			src={homeLogo}
			alt={
				game.homeTeam ? `Логотип ${game.homeTeam}` : 'Логотип команды хозяев'
			}
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
			alt={
				game.awayTeam ? `Логотип ${game.awayTeam}` : 'Логотип команды гостей'
			}
			width={100}
			height={100}
			className={styles.teamLogo}
		/>
	) : (
		<div className={styles.teamLogoPlaceholder} aria-hidden />
	)

	return (
		<article
			className={cx(styles.root, showTopBadges && styles.rootWithTopBadge)}
		>
			{matchDateBannerText && now ? (
				<MatchDateBanner
					game={game}
					now={now}
					className={styles.matchDateBanner}
				/>
			) : null}

			{showFanIdBadge ? (
				<div className={cx(styles.fanIdBadge, 'font-mono')} role='note'>
					{fanIdBadgeText}
				</div>
			) : null}

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
				{showDateTimeTentativeBadge ? (
					<p
						className={cx(styles.dateTimeTentativeBadge, 'font-mono')}
						role='note'
					>
						{GAME_DATE_TIME_TENTATIVE_LABEL}
					</p>
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
									<p className={cx(styles.teamCity, 'font-mono')}>{homeCity}</p>
								) : null}
							</div>
						</div>
						<div
							className={styles.scoreRow}
							role='group'
							aria-label={`Счёт: ${formatGoalCell(game.homeGoals)} ${formatGoalCell(game.awayGoals)}`}
						>
							<span className={styles.scoreCell}>
								{formatGoalCell(game.homeGoals)}
							</span>
							<span className={styles.scoreSep} aria-hidden>
								:
							</span>
							<span className={styles.scoreCell}>
								{formatGoalCell(game.awayGoals)}
							</span>
						</div>
						<div className={cx(styles.teamCol, styles.teamColAway)}>
							{awayLogoNode}
							<div className={styles.teamNameBlock}>
								{game.awayTeam ? (
									<p className={styles.teamName}>{game.awayTeam}</p>
								) : null}
								{awayCity ? (
									<p className={cx(styles.teamCity, 'font-mono')}>{awayCity}</p>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.actions}>
				<div
					className={cx(
						styles.primaryStack,
						ticketLinkCount === 1 && styles.primaryStackSolo,
						ticketLinkCount === 2 && styles.primaryStackDuo,
					)}
				>
					{ticket ? (
						<a
							className={cx(styles.btnPrimary, 'font-mono')}
							href={ticket}
							target='_blank'
							rel='noopener noreferrer'
						>
							Купить билеты
						</a>
					) : null}
					{hasExtraTicketLinks ? (
						<div className={styles.outlineStack}>
							{vip ? (
								<a
									className={cx(styles.btnOutline, 'font-mono')}
									href={vip}
									target='_blank'
									rel='noopener noreferrer'
								>
									{vipLabel}
								</a>
							) : null}
							{skybox ? (
								<a
									className={cx(styles.btnOutline, 'font-mono')}
									href={skybox}
									target='_blank'
									rel='noopener noreferrer'
								>
									ложи
								</a>
							) : null}
						</div>
					) : null}
				</div>

				{priceLine ? (
					<p className={cx(styles.priceNote, 'font-mono')}>{priceLine}</p>
				) : null}

				{!isAway && !hideSecondaryActions ? (
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
