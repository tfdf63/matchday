/**
 * Варианты карточек (FCA_Fans мобилка):
 * - `solid_dark` — 4810:21130 (фон #1b2222)
 * - `solid_red` — 4810:21135 (#b2061c)
 * - `pattern` — 4810:21140 / 16134 / 13844 (паттерны в SCSS: 360 база, 1024 от 1024px, 1280 от 1280px)
 */
export type TicketProgramCardVariant = 'solid_dark' | 'solid_red' | 'pattern'

export type TicketProgramCard = {
	id: string
	variant: TicketProgramCardVariant
	/** Строки заголовка Akademia 56 / 0.9, на экране — `text-transform: uppercase` (4810:21132, 21137, 21142). */
	titleLines: readonly string[]
	/** Текст описания (Mono 12 / 1.3), переводы строк как в макете (4810:21133, 21138, 21143). */
	description: string
	ctaLabel: string
	ctaHref: string
}

export const ticketProgramCards: TicketProgramCard[] = [
	{
		id: '1',
		variant: 'solid_dark',
		titleLines: ['три', 'бу', 'ны'],
		description:
			'Здесь рождается энергия матча — поддержка, эмоции, скандирования \nи полное погружение \nв игру вместе \nс тысячами преданных болельщиков Акрона.',
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '2',
		variant: 'solid_red',
		titleLines: ['VIP'],
		description:
			'Удобные места \nс отличным обзором поля, отдельная зона \nи спокойная обстановка, чтобы сосредоточиться \nна игре и получать удовольствие \nот каждого момента матча.',
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '3',
		variant: 'pattern',
		titleLines: ['ло', 'жи'],
		description:
			'Персональная зона просмотра матча \nдля друзей, семьи или партнёров. Максимальный комфорт, уединение \nи лучший вид \nна игру.',
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
]

/** Заголовок секции (FCA_Fans 4810:21127). */
export const defaultTicketProgramTitle = 'Билетная программа' as const

/** Подзаголовок / лид (FCA_Fans 4810:21128). */
export const defaultTicketProgramLead =
	'Выберите формат просмотра матча, который подходит именно вам — от живых эмоций трибун до комфортного и приватного пространства.' as const
