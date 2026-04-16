/** Сколько карточек показываем на главной при полном списке N (план: «6 из N»). */
export const MATCH_ACTIVITIES_INITIAL_VISIBLE = 6

/**
 * Публичные пути к ассетам блока (`public/images/match-activities/`).
 */
export const MATCH_ACTIVITIES_IMAGE_PREFIX = '/images/match-activities'

export type MatchActivityVariant = 'photo' | 'solid'

/** Однотонные карточки: красный / чёрный из дизайн-системы (FCA_Fans 20790 / 20799). */
export type MatchActivitySolidTone = 'red' | 'black'

/** Для фото: кадр 20778 (два слоя) или cover как 20807. */
export type MatchActivityPhotoLayout = 'frame' | 'cover'

/** Для чёрной карточки: 20799 — blur на чипах; 20816 — плоский #b2061c без blur. */
export type MatchActivityBlackTagChip = 'blurred' | 'flat'

export type MatchActivity = {
	id: string
	/** Заголовок карточки в одну или две строки (Figma). */
	titleLine1: string
	titleLine2: string
	/**
	 * Описание; перевод строки `\n` — второй абзац (если в макете два `<p>`).
	 */
	subtitle: string
	href?: string
	variant: MatchActivityVariant
	tags: ReadonlyArray<string>
	/** Для `photo`: десктопный кадр / общий файл при `photoImageLayout: 'cover'`. */
	imageSrc?: string
	imageSrcMobile?: string
	/** Для `photo` при `≥767px`: отдельный кадр (например 4810:18351 / activity-01-768). */
	imageSrcTablet?: string
	/** Для `photo` при `≥1024px`: кадр под двухрядную сетку (FCA_Fans 4810:16088 / 16078). */
	imageSrcLaptop?: string
	/** Для `photo` при `≥1280px`: кадр под сетку 1280 (4810:13797 / 13767). */
	imageSrcLaptopLg?: string
	/** Для `photo` при `≥1920px`: кадр под сетку 1920 (4810:1652 / 4924:1652–1653). */
	imageSrcDesktopXl?: string
	solidTone?: MatchActivitySolidTone
	/** Ряд тегов: 8px (20779) или 10px (20807); у красных/чёрных по умолчанию 10 из SCSS. */
	tagsGap?: 8 | 10
	photoImageLayout?: MatchActivityPhotoLayout
	/** Только `solidTone: 'black'`: чипы с blur (по умолчанию) или плоские (20816). */
	blackTagChip?: MatchActivityBlackTagChip
}

/**
 * Первые 6 карточек: Figma 20778, 20789, 20798, 20807, 20825, 20816.
 * Далее — доп. пункты каталога (N>6).
 */
