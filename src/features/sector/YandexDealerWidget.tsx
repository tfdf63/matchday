'use client'

import { useEffect, useRef } from 'react'

type DealerWidgetInstance = {
	mount: (options: { style?: { height?: string } }) => void
	unmount?: () => void
	destroy?: () => void
}

type DealerApi = {
	Widget: (
		venueId: string,
		type: 'venue',
		options: {
			target: HTMLElement
			onRequestClose: () => void
		},
	) => DealerWidgetInstance
}

type DealerQueueCommand = [string, ...unknown[]]

const DEALER_SCRIPT_SRC = 'https://widget.afisha.yandex.ru/dealer/dealer.js'

function ensureDealerScript(): void {
	const existing = document.querySelector<HTMLScriptElement>(
		`script[src^="${DEALER_SCRIPT_SRC}"]`,
	)
	if (existing) return

	const script = document.createElement('script')
	script.async = true
	script.src = `${DEALER_SCRIPT_SRC}?${Date.now() * Math.random()}`
	document.head.appendChild(script)
}

export type YandexDealerWidgetProps = {
	clientKey: string
	regionId: number
	venueId: string
	height?: number
	className?: string
}

export function YandexDealerWidget({
	clientKey,
	regionId,
	venueId,
	height = 600,
	className,
}: YandexDealerWidgetProps) {
	const targetRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const dealerName = 'YandexTicketsDealer'
		const win = window as Window & { YandexTicketsDealer?: DealerQueueCommand[] }
		const dealerQueue = (win[dealerName] = win[dealerName] || [])

		let destroyed = false
		let widget: DealerWidgetInstance | null = null

		dealerQueue.push(['setDefaultClientKey', clientKey])
		dealerQueue.push(['setDefaultRegionId', regionId])

		dealerQueue.push([
			'getDealer',
			(dealerApi: DealerApi) => {
				if (destroyed || !targetRef.current) return

				widget = dealerApi.Widget(venueId, 'venue', {
					target: targetRef.current,
					onRequestClose: () => {
						widget?.unmount?.()
						widget?.destroy?.()
					},
				})

				widget.mount({
					style: { height: `${height}px` },
				})
			},
		])

		ensureDealerScript()

		return () => {
			destroyed = true
			widget?.unmount?.()
			widget?.destroy?.()
		}
	}, [clientKey, regionId, venueId, height])

	return <div id='ya-widget-frame' ref={targetRef} className={className} />
}
