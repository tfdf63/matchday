/**
 * Мобильный футер FCA_Fans 4810:18860; слот формы — Bitrix (вставка позже).
 */

export const FOOTER_BITRIX_SUBSCRIBE_SLOT_ID =
	'footer-bitrix-subscribe' as const

export const footerNewsletterTitle =
	'будьте в курсе Последних новостей ФК «Акрон»' as const

/** 18864 — два визуальных абзаца */
export const footerNewsletterLeadParagraphs = [
	'Подпишитесь на рассылку, чтобы первыми узнавать о матчах, билетах, акциях и новостях команды.',
] as const

export type FooterNavItem = {
	label: string
	href: string
}

/** Колонка 1 — 18875 */
export const footerNavColumn1: FooterNavItem[] = [
	{ label: 'ближайшие матчи', href: '/#upcoming-matches-heading' },
	{ label: 'Активности на матче', href: '/#match-activities' },
	{ label: 'билетная программа', href: '/#ticket-program' },
	{ label: 'Сектора', href: '/#sector' },
]

/** Колонка 2 — 18880 */
export const footerNavColumn2: FooterNavItem[] = [
	{ label: 'Карта болельщика', href: '/#fan-card' },
	{ label: 'Мерч', href: '/#merch' },
	{ label: 'Правила', href: '/#rules' },
	{ label: 'FAQ', href: '/#faq' },
]

export const footerSocialVk = {
	label: 'ВКонтакте',
	href: process.env.NEXT_PUBLIC_FOOTER_VK_URL ?? '#',
} as const

export const footerSocialTg = {
	label: 'Телеграм',
	href: process.env.NEXT_PUBLIC_FOOTER_TELEGRAM_URL ?? '#',
} as const

export const footerAgencyPrefix = 'Разработка сайта: ' as const
export const footerAgencyName = 'kutuzova.agency' as const
export const footerAgencyHref = 'https://kutuzova.agency/' as const

export const footerBrandMark = 'Акрон' as const
