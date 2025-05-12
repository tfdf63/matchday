export interface Game {
	id: string
	homeTeam: string
	awayTeam: string
	date: string
	time: string
	stadium: string
	ticketLink: string
	ticketLinkVip: string
	leagueInfo: string
	priceIncreaseDates: {
		first: string // Первое повышение цен
		second: string // Второе повышение цен
	}
}

const games: Game[] = [
	// {
	// 	id: '7',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Ахмат',
	// 	date: '11 мая',
	// 	time: 'SAMT 15:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/33',
	// 	ticketLinkVip: 'https://fcakron.tncloud.ru/choose-seats/33/2200',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 28 ТУР',
	// 	priceIncreaseDates: {
	// 		first: '2025-05-01',
	// 		second: '2025-05-09',
	// 	},
	// },
	{
		id: '9',
		homeTeam: 'Акрон',
		awayTeam: 'Локомотив',
		date: '24 мая',
		time: 'SAMT 17:30',
		stadium: 'Солидарность Самара Арена',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/Nzk4MDd8Njc0NjQxfDg3NDY0OTd8MTc0ODA5MzQwMDAwMA==?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0',
		ticketLinkVip: '',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 30 ТУР',
		priceIncreaseDates: {
			first: '2025-05-18',
			second: '2025-05-22',
		},
	},
]

export default games
