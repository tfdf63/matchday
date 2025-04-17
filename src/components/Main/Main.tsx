import React from 'react'
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
			<video
				autoPlay
				muted
				loop
				playsInline
				className={styles.backgroundVideo}
				id='desktop-video'
			>
				<source src='/videos/bgmain1.webm' type='video/webm' />
			</video>
			<video
				autoPlay
				muted
				loop
				playsInline
				className={styles.backgroundVideoMobile}
				id='mobile-video'
			>
				<source src='/videos/bgmainmob.webm' type='video/webm' />
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
