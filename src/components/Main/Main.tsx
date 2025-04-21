'use client'

import React, { useEffect } from 'react'
import styles from './Main.module.scss'
import CardMatch from '../CardMatch/CardMatch'
import games from '@/data/games'

interface MainProps {
	matchIndex?: number
}

const Main: React.FC<MainProps> = ({ matchIndex = 0 }) => {
	// Проверяем, что индекс в пределах массива
	const selectedIndex =
		matchIndex >= 0 && matchIndex < games.length ? matchIndex : 0
	const selectedGame = games[selectedIndex]

	// Предзагрузка видео при монтировании компонента
	useEffect(() => {
		// Создаем теги предзагрузки
		const preloadDesktop = document.createElement('link')
		preloadDesktop.rel = 'preload'
		preloadDesktop.href = '/videos/bgmain1-optimized.mp4'
		preloadDesktop.as = 'video'
		preloadDesktop.type = 'video/mp4'

		const preloadMobile = document.createElement('link')
		preloadMobile.rel = 'preload'
		preloadMobile.href = '/videos/bgmainmob-optimized.mp4'
		preloadMobile.as = 'video'
		preloadMobile.type = 'video/mp4'

		// Добавляем в head
		document.head.appendChild(preloadDesktop)
		document.head.appendChild(preloadMobile)

		// Очищаем при размонтировании
		return () => {
			document.head.removeChild(preloadDesktop)
			document.head.removeChild(preloadMobile)
		}
	}, [])

	return (
		<div className={styles.main}>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				className={styles.backgroundVideo}
				id='desktop-video'
			>
				<source src='/videos/bgmain1-optimized.mp4' type='video/mp4' />
				<source src='/videos/bgmain1-optimized.webm' type='video/webm' />
			</video>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				className={styles.backgroundVideoMobile}
				id='mobile-video'
			>
				<source src='/videos/bgmainmob-optimized.mp4' type='video/mp4' />
				<source src='/videos/bgmainmob-optimized.webm' type='video/webm' />
			</video>
			<div className={styles.leagueInfo}>{selectedGame.leagueInfo}</div>
			<div className={styles.content}>
				<div className={styles.featuredMatch}>
					<CardMatch
						homeTeam={selectedGame.homeTeam}
						awayTeam={selectedGame.awayTeam}
						date={selectedGame.date}
						time={selectedGame.time}
						stadium={selectedGame.stadium}
						ticketLink={selectedGame.ticketLink}
						ticketLinkVip={selectedGame.ticketLinkVip}
					/>
				</div>
			</div>
		</div>
	)
}
export default Main
