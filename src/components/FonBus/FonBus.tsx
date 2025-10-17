'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './FonBus.module.scss'

interface FonBusProps {
	isVisible: boolean
}

const FonBus: React.FC<FonBusProps> = ({ isVisible }) => {
	const [isIconVisible, setIsIconVisible] = useState(false)

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				setIsIconVisible(true)
			}, 1200) // Иконка появляется через 1.2 секунды после появления автобуса

			return () => clearTimeout(timer)
		} else {
			setIsIconVisible(false)
		}
	}, [isVisible])
	return (
		<div
			className={`${styles.fonBusContainer} ${isVisible ? styles.visible : ''}`}
		>
			<a
				href='https://fon.bet/?externalPageAliasForFrame=akron_vpiska'
				target='_blank'
				rel='noopener noreferrer'
				className={styles.busLink}
			>
				<Image
					src='/images/fonbus/bus.png'
					alt='FonBus'
					width={200}
					height={150}
					className={styles.busImage}
					priority
				/>
				{isIconVisible && (
					<div className={styles.clickIcon}>
						<div className={styles.clickPulse}></div>
						<div className={styles.clickIconInner}>👆</div>
					</div>
				)}
			</a>
		</div>
	)
}

export default FonBus
