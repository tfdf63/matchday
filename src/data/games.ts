export type MatchVenue = 'home' | 'away'

export interface Game {
	id: string
	homeTeam?: string
	awayTeam?: string
	date?: string
	time?: string
	timeLocal?: string // Местное время для матчей в других городах
	stadium?: string
	ticketLink?: string
	ticketLinkVip?: string
	ticketLinkSkybox?: string
	leagueInfo?: string
	/** Сезон и тур — вторая строка под названием лиги на карточке матча. */
	seasonTour?: string
	/** Дата для карточки: «ДД.ММ (ДН)». */
	dateCard?: string
	/** ISO YYYY-MM-DD — сортировка и ячейки календаря. */
	dateIso: string
	/** Домашний для Акрона, если хозяин — Акрон; иначе гостевой. */
	venue: MatchVenue
	/** Город для подписи под названием команды на карточке (планшет). */
	homeTeamCity?: string
	awayTeamCity?: string
	priceIncreaseDates?: {
		first?: string // Первое повышение цен
		second?: string // Второе повышение цен
	}
	fanIdStatus: 'Без fan id' | 'Fan id'
	promoType?: 'cup' | 'rpl'
}

/** Логотип соперника ФК Акрон для полосы календаря. */
export function getOpponentTeamName(game: Game): string | undefined {
	const home = game.homeTeam?.trim()
	if (home === 'Акрон') return game.awayTeam?.trim()
	return home
}

