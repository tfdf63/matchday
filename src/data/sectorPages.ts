export type SectorPageSeo = {
	title: string
	description: string
	ogTitle: string
}

export type SectorPageBlock = {
	title: string
	text: string
}

export type SectorPageImage = {
	src: string
	width: number
	height: number
	alt: string
}

export type SectorDealerWidgetConfig = {
	clientKey: string
	regionId: number
	venueId: string
	height?: number
}

export type SectorPageHotspotModalItem = {
	title?: string
	description: string
	price?: string
	ctaLabel?: string
	ctaHref?: string
	image: SectorPageImage
}

export type SectorPageHotspot = {
	id: string
	label: string
	calloutLabel?: string
	x: number
	y: number
	width: number
	height: number
	modalTitle: string
	modalDescription: string
	modalPrice?: string
	modalCtaLabel?: string
	modalCtaHref?: string
	modalImage: SectorPageImage
	modalExtraItems?: readonly SectorPageHotspotModalItem[]
}

export type SectorPage = {
	slug: string
	heading: string
	subtitle: string
	path: string
	hero: SectorPageImage
	hotspots?: readonly SectorPageHotspot[]
	schema: SectorPageImage
	dealerWidget?: SectorDealerWidgetConfig
	buyLabel: string
	buyHref: string
	ticketsHeading: string
	/** URL виджета Яндекс.Афиши; пока не задан — слот пустой. */
	widgetSrc?: string | null
	blocks: readonly SectorPageBlock[]
	closing: string
	seo: SectorPageSeo
}

export const sectorPages: readonly SectorPage[] = [
	{
		slug: 'vip',
		heading: 'VIP',
		subtitle: 'Место, где рождается история матча!',
		path: '/sector/vip/',
		hero: {
			src: '/images/sector/vip-1.jpg',
			width: 1024,
			height: 682,
			alt: 'Болельщики ФК Акрон в VIP-секторе',
		},
		hotspots: [
			{
				id: 'white-kit-2627',
				label: 'Белая игровая форма 26/27',
				calloutLabel: 'игровая футболка 26/27',
				x: 42,
				y: 68,
				width: 10,
				height: 12,
				modalTitle: 'Гостевая игровая футболка 26/27',
				modalDescription: `Тольятти — в каждой нитке полотна. Отсылка к нашей большой общей истории.

Мозаичное панно «Радость труда» состоит из цветного непрозрачного стекла, которое специально заказывали и варили в различных городах СССР, а затем доставляли в Тольятти.
Было использовано более ста оттенков цветного стекла. Только черного насчитывается целых четыре тона.

В каждом фрагменте мозаики — впечатляющая волжская природа и искусство человеческого созидания.`,
				modalPrice: 'Цена: 5900',
				modalCtaLabel: 'Купить',
				modalCtaHref:
					'https://shop.fcakron.ru/catalog/sezon-26-27/gostevaya-igrovaya-futbolka-26-27/',
				modalImage: {
					src: '/images/merch/merch_white.gif',
					width: 800,
					height: 446,
					alt: 'Белая игровая форма ФК Акрон сезона 2026/27',
				},
				modalExtraItems: [
					{
						title: 'Домашняя игровая футболка 26/27',
						description: `Брутальный. Лаконичный. Универсальный.

Выходя во двор с мячом, знаешь, что сегодня покажешь свой максимум.

Родители наблюдают с балкона панельки, а самая красивая девочка района ждёт твоего гола.
Поэтому эта игра в коробке так важна.

Романтика тех мест, где мы выросли — в домашнем комплекте формы нового сезона.`,
						price: 'Цена: 5900',
						ctaLabel: 'Купить',
						ctaHref:
							'https://shop.fcakron.ru/catalog/sezon-26-27/domashnyaya-igrovaya-futbolka-26-27/',
						image: {
							src: '/images/merch/merch_black.gif',
							width: 800,
							height: 446,
							alt: 'Черная игровая форма ФК Акрон сезона 2026/27',
						},
					},
				],
			},
		],
		schema: {
			src: '/images/schema/schema-a105-a107.png',
			width: 746,
			height: 688,
			alt: 'Схема стадиона: VIP-сектора 105, 106 и 107',
		},
		dealerWidget: {
			clientKey: '0046af24-2980-419c-bf99-c4d864c693e3',
			regionId: 51,
			venueId: '85000',
			height: 600,
		},
		buyLabel: 'Купить',
		buyHref: '#buy',
		ticketsHeading: 'Купить билеты',
		widgetSrc: null,
		blocks: [
			{
				title: 'Эксклюзивная близость',
				text: 'Слышите указания тренера, видите реакции игроков и всё, что скрыто от обычных зрителей.',
			},
			{
				title: 'Главные эмоции',
				text: 'Именно здесь разворачиваются горячие споры с арбитром, триумфальные выходы замен и нерв скамейки в решающие минуты.',
			},
			{
				title: 'Идеальный ракурс',
				text: 'Отличный обзор атакующих действий и оборонительных построений вашей команды.',
			},
			{
				title: 'Премиальная атмосфера',
				text: 'Комфортные мягкие кресла.',
			},
		],
		closing:
			'Это не просто билет на матч — это пропуск за кулисы большого футбола.',
		seo: {
			title: 'VIP',
			description:
				'VIP-сектор на «Солидарность Самара Арена»: места у скамейки, премиальная атмосфера и лучший ракурс на игру ФК «Акрон».',
			ogTitle: 'ФК Акрон | VIP',
		},
	},
]

const bySlug = new Map(sectorPages.map(page => [page.slug, page]))

export function getSectorPageBySlug(slug: string): SectorPage | null {
	return bySlug.get(slug) ?? null
}

export function getSectorPageSlugs(): string[] {
	return sectorPages.map(page => page.slug)
}
