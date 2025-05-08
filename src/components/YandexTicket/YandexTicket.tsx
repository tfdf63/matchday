'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import styles from './YandexTicket.module.scss'

const YandexTicket = () => {
	useEffect(() => {
		// Очистка при размонтировании
		return () => {
			const widgetFrame = document.getElementById('ya-widget-frame')
			if (widgetFrame) {
				widgetFrame.innerHTML = ''
			}
		}
	}, [])

	return (
		<div className={styles.container}>
			<div id='ya-widget-frame'></div>
			<Script
				src='/components/YandexTicket/yandex-tickets.js'
				strategy='afterInteractive'
			/>
		</div>
	)
}

export default YandexTicket
