'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useMemo, useState } from 'react'

import gamesDefault, { type Game } from '@/data/games'
import { getTeamLogoPath } from '@/data/teamLogos'
import { starPlayer, type StarPlayerProfile } from '@/data/starPlayer'
import {
	getLocalDateIso,
	pickHeroGame,
	pickLastPastGame,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import styles from './StarPlayer.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type StarPlayerSectionProps = {
	className?: string
	profileData?: StarPlayerProfile
	games?: Game[]
}

export const StarPlayerSection: FC<StarPlayerSectionProps> = ({
	className,
	profileData = starPlayer,
	games = gamesDefault,
}) => {
	const todayIso = useMemo(() => getLocalDateIso(), [])
	const sortedGames = useMemo(() => sortGamesByDateIso(games), [games])
	const previousGame = useMemo(
		() => pickLastPastGame(sortedGames, todayIso),
		[sortedGames, todayIso],
	)
	const nextGame = useMemo(
		() => pickHeroGame(sortedGames, todayIso),
		[sortedGames, todayIso],
	)

	const [activeTab, setActiveTab] = useState<'previous' | 'next'>('next')
	const activeMatch = activeTab === 'next' ? nextGame : previousGame

	const homeLogo = activeMatch
		? getTeamLogoPath(activeMatch.homeTeam)
		: undefined
	const awayLogo = activeMatch
		? getTeamLogoPath(activeMatch.awayTeam)
		: undefined

	const dateTimeLine = activeMatch
		? [activeMatch.dateCard?.trim(), activeMatch.time?.trim()]
				.filter(Boolean)
				.join(' ')
		: ''
	const matchDateLabel = activeMatch
		? [dateTimeLine, activeMatch.timeLocal?.trim()].filter(Boolean).join(' • ')
		: ''

	const homeName = activeMatch?.homeTeam?.trim() ?? ''
	const awayName = activeMatch?.awayTeam?.trim() ?? ''

	const visibleNews = profileData.news.slice(0, 2)
	const sideFacts = profileData.facts.slice(3)

	return (
		<section id='star-player' className={cx(styles.section, className)}>
			<div className={styles.inner}>
				<div className={styles.leftPanel}>
					<div className={cx(styles.tag, 'font-mono')}>
						{profileData.tagLabel}
					</div>

					<h2 className={styles.playerName}>
						<span className={styles.nameLine}>{profileData.firstName}</span>
						<span className={styles.nameLineLast}>{profileData.lastName}</span>
					</h2>

					<div className={styles.params}>
						<div className={styles.hwRow}>
							<div className={styles.hwItem}>
								<p className={cx(styles.hwLabel, 'font-mono')}>Рост</p>
								<p className={styles.hwValue}>{profileData.heightLabel}</p>
							</div>
							<div className={styles.hwItem}>
								<p className={cx(styles.hwLabel, 'font-mono')}>Вес</p>
								<p className={styles.hwValue}>{profileData.weightLabel}</p>
							</div>
						</div>

						<ul className={styles.factsList}>
							{profileData.facts.map(fact => (
								<li key={fact.label} className={styles.factRow}>
									<span className={cx(styles.factLabel, 'font-mono')}>
										{fact.label}
									</span>
									<span className={cx(styles.factValue, 'font-mono')}>
										{fact.value}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className={styles.photoStage}>
					<p className={styles.playerNumber} aria-hidden>
						{profileData.numberLabel}
					</p>
					<div className={styles.photoWrap}>
						<picture className={styles.photoPicture}>
							<source
								media='(min-width: 1920px)'
								srcSet={
									profileData.photoSrc1920 ??
									profileData.photoSrc1600 ??
									profileData.photoSrc1280 ??
									profileData.photoSrc1024 ??
									profileData.photoSrc768 ??
									profileData.photoSrc
								}
							/>
							<source
								media='(min-width: 1600px)'
								srcSet={
									profileData.photoSrc1600 ??
									profileData.photoSrc1280 ??
									profileData.photoSrc1024 ??
									profileData.photoSrc768 ??
									profileData.photoSrc
								}
							/>
							<source
								media='(min-width: 1280px)'
								srcSet={
									profileData.photoSrc1280 ??
									profileData.photoSrc1024 ??
									profileData.photoSrc768 ??
									profileData.photoSrc
								}
							/>
							<source
								media='(min-width: 1024px)'
								srcSet={
									profileData.photoSrc1024 ??
									profileData.photoSrc768 ??
									profileData.photoSrc
								}
							/>
							<source
								media='(min-width: 767px)'
								srcSet={profileData.photoSrc768 ?? profileData.photoSrc}
							/>
							<img
								src={profileData.photoSrc}
								alt={`${profileData.firstName} ${profileData.lastName}`}
								className={styles.photo}
							/>
						</picture>
					</div>
				</div>

				<div className={styles.rightPanel}>
					<div className={styles.matchesBlock}>
						<div className={styles.matchTabs}>
							<button
								type='button'
								className={cx(
									styles.matchTab,
									activeTab === 'previous'
										? styles.matchTabActive
										: styles.matchTabMuted,
									'font-mono',
								)}
								disabled={!previousGame}
								onClick={() => setActiveTab('previous')}
							>
								Последний матч
							</button>
							<button
								type='button'
								className={cx(
									styles.matchTab,
									activeTab === 'next'
										? styles.matchTabActive
										: styles.matchTabMuted,
									'font-mono',
								)}
								onClick={() => setActiveTab('next')}
							>
								Следующий матч
							</button>
						</div>
						<div className={styles.matchCard}>
							<div className={styles.leagueInfo}>
								{activeMatch?.leagueInfo?.trim() ? (
									<p className={cx(styles.leagueLine, 'font-mono')}>
										{activeMatch.leagueInfo.trim()}
									</p>
								) : null}
								{activeMatch?.seasonTour?.trim() ? (
									<p className={cx(styles.leagueLine, 'font-mono')}>
										{activeMatch.seasonTour.trim()}
									</p>
								) : null}
							</div>
							{activeMatch ? (
								<div className={styles.teamsRow}>
									<div className={styles.teamCol}>
										{homeLogo ? (
											<Image
												className={styles.teamLogo}
												src={homeLogo}
												alt={homeName || ''}
												width={56}
												height={56}
											/>
										) : (
											<div
												className={styles.teamLogo}
												style={{ flexShrink: 0 }}
												aria-hidden
											/>
										)}
										{homeName ? (
											<p className={styles.teamName}>{homeName}</p>
										) : null}
									</div>
									<p className={styles.scoreMark}>-</p>
									<p className={styles.scoreMark}>:</p>
									<p className={styles.scoreMark}>-</p>
									<div className={styles.teamCol}>
										{awayLogo ? (
											<Image
												className={styles.teamLogo}
												src={awayLogo}
												alt={awayName || ''}
												width={56}
												height={56}
											/>
										) : (
											<div
												className={styles.teamLogo}
												style={{ flexShrink: 0 }}
												aria-hidden
											/>
										)}
										{awayName ? (
											<p className={styles.teamName}>{awayName}</p>
										) : null}
									</div>
								</div>
							) : null}
							<p className={cx(styles.matchDate, 'font-mono')}>
								{activeMatch
									? matchDateLabel ||
										activeMatch.date?.trim() ||
										activeMatch.dateIso
									: 'Дата уточняется'}
							</p>
						</div>
					</div>

					<div className={styles.newsRow}>
						{visibleNews.map(item => (
							<article key={item.id} className={styles.newsCard}>
								<div className={styles.newsImageWrap}>
									<picture className={styles.newsPicture}>
										<source
											media='(min-width: 1920px)'
											srcSet={
												item.imageSrc1920 ??
												item.imageSrc1600 ??
												item.imageSrc1280 ??
												item.imageSrc1024 ??
												item.imageSrc768 ??
												item.imageSrc
											}
										/>
										<source
											media='(min-width: 1600px)'
											srcSet={
												item.imageSrc1600 ??
												item.imageSrc1280 ??
												item.imageSrc1024 ??
												item.imageSrc768 ??
												item.imageSrc
											}
										/>
										<source
											media='(min-width: 1280px)'
											srcSet={
												item.imageSrc1280 ??
												item.imageSrc1024 ??
												item.imageSrc768 ??
												item.imageSrc
											}
										/>
										<source
											media='(min-width: 1024px)'
											srcSet={
												item.imageSrc1024 ?? item.imageSrc768 ?? item.imageSrc
											}
										/>
										<source
											media='(min-width: 767px)'
											srcSet={item.imageSrc768 ?? item.imageSrc}
										/>
										<img
											src={item.imageSrc}
											alt={item.title}
											className={styles.newsImage}
										/>
									</picture>
								</div>
								<p className={styles.newsTitle}>{item.title}</p>
							</article>
						))}
					</div>

					<ul className={styles.sideFactsList}>
						{sideFacts.map(fact => (
							<li key={fact.label} className={styles.factRow}>
								<span className={cx(styles.factLabel, 'font-mono')}>
									{fact.label}
								</span>
								<span className={cx(styles.factValue, 'font-mono')}>
									{fact.value}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.metricsRow}>
					{profileData.metrics.map(metric => (
						<article
							key={metric.id}
							className={cx(
								styles.metricCard,
								metric.isHighlighted && styles.metricCardActive,
							)}
						>
							<p className={cx(styles.metricLabel, 'font-mono')}>
								{metric.label}
							</p>
							<p className={styles.metricValue}>{metric.value}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
