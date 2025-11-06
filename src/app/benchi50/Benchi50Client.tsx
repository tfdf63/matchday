'use client'

import React from 'react'
import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './Benchi50Client.module.scss'

const Benchi50Client: React.FC = () => {
	const [isMobile, setIsMobile] = React.useState(false)
	const [copied, setCopied] = React.useState(false)

	// Определяем мобильное устройство
	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Функция копирования промокода
	const copyPromoCode = async () => {
		try {
			// Проверяем доступность Clipboard API
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText('BENCHI50')
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			} else {
				// Альтернативный метод для старых браузеров и мобильных устройств
				const textArea = document.createElement('textarea')
				textArea.value = 'BENCHI50'
				textArea.style.position = 'fixed'
				textArea.style.left = '-999999px'
				textArea.style.top = '-999999px'
				document.body.appendChild(textArea)
				textArea.focus()
				textArea.select()

				try {
					document.execCommand('copy')
					textArea.remove()
					setCopied(true)
					setTimeout(() => setCopied(false), 2000)
				} catch (err) {
					console.error('Не удалось скопировать промокод:', err)
					textArea.remove()
				}
			}
		} catch (err) {
			console.error('Ошибка при копировании:', err)
		}
	}

	const buttonHref =
		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@season-48933203?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'
	const buttonActionType = isMobile ? 'link' : 'modal'

	return (
		<div className={styles.benchi50Page}>
			{/* Фото */}
			<div className={styles.heroImage}>
				<Image
					src='/images/abon1.webp'
					alt='Абонемент ноябрь 25'
					width={1200}
					height={400}
					className={styles.image}
				/>
			</div>

			{/* Заголовок и малая кнопка в одной строке */}
			<div className={styles.headerSection}>
				<h1 className={styles.title}>Дни шопинга</h1>
				<div className={styles.smallButton}>
					<ActionButton
						href={buttonHref}
						title='Купить абонемент'
						actionType={buttonActionType}
					/>
				</div>
			</div>

			{/* Подзаголовок */}
			<p className={styles.subtitle}>
				«Акрон» набирает ход в МИР РПЛ и готовится к заключительному отрезку
				года перед зимней паузой.
			</p>

			{/* Секция с описанием */}
			<div className={styles.descriptionSection}>
				<h2 className={styles.descriptionTitle}>Об абонементе</h2>
				<p className={styles.descriptionText}>
					После побед в Нижнем Новгороде и{'\u00A0'}Ростове-на-Дону, а{'\u00A0'}
					также ничьих с{'\u00A0'}
					топ-клубами – «Зенитом» и{'\u00A0'}«Локомотивом», красно-чёрные полны
					решимости забрать своё в ноябрьских домашних матчах с{'\u00A0'}«Сочи»
					и{'\u00A0'}«Пари НН».
					<br />
					<br /> У{'\u00A0'}
					нашей команды есть все шансы превзойти показатели дебютного сезона в
					{'\u00A0'}
					премьер-лиге, а{'\u00A0'}у форвардов «Акрона» Артёма Дзюбы №22 и
					{'\u00A0'}Жилсона Беншимола №11, забивающего три матча подряд, выявить
					лидера в{'\u00A0'}рейтинге бомбардиров клуба. <br />
					<br />В{'\u00A0'}преддверии всемирного дня шоппинга мы подготовили для
					{'\u00A0'}тебя специальное предложение – только до{'\u00A0'}11 ноября
					можно взять абонемент сразу на{'\u00A0'}два матча за{'\u00A0'}полцены
					и{'\u00A0'}завершить домашний сезон 2025 года вместе с{'\u00A0'}
					командой. <br />
					<br />
					Используй промокод{' '}
					<span
						className={styles.promoCode}
						onClick={copyPromoCode}
						onTouchEnd={e => {
							e.preventDefault()
							copyPromoCode()
						}}
						title='Нажмите, чтобы скопировать'
					>
						BENCHI50
						{copied && (
							<span className={styles.copiedNotification}> ✓ Скопировано</span>
						)}
					</span>{' '}
					при{'\u00A0'}оформлении абонемента и{'\u00A0'}будь с{'\u00A0'}
					«Акроном» в{'\u00A0'}ноябре!
				</p>
			</div>

			{/* Большая кнопка Купить абонемент */}
			<div className={styles.bigButton}>
				<ActionButton
					href={buttonHref}
					title='Купить абонемент'
					actionType={buttonActionType}
				/>
			</div>
		</div>
	)
}

export default Benchi50Client
