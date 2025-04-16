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
}

const games: Game[] = [
	{
		id: '4',
		homeTeam: 'Акрон',
		awayTeam: 'Спартак',
		date: '19 апреля',
		time: 'SAMT 15:30',
		stadium: 'Cамара Солидарность Арена',
		ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/30',
		ticketLinkVip: 'https://fcakron.tncloud.ru/choose-seats/30/2200',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 25 ТУР',
	},
	{
		id: '6',
		homeTeam: 'Акрон',
		awayTeam: 'Динамо Мх',
		date: '02 мая',
		time: 'SAMT 19:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/31',
		ticketLinkVip: 'https://fcakron.tncloud.ru/choose-seats/31/2200',
		leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 27 ТУР',
	},
	// {
	// 	id: '7',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Ахмат',
	// 	date: '11 мая',
	// 	time: 'SAMT 15:00',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink: '',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 28 ТУР',
	// },
	// {
	// 	id: '9',
	// 	homeTeam: 'Акрон',
	// 	awayTeam: 'Локомотив',
	// 	date: '24 мая',
	// 	time: 'SAMT 17:30',
	// 	stadium: 'Солидарность Самара Арена',
	// 	ticketLink: '',
	// 	ticketLinkVip: '',
	// 	leagueInfo: 'МИР РОССИЙСКАЯ ПРЕМЬЕР-ЛИГА 2024/2025 - 30 ТУР',
	// },
]

export default games
