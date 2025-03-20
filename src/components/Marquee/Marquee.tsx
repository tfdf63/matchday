import React from 'react'
import styles from './Marquee.module.scss'

interface MarqueeProps {
	text: string
	duration?: number // в секундах
	className?: string
	backgroundColor?: string
	textColor?: string
	fontSize?: string
}

const Marquee: React.FC<MarqueeProps> = ({
	text,
	duration,
	className = '',
	backgroundColor = '#020b12',
	textColor = '#ffffff',
	fontSize = '2rem',
}) => {
	const style = {
		'--duration': `${duration}s`,
		'--background-color': backgroundColor,
		'--text-color': textColor,
		'--font-size': fontSize,
	} as React.CSSProperties

	return (
		<div className={`${styles.marqueeContainer} ${className}`} style={style}>
			<div className={styles.marquee}>
				<span>{text}</span>
				<span>{text}</span>
			</div>
		</div>
	)
}

export default Marquee
