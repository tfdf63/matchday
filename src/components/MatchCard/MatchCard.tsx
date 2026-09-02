'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import {
	MatchDateBanner,
	getMatchDateBannerText,
} from '@/components/MatchDateBanner'
import { TicketButtonContent } from '@/components/TicketButtonContent'
import type { Game } from '@/data/games'
import { DirectionsModalTrigger } from '@/features/home/directions-modal'
import { PromoCodesModalTrigger } from '@/features/home/home-modal'
import { ParkingModalTrigger } from '@/features/home/parking-modal'
import { getTeamLogoPath } from '@/data/teamLogos'
import { useClientNow } from '@/lib/hooks/useClientNow'
import { formatMatchScore } from '@/lib/match/formatMatchGoals'
import { formatPriceIncreaseLabel } from '@/lib/match/formatPriceIncreaseLabel'
import { useTicketLinks } from '@/lib/personalData'

import { MatchCardCalendarIcon } from './icons/MatchCardCalendarIcon'
import styles from './MatchCard.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function formatPriceFromCompact(value: string | undefined): string | undefined {
	if (!value) return value
	return value.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}

function formatMainTourLabel(value: string | undefined): string | null {
	const source = value?.trim()
	if (!source) return null
	const match = source.match(/(\d{4})\/(\d{4})\s+(\d+)\s*тур/i)
	if (!match) return source
	return `${match[3]} тур`
}

function MatchCardBusFansIcon() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			aria-hidden='true'
		>
			<path
				d='M3 7.5C3 5.84 4.34 4.5 6 4.5H14C15.66 4.5 17 5.84 17 7.5V13.5H3V7.5Z'
				stroke='currentColor'
			/>
			<path d='M3 10.5H17' stroke='currentColor' />
			<circle cx='6.25' cy='14.75' r='1.25' stroke='currentColor' />
			<circle cx='13.75' cy='14.75' r='1.25' stroke='currentColor' />
			<path
				d='M4.5 8.25H6.5M13.5 8.25H15.5'
				stroke='currentColor'
				strokeLinecap='round'
			/>
		</svg>
	)
}

export type MatchCardProps = {
	game: Game
	title?: string
	variant?: 'default' | 'mainShop'
	/** Скрыть «Промокоды» и «Как добраться» (например, карточка в блоке Main). */
	hideSecondaryActions?: boolean
	/** Показать «Парковка» (карточка в блоке Main). */
	showParkingAction?: boolean
	/** Доп. текст под блоком кнопок (например, промокод семейного сектора в Main). */
	actionsFooter?: ReactNode
}

