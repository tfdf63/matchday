import React from 'react'
import Head from 'next/head'
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

	return (
		<div className={styles.main}>
			<Head>
				<link
					rel='preload'
					href='/videos/bgmain1-optimized.webm'
					as='video'
					type='video/webm'
				/>
				<link
					rel='preload'
					href='/videos/bgmainmob-optimized.webm'
					as='video'
					type='video/webm'
				/>
			</Head>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				className={styles.backgroundVideo}
				id='desktop-video'
			>
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
