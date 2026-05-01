/**
 * Варианты карточек (FCA_Fans мобилка):
 * - `solid_dark` — 4810:21130 (фон #1b2222)
 * - `solid_red` — 4810:21135 (#b2061c)
 * - `pattern` — 21140 / … / 1248 (паттерны в SCSS: 360 → 1024 → 1280 → 1600 → 1920)
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
			'Здесь рождается энергия матча — поддержка, эмоции, скандирования и полное погружение в игру вместе с тысячами преданных болельщиков Акрона.',
		ctaLabel: 'Узнать больше',
		ctaHref:
			'https://widget.afisha.yandex.ru/w/venues/79807?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	},
	{
		id: '2',
		variant: 'solid_red',
		titleLines: ['VIP'],
		description:
			'Удобные места с отличным обзором поля, отдельная зона и спокойная обстановка, чтобы сосредоточиться на игре и получать удовольствие от каждого момента матча.',
		ctaLabel: 'Узнать больше',
		ctaHref:
			'https://widget.afisha.yandex.ru/w/venues/85000?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
	},
	{
		id: '3',
		variant: 'pattern',
		titleLines: ['ло', 'жи'],
		description:
			'Персональная зона просмотра матча для друзей, семьи или партнёров. Максимальный комфорт, уединение и лучший вид на игру.',
		ctaLabel: 'Узнать больше',
		ctaHref:
			'https://widget.afisha.yandex.ru/w/venues/85005?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
	},
]

/** Заголовок секции (FCA_Fans 4810:21127). */
export const defaultTicketProgramTitle = 'Билетная программа' as const

/** Подзаголовок / лид (FCA_Fans 4810:21128). */
export const defaultTicketProgramLead =
	'Выберите формат просмотра матча, который подходит именно вам — от живых эмоций трибун до комфортного и приватного пространства.' as const