export function MatchCard({
	game,
	title = 'Следующий матч',
	variant = 'default',
	hideSecondaryActions = false,
	showParkingAction = false,
	actionsFooter,
}: MatchCardProps) {
	const { personalData, getTicketUrl, handleTicketClick } = useTicketLinks()
	const homeLogo = getTeamLogoPath(game.homeTeam)
	const awayLogo = getTeamLogoPath(game.awayTeam)
	const ticket = game.ticketLink?.trim()
	const vip = game.ticketLinkVip?.trim()
	const skybox = game.ticketLinkSkybox?.trim()
	const ticketLabel = game.ticketLinkLabel?.trim() || 'Купить билеты'
	const vipLabel = game.ticketLinkVipLabel?.trim() || 'VIP'
	const skyboxLabel = game.ticketLinkSkyboxLabel?.trim() || 'ложи'
	const ticketPriceFrom = game.ticketLinkPriceFrom?.trim() || undefined
	const vipPriceFrom = game.ticketLinkVipPriceFrom?.trim() || undefined
	const skyboxPriceFrom = game.ticketLinkSkyboxPriceFrom?.trim() || undefined
	const ticketPriceMain = formatPriceFromCompact(ticketPriceFrom)
	const vipPriceMain = formatPriceFromCompact(vipPriceFrom)
	const skyboxPriceMain = formatPriceFromCompact(skyboxPriceFrom)
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
	const now = useClientNow()
	const matchDateBannerText = now ? getMatchDateBannerText(game, now) : null
	const showTopBadges = showFanIdBadge || Boolean(matchDateBannerText)
	const isMainShop = variant === 'mainShop'
	const score = formatMatchScore(game.homeGoals, game.awayGoals)

	const mainBadgeText = matchDateBannerText
		? /сегодня/i.test(matchDateBannerText)
			? 'СЕГОДНЯ!'
			: matchDateBannerText
					.replace('Через ', '')
					.replace('дней', 'ДНЕЙ ДО МАТЧА')
					.replace('дня', 'ДНЯ ДО МАТЧА')
					.replace('день', 'ДЕНЬ ДО МАТЧА')
					.replace('Уже завтра!', '1 ДЕНЬ ДО МАТЧА')
					.replace('Послезавтра', '2 ДНЯ ДО МАТЧА')
					.toUpperCase()
		: null

	const mainTime =
		game.time?.trim().match(/\b(\d{1,2}:\d{2})$/)?.[1] ?? game.time
	const mainDate = game.dateIso
		? new Intl.DateTimeFormat('ru-RU', {
				day: 'numeric',
				month: 'long',
			})
				.format(new Date(`${game.dateIso}T12:00:00`))
				.toUpperCase()
		: game.dateCard?.toUpperCase()
	const mainWeekday = game.dateIso
		? new Intl.DateTimeFormat('ru-RU', { weekday: 'long' })
				.format(new Date(`${game.dateIso}T12:00:00`))
				.replace('.', '')
				.toUpperCase()
		: null
	const mainDateTimeLine = [
		mainDate,
		mainWeekday,
		mainTime ? `${mainTime} (смр)` : null,
	]
		.filter(Boolean)
		.join(' · ')
	const mainTourLine = formatMainTourLabel(game.seasonTour)
	const mainPrimaryPriceLine = ticketPriceMain

	return (
		<article
			className={cx(
				styles.root,
				showTopBadges && !isMainShop && styles.rootWithTopBadge,
				isMainShop && styles.mainShopRoot,
			)}
		>
			{isMainShop && (mainBadgeText || showFanIdBadge) ? (
				<div className={styles.mainShopTopRow}>
					{mainBadgeText ? (
						<div className={cx(styles.mainShopBadge, 'font-mono')} role='note'>
							{mainBadgeText}
						</div>
					) : (
						<span className={styles.mainShopTopRowSpacer} aria-hidden />
					)}
					{showFanIdBadge ? (
						<div
							className={cx(styles.mainShopTopFanId, 'font-mono')}
							role='note'
						>
							{fanIdBadgeText.toUpperCase()}
						</div>
					) : null}
				</div>
			) : null}

			{matchDateBannerText && now ? (
				<MatchDateBanner
					game={game}
					now={now}
					className={cx(styles.matchDateBanner, isMainShop && styles.hidden)}
				/>
			) : null}

			{showFanIdBadge ? (
				<div
					className={cx(
						styles.fanIdBadge,
						isMainShop && styles.hidden,
						'font-mono',
					)}
					role='note'
				>
					{fanIdBadgeText}
				</div>
			) : null}

			<div className={styles.inner}>
				{isMainShop ? (
					<>
						{game.leagueInfo ? (
							<p className={cx(styles.mainShopLeague, 'font-mono')}>
								{[game.leagueInfo, mainTourLine && `· ${mainTourLine}`]
									.filter(Boolean)
									.join(' ')}
							</p>
						) : null}
						<div className={styles.mainShopTeams}>
							<div className={styles.mainShopTeamRow}>
								{homeLogo ? (
									<Image
										src={homeLogo}
										alt={
											game.homeTeam
												? `Логотип ${game.homeTeam}`
												: 'Логотип команды хозяев'
										}
										width={36}
										height={36}
										className={styles.mainShopTeamLogo}
									/>
								) : (
									<div
										className={styles.mainShopTeamLogoPlaceholder}
										aria-hidden
									/>
								)}
								<p className={styles.mainShopTeam}>{game.homeTeam}</p>
							</div>
							<div className={styles.mainShopTeamRow}>
								{awayLogo ? (
									<Image
										src={awayLogo}
										alt={
											game.awayTeam
												? `Логотип ${game.awayTeam}`
												: 'Логотип команды гостей'
										}
										width={36}
										height={36}
										className={styles.mainShopTeamLogo}
									/>
								) : (
									<div
										className={styles.mainShopTeamLogoPlaceholder}
										aria-hidden
									/>
								)}
								<p className={styles.mainShopTeam}>{game.awayTeam}</p>
							</div>
						</div>
						{mainDateTimeLine ? (
							<p className={cx(styles.mainShopDateTime, 'font-mono')}>
								{mainDateTimeLine}
							</p>
						) : null}
						{game.stadium ? (
							<p className={cx(styles.mainShopStadium, 'font-mono')}>
								{game.stadium}
							</p>
						) : null}
					</>
				) : (
					<>
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
									<p className={cx(styles.dateMain, 'font-mono')}>
										{dateTimeLine}
									</p>
								</div>
							) : null}
							{timeLocal ? (
								<p className={cx(styles.timeLocal, 'font-mono')}>{timeLocal}</p>
							) : null}
							{game.stadium ? (
								<p className={cx(styles.stadium, 'font-mono')}>
									{game.stadium}
								</p>
							) : null}
						</div>

						<div className={styles.teamsRow}>
							<div className={styles.teamCol}>
								{homeLogo ? (
									<Image
										src={homeLogo}
										alt={
											game.homeTeam
												? `Логотип ${game.homeTeam}`
												: 'Логотип команды хозяев'
										}
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
								role='group'
								aria-label={score.ariaLabel}
							>
								<span className={cx(styles.scoreMain, 'font-mono')}>
									{score.main}
								</span>
								{score.penaltiesLine ? (
									<span className={cx(styles.scorePenalty, 'font-mono')}>
										{score.penaltiesLine}
									</span>
								) : null}
							</div>
							<div className={cx(styles.teamCol, styles.teamColAway)}>
								{awayLogo ? (
									<Image
										src={awayLogo}
										alt={
											game.awayTeam
												? `Логотип ${game.awayTeam}`
												: 'Логотип команды гостей'
										}
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
					</>
				)}

				<div className={styles.actions}>
					<div className={styles.primaryStack}>
						{ticket ? (
							<a
								className={cx(styles.btnPrimary, 'font-mono')}
								href={personalData ? getTicketUrl(ticket) : undefined}
								target='_blank'
								rel='noopener noreferrer'
								onClick={e => {
									if (handleTicketClick(ticket)) e.preventDefault()
								}}
							>
								<TicketButtonContent
									title={isMainShop ? 'Купить билеты' : ticketLabel}
									priceFrom={
										isMainShop ? mainPrimaryPriceLine : ticketPriceFrom
									}
									priceClassName={styles.btnPrice}
								/>
							</a>
						) : null}
						{(vip || skybox) && (
							<div
								className={cx(
									styles.outlineStack,
									isMainShop && styles.mainShopOutlineStack,
								)}
							>
								{vip ? (
									<a
										className={cx(
											styles.btnOutline,
											isMainShop && styles.mainShopOutlineButton,
											'font-mono',
										)}
										href={personalData ? getTicketUrl(vip) : undefined}
										target='_blank'
										rel='noopener noreferrer'
										onClick={e => {
											if (handleTicketClick(vip)) e.preventDefault()
										}}
									>
										<TicketButtonContent
											title={isMainShop ? 'VIP' : vipLabel}
											priceFrom={isMainShop ? vipPriceMain : vipPriceFrom}
											priceClassName={styles.btnPrice}
										/>
									</a>
								) : null}
								{skybox ? (
									<a
										className={cx(
											styles.btnOutline,
											isMainShop && styles.mainShopOutlineButton,
											isMainShop && styles.mainShopBusinessClub,
											isMainShop && styles.mainShopNoUppercase,
											'font-mono',
										)}
										href={personalData ? getTicketUrl(skybox) : undefined}
										target='_blank'
										rel='noopener noreferrer'
										onClick={e => {
											if (handleTicketClick(skybox)) e.preventDefault()
										}}
									>
										<TicketButtonContent
											title={isMainShop ? 'БИЗНЕС-КЛУБ' : skyboxLabel}
											priceFrom={isMainShop ? 'от 6 990 ₽' : skyboxPriceFrom}
											priceClassName={styles.btnPrice}
										/>
									</a>
								) : null}
								{isMainShop && skybox ? (
									<a
										className={cx(
											styles.btnOutline,
											styles.mainShopOutlineButton,
											'font-mono',
										)}
										href={personalData ? getTicketUrl(skybox) : undefined}
										target='_blank'
										rel='noopener noreferrer'
										onClick={e => {
											if (handleTicketClick(skybox)) e.preventDefault()
										}}
									>
										<TicketButtonContent
											title='Ложи'
											priceFrom={skyboxPriceMain}
											priceClassName={styles.btnPrice}
										/>
									</a>
								) : null}
							</div>
						)}
						{isMainShop ? (
							<ParkingModalTrigger
								buttonClassName={cx(
									styles.btnOutline,
									styles.mainShopParkingButton,
									'font-mono',
								)}
								iconClassName={styles.secondaryIcon}
								label={
									<>
										<span className={styles.mainShopParkingText}>Парковка</span>
										<span className={styles.btnPrice}>390 ₽</span>
									</>
								}
							/>
						) : null}
						{isMainShop ? (
							<Link
								className={cx(
									styles.btnOutline,
									styles.mainShopBusFansButton,
									styles.mainShopWithNewBadge,
									styles.mainShopNoUppercase,
									'font-mono',
								)}
								href='/busfans'
							>
								<span className={styles.secondaryIcon} aria-hidden>
									<MatchCardBusFansIcon />
								</span>
								<span className={styles.mainShopParkingText}>Фан-автобусы</span>
								<span className={styles.btnPrice}>490 Р</span>
							</Link>
						) : null}
					</div>

					{priceLine && !isMainShop ? (
						<p className={cx(styles.priceNote, 'font-mono')}>{priceLine}</p>
					) : null}
					{showParkingAction || (!isAway && !hideSecondaryActions) ? (
						<div className={styles.secondaryActions}>
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
							{showParkingAction ? (
								<ParkingModalTrigger
									buttonClassName={cx(
										styles.btnSecondary,
										styles.parkingButton,
										'font-mono',
									)}
									iconClassName={styles.secondaryIcon}
								/>
							) : null}
						</div>
					) : null}

					{actionsFooter ? (
						<div className={styles.actionsFooter}>{actionsFooter}</div>
					) : null}
				</div>
			</div>
		</article>
	)
}
