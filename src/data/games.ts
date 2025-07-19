export interface Game {
	id: string
	homeTeam: string
	awayTeam: string
	date: string
	time: string
	stadium: string
	ticketLink: string
	ticketLinkVip?: string
	leagueInfo: string
	priceIncreaseDates: {
		first?: string // Первое повышение цен
		second?: string // Второе повышение цен
	}
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
	// },
	{
		id: '2',
		homeTeam: 'Акрон',
		awayTeam: 'Балтика',
		date: '29 июля',
		time: 'SAMT 19:30',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39873507?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip: '',
		leagueInfo: 'FONBET Кубок России 2025/2026 - 1 ТУР',
		priceIncreaseDates: {
			first: '2025-07-23',
			second: '',
		},
	},
	{
		id: '3',
		homeTeam: 'Акрон',
		awayTeam: 'Спартак',
		date: '3 августа',
		time: 'SAMT 14:30',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39719522?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip: '',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 25/26 3 ТУР',
		priceIncreaseDates: {
			first: '2025-07-27',
			second: '2025-08-01',
		},
	},
	{
		id: '4',
		homeTeam: 'Акрон',
		awayTeam: 'ЦСКА',
		date: '12 августа',
		time: 'SAMT 17:15',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39879676?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip: '',
		leagueInfo: 'FONBET Кубок России 2025/2026 - 2 ТУР',
		priceIncreaseDates: {
			first: '2025-08-06',
			second: '',
		},
	},
	// {
	// 	id: '5',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Оренбург',
	// 	date: '17 августа',
	// 	time: 'SAMT 14:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink:
	// 		'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@39879676?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 25/26 5 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-08-06',
	// 		second: '',
	// 	},
	// },
]

export default games
