/** Путь к логотипу в `public/images/teamslogo`. */
const TEAM_LOGO_BY_NAME: Record<string, string> = {
	Акрон: '/images/teamslogo/Akron.png',
	Ахмат: '/images/teamslogo/Akhmat.png',
	Балтика: '/images/teamslogo/Baltika.png',
	'Крылья Советов': '/images/teamslogo/Krylia-Sovetov.png',
	Локомотив: '/images/teamslogo/Lokomotiv.png',
	Оренбург: '/images/teamslogo/Orenburg.png',
	'Пари НН': '/images/teamslogo/Pari-NN.png',
	Ростов: '/images/teamslogo/Rostov.png',
	Рубин: '/images/teamslogo/Rubin.png',
	Сочи: '/images/teamslogo/Sochi.png',
	Спартак: '/images/teamslogo/Spartak.png',
	ЦСКА: '/images/teamslogo/CSKA.png',
	Зенит: '/images/teamslogo/Zenit.png',
	Краснодар: '/images/teamslogo/Krasnodar.png',
	'Динамо Мск': '/images/teamslogo/Dynamo-Moscow.png',
	'Динамо Мх': '/images/teamslogo/Dynamo.png',
}

export function getTeamLogoPath(teamName: string | undefined): string | undefined {
	if (!teamName?.trim()) return undefined
	return TEAM_LOGO_BY_NAME[teamName.trim()]
}
