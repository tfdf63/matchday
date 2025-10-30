export interface Event {
	id: number
	image: string
	title: string
	link?: string
}

export const events: Event[] = [
	// {
	// 	id: 1,
	// 	image: '/images/cardevents/event1.webp',
	// 	title: 'Спортивные мероприятия',
	// },
	{
		id: 7,
		image: '/images/cardevents/gsdp3.webp',
		title: 'Выступления приглашенных гостей',
	},
	{
		id: 2,
		image: '/images/cardevents/event2.webp',
		title: 'Автограф сессии с\u00A0игроками',
	},
	{
		id: 3,
		image: '/images/cardevents/event3.webp',
		title: 'Мягкие игровые зоны для\u00A0детей',
	},
	{
		id: 4,
		image: '/images/cardevents/event4.webp',
		title: 'Активности для\u00A0всей семьи',
	},
	{
		id: 5,
		image: '/images/cardevents/event5.webp',
		title: 'Уникальные события',
	},
	// {
	// 	id: 6,
	// 	image: '/images/cardevents/gsdp2.webp',
	// 	title: 'Специальные программы',
	// },
	{
		id: 8,
		image: '/images/cardevents/dj12.webp',
		title: 'DJ сеты',
	},
	{
		id: 9,
		image: '/images/cardevents/maskot.webp',
		title: 'Встреча с\u00A0талисманом',
	},
]
