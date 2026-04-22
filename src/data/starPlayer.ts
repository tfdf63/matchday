export type StarPlayerFact = {
	label: string
	value: string
}

export type StarPlayerNews = {
	id: string
	title: string
	imageSrc: string
	imageSrc768?: string
	imageSrc1024?: string
	imageSrc1280?: string
	imageSrc1600?: string
}

export type StarPlayerMetric = {
	id: string
	label: string
	value: string
	isHighlighted: boolean
}

export type StarPlayerProfile = {
	id: string
	tagLabel: string
	firstName: string
	lastName: string
	numberLabel: string
	photoSrc: string
	photoSrc768?: string
	photoSrc1024?: string
	photoSrc1280?: string
	photoSrc1600?: string
	heightLabel: string
	weightLabel: string
	facts: StarPlayerFact[]
	news: StarPlayerNews[]
	metrics: StarPlayerMetric[]
}

export const starPlayer: StarPlayerProfile = {
	id: '1',
	tagLabel: '#лучший игрок',
	firstName: 'Артем',
	lastName: 'Дзюба',
	numberLabel: '22',
	photoSrc: '/images/star-player/player_360.png',
	photoSrc768: '/images/star-player/player_768.png',
	photoSrc1024: '/images/star-player/player_1024.png',
	photoSrc1280: '/images/star-player/player_1280.png',
	heightLabel: '197 см',
	weightLabel: '98 кг',
	facts: [
		{ label: 'Дата рождения:', value: '22.08.1988' },
		{ label: 'Возраст:', value: '37 лет' },
		{ label: 'Страна:', value: 'Россия' },
		{ label: 'Дебют в РПЛ:', value: '2006' },
		{ label: 'Сезонов в лиге:', value: '19' },
		{ label: 'Позиция:', value: 'Нападающий' },
	],
	news: [
		{
			id: '2',
			title: 'Интервью с Артёмом Дзюбой после игры',
			imageSrc: '/images/star-player/news/news-2-360.png',
			imageSrc768: '/images/star-player/news/news-2-768.png',
			imageSrc1024: '/images/star-player/news/news-2-1024.png',
			imageSrc1280: '/images/star-player/news/news-2-1280.png',
		},
		{
			id: '1',
			title: 'Лучшие моменты матча «Акрон» — «Пари НН»',
			imageSrc: '/images/star-player/news/news-1-360.png',
			imageSrc768: '/images/star-player/news/news-1-768.png',
			imageSrc1024: '/images/star-player/news/news-1-1024.png',
			imageSrc1280: '/images/star-player/news/news-1-1280.png',
		},
	],
	metrics: [
		{
			id: '1',
			label: 'Очки в матчах РПЛ (2025)',
			value: '272',
			isHighlighted: true,
		},
		{
			id: '2',
			label: 'Голов в карьере',
			value: '240+',
			isHighlighted: false,
		},
		{
			id: '3',
			label: 'Голевых передач в карьере',
			value: '100+',
			isHighlighted: true,
		},
	],
}
