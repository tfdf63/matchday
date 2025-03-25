'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './Skybox.module.scss'

interface SkyboxFormData {
	fullName: string
	email: string
	phone: string
}

export default function Skybox() {
	const skyboxRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLDivElement>(null)
	const [activeImage, setActiveImage] = useState(0)
	const [formData, setFormData] = useState<SkyboxFormData>({
		fullName: '',
		email: '',
		phone: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [scrollY, setScrollY] = useState(0)

	// Определяем, является ли устройство мобильным
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)

		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	const skyboxImages = [
		'/images/skybox/skybox-1.webp',
		'/images/skybox/skybox-2.webp',
		'/images/skybox/skybox-3.webp',
	]

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	// Сохраняем текущую позицию прокрутки при клике на поле формы
	const handleTouchStart = () => {
		setScrollY(window.scrollY)
	}

	// Предотвращаем дефолтное поведение мобильных браузеров при фокусировке на полях ввода
	const handleFocus = () => {
		if (isMobile) {
			// Запрещаем автоматическую прокрутку
			setTimeout(() => {
				window.scrollTo(0, scrollY)
			}, 10)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Имитация отправки данных формы
		setTimeout(() => {
			setIsSubmitting(false)
			setSubmitSuccess(true)

			// Сброс формы
			setFormData({
				fullName: '',
				email: '',
				phone: '',
			})

			// Скрыть сообщение об успешной отправке через 3 секунды
			setTimeout(() => {
				setSubmitSuccess(false)
			}, 3000)
		}, 1500)
	}

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
								<span>test@yandex.ru</span>
							</a>
							, указав следующую информацию:
							<ul>
								<li>ФИО</li>
								<li>Телефон</li>
								<li>Почта</li>
								<li>Матч</li>
							</ul>
						</div>
						{/* <form onSubmit={handleSubmit} className={styles.form}>
							<div className={styles.formGroup}>
								<input
									type='text'
									name='fullName'
									value={formData.fullName}
									onChange={handleChange}
									onTouchStart={handleTouchStart}
									onFocus={handleFocus}
									placeholder='Фамилия Имя'
									required
									className={styles.input}
								/>
							</div>
							<div className={styles.formGroup}>
								<input
									type='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									onTouchStart={handleTouchStart}
									onFocus={handleFocus}
									placeholder='Email'
									required
									className={styles.input}
								/>
							</div>
							<div className={styles.formGroup}>
								<input
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									onTouchStart={handleTouchStart}
									onFocus={handleFocus}
									placeholder='Телефон'
									required
									className={styles.input}
								/>
							</div>
							<button
								type='submit'
								className={styles.submitButton}
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Отправка...' : 'Отправить'}
							</button>
							{submitSuccess && (
								<div className={styles.successMessage}>
									Заявка успешно отправлена! Мы свяжемся с вами в ближайшее
									время.
								</div>
							)}
						</form> */}
					</div>
				</div>
			</div>
		</div>
	)
}
