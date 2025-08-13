import React from 'react'
import Image from 'next/image'
import styles from './StarPlayer.module.scss'
import { starPlayers } from '@/data/starPlayer'

const StarPlayer: React.FC = () => {
	const player = starPlayers[0] // Берем первого игрока

	return (
		<div className={styles.starPlayer}>
			<div className={styles.photoSection}>
				<div className={styles.photoStack}>
					<div className={styles.photoCard}>
						<Image
							src={player.photoUrl}
							alt={`${player.firstName} ${player.lastName}`}
							fill
							sizes='(max-width: 768px) 100px, 200px'
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</div>
			</div>
			<div className={styles.infoSection}>
				<h2 className={styles.playerName}>
					{player.firstName} {player.lastName}
				</h2>

				{/* Блок Достижения */}
				<div className={styles.achievements}>
					<ul className={styles.achievementsList}>
						{player.achievements.map((achievement, index) => (
							<li key={index} className={styles.achievementItem}>
								<strong>{achievement.benefit}</strong>
								<div className={styles.achievementDescription}>
									{achievement.description}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default StarPlayer