export const matchActivitiesAll: MatchActivity[] = [
	{
		id: '1',
		variant: 'photo',
		/* 4810:20778 */
		titleLine1: 'Автограф-сессии',
		titleLine2: 'с игроками',
		subtitle:
			'Получи уникальную карточку с автографом игрока, сделай памятное селфи и скажи слова поддержки тем, кто защищает цвета «Акрона».',
		imageSrc: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01.png`,
		imageSrcMobile: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-mobile.png`,
		imageSrcTablet: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-768.png`,
		imageSrcLaptop: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-1024.png`,
		imageSrcLaptopLg: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-1280.png`,
		imageSrcDesktopXl: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-1920.png`,
		tags: ['#встреча с игроками', '#автографы', '#фото'],
	},
	{
		id: '2',
		variant: 'solid',
		solidTone: 'red',
		/* 4810:20789 */
		titleLine1: 'Активности',
		titleLine2: 'для всей семьи',
		subtitle:
			'Интересно и детям, и взрослым: интерактивы, фотозоны и совместные развлечения, которые делают поход на матч общим событием для всей семьи.',
		tags: ['#совместный отдых', '#общие впечатления'],
	},
	{
		id: '3',
		variant: 'solid',
		solidTone: 'black',
		/* 4810:20798 */
		titleLine1: 'Выступления',
		titleLine2: 'приглашенных гостей',
		subtitle:
			'Перед матчем на стадионе выступают приглашённые артисты и ведущие. Живая атмосфера, шоу и настроение, которое задаёт тон всему дню.',
		tags: ['#живые выступления', '#шоу-программа'],
	},
	{
		id: '4',
		variant: 'photo',
		/* 4810:20807 — фон cover на фрейм; теги gap 10px */
		titleLine1: 'Игровые зоны',
		titleLine2: 'для детей',
		subtitle:
			'Пока вы готовитесь к матчу, дети проводят время в безопасной игровой зоне с аниматорами и активностями.',
		imageSrc: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-02.png`,
		imageSrcTablet: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-02-768.png`,
		imageSrcLaptop: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-02-1024.png`,
		imageSrcLaptopLg: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-02-1280.png`,
		imageSrcDesktopXl: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-02-1920.png`,
		tags: ['#для детей', '#аниматоры'],
		tagsGap: 10,
		photoImageLayout: 'cover',
	},
	{
		id: '5',
		variant: 'solid',
		solidTone: 'red',
		/* 4810:20825 */
		titleLine1: 'Уникальные события',
		titleLine2: '',
		subtitle:
			'Каждый матч — особенный. Тематические активности, розыгрыши, фотозоны и неожиданные форматы, которые делают этот день уникальным.',
		tags: ['#розыгрыши', '#фотозоны', '#подарки'],
	},
	{
		id: '6',
		variant: 'solid',
		solidTone: 'black',
		/* 4810:20816 — чипы без backdrop-blur */
		blackTagChip: 'flat',
		titleLine1: 'DJ сеты',
		titleLine2: '',
		subtitle:
			'Музыка, которая разогревает стадион.\nРитм, свет и энергия, создающие настоящую атмосферу большого футбольного события.',
		tags: ['#музыка', '#атмосфера'],
	},
	{
		id: '7',
		variant: 'photo',
		titleLine1: 'Встреча',
		titleLine2: 'с талисманом',
		subtitle:
			'Фото и автографы для самых маленьких.\nРасписание у входа в сектор.',
		imageSrc: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01.png`,
		imageSrcMobile: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-mobile.png`,
		tags: ['#дети', '#17:00'],
	},
	{
		id: '8',
		variant: 'solid',
		solidTone: 'red',
		titleLine1: 'Квест',
		titleLine2: 'по стадиону',
		subtitle: 'Собери печати — получи подарок.\nСтарт у трибуны В.',
		tags: ['#квест', '#старт в'],
	},
	{
		id: '9',
		variant: 'photo',
		titleLine1: 'Турнир',
		titleLine2: 'на playstation',
		subtitle: 'Финал дня — на большом экране.\nРегистрация до 17:30.',
		imageSrc: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01.png`,
		imageSrcMobile: `${MATCH_ACTIVITIES_IMAGE_PREFIX}/activity-01-mobile.png`,
		tags: ['#киберспорт', '#18:00'],
	},
	{
		id: '10',
		variant: 'solid',
		solidTone: 'black',
		titleLine1: 'Интерактив',
		titleLine2: 'болельщиков',
		subtitle: 'Голосование за игрока матча в приложении.\nПризы от партнёров.',
		tags: ['#онлайн', '#призы'],
	},
]

/** Тексты подзаголовка секции: 4810:20776 (первая строка), 4810:20775 (два абзаца, разделитель `\n`). */
export const defaultMatchActivitiesLead = {
	firstLine: 'Энергия игры за пределами поля.',
	secondLine:
		'Приходи заранее, чтобы почувствовать атмосферу каждой локации и зарядиться на победу вместе с тысячами болельщиков.',
} as const

export function getMatchActivitiesPreview(
	limit: number = MATCH_ACTIVITIES_INITIAL_VISIBLE,
): MatchActivity[] {
	return matchActivitiesAll.slice(0, limit)
}
