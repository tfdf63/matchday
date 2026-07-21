/** Полное название остановки из Excel → короткая подпись в блоке «Маршрут». */
const BOARDING_STOP_ALIASES_RAW: Readonly<Record<string, string>> = {
	'Кожвендиспансер / ТРК Парк Хаус, Парковка ТРК справа':
		'ТРК Парк Хаус, парковка ТРК справа',
	'Дворец культуры Тольятти имени Н.В. Абрамова, Остановка возле на ул. Мира в сторону Комсомольского района.':
		'ДК Тольятти, остановка на ул. Мира в сторону Комсомольского района.',
	'Колхозный рынок, Остановка в сторону Самары':
		'Колхозный рынок, остановка в сторону Самары',
	'Жигулёвское море, Остановка в сторону Самары':
		'Жигулёвское море, остановка в сторону Самары',
}

export function normalizeBoardingStopKey(stop: string): string {
	return stop.trim().replace(/[,.]\s*$/, '')
}

const BOARDING_STOP_ALIASES: Readonly<Record<string, string>> =
	Object.fromEntries(
		Object.entries(BOARDING_STOP_ALIASES_RAW).map(([full, short]) => [
			normalizeBoardingStopKey(full),
			short,
		]),
	)

export function formatBoardingStopLabel(stop: string): string {
	const key = normalizeBoardingStopKey(stop)
	return BOARDING_STOP_ALIASES[key] ?? key
}
