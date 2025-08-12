export interface StarPlayer {
	id: string
	firstName: string
	lastName: string
	number: number
	description: string
	photoUrl: string
}

export const starPlayers: StarPlayer[] = [
	{
		id: '1',
		firstName: 'Алексей',
		lastName: 'Козлов',
		number: 10,
		description:
			'Главный бомбардир команды с отличным голевым чутьем. Быстрый и техничный игрок, который всегда находит способ забить. Его скорость и точность ударов делают его настоящей звездой команды.',
		photoUrl: '/images/players/43064.png',
	},
	{
		id: '2',
		firstName: 'Дмитрий',
		lastName: 'Петров',
		number: 4,
		description:
			'Центральный защитник с отличным пониманием игры. Сильный в единоборствах и хорош в игре головой. Надежный игрок обороны, который всегда готов подставить плечо товарищу.',
		photoUrl: '/images/players/43064.png',
	},
	{
		id: '3',
		firstName: 'Артем',
		lastName: 'Сидоров',
		number: 8,
		description:
			'Центральный полузащитник с отличным видением поля. Мастер точных передач и дальних ударов. Контролирует темп игры и создает множество голевых моментов для команды.',
		photoUrl: '/images/players/43064.png',
	},
]
