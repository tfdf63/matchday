/** Публичные изображения секторов (`public/images/sector/`). */
export const SECTOR_IMAGE_PREFIX = '/images/sector'

export type Sector = {
	id: string
	/** Порядковый номер в квадратных скобках, напр. `[01]`. */
	indexLabel: string
	title: string
	priceLabel: string
	description: string
	/** Путь к фото карточки (мобилка 360). */
	imageSrc: string
	/** Путь к фото карточки для >=1024 (опционально). */
	imageSrc1024?: string
	/** Путь к фото карточки для >=1280 (опционально). */
	imageSrc1280?: string
	/** Путь к фото карточки для >=1600 (опционально). */
	imageSrc1600?: string
	ctaLabel: string
	ctaHref: string
}

export const defaultSectorTitle = {
	line1: 'Выбери',
	line2: 'свой сектор',
} as const

/** Первая строка лида — у правого края блока (4810:20883). */
export const defaultSectorLeadFirst = 'От шумного фанатского виража' as const

/** Вторая строка — на всю ширину (4810:20882). */
export const defaultSectorLeadSecond =
	'до уютных семейных трибун — найди идеальное место, чтобы насладиться игрой в своем ритме.' as const

export const sectors: Sector[] = [
	{
		id: '1',
		indexLabel: '[01]',
		title: 'Центральный',
		priceLabel: 'от 1 390 руб.',
		description:
			'Центральное расположение сектора гарантирует отсутствие «слепых зон», позволяя одинаково четко контролировать события у обоих ворот и оценивать тактику команд. Это место для тех, кто ценит красоту футбола и хочет насладиться игрой по-настоящему.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		imageSrc1024: `${SECTOR_IMAGE_PREFIX}/1_1024.png`,
		imageSrc1280: `${SECTOR_IMAGE_PREFIX}/1_1280.png`,
		imageSrc1600: `${SECTOR_IMAGE_PREFIX}/1_1600.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '2',
		indexLabel: '[02]',
		title: 'Игровая панорама',
		priceLabel: 'от 1 200 руб.',
		description:
			'Расширенный обзор поля и трибун: удобно следить за движением мяча и атмосферой матча с первых рядов.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '3',
		indexLabel: '[03]',
		title: 'Стратегический',
		priceLabel: 'от 1 100 руб.',
		description:
			'Оптимальная высота и угол обзора для тех, кто любит разбирать расстановки команд и стандартные положения.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '4',
		indexLabel: '[04]',
		title: 'Семейный',
		priceLabel: 'от 950 руб.',
		description:
			'Спокойная атмосфера и комфорт для зрителей всех возрастов: удобные кресла и понятная навигация по сектору.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '5',
		indexLabel: '[05]',
		title: 'Фанатский',
		priceLabel: 'от 890 руб.',
		description:
			'Максимум эмоций рядом с активной поддержкой команды: громкие кричалки, флаги и единый ритм трибуны.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '6',
		indexLabel: '[06]',
		title: 'Классический',
		priceLabel: 'от 850 руб.',
		description:
			'Проверенный формат посещения: устойчивый обзор, предсказуемая плотность зрителей и быстрый доступ к проходам.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '7',
		indexLabel: '[07]',
		title: 'Угловой',
		priceLabel: 'от 800 руб.',
		description:
			'Бюджетный вариант с акцентом на близость к полю и динамику у боковой линии.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
	{
		id: '8',
		indexLabel: '[08]',
		title: 'Гостевой сектор',
		priceLabel: 'от 750 руб.',
		description:
			'Зона для болельщиков гостевой команды с отдельным входом и сопровождением службы стадиона.',
		imageSrc: `${SECTOR_IMAGE_PREFIX}/1_360.png`,
		ctaLabel: 'Узнать больше',
		ctaHref: '#',
	},
]
