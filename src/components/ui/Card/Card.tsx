import React from 'react'
import Image from 'next/image'
import styles from './Card.module.scss'

interface CardProps {
	image: string
	title: string
	className?: string
	onClick?: () => void
	imageAlt?: string
}

const Card: React.FC<CardProps> = ({
	image,
	title,
	className = '',
	onClick,
	imageAlt = 'Card image',
}) => {
	return (
		<div className={`${styles.cardWrapper} ${className}`} onClick={onClick}>
			<div className={styles.card}>
				<div className={styles.imageWrapper}>
					<Image
						src={image}
						alt={imageAlt}
						fill
						className={styles.image}
						sizes='340px'
					/>
				</div>
			</div>
			<h3 className={styles.title}>{title}</h3>
		</div>
	)
}

export default Card
