import React from 'react'
import styles from './Games.module.scss'
import GamesMatch from '../GamesMatch/GamesMatch'
import games from '@/data/games'

const Games = () => {
	const remainingGames = games.slice(1) // Берем матчи начиная со второго индекса
	return (
		<div className={styles.games}>
			{remainingGames.map((game, index) => (
				<div key={index} className={styles.gameCard}>
					<GamesMatch
						homeTeam={game.homeTeam}
						awayTeam={game.awayTeam}
						date={game.date}
						time={game.time}
						stadium={game.stadium}
						ticketLink={game.ticketLink}
					/>
				</div>
			))}
		</div>
	)
}

export default Games
