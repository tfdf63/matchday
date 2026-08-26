export type SectorPageSeo = {
	title: string
	description: string
	ogTitle: string
}

export type SectorPageBlock = {
	title: string
	text: string
}

export type SectorInlineSpan =
	| { type: 'text'; text: string }
	| { type: 'link'; label: string; href: string }

export type SectorJoinStep = {
	title?: string
	spans: readonly SectorInlineSpan[]
}

export type SectorJoinGroup = {
	subtitle: string
	steps?: readonly SectorJoinStep[]
	blocks?: readonly SectorPageBlock[]
}

export type SectorCommunityLink = {
	label: string
	href: string
}

export type SectorCommunityCta = {
	heading?: string
	label?: string
	href?: string
	buttons?: readonly SectorCommunityLink[]
}

export type SectorOffer = {
	title: string
	subtitle: string
	description: string
	image: SectorPageImage
}

export type SectorNamedList = {
	subtitle: string
	names: readonly string[]
}

export type SectorGoldenSeason = {
	heading: string
	text: string
	seasons: readonly SectorNamedList[]
	image: SectorPageImage
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
	/** Заголовок секции сразу после подзаголовка (C4 — «Тёплая зона С4»). */
	introHeading?: string
	introSubtitle?: string
	path: string
	hero: SectorPageImage
	hotspots?: readonly SectorPageHotspot[]
	schema?: SectorPageImage
	/** VIP — нижняя половина с маской; C4 — схема целиком, без обрезки. */
	schemaAnchor?: 'top' | 'bottom' | 'full'
	schemaHeading?: string
	schemaSubtitle?: string
	/** C4: описания и фото сразу после подзаголовка, схема ниже. */
	blocksBeforeSchema?: boolean
	/** Фото перед блоком «Купить билеты». */
	preTicketsImage?: SectorPageImage
	/** Блок промокодов после фото, перед «Купить билеты». */
	showPromos?: boolean
	promosHeading?: string
	dealerWidget?: SectorDealerWidgetConfig
	buyLabel: string
	buyHref: string
	ticketsHeading?: string
	/** URL виджета Яндекс.Афиши; пока не задан — слот пустой. */
	widgetSrc?: string | null
	blocks: readonly SectorPageBlock[]
	/** Фото сразу перед блоками описаний (фан-сектор — перед «Атмосфера»). */
	blocksImage?: SectorPageImage
	blocksLayout?: 'stack' | 'grid'
	blocksAside?: readonly SectorPageImage[]
	/** Фото справа от описаний, только ≥767. */
	blocksAsideWide?: SectorPageImage
	closing?: string
	joinHeading?: string
	joinSteps?: readonly SectorJoinStep[]
	joinGroups?: readonly SectorJoinGroup[]
	chantsHeading?: string
	chants?: readonly SectorPageBlock[]
	chantsImage?: SectorPageImage
	goldenSeason?: SectorGoldenSeason
	offer?: SectorOffer
	communityCta?: SectorCommunityCta
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
	{
		slug: 'c4',
		heading: 'Семейный',
		subtitle:
			'Спокойная атмосфера и комфорт для зрителей всех возрастов: удобные кресла и вкусные закуски на секторах C413-C417',
		introHeading: 'Тёплая зона С4',
		path: '/sector/c4/',
		hero: {
			src: '/images/sector/c4-1.webp',
			width: 1024,
			height: 546,
			alt: 'Семья болельщиков ФК Акрон на трибуне',
		},
		schema: {
			src: '/images/schema/schema-c4.webp',
			width: 687,
			height: 688,
			alt: 'Схема стадиона: семейный сектор C413–C417',
		},
		schemaAnchor: 'full',
		schemaHeading: 'Схема расположения',
		schemaSubtitle: '4 этаж',
		blocksBeforeSchema: true,
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
				title: 'Детская зона',
				text: 'Зона для самых маленьких болельщиков',
			},
			{
				title: 'Активные игры',
				text: 'Настольные игры, текбол, творческие зоны',
			},
			{
				title: 'Удобные места',
				text: 'Мягкие сидушки и отличный вид на поле',
			},
			{
				title: 'Музыка',
				text: 'DJ-сеты для заряда настроения перед матчем',
			},
			{
				title: 'Аквагрим',
				text: 'Яркие рисунки на выбор для преданных фанатов',
			},
		],
		blocksAside: [
			{
				src: '/images/sector/c4-mascot.webp',
				width: 298,
				height: 269,
				alt: 'Талисман семейного сектора ФК Акрон',
			},
			{
				src: '/images/sector/c4-logo.webp',
				width: 161,
				height: 155,
				alt: 'Логотип семейного сектора ФК Акрон',
			},
		],
		blocksAsideWide: {
			src: '/images/sector/c4-activity.webp',
			width: 632,
			height: 660,
			alt: 'Творческая зона семейного сектора: болельщики рисуют плакат',
		},
		preTicketsImage: {
			src: '/images/sector/c4-family.webp',
			width: 632,
			height: 862,
			alt: 'Семья болельщиков ФК Акрон у стадиона',
		},
		showPromos: true,
		promosHeading: 'Промокоды и тарифы',
		seo: {
			title: 'Семейный',
			description:
				'Семейный сектор C4 на «Солидарность Самара Арена»: спокойная атмосфера, комфорт для зрителей всех возрастов и сектора C413–C417.',
			ogTitle: 'ФК Акрон | Семейный',
		},
	},
	{
		slug: 'fan',
		heading: 'Фанатский',
		subtitle:
			'Максимум эмоций рядом с активной поддержкой команды: громкие заряды, флаги и единый ритм трибуны.',
		introHeading: 'Что такое сектор активной поддержки?',
		introSubtitle:
			'Организованная группа болельщиков, которая поддерживает команду на домашних и выездных матчах.',
		path: '/sector/fan/',
		hero: {
			src: '/images/sector/fan.webp',
			width: 2560,
			height: 1707,
			alt: 'Болельщики ФК Акрон в секторе активной поддержки',
		},
		buyLabel: 'Вступить',
		buyHref: '#join',
		schema: {
			src: '/images/schema/schema-fan.webp',
			width: 3622,
			height: 965,
			alt: 'Схема стадиона: фанатский сектор активной поддержки',
		},
		schemaHeading: 'Схема расположения',
		schemaSubtitle: 'Трибуна D',
		schemaAnchor: 'full',
		blocksBeforeSchema: true,
		blocksImage: {
			src: '/images/sector/fan-1.webp',
			width: 2500,
			height: 1667,
			alt: 'Болельщики ФК Акрон на секторе активной поддержки',
		},
		blocks: [
			{
				title: 'Атмосфера',
				text: 'Самые преданные болельщики команды!',
			},
			{
				title: 'Организованность',
				text: 'Приходим за 15 минут до начала матча. С собой красный и черный верх (от матча). Внимание на заводящего. Активно!',
			},
			{
				title: 'Выездные матчи',
				text: 'Ранняя регистрация на гостевые игры',
			},
		],
		joinHeading: 'Как попасть на сектор?',
		joinSteps: [
			{
				spans: [
					{ type: 'text', text: 'Написать СРБ в ' },
					{
						type: 'link',
						label: 'VK',
						href: 'https://vk.ru/id7362124',
					},
					{ type: 'text', text: ' или ' },
					{
						type: 'link',
						label: 'TG',
						href: 'https://t.me/slava_tfdf',
					},
					{
						type: 'text',
						text: ': Хочу на сектор активной поддержки. Указать ФИ, дату рождения и город. Показать фото или билеты с матчей ФК Акрон (по возможности);',
					},
				],
			},
			{
				spans: [
					{
						type: 'text',
						text: 'Получить ссылку покупку билетов в D114 на ближайший матч.',
					},
				],
			},
		],
		chantsHeading: 'Заряды на секторе',
		chantsImage: {
			src: '/images/sector/fan-2.webp',
			width: 2500,
			height: 1667,
			alt: 'Сектор активной поддержки: барабан, труба и шарфы',
		},
		chants: [
			{
				title: 'Вперёд, Акрон!',
				text: 'Перекличка. Заводящий кричит вперёд, Акрон! Сектор отвечает вперёд, Акрон!',
			},
			{
				title: 'Тольяттинский, Акрон!',
				text: 'Тольяттинский, Акрон! (хлопки 4+2) несколько раз',
			},
			{
				title: 'Для чего приехали?',
				text: 'Мы приехали, чтобы победить! Чтобы победить! Чтобы победить! несколько раз.',
			},
			{
				title: 'Я твой фанат!',
				text: 'Вперёд, Акрон! (хлоп хлоп) Моя любовь! Я твой фанат пока есть в венах кровь! (хлоп хлоп). С тобой, Акрон! (хлоп хлоп) Мы навсегда! (хлоп хлоп) Один не будешь никогда!',
			},
			{
				title: 'песня Катюша',
				text: 'поём всю на 80+ минуте',
			},
		],
		goldenSeason: {
			heading: 'Золотой сезон',
			text: 'Болельщики посетили все домашние и гостевые матчи сезона, включая матчи Кубка.',
			seasons: [
				{
					subtitle: 'сезон 2024-2025',
					names: ['Москалев Александр', 'Мошкова-Леонтьева Алла'],
				},
				{
					subtitle: 'сезон 2025-2026',
					names: [
						'Булыга Максим',
						'Повольнов Александр',
						'Куренков Алексей',
						'Андреева Анна',
					],
				},
			],
			image: {
				src: '/images/sector/fan-zoloto.webp',
				width: 2500,
				height: 1667,
				alt: 'Болельщики золотого сезона ФК Акрон с памятными футболками',
			},
		},
		communityCta: {
			heading: 'Соц. сети',
			label: 'VK',
			href: 'https://vk.ru/fcakron_fans',
		},
		seo: {
			title: 'Фанатский',
			description:
				'Фанатский сектор активной поддержки ФК «Акрон»: организованная группа болельщиков на домашних и выездных матчах.',
			ogTitle: 'ФК Акрон | Фанатский',
		},
	},
	{
		slug: 'stud',
		heading: 'Студ',
		subtitle: 'Место, где студент может быть самим собой.',
		introHeading: 'D116',
		introSubtitle:
			'Сектор молодых и звонких фанатов. Это пространство для студентов, которых объединяет игра, эмоции и желание быть частью чего-то большего.',
		path: '/sector/stud/',
		hero: {
			src: '/images/sector/stud-1.webp',
			width: 1200,
			height: 800,
			alt: 'Студенческий сектор ФК Акрон',
		},
		buyLabel: 'Получить билет',
		buyHref: '#join',
		blocksImage: {
			src: '/images/sector/stud-2.webp',
			width: 1200,
			height: 800,
			alt: 'Студенты на матче ФК Акрон',
		},
		blocks: [
			{
				title: 'Студент - часть комьюнити',
				text: 'Сектор посвященный молодым и звонким студентам. Здесь свои люди, общий движ и эмоции, которые объединяют.',
			},
			{
				title: 'Активности и розыгрыши',
				text: 'Активности и розыгрыши только для студентов и посетителей студенческого сектора.',
			},
			{
				title: 'Бесплатные билеты для студентов',
				text: 'Каждый студент сможет получить свой бесплатный билет на матч нашей команды и стать частью фан-сообщества.',
			},
			{
				title: 'Стажировки и волонтёрство',
				text: 'Следи за активностями в группах «Студенческий сектор ФК «Акрон» Тольятти во Вконтакте и Telegram, чтобы стать частью команды.',
			},
			{
				title: 'Выездные матчи',
				text: 'Возможность посетить матчи по всей России со своими друзьями на автобусе болельщиков «Акрона».',
			},
			{
				title: 'Тусовка студентов',
				text: 'Знакомься с людьми из своего и других вузов, собирай компанию и проводи время на матчах в кругу единомышленников.',
			},
		],
		offer: {
			title: 'Получи скидку 20%\nдля близких',
			subtitle: 'Каждый вуз получает свой уникальный промокод',
			description:
				'При получении индивидуального промокода ты получаешь дополнительный промокод на скидку, которым может воспользоваться ваш близкий человек, при оплате билета в сектор D116.',
			image: {
				src: '/images/sector/stud-3.webp',
				width: 2150,
				height: 1281,
				alt: 'Студенты ФК Акрон на секторе D116',
			},
		},
		joinHeading: 'Как получить билет?',
		joinGroups: [
			{
				subtitle: 'Студенту',
				steps: [
					{
						title: 'Вступи в сообщество',
						spans: [
							{
								type: 'text',
								text: 'Перейди в официальное студенческое сообщество ФК «Акрон» во ВКонтакте или Telegram.',
							},
						],
					},
					{
						title: 'Найди своего координатора',
						spans: [
							{
								type: 'text',
								text: 'В закреплённом сообщении выбери своё учебное заведение и контакт представителя',
							},
						],
					},
					{
						title: 'Подтверди статус студента',
						spans: [
							{
								type: 'text',
								text: 'Напиши координатору и укажи студенческий билет или учебную группу',
							},
						],
					},
					{
						title: 'Получи билет на матч',
						spans: [
							{
								type: 'text',
								text: 'После проверки тебе отправят промокод и ссылку для онлайн-оформления',
							},
						],
					},
				],
			},
			{
				subtitle: 'Учебным заведениям',
				blocks: [
					{
						title: 'Спортивные мероприятия для студентов',
						text: 'Любое учебное заведение может стать участником студенческой программы ФК «Акрон» и организовать бесплатные билеты для своих студентов. Для этого необходимо перейти в официальные сообщества клуба во ВКонтакте или Telegram, найти в закреплённом сообщении контакт менеджера клуба и связаться с ним, выразив заинтересованность в подключении к программе.',
					},
					{
						title: 'Что включает в себя программа?',
						text: 'Студенческая программа включает в себя не только бесплатные билеты, но и образовательные и практические возможности, такие как лекции от представителей клуба, стажировки и участие в совместных проектах. Все детали и формат дальнейшего взаимодействия обсуждаются индивидуально с менеджером клуба.',
					},
				],
			},
		],
		communityCta: {
			heading: 'Получи билет',
			buttons: [
				{
					label: 'ВК',
					href: 'https://vk.com/club237654596',
				},
				{
					label: 'Телеграм',
					href: 'https://t.me/studakron',
				},
			],
		},
		seo: {
			title: 'Студенческий',
			description:
				'Студенческий сектор D116 ФК «Акрон»: бесплатные билеты для студентов, активности, выезды и комьюнити молодых болельщиков.',
			ogTitle: 'ФК Акрон | Студенческий',
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
