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
		lastName: 'Дзюба',

		photoUrl: '/images/players/43064.png',
		achievements: [
			{
				benefit: 'Лучший бомбардир в истории России',
				description: 'Забил более 300 голов в официальных матчах',
			},
			{
				benefit: 'Лучший игрок по системе "гол+пас"',
				description: 'Рекордсмен по результативности в РПЛ',
			},
		],
	},
]
