import React from 'react'
import styles from './Games.module.scss'
import GamesMatch from '../GamesMatch/GamesMatch'
import games from '@/data/games'

const Games = () => {
	const remainingGames = games.slice(1) // Берем все матчи, начиная со второго

	// Отладочная информация
	console.log('Games remainingGames:', remainingGames)

	return (
		<div className={styles.games}>
			{remainingGames.map((game, index) => (
				<div key={index} className={styles.gameCard}>
					<GamesMatch
						leagueInfo={game.leagueInfo}
						homeTeam={game.homeTeam}
						awayTeam={game.awayTeam}
						date={game.date}
						time={game.time}
						timeLocal={game.timeLocal}
						stadium={game.stadium}
						ticketLink={game.ticketLink}
						ticketLinkVip={game.ticketLinkVip}
						ticketLinkSkybox={game.ticketLinkSkybox}
						priceIncreaseDates={game.priceIncreaseDates}
						fanIdStatus={game.fanIdStatus}
						promoType={game.promoType}
					/>
				</div>
			))}
		</div>
	)
}

export default Games