const games: Game[] = [
	// {
	// 	id: '1',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Крылья Советов',
	// 	date: '19 июля',
	// 	time: 'SAMT 16:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39663552?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 - 1 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-07-12',
	// 		second: '2025-07-17',
	// 	},
	// 	fanIdStatus: 'Без fan id',
	// },
	// {
	// 	id: '2',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Балтика',
	// 	date: '29 июля',
	// 	time: 'SAMT 19:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39873507?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'FONBET Кубок России 2025/2026 - 1 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-07-23',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Без fan id',
	// },
	// {
	// 	id: '3',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Спартак',
	// 	date: '3 августа',
	// 	time: 'SAMT 14:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39719522?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 3 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-07-27',
	// 		second: '2025-08-01',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// },
	// {
	// 	id: '5',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'ЦСКА',
	// 	date: '12 августа',
	// 	time: 'SAMT 17:15',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39879676?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'FONBET Кубок России 2025/2026 - 2 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-08-06',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Без fan id',
	// },
	// {
	// 	id: '4',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Оренбург',
	// 	date: '17 августа',
	// 	time: 'SAMT 14:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@40529687?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 5 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-08-11',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// },
	// {
	// 	id: '6',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Балтика',
	// 	date: '31 августа',
	// 	time: 'SAMT 14:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39731107?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 7 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-08-25',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// },
	// {
	// 	id: '5',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Локомотив',
	// 	date: '16 сентября',
	// 	time: 'SAMT 19:45',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@41413962?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'FONBET Кубок России 2025/2026 - 4 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-09-10',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Без fan id',
	// },
	// {
	// 	id: '7',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Рубин',
	// 	date: '20 сентября',
	// 	time: 'SAMT 17:45',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@42249357?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 9 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-09-14',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// },
	// {
	// 	id: '8',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Зенит',
	// 	date: '4 октября',
	// 	time: 'SAMT 14:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@42315054?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 11 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '',
	// 		second: '2025-10-02',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// 	promoType: 'rpl',
	// },
	// {
	// 	id: '9',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Локомотив',
	// 	date: '26 октября',
	// 	time: 'SAMT 14:00',
	// 	timeLocal: 'MSK 13:00',
	// 	stadium: 'Саранск. Мордовия Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@43608494?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=42',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 13 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-10-20',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// 	promoType: 'rpl',
	// },
	// {
	// 	id: '10',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Сочи',
	// 	date: '21 ноября',
	// 	time: 'SAMT 19:30',
	// 	// timeLocal: 'MSK 13:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@48450863?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@48450863?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
	// 	ticketLinkSkybox:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@48450863?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 16 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-11-15',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// 	promoType: 'rpl',
	// },
	// {
	// 	id: '12',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Пари НН',
	// 	date: '29 ноября',
	// 	time: 'SAMT 15:00',
	// 	// timeLocal: 'MSK 13:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@48620447?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@48620447?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
	// 	ticketLinkSkybox:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@48620447?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 17 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-11-23',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// 	promoType: 'rpl',
	// },
	// {
	// 	id: '13',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Ахмат',
	// 	date: '15 марта',
	// 	time: 'SAMT 15:00',
	// 	// timeLocal: 'MSK 13:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/events/787173?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip:
	// 		'https://widget.afisha.yandex.ru/w/events/787556?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
	// 	ticketLinkSkybox:
	// 		'https://widget.afisha.yandex.ru/w/events/787561?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2025/2026 21 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2026-03-09',
	// 		second: '',
	// 	},
	// 	fanIdStatus: 'Fan id',
	// 	promoType: 'rpl',
	// },
	{
		id: '14',
		homeTeam: 'Акрон',
		homeTeamCity: 'Тольятти',
		awayTeam: 'ЦСКА',
		awayTeamCity: 'Москва',
		date: '4 апреля',
		dateIso: '2026-04-04',
		venue: 'home',
		dateCard: '04.04 (СБ)',
		time: 'SAMT 14:00',
		// timeLocal: 'MSK 13:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@61062106?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@61062106?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/events/787561?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
		seasonTour: '2025/2026 23 ТУР',
		priceIncreaseDates: {
			first: '2026-03-29',
			second: '2026-04-02',
		},
		fanIdStatus: 'Fan id',
		promoType: 'rpl',
	},
	{
		id: '15',
		homeTeam: 'Акрон',
		awayTeam: 'Динамо Мск',
		date: '13 апреля',
		dateIso: '2026-04-13',
		venue: 'home',
		dateCard: '13.04 (ПН)',
		time: 'SAMT 18:15',
		// timeLocal: 'MSK 13:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@61113918?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@61113918?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@61113918?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
		seasonTour: '2025/2026 24 ТУР',
		priceIncreaseDates: {
			first: '2026-04-07',
			second: '2026-04-11',
		},
		fanIdStatus: 'Fan id',
		promoType: 'rpl',
	},
	{
		id: '16',
		homeTeam: 'Акрон',
		awayTeam: 'Динамо Мх',
		date: '23 апреля',
		dateIso: '2026-04-23',
		venue: 'home',
		dateCard: '23.04 (ЧТ)',
		time: 'SAMT 18:30',
		// timeLocal: 'MSK 13:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@61067766?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@61067766?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@61067766?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
		seasonTour: '2025/2026 26 ТУР',
		priceIncreaseDates: {
			first: '2026-04-17',
			second: '2026-04-23',
		},
		fanIdStatus: 'Fan id',
		promoType: 'rpl',
	},
	{
		id: '17',
		homeTeam: 'Акрон',
		awayTeam: 'Краснодар',
		date: '3 мая',
		dateIso: '2026-05-03',
		venue: 'home',
		dateCard: '03.05 (ВС)',
		time: 'SAMT 18:00',
		// timeLocal: 'MSK 13:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@61074227?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@61074227?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@61074227?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
		seasonTour: '2025/2026 28 ТУР',
		priceIncreaseDates: {
			first: '2026-04-27',
			second: '2026-05-01',
		},
		fanIdStatus: 'Fan id',
		promoType: 'rpl',
	},
	{
		id: '18',
		homeTeam: 'Акрон',
		awayTeam: 'Ростов',
		date: '11 мая',
		dateIso: '2026-05-11',
		venue: 'home',
		dateCard: '11.05 (ПН)',
		time: 'SAMT 14:00',
		// timeLocal: 'MSK 13:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@61076128?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@61076128?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@61076128?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА',
		seasonTour: '2025/2026 29 ТУР',
		priceIncreaseDates: {
			first: '2026-05-05',
			second: '2026-05-09',
		},
		fanIdStatus: 'Fan id',
		promoType: 'rpl',
	},
]

export default games
