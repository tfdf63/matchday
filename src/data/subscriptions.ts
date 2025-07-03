export interface SubscriptionCard {
	id: number
	image: string
	buttonText: string
	price: string
	url: string
	status: 'VIP' | 'Premium' | 'Mass'
}

export const subscriptionCards: SubscriptionCard[] = [
	{
		id: 1,
		image: `/images/sector/subscription10.jpg`,
		buttonText: 'Центральный',
		price: 'от 12490 руб.',
		url: '/sector/c121',
		status: 'Mass',
	},
	{
		id: 2,
		image: `/images/sector/subscription8.jpg`,
		buttonText: 'Игровая панорама',
		price: 'от 9990 руб.',
		url: '/sector/c122c120',
		status: 'Mass',
	},
	{
		id: 3,
		image: `/images/sector/subscription7.jpg`,
		buttonText: 'Стратегический',
		price: 'от 7990 руб.',
		url: '/sector/c123c119',
		status: 'Mass',
	},
	{
		id: 6,
		image: `/images/sector/subscription1.jpg`,
		buttonText: 'Premium',
		price: 'от 32990 руб.',
		url: '/sector/business-club',
		status: 'Premium',
	},
	{
		id: 13,
		image: `/images/sector/subscription12.jpg`,
		buttonText: 'VIP ложа',
		price: 'по заявке',
		url: '/sector/vip',
		status: 'VIP',
	},
	{
		id: 4,
		image: `/images/sector/subscription2.jpg`,
		buttonText: 'Семейный сектор',
		price: 'от 5990 руб.',
		url: '/sector/family-sector',
		status: 'Mass',
	},
	{
		id: 12,
		image: `/images/sector/subscription4.jpg`,
		buttonText: 'Фанатский',
		price: 'закрытая продажа',
		url: '/sector/fans',
		status: 'Mass',
	},
	{
		id: 5,
		image: `/images/sector/subscription11.jpg`,
		buttonText: 'Угловой',
		price: 'от 4990 руб.',
		url: '/sector/c125c117',
		status: 'Mass',
	},
	{
		id: 7,
		image: `/images/sector/subscription3.jpg`,
		buttonText: 'За скамейкой',
		price: 'от 16490 руб.',
		url: '/sector/a104a108',
		status: 'Mass',
	},
	{
		id: 9,
		image: `/images/sector/subscription6.jpg`,
		buttonText: 'За воротами',
		price: 'от 4590 руб.',
		url: '/sector/d116d112',
		status: 'Mass',
	},
	{
		id: 8,
		image: `/images/sector/subscription9.jpg`,
		buttonText: 'Развлекательный',
		price: 'от 17490 руб.',
		url: '/sector/c4',
		status: 'Mass',
	},

	{
		id: 10,
		image: `/images/sector/subscription13.jpg`,
		buttonText: 'Социальный',
		price: 'по заявке',
		url: '/sector/mgn',
		status: 'Mass',
	},
	// {
	// 	id: 11,
	// 	image: `/images/sector/subscription3.jpg`,
	// 	buttonText: 'Групповой',
	// 	price: 'по заявке от 15 чел.',
	// 	url: '/sector/mgn',
	// 	status: 'Mass',
	// },
]
