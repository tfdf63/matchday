'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useMemo, useState } from 'react'

import nextMatchGames, { type NextMatchGame } from '@/data/nextMatchMock'
import { starPlayer, type StarPlayerProfile } from '@/data/starPlayer'

import styles from './StarPlayer.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type StarPlayerSectionProps = {
	className?: string
	profileData?: StarPlayerProfile
	matches?: NextMatchGame[]
}

function getLeagueLines(value: string): string[] {
	return value.split('\n').filter(Boolean)
}

const MONTH_MAP: Record<string, number> = {
	января: 0,
	февраля: 1,
	марта: 2,
	апреля: 3,
	мая: 4,
	июня: 5,
	июля: 6,
	августа: 7,
	сентября: 8,
	октября: 9,
	ноября: 10,
	декабря: 11,
}

function parseMatchDate(dateRaw: string): Date | null {
	const value = dateRaw.trim().toLowerCase()
	const ddMmMatch = value.match(/(\d{1,2})\.(\d{1,2})/)
	if (ddMmMatch) {
		const day = Number(ddMmMatch[1])
		const month = Number(ddMmMatch[2]) - 1
		const now = new Date()
		return new Date(now.getFullYear(), month, day)
	}

	const rangeMonthMatch = value.match(/(\d{1,2})(?:-\d{1,2})?\s+([а-яё]+)/i)
	if (rangeMonthMatch) {
		const day = Number(rangeMonthMatch[1])
		const month = MONTH_MAP[rangeMonthMatch[2]]
		if (month !== undefined) {
			const now = new Date()
			return new Date(now.getFullYear(), month, day)
		}
	}

	return null
}

function getPreviousAndNextMatch(matches: NextMatchGame[]): {
	previous: NextMatchGame | null
	next: NextMatchGame | null
} {
	const now = new Date()
	const dated = matches
		.map(match => ({ match, date: parseMatchDate(match.date) }))
		.filter((entry): entry is { match: NextMatchGame; date: Date } =>
			Boolean(entry.date),
		)
		.sort((a, b) => a.date.getTime() - b.date.getTime())

	if (dated.length === 0) {
		return {
			previous: matches[0] ?? null,
			next: matches[1] ?? matches[0] ?? null,
		}
	}

	let previous: NextMatchGame | null = null
	let next: NextMatchGame | null = null

	for (const entry of dated) {
		if (entry.date.getTime() <= now.getTime()) {
			previous = entry.match
		} else if (!next) {
			next = entry.match
		}
	}

	return {
		previous: previous ?? dated[0]?.match ?? null,
		next: next ?? dated[dated.length - 1]?.match ?? null,
	}
}

export const StarPlayerSection: FC<StarPlayerSectionProps> = ({
	className,
	profileData = starPlayer,
	matches = nextMatchGames,
}) => {
	const { previous, next } = useMemo(
		() => getPreviousAndNextMatch(matches),
		[matches],
	)
	const [activeTab, setActiveTab] = useState<'previous' | 'next'>('next')
	const activeMatch = activeTab === 'next' ? next : previous
	const leagueLines = activeMatch ? getLeagueLines(activeMatch.leagueInfo) : []

	const homeLogo = activeMatch
		? activeMatch.homeTeam.logo
		: '/images/teamslogo/Akron.png'
	const awayLogo = activeMatch
		? activeMatch.awayTeam.logo
		: '/images/teamslogo/Pari-NN.png'
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
								{leagueLines.map(line => (
									<p key={line} className={cx(styles.leagueLine, 'font-mono')}>
										{line}
									</p>
								))}
							</div>
							{activeMatch ? (
								<div className={styles.teamsRow}>
									<div className={styles.teamCol}>
										<Image
											className={styles.teamLogo}
											src={homeLogo}
											alt={activeMatch.homeTeam.name}
											width={56}
											height={56}
										/>
										<p className={styles.teamName}>
											{activeMatch.homeTeam.name}
										</p>
									</div>
									<p className={styles.scoreMark}>-</p>
									<p className={styles.scoreMark}>:</p>
									<p className={styles.scoreMark}>-</p>
									<div className={styles.teamCol}>
										<Image
											className={styles.teamLogo}
											src={awayLogo}
											alt={activeMatch.awayTeam.name}
											width={56}
											height={56}
										/>
										<p className={styles.teamName}>
											{activeMatch.awayTeam.name}
										</p>
									</div>
								</div>
							) : null}
							<p className={cx(styles.matchDate, 'font-mono')}>
								{activeMatch
									? `${activeMatch.date}${activeMatch.time ? ` • ${activeMatch.time}` : ''}`
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
