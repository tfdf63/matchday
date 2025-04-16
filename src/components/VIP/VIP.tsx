'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './VIP.module.scss'

const VIP: React.FC = () => {
	return (
		<section className={styles.vip}>
			<div className={styles.content}>
				<h1 className={styles.title}>VIP A106</h1>

				<div className={styles.description}>
					<p>
						Предлагаем уникальный опыт просмотра матчей с максимальным комфортом
						и премиальным сервисом.
					</p>

					<ul>
						<li>Отдельный вход в сектор</li>
						<li>Высокоскоростной Wi-Fi</li>
						<li>Обслуживание официантами</li>
						<li>Комфортные кресла</li>
						<li>Отличный обзор поля</li>
						<li>Детские игровые площадки</li>
						<li>Отдельные туалетные комнаты</li>
					</ul>
				</div>

				<div className={styles.gallery}>
					<div className={styles.image}>
						<Image
							src='/images/vip/sector.webp'
							alt='VIP сектор A106'
							width={600}
							height={400}
							priority
						/>
					</div>
				</div>

				<Link href='/tickets/vip' className={styles.button}>
					Купить VIP билеты
				</Link>
			</div>
		</section>
	)
}

export default VIP
