/**
 * Модалка «Как добраться» (FCA_Fans 4810:34358, 4810:34385).
 */
export type DirectionsModalTabId = 'tolyatti' | 'samara'

export const DIRECTIONS_VK_FANS_URL = 'https://vk.com/fcakron_fans' as const
export const DIRECTIONS_VK_TOGETHER_TOPIC_URL =
	'https://vk.com/topic-206993703_52115486' as const

export const DIRECTIONS_MODAL_TITLE_LINES = [
	'Дорога на стадион',
	'Чемпионата Мира 2018',
] as const

export const DIRECTIONS_MODAL_LEAD = {
	/** 4810:34378 — выравнивание по правому краю в вёрстке */
	line1: 'Вся информация о\u00A0транспорте',
	/** 4810:34377 */
	line2:
		'и маршрутах до\u00A0стадиона «Солидарность Самара Арена». Выбирайте удобный способ добраться на\u00A0матчи команды.',
} as const

export const DIRECTIONS_MODAL_TABS: ReadonlyArray<{
	id: DirectionsModalTabId
	label: string
	indexLabel: string
}> = [
	{ id: 'tolyatti', label: 'Из Тольятти', indexLabel: '[01]' },
	{ id: 'samara', label: 'Из Самары', indexLabel: '[02]' },
]

/** Схемы трамвая и автобуса до стадиона (public/images/transport/1-360.png, 2-360.png) */
export const DIRECTIONS_SAMARA_TRANSPORT_IMAGES: ReadonlyArray<{
	src: string
	alt: string
	width: number
	height: number
}> = [
	{
		src: '/images/transport/1-360.png',
		alt: 'Схема проезда до стадиона: трамвай',
		width: 152,
		height: 190,
	},
	{
		src: '/images/transport/2-360.png',
		alt: 'Схема проезда до стадиона: автобус',
		width: 152,
		height: 190,
	},
]
