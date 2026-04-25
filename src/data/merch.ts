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

/** half — 50% (FCA 18632, 18623); tall — 65,5% (остальные) */
export type MerchImageGradient = 'half' | 'tall'

/** 360, 768 (4810:18619), 1024 (4810:16314), 1280 (4810:14024), 1600 (4810:11734) */
export interface MerchShowcaseItem {
	id: number
	title: string
	price: string
	/** 360, только 1–3; на <767 4+ скрыты (кроме lg-only) */
	image360?: string
	image768?: string
	image768W?: number
	image768H?: number
	/** 1024; позиции 7–8 только с этим кропом (без 768) */
	image1024?: string
	image1024W?: number
	image1024H?: number
	/** 1280 (макет FCA 14028–14049) */
	image1280?: string
	image1280W?: number
	image1280H?: number
	/** 1600 (макет FCA 11738–11759) */
	image1600?: string
	image1600W?: number
	image1600H?: number
	gradient?: MerchImageGradient
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

export const merchSubtitleParagraph768 =
	'Твой стиль в цветах клуба. Выбирай официальный мерч «Акрона», чтобы чувствовать себя частью команды и на трибунах стадиона, и в ритме большого города.'

export const merchStoreHref = 'https://shop.fcakron.ru/'

/**
 * 1–3: 360, 768, 1024, 1280, 1600. 4–6: 768+, 1024, 1280, 1600. 7–8: 1024, 1280, 1600.
 */
export const merchShowcaseItems: MerchShowcaseItem[] = [
	{
		id: 1,
		title: 'Худи Акрон Тольятти красное',
		price: '5 500 руб.',
		image360: '/images/merch/merch_1_360.png',
		image768: '/images/merch/merch_1_768.png',
		image768W: 334,
		image768H: 410,
		image1024: '/images/merch/merch_1_1024.png',
		image1024W: 301,
		image1024H: 440,
		image1280: '/images/merch/merch_1_1280.png',
		image1280W: 387,
		image1280H: 550,
		image1600: '/images/merch/merch_1_1600.png',
		image1600W: 493,
		image1600H: 720,
		gradient: 'tall',
		productUrl:
			'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-krasnoe/',
	},
	{
		id: 2,
		title: 'Худи Акрон Тольятти черное',
		price: '5 500 руб.',
		image360: '/images/merch/merch_2_360.png',
		image768: '/images/merch/merch_2_768.png',
		image768W: 157,
		image768H: 240,
		image1024: '/images/merch/merch_2_1024.png',
		image1024W: 221,
		image1024H: 300,
		image1280: '/images/merch/merch_2_1280.png',
		image1280W: 285,
		image1280H: 380,
		image1600: '/images/merch/merch_2_1600.png',
		image1600W: 365,
		image1600H: 480,
		gradient: 'tall',
		productUrl:
			'https://shop.fcakron.ru/catalog/odezhda/khudi-i-kofty/khudi-akron-tolyatti-chernoe/',
	},
	{
		id: 3,
		title: 'Брюки тренировочные Jogel PREMIER черные',
		price: '4 500 руб.',
		image360: '/images/merch/merch_3_360.png',
		image768: '/images/merch/merch_3_768.png',
		image768W: 157,
		image768H: 210,
		image1024: '/images/merch/merch_3_1024.png',
		image1024W: 141,
		image1024H: 200,
		image1280: '/images/merch/merch_3_1280.png',
		image1280W: 183,
		image1280H: 250,
		image1600: '/images/merch/merch_3_1600.png',
		image1600W: 237,
		image1600H: 320,
		gradient: 'tall',
		productUrl: 'https://shop.fcakron.ru/catalog/equipment/',
	},
	{
		id: 4,
		title: 'Шапка «Молодой Звонкий»',
		price: '1 500 руб.',
		image768: '/images/merch/merch_4_768.png',
		image768W: 157,
		image768H: 210,
		image1024: '/images/merch/merch_4_1024.png',
		image1024W: 141,
		image1024H: 200,
		image1280: '/images/merch/merch_4_1280.png',
		image1280W: 183,
		image1280H: 250,
		image1600: '/images/merch/merch_4_1600.png',
		image1600W: 237,
		image1600H: 320,
		gradient: 'half',
		productUrl: 'https://shop.fcakron.ru/',
	},
	{
		id: 5,
		title: 'Бейсболка снэпбэк «Молодой Звонкий»',
		price: '2 500 руб.',
		image768: '/images/merch/merch_5_768.png',
		image768W: 157,
		image768H: 240,
		image1024: '/images/merch/merch_5_1024.png',
		image1024W: 221,
		image1024H: 300,
		image1280: '/images/merch/merch_5_1280.png',
		image1280W: 285,
		image1280H: 380,
		image1600: '/images/merch/merch_5_1600.png',
		image1600W: 365,
		image1600H: 480,
		gradient: 'half',
		productUrl: 'https://shop.fcakron.ru/',
	},
	{
		id: 6,
		title: 'Худи на молнии Jogel ESSENTIAL красное',
		price: '5 600 руб.',
		image768: '/images/merch/merch_6_768.png',
		image768W: 334,
		image768H: 410,
		image1024: '/images/merch/merch_6_1024.png',
		image1024W: 301,
		image1024H: 440,
		image1280: '/images/merch/merch_6_1280.png',
		image1280W: 387,
		image1280H: 550,
		image1600: '/images/merch/merch_6_1600.png',
		image1600W: 493,
		image1600H: 720,
		gradient: 'tall',
		productUrl: 'https://shop.fcakron.ru/catalog/equipment/',
	},
	{
		id: 7,
		title: 'Брюки парадные Jogel PREMIER черные',
		price: '5 400 руб.',
		image1024: '/images/merch/merch_7_1024.png',
		image1024W: 143,
		image1024H: 200,
		image1280: '/images/merch/merch_7_1280.png',
		image1280W: 183,
		image1280H: 250,
		image1600: '/images/merch/merch_7_1600.png',
		image1600W: 237,
		image1600H: 320,
		gradient: 'tall',
		productUrl: 'https://shop.fcakron.ru/catalog/equipment/',
	},
	{
		id: 8,
		title: 'Бейсболка красная Лого',
		price: '2 300 руб.',
		image1024: '/images/merch/merch_8_1024.png',
		image1024W: 141,
		image1024H: 200,
		image1280: '/images/merch/merch_8_1280.png',
		image1280W: 183,
		image1280H: 250,
		image1600: '/images/merch/merch_8_1600.png',
		image1600W: 237,
		image1600H: 320,
		gradient: 'half',
		productUrl: 'https://shop.fcakron.ru/',
	},
]
