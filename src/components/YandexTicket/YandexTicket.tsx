'use client'

import { useEffect } from 'react'
import styles from './YandexTicket.module.scss'

declare global {
	interface Window {
		YandexTicketsDealer: any[]
	}
}

const YandexTicket = () => {
	useEffect(() => {
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
	}, [])

	return (
		<div className={styles.container}>
			<div id='ya-widget-frame'></div>
		</div>
	)
}

export default YandexTicket
