/** Ссылки и превью для внешнего / будущего каталога (не витрина на главной). */
export interface MerchCatalogItem {
	id: number
	image: string
	url: string
}

export const merchCatalogItems: MerchCatalogItem[] = [
	{
		id: 2,
		image: '/images/merch/14.09.25/1.webp',
		url: 'https://shop.fcakron.ru/catalog/forma/sezon-25-26/domashnyaya-igrovaya-futbolka-sezona-2025-26/',
	},
	{
		id: 3,
		image: '/images/merch/14.09.25/2.webp',
		url: 'https://shop.fcakron.ru/catalog/forma/sezon-25-26/gostevaya-igrovaya-futbolka-sezona-2025-26/',
	},
	{
		id: 4,
		image: '/images/merch/14.09.25/3.webp',
		url: 'https://shop.fcakron.ru/catalog/aksessuary/sharfy/sharf-za-uspekhom-lish-rabota/',
	},
	{
		id: 7,
		image: '/images/merch/14.09.25/4.webp',
		url: 'https://shop.fcakron.ru/catalog/odezhda/futbolki-i-longslivy/futbolka-akron-tolyatti-belaya/',
	},
	{
		id: 8,
		image: '/images/merch/14.09.25/5.webp',
		url: 'https://shop.fcakron.ru/catalog/odezhda/futbolki-i-longslivy/longsliv-kh-mech/',
	},
	{
		id: 9,
		image: '/images/merch/14.09.25/6.webp',
		url: 'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-krasnoe/',
	},
	{
		id: 11,
		image: '/images/merch/14.09.25/7.webp',
		url: 'https://shop.fcakron.ru/catalog/atributika/igrushki/myagkaya-igrushka-norka/',
	},
	{
		id: 12,
		image: '/images/merch/14.09.25/8.webp',
		url: 'https://shop.fcakron.ru/catalog/equipment/kofta-jogel-paradnaya-krasnaya/',
	},
	{
		id: 13,
		image: '/images/merch/14.09.25/9.webp',
		url: 'https://shop.fcakron.ru/catalog/collection/-tolyatti/sharf-tolyatti/',
	},
	{
		id: 14,
		image: '/images/merch/14.09.25/10.webp',
		url: 'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-chernoe/',
	},
]

/** FCA 4810:21019 — витрина на главной (мобилка 360). */
export type MerchShowcaseLayout =
	| 'hero'
	| 'smallStaggerTopRight'
	| 'smallStaggerBottomLeft'

export interface MerchShowcaseItem {
	id: number
	title: string
	price: string
	image: string
	layout: MerchShowcaseLayout
	/** Ссылка на карточку в магазине (опционально) */
	productUrl?: string
}

export const merchTitle = 'мерч'

export const merchSubtitleLines = [
	'Твой стиль в цветах клуба.',
	'Выбирай официальный мерч «Акрона»,',
	'чтобы чувствовать себя частью команды',
	'и на трибунах стадиона, и в ритме',
	'большого города.',
] as const

export const merchStoreHref = 'https://shop.fcakron.ru/'

/**
 * 1 — hero (красное худи), 2 — вверху справа (чёрное худи), 3 — внизу слева (брюки), FCA 21023/21029/21026.
 */
export const merchShowcaseItems: MerchShowcaseItem[] = [
	{
		id: 1,
		title: 'Худи Акрон Тольятти красное',
		price: '5 500 руб.',
		image: '/images/merch/merch_1_360.png',
		layout: 'hero',
		productUrl:
			'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-krasnoe/',
	},
	{
		id: 2,
		title: 'Худи Акрон Тольятти черное',
		price: '5 500 руб.',
		image: '/images/merch/merch_2_360.png',
		layout: 'smallStaggerTopRight',
		productUrl:
			'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-chernoe/',
	},
	{
		id: 3,
		title: 'Брюки тренировочные Jogel PREMIER черные',
		price: '4 500 руб.',
		image: '/images/merch/merch_3_360.png',
		layout: 'smallStaggerBottomLeft',
		productUrl: 'https://shop.fcakron.ru/catalog/equipment/',
	},
]
