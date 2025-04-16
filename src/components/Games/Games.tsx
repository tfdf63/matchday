import React from 'react'
import styles from './Games.module.scss'
import GamesMatch from '../GamesMatch/GamesMatch'
import games from '@/data/games'

const Games = () => {
	const remainingGames = games.slice(1, 4) // Берем 3 матча, начиная со второго (индексы 1, 2, 3)

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
						ticketLinkVip={game.ticketLinkVip}
					/>
				</div>
			))}
		</div>
	)
}

export default Games
