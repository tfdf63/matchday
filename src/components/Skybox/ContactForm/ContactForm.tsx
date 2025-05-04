'use client'

import React, { useState, useEffect } from 'react'
import styles from './ContactForm.module.scss'

interface FormData {
	fullName: string
	phone: string
	email: string
}

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		fullName: '',
		phone: '',
		email: '',
	})

	const [errors, setErrors] = useState<Partial<FormData>>({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	// Загрузка данных из localStorage при монтировании
	useEffect(() => {
		const savedData = localStorage.getItem('contactFormData')
		if (savedData) {
			setFormData(JSON.parse(savedData))
		}
	}, [])

	// Сохранение данных в localStorage при изменении
	useEffect(() => {
		localStorage.setItem('contactFormData', JSON.stringify(formData))
	}, [formData])

	const validateForm = (): boolean => {
		const newErrors: Partial<FormData> = {}

		// Валидация ФИО
		if (!formData.fullName.trim()) {
			newErrors.fullName = 'Введите ФИО'
		} else if (formData.fullName.length < 3) {
			newErrors.fullName = 'ФИО должно содержать минимум 3 символа'
		}

		// Валидация телефона
		const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
		if (!formData.phone.trim()) {
			newErrors.phone = 'Введите номер телефона'
		} else if (!phoneRegex.test(formData.phone)) {
			newErrors.phone = 'Введите корректный номер телефона'
		}

		// Валидация email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!formData.email.trim()) {
			newErrors.email = 'Введите email'
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Введите корректный email'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			const mailtoLink = `mailto:egorova_ka@fcakron.com?subject=Новая заявка&body=ФИО: ${formData.fullName}%0D%0AТелефон: ${formData.phone}%0D%0AEmail: ${formData.email}`

			window.location.href = mailtoLink
			setIsSubmitted(true)

			// Очищаем форму после успешной отправки
			setTimeout(() => {
				setFormData({ fullName: '', phone: '', email: '' })
				setIsSubmitted(false)
				localStorage.removeItem('contactFormData')
			}, 3000)
		}
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 0) {
			if (value.length <= 1) {
				value = '+7' + value
			} else if (value.length <= 4) {
				value = '+7 (' + value.slice(1, 4)
			} else if (value.length <= 7) {
				value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7)
			} else if (value.length <= 9) {
				value =
					'+7 (' +
					value.slice(1, 4) +
					') ' +
					value.slice(4, 7) +
					'-' +
					value.slice(7, 9)
			} else {
				value =
					'+7 (' +
					value.slice(1, 4) +
					') ' +
					value.slice(4, 7) +
					'-' +
					value.slice(7, 9) +
					'-' +
					value.slice(9, 11)
			}
		}
		setFormData(prev => ({ ...prev, phone: value }))
	}

	return (
		<>
			<h2 className={styles.title}>Оставить заявку</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<input
						type='text'
						value={formData.fullName}
						onChange={e =>
							setFormData(prev => ({ ...prev, fullName: e.target.value }))
						}
						placeholder='ФИО'
						className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
					/>
					{errors.fullName && (
						<span className={styles.errorText}>{errors.fullName}</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<input
						type='tel'
						value={formData.phone}
						onChange={handlePhoneChange}
						placeholder='Телефон'
						className={`${styles.input} ${errors.phone ? styles.error : ''}`}
					/>
					{errors.phone && (
						<span className={styles.errorText}>{errors.phone}</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<input
						type='email'
						value={formData.email}
						onChange={e =>
							setFormData(prev => ({ ...prev, email: e.target.value }))
						}
						placeholder='Email'
						className={`${styles.input} ${errors.email ? styles.error : ''}`}
					/>
					{errors.email && (
						<span className={styles.errorText}>{errors.email}</span>
					)}
				</div>

				<button
					type='submit'
					className={styles.submitButton}
					disabled={isSubmitted}
				>
					{isSubmitted ? 'Отправлено!' : 'Отправить'}
				</button>
			</form>
		</>
	)
}

export default ContactForm
