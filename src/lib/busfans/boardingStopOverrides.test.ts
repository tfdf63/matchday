import { describe, expect, it } from 'vitest'

import { getBoardingStopDisplay } from './boardingStopOverrides'

describe('getBoardingStopDisplay', () => {
	it('renames DK Tolyatti stop to Cosmos for CSKA home match', () => {
		expect(
			getBoardingStopDisplay(
				'Дворец культуры Тольятти имени Н.В. Абрамова, Остановка возле ДК Тольятти на ул. Мира в сторону Комсомольского района.',
				'2026-08-28-akron-h-cska',
			),
		).toEqual({
			label: 'вместо ДК Тольятти > остановка Кинотеатр Космос',
			isReplacement: true,
		})
	})

	it('renames the shortened DK Excel wording for the same match', () => {
		expect(
			getBoardingStopDisplay(
				'Дворец культуры Тольятти имени Н.В. Абрамова, Остановка возле на ул. Мира в сторону Комсомольского района.',
				'2026-08-28-akron-h-cska',
			),
		).toEqual({
			label: 'вместо ДК Тольятти > остановка Кинотеатр Космос',
			isReplacement: true,
		})
	})

	it('keeps the usual DK alias on other matches', () => {
		expect(
			getBoardingStopDisplay(
				'Дворец культуры Тольятти имени Н.В. Абрамова, Остановка возле на ул. Мира в сторону Комсомольского района.',
			),
		).toEqual({
			label:
				'ДК Тольятти, остановка на ул. Мира в сторону Комсомольского района.',
			isReplacement: false,
		})
	})
})
