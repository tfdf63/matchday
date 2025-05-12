'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './Skybox.module.scss'
import ContactForm from './ContactForm/ContactForm'

export default function Skybox() {
	const skyboxRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLDivElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)
	const [activeItem, setActiveItem] = useState(0)
	const [isVisible, setIsVisible] = useState(false)

	const skyboxItems = [
		{
			type: 'video',
			src: '/videos/SkyboxHost',
			poster: '/images/skybox/skybox-1.webp',
			alt: 'Skybox VIP видео',
		},
		{
			type: 'image',
			src: '/images/skybox/skybox-2.webp',
			alt: 'Skybox VIP ложа 2',
		},
		{
			type: 'image',
			src: '/images/skybox/skybox-3.webp',
			alt: 'Skybox VIP ложа 3',
		},
	] as const

	useEffect(() => {
		const checkVisibility = () => {
			const scrollPosition = window.scrollY
			const windowHeight = window.innerHeight
			const documentHeight = document.documentElement.scrollHeight

			// Показываем компонент, когда пользователь прокрутил 80% страницы
			if (scrollPosition + windowHeight >= documentHeight * 0.8) {
				setIsVisible(true)

				// Запускаем видео, когда компонент становится видимым и активен первый элемент
				if (activeItem === 0 && videoRef.current) {
					// Небольшая задержка для анимации появления
					setTimeout(() => {
						videoRef.current?.play().catch(error => {
							console.log('Автовоспроизведение не удалось:', error)
						})
					}, 600)
				}
			} else {
				setIsVisible(false)
			}
		}

		// Проверяем видимость сразу при монтировании
		checkVisibility()

		window.addEventListener('scroll', checkVisibility)
		return () => window.removeEventListener('scroll', checkVisibility)
	}, [activeItem])

	useEffect(() => {
		// Запускаем видео, когда оно активно и если видео есть
		if (activeItem === 0 && videoRef.current) {
			videoRef.current.play().catch(error => {
				console.log('Автовоспроизведение не удалось:', error)
			})
		}
	}, [activeItem])

	const handleItemClick = (index: number) => {
		setActiveItem(index)
	}

	const renderItem = (item: (typeof skyboxItems)[number]) => {
		if (item.type === 'image') {
			return (
				<Image
					src={item.src}
					alt={item.alt}
					width={400}
					height={600}
					className={styles.image}
				/>
			)
		} else if (item.type === 'video') {
			return (
				<video
					ref={videoRef}
					className={styles.video}
					controls
					autoPlay={activeItem === 0}
					loop
					muted
					playsInline
					poster={item.poster}
				>
					<source src={`${item.src}.webm`} type='video/webm' />
					<source src={`${item.src}.mp4`} type='video/mp4' />
					Ваш браузер не поддерживает видео.
				</video>
			)
		}
		return null
	}

	return (
		<div
			className={`${styles.skybox} ${isVisible ? styles.visible : ''}`}
			id='skybox'
			ref={skyboxRef}
		>
			<div className={styles.contentWrapper}>
				<div className={styles.imagesSection}>
					<div className={styles.mainImage}>
						{renderItem(skyboxItems[activeItem])}
					</div>
					<div className={styles.thumbnails}>
						{skyboxItems.map((item, index) => (
							<div
								key={index}
								className={`${styles.thumbnail} ${
									index === activeItem ? styles.active : ''
								}`}
								onClick={() => handleItemClick(index)}
							>
								{item.type === 'image' ? (
									<Image
										src={item.src}
										alt={item.alt}
										width={100}
										height={150}
									/>
								) : (
									<div className={styles.videoThumbnail}>
										<Image
											src={item.poster}
											alt={item.alt}
											width={100}
											height={150}
										/>
										<div className={styles.playIcon}>▶</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className={styles.infoSection}>
					<div className={styles.benefits}>
						<h3 className={styles.benefitsTitle}>Преимущества</h3>
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
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	)
}
