/**
 * Модалка «Промокоды, тарифы, скидки» (FCA_Fans 4810:33897, 4810:33931, 4810:33961).
 */
export type HomeInfoModalVariant = 'promo' | 'tariffs' | 'socialTickets'

export const HOME_OFFERS_MODAL_LEAD = {
	/** Как в Figma 4810:33903 — с пробелом в конце строки */
	kicker: 'Специальные предложения ',
	body: 'для болельщиков ФК Акрон. Используйте промокоды, получайте скидки и посещайте матчи с друзьями и близкими выгодно.',
} as const

export const HOME_OFFERS_TABS: ReadonlyArray<{
	id: HomeInfoModalVariant
	label: string
	indexLabel: string
}> = [
	{ id: 'promo', label: 'Промокоды', indexLabel: '[01]' },
	{ id: 'tariffs', label: 'тарифы', indexLabel: '[02]' },
	{ id: 'socialTickets', label: 'Социальные билеты', indexLabel: '[03]' },
]

export const GOSUSLUGI_URL = 'https://www.gosuslugi.ru/' as const
export const FAN_CARD_HASH = '/#fan-card' as const
/** Телеграм для заявок в блоке «Социальные билеты» модалки предложений */
export const HOME_OFFERS_SOCIAL_TELEGRAM_HREF = 'https://t.me/slava_tfdf' as const
