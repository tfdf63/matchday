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
		time: '15:30',
		stadium: 'Самара Солидарность Арена',
		ticketLink: '/tickets/lokomotiv-rostov',
	},
	{
		id: '4',
		homeTeam: 'Акрон',
		awayTeam: 'Спартак',
		date: '20 апреля',
		time: '19:30',
		stadium: 'Cамара Солидарность Арена',
		ticketLink: ' ',
	},
	{
		id: '5',
		homeTeam: 'Рубин',
		awayTeam: 'Ахмат',
		date: '23 апреля',
		time: '17:00',
		stadium: 'Казань Арена',
		ticketLink: '/tickets/rubin-ahmat',
	},
]

export default games
