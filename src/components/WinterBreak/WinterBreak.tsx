'use client'

import React from 'react'
import Image from 'next/image'
import styles from './WinterBreak.module.scss'

interface WinterBreakProps {
	imagePath?: string
	imagePathMobile?: string
	alt?: string
}

const WinterBreak: React.FC<WinterBreakProps> = ({
	imagePath = '/images/WinterBreakFon.jpg',
	imagePathMobile,
	alt = 'Winter Break',
}) => {
	return (
		<div className={styles.winterBreak}>
			<div className={styles.imageWrapper}>
				<Image
					src={imagePathMobile || imagePath}
					alt={alt}
					fill
					priority
					className={styles.imageMobile}
					sizes='100vw'
				/>
				<Image
					src={imagePath}
					alt={alt}
					fill
					priority
					className={styles.imageDesktop}
					sizes='100vw'
				/>
				<div className={styles.overlay} />
				<div className={styles.textContainer}>
					<h2 className={styles.text}>До встречи весной 2026</h2>
				</div>
			</div>
		</div>
	)
}

export default WinterBreak

