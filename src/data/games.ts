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
		homeTeam: 'Зенит',
		awayTeam: 'Динамо',
		date: '17 апреля',
		time: '18:30',
		stadium: 'Газпром Арена',
		ticketLink: '/tickets/zenit-dinamo',
	},
	{
		id: '3',
		homeTeam: 'Локомотив',
		awayTeam: 'Ростов',
		date: '20 апреля',
		time: '16:00',
		stadium: 'РЖД Арена',
		ticketLink: '/tickets/lokomotiv-rostov',
	},
	{
		id: '4',
		homeTeam: 'Краснодар',
		awayTeam: 'Сочи',
		date: '22 апреля',
		time: '19:30',
		stadium: 'Краснодар Арена',
		ticketLink: '/tickets/krasnodar-sochi',
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
