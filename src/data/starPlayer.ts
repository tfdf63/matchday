export interface StarPlayer {
	id: string
	firstName: string
	lastName: string
	photoUrl: string
	achievements: Array<{
		benefit: string
		description: string
	}>
}

export const starPlayers: StarPlayer[] = [
	{
		id: '1',
		firstName: 'Артём',
		lastName: 'Дзюба #22',

		photoUrl: '/images/players/43064.png',

		achievements: [
			{
				benefit: 'Лучший бомбардир в\u00A0России',
				description: 'Забил более 240 голов в\u00A0официальных матчах',
			},
			{
				benefit: 'Лучший игрок по\u00A0системе "гол+пас"',
				description: 'Рекордсмен по\u00A0результативности в\u00A0РПЛ',
			},
			{
				benefit: 'Капитан национальной сборной',
				description: 'На\u00A0Чемпионате Мира 2018 в\u00A0России',
			},
		],
	},
]
