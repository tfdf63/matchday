export interface Game {
	id: string
	homeTeam: string
	awayTeam: string
	date: string
	time: string
	stadium: string
	ticketLink: string
}

const games: Game[] = [
	{
		id: '1',
		homeTeam: 'Акрон',
		awayTeam: 'Ростов',
		date: '31 марта',
		time: 'SAMT 19:30',
		stadium: 'Солидарность Самара Арена',
		ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/27',
	},
	{
		id: '2',
		homeTeam: 'Краснодар',
		awayTeam: 'Акрон',
		date: '5 апреля',
		time: 'SAMT 20:30',
		stadium: 'Стадион Краснодар',
		ticketLink: '',
	},
	{
		id: '3',
		homeTeam: 'Акрон',
		awayTeam: 'Факел',
		date: '13 апреля',
		time: 'SAMT 15:30',
		stadium: 'Самара Солидарность Арена',
		ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/29',
	},
	{
		id: '4',
		homeTeam: 'Акрон',
		awayTeam: 'Спартак',
		date: '19 апреля',
		time: 'SAMT 15:30',
		stadium: 'Cамара Солидарность Арена',
		ticketLink: 'https://fcakron.tncloud.ru/view-available-zones/30',
	},
	{
		id: '5',
		homeTeam: 'Химки',
		awayTeam: 'Акрон',
		date: '27 апреля',
		time: 'SAMT 17:30',
		stadium: 'Стадион Химки',
		ticketLink: '',
	},
	{
		id: '6',
		homeTeam: 'Акрон',
		awayTeam: 'Динамо Мх',
		date: '2 мая',
		time: 'SAMT 19:00',
		stadium: 'Солидарность Самара Арена',
		ticketLink: '',
	},
	{
		id: '7',
		homeTeam: 'Акрон',
		awayTeam: 'Ахмат',
		date: '11 мая',
		time: 'SAMT ??:??',
		stadium: 'Солидарность Самара Арена',
		ticketLink: '',
	},
	{
		id: '8',
		homeTeam: 'Динамо Москва',
		awayTeam: 'Акрон',
		date: '18 мая',
		time: 'SAMT 17:30',
		stadium: 'Стадион Химки',
		ticketLink: '',
	},
	{
		id: '9',
		homeTeam: 'Акрон',
		awayTeam: 'Локомотив',
		date: '24 мая',
		time: 'SAMT 17:30',
		stadium: 'Солидарность Самара Арена',
		ticketLink: '',
	},
]

export default games
