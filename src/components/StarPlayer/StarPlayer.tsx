import React, { useState } from 'react'
import Image from 'next/image'
import styles from './StarPlayer.module.scss'
import { starPlayers } from '@/data/starPlayer'

const StarPlayer: React.FC = () => {
	const player = starPlayers[0] // Берем первого игрока
	const [showVideo, setShowVideo] = useState(false)

	const handlePhotoClick = () => {
		setShowVideo(true)
	}

	return (
		<div className={styles.starPlayer}>
			<div className={styles.photoSection}>
				<div className={styles.photoStack}>
					<div className={styles.photoCard}>
						{showVideo ? (
							<iframe
								src='https://vk.com/video_ext.php?oid=-175141666&id=456242225&hash=42d4e515725e2f38'
								width='300'
								height='300'
								frameBorder='0'
								allowFullScreen={true}
								allow='autoplay; encrypted-media; fullscreen; picture-in-picture'
								title='VK Video'
								className={styles.videoIframe}
							/>
						) : (
							<div className={styles.photoContainer} onClick={handlePhotoClick}>
								<Image
									src={player.photoUrl}
									alt={`${player.firstName} ${player.lastName}`}
									width={320}
									height={320}
									className={styles.playerPhoto}
								/>
								<div className={styles.playButton}>
									<svg width='60' height='60' viewBox='0 0 24 24' fill='none'>
										<circle cx='12' cy='12' r='10' fill='rgba(0,0,0,0.7)' />
										<path d='M8 5v14l11-7z' fill='white' />
									</svg>
								</div>
							</div>
						)}
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
