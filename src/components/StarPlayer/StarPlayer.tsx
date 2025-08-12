import React, { useState } from 'react'
import styles from './StarPlayer.module.scss'
import { starPlayers } from '@/data/starPlayer'

const StarPlayer: React.FC = () => {
	const [activePlayerIndex, setActivePlayerIndex] = useState(0)

	const handleCardClick = (index: number) => {
		setActivePlayerIndex(index)
	}

	const activePlayer = starPlayers[activePlayerIndex]

	return (
		<div className={styles.starPlayer}>
			<div className={styles.photoSection}>
				<div className={styles.photoStack}>
					{starPlayers.map((player, index) => (
						<div
							key={player.id}
							className={`${styles.photoCard} ${
								index === activePlayerIndex ? styles.activeCard : ''
							}`}
							onClick={() => handleCardClick(index)}
						>
							<img
								src={player.photoUrl}
								alt={`${player.firstName} ${player.lastName}`}
							/>
						</div>
					))}
				</div>
			</div>
			<div className={styles.infoSection}>
				<h2 className={styles.playerName}>
					{activePlayer.firstName} {activePlayer.lastName}
				</h2>
				<div className={styles.playerNumber}>№{activePlayer.number}</div>
				<p className={styles.playerDescription}>{activePlayer.description}</p>
			</div>
		</div>
	)
}

export default StarPlayer
