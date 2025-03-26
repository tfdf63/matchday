'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './Skybox.module.scss'

export default function Skybox() {
	const skyboxRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLDivElement>(null)
	const [activeImage, setActiveImage] = useState(0)

	const skyboxImages = [
		'/images/skybox/skybox-1.webp',
		'/images/skybox/skybox-2.webp',
		'/images/skybox/skybox-3.webp',
	]

	return (
		<div className={styles.skyboxContainer} id='skybox' ref={skyboxRef}>
			{/* <h2 className={styles.title}>SKYBOX</h2> */}

			<div className={styles.contentWrapper}>
				<div className={styles.imagesSection}>
					<div className={styles.mainImage}>
						<Image
							src={skyboxImages[activeImage]}
							alt='Skybox VIP ложа'
							width={400}
							height={600}
							className={styles.image}
						/>
					</div>
					<div className={styles.thumbnails}>
						{skyboxImages.map((image, index) => (
							<div
								key={index}
								className={`${styles.thumbnail} ${
									index === activeImage ? styles.active : ''
								}`}
								onClick={() => setActiveImage(index)}
							>
								<Image
									src={image}
									alt={`Skybox VIP ложа ${index + 1}`}
									width={100}
									height={150}
								/>
							</div>
						))}
					</div>
				</div>

				<div className={styles.infoSection}>
					<div className={styles.benefits}>
						<h3 className={styles.benefitsTitle}>Преимущества:</h3>
						<ul className={styles.benefitsList}>
							<li>► VIP-заезд/вход на стадион;</li>
							<li>► Приоритетная парковка (5 мест);</li>
							<li>
								► Банкетная категория питания с широким выбором холодных
								закусок, десертов, салатов и горячих блюд. Также в категории
								представлены горячие и холодные напитки. На каждой игре
								добавляется блюдо матча;
							</li>
							<li>► Обслуживание VIP-ложи во время матча официантом;</li>
							<li>► Сопровождение хостес при проведении матча;</li>
							<li>► Собственный выход на трибуну арены;</li>
							<li>► Приватная обстановка с лучшим видом на поле;</li>
							<li>► Доступ к Wi-fi во время матча;</li>
							<li>► Персональный менеджер.</li>
						</ul>
					</div>

					<div className={styles.formSection} ref={formRef}>
						<h3 className={styles.formTitle}>Оставить заявку:</h3>
						<div className={styles.formText}>
							Напишите сообщение на почту{' '}
							<a href='mailto:test@yandex.ru'>
								<span>egorova_ka@fcakron.com</span>
							</a>
							, указав следующую информацию:
							<ul>
								<li>ФИО</li>
								<li>Телефон</li>
								<li>Почта</li>
								<li>Матч</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
