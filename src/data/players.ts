export interface Player {
	id: string
	lastName: string
	firstName: string
	number: number
	description: string
	titles: string[]
	photoUrl: string
	position: string
	birthDate: string
	height: number
	weight: number
	nationality: string
}

export const players: Player[] = [
	{
		id: '1',
		lastName: 'Иванов',
		firstName: 'Алексей',
		number: 1,
		position: 'Вратарь',
		description:
			'Надежный вратарь с отличной реакцией и командой голосом. Капитан команды и лидер в раздевалке.',
		titles: ['Чемпион России 2023', 'Лучший вратарь 22/23'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1995-03-15',
		height: 188,
		weight: 82,
		nationality: 'Россия',
	},
	{
		id: '2',
		lastName: 'Петров',
		firstName: 'Дмитрий',
		number: 4,
		position: 'Защитник',
		description:
			'Центральный защитник с отличным пониманием игры. Сильный в единоборствах и хорош в игре головой.',
		titles: ['Обладатель Кубка России 2022'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1993-07-22',
		height: 185,
		weight: 78,
		nationality: 'Россия',
	},
	{
		id: '3',
		lastName: 'Сидоров',
		firstName: 'Артем',
		number: 8,
		position: 'Полузащитник',
		description:
			'Центральный полузащитник с отличным видением поля. Мастер точных передач и дальних ударов.',
		titles: ['Лучший ассистент 23/24'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1997-11-08',
		height: 178,
		weight: 72,
		nationality: 'Россия',
	},
	{
		id: '4',
		lastName: 'Козлов',
		firstName: 'Максим',
		number: 10,
		position: 'Нападающий',
		description:
			'Главный бомбардир команды с отличным голевым чутьем. Быстрый и техничный игрок.',
		titles: ['Лучший бомбардир 23/24', 'Игрок месяца (сентябрь 2023)'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1999-05-12',
		height: 182,
		weight: 75,
		nationality: 'Россия',
	},
	{
		id: '5',
		lastName: 'Морозов',
		firstName: 'Сергей',
		number: 6,
		position: 'Защитник',
		description:
			'Левый защитник с хорошей скоростью и техникой. Отлично подключается к атакам.',
		titles: ['Лучший молодой игрок 22/23'],
		photoUrl: '/images/players/43064.png',
		birthDate: '2000-09-30',
		height: 180,
		weight: 73,
		nationality: 'Россия',
	},
	{
		id: '6',
		lastName: 'Волков',
		firstName: 'Андрей',
		number: 14,
		position: 'Полузащитник',
		description:
			'Опорный полузащитник с отличной выносливостью. Надежен в отборе мяча.',
		titles: ['Самый выносливый игрок команды 2023'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1994-12-03',
		height: 183,
		weight: 76,
		nationality: 'Россия',
	},
	{
		id: '7',
		lastName: 'Соколов',
		firstName: 'Игорь',
		number: 7,
		position: 'Полузащитник',
		description:
			'Правый полузащитник с отличной техникой и скоростью. Мастер дриблинга.',
		titles: ['Лучший дриблер 23/24'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1996-04-18',
		height: 175,
		weight: 70,
		nationality: 'Россия',
	},
	{
		id: '8',
		lastName: 'Новиков',
		firstName: 'Павел',
		number: 9,
		position: 'Нападающий',
		description:
			'Центральный нападающий с отличной игрой головой. Силен в единоборствах.',
		titles: ['Лучший игрок головой 23/24'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1992-08-25',
		height: 190,
		weight: 85,
		nationality: 'Россия',
	},
	{
		id: '9',
		lastName: 'Лебедев',
		firstName: 'Константин',
		number: 22,
		position: 'Вратарь',
		description:
			'Молодой перспективный вратарь с отличными рефлексами. Будущее команды.',
		titles: ['Лучший молодой вратарь 2023'],
		photoUrl: '/images/players/43064.png',
		birthDate: '2002-01-14',
		height: 192,
		weight: 80,
		nationality: 'Россия',
	},
	{
		id: '10',
		lastName: 'Кузнецов',
		firstName: 'Евгений',
		number: 17,
		position: 'Полузащитник',
		description:
			'Атакующий полузащитник с отличным ударом. Мастер дальних ударов и стандартов.',
		titles: ['Лучший исполнитель стандартов 23/24'],
		photoUrl: '/images/players/43064.png',
		birthDate: '1998-06-07',
		height: 179,
		weight: 74,
		nationality: 'Россия',
	},
]

// Функции для работы с данными игроков
export const getPlayerById = (id: string): Player | undefined => {
	return players.find(player => player.id === id)
}

export const getPlayersByPosition = (position: string): Player[] => {
	return players.filter(player => player.position === position)
}

export const getPlayersByNumber = (number: number): Player | undefined => {
	return players.find(player => player.number === number)
}

export const getGoalkeepers = (): Player[] => {
	return getPlayersByPosition('Вратарь')
}

export const getDefenders = (): Player[] => {
	return getPlayersByPosition('Защитник')
}

export const getMidfielders = (): Player[] => {
	return getPlayersByPosition('Полузащитник')
}

export const getForwards = (): Player[] => {
	return getPlayersByPosition('Нападающий')
}
