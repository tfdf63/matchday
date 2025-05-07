'use client'

import { useEffect, useState } from 'react'
import styles from './YandexTicket.module.scss'

declare global {
	interface Window {
		YandexTicketsDealer: any[]
	}
}

const YandexTicket = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isSecure, setIsSecure] = useState(true)

	useEffect(() => {
		setIsSecure(window.location.protocol === 'https:')

		if (!isSecure) {
			setIsLoading(false)
			return
		}

		const dealerName = 'YandexTicketsDealer'
		const dealer = (window[dealerName] = window[dealerName] || [])

		dealer.push(['setDefaultClientKey', 'd721bb72-e7ce-4a03-8775-67aea527feb0'])
		dealer.push(['setDefaultRegionId', 51])

		dealer.push([
			'getDealer',
			function (dealer: any) {
				const widget = dealer.Widget('ticketsteam-2130@36744901', 'session', {
					target: document.getElementById('ya-widget-frame'),
					onRequestClose: function () {
						widget.unmount()
						widget.destroy()
					},
					onLoad: function () {
						setIsLoading(false)
					},
					onError: function () {
						setIsLoading(false)
					},
				})

				widget.mount({ style: { height: '600px' } })
			},
		])

		// Загрузка скрипта
		const rnd = '?' + new Date().getTime() * Math.random()
		const script = document.createElement('script')
		const target = document.getElementsByTagName('script')[0]
		script.async = true
		script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js' + rnd
		target.parentNode?.insertBefore(script, target)

		// Очистка при размонтировании
		return () => {
			const widgetFrame = document.getElementById('ya-widget-frame')
			if (widgetFrame) {
				widgetFrame.innerHTML = ''
			}
		}
	}, [isSecure])

	if (!isSecure) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>
					Для отображения информации о билетах необходимо использовать
					защищенное соединение (HTTPS)
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			{isLoading && (
				<div className={styles.loading}>Загрузка информации по билетам</div>
			)}
			<div id='ya-widget-frame'></div>
		</div>
	)
}

export default YandexTicket
