import { describe, expect, it } from 'vitest'

import {
	formatBoardingStopLabel,
	normalizeBoardingStopKey,
} from './boardingStopAliases'

describe('boardingStopAliases', () => {
	it('shortens known park haus stop', () => {
		expect(
			formatBoardingStopLabel(
				'Кожвендиспансер / ТРК Парк Хаус, Парковка ТРК справа',
			),
		).toBe('ТРК Парк Хаус, парковка ТРК справа')
	})

	it('shortens known tolyatti dk stop', () => {
		expect(
			formatBoardingStopLabel(
				'Дворец культуры Тольятти имени Н.В. Абрамова, Остановка возле на ул. Мира в сторону Комсомольского района.',
			),
		).toBe(
			'ДК Тольятти, остановка на ул. Мира в сторону Комсомольского района.',
		)
	})

	it('shortens kolkhoz market stop', () => {
		expect(
			formatBoardingStopLabel('Колхозный рынок, Остановка в сторону Самары'),
		).toBe('Колхозный рынок, остановка в сторону Самары')
	})

	it('shortens zhigulev sea stop', () => {
		expect(
			formatBoardingStopLabel('Жигулёвское море, Остановка в сторону Самары'),
		).toBe('Жигулёвское море, остановка в сторону Самары')
	})

	it('returns unknown stop unchanged', () => {
		expect(formatBoardingStopLabel('Озон, Жигулёвск ТЦ Озон (парковка)')).toBe(
			'Озон, Жигулёвск ТЦ Озон (парковка)',
		)
	})

	it('normalizes trailing punctuation', () => {
		expect(normalizeBoardingStopKey(' stop, ')).toBe('stop')
	})
})
