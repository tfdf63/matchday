'use client'

import { useEffect } from 'react'
import styles from './YandexTicket.module.scss'

const YandexTicket = () => {
	useEffect(() => {
		// Загружаем скрипт Яндекс.Афиши
		const script = document.createElement('script')
		script.src = '/components/YandexTicket/yandex-tickets.js'
		script.async = true
		document.body.appendChild(script)

		// Очистка при размонтировании
		return () => {
			const widgetFrame = document.getElementById('ya-widget-frame')
			if (widgetFrame) {
				widgetFrame.innerHTML = ''
			}
			document.body.removeChild(script)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div id='ya-widget-frame'></div>
		</div>
	)
}

export default YandexTicket
