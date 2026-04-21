export interface NextMatchTeam {
	name: string
	city: string
	logo: string
}

export interface NextMatchGame {
	id: string
	homeTeam: NextMatchTeam
	awayTeam: NextMatchTeam
	date: string
	time: string
	stadium: string
	leagueInfo: string
	ticketLink: string
	ticketLinkVip: string
	ticketLinkSkybox: string
	priceIncreaseDates?: { first?: string; second?: string }
	fanIdRequired: boolean
	promoType?: 'cup' | 'rpl'
}

const nextMatchGames: NextMatchGame[] = [
	{
		id: '1',
		homeTeam: {
			name: 'Акрон',
			city: 'Тольятти',
			logo: '/images/teamslogo/Akron.png',
		},
		awayTeam: {
			name: 'Пари НН',
			city: 'Нижний Новгород',
			logo: '/images/teamslogo/Pari-NN.png',
		},
		date: '15.01 (ЧТ)',
		time: 'SAMT 15:00',
		stadium: 'Солидарность Самара Арена',
		leagueInfo: 'Мир Российская Премьер-Лига\n2025/2026 16 тур',
		ticketLink:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@48620447?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		ticketLinkVip:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7858@48620447?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51',
		ticketLinkSkybox:
			'https://widget.afisha.yandex.ru/w/sessions/ticketsteam-7859@48620447?clientKey=f524515c-ae22-419d-9b15-80eea470a53b&regionId=51',
		priceIncreaseDates: {
			first: '13.01',
			second: '15.01',
		},
		fanIdRequired: true,
		promoType: 'rpl',
	},
	{
		id: '2',
		homeTeam: {
			name: 'Акрон',
			city: 'Тольятти',
			logo: '/images/teamslogo/Akron.png',
		},
		awayTeam: {
			name: 'ЦСКА',
			city: 'Москва',
			logo: '/images/teamslogo/CSKA.png',
		},
		date: '4 апреля',
		time: '18:00',
		stadium: 'Солидарность Самара Арена',
		leagueInfo: 'Мир Российская Премьер-Лига\n2025/2026 23 тур',
		ticketLink: '',
		ticketLinkVip: '',
		ticketLinkSkybox: '',
		priceIncreaseDates: {
			first: '28.03',
		},
		fanIdRequired: true,
		promoType: 'rpl',
	},
	{
		id: '3',
		homeTeam: {
			name: 'Акрон',
			city: 'Тольятти',
			logo: '/images/teamslogo/Akron.png',
		},
		awayTeam: {
			name: 'Динамо Мхч',
			city: 'Москва',
			logo: '/images/teamslogo/Dynamo.png',
		},
		date: '23 апреля',
		time: '18:00',
		stadium: 'Солидарность Самара Арена',
		leagueInfo: 'Мир Российская Премьер-Лига\n2025/2026 23 тур',
		ticketLink: '',
		ticketLinkVip: '',
		ticketLinkSkybox: '',
		priceIncreaseDates: {
			first: '28.03',
		},
		fanIdRequired: true,
		promoType: 'rpl',
	},
]

export default nextMatchGames
