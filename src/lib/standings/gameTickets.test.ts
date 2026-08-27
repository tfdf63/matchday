import { describe, expect, it } from 'vitest'

import games from '@/data/games'
import {
	findGameForStandingsMatch,
	getStandingsTicketButtons,
	getStandingsTicketButtonsForMatch,
} from './gameTickets'

describe('gameTickets', () => {
	it('находит матч по дате, сопернику и дом/гости', () => {
		const game = findGameForStandingsMatch('2026-08-01', 'Рубин', 'home')
		expect(game?.id).toBe('24')
	})

	it('собирает кнопки из ссылок games.ts', () => {
		const game = games.find((g) => g.id === '24')
		expect(game).toBeDefined()

		const buttons = getStandingsTicketButtons(game!)
		expect(buttons.map((b) => b.label)).toEqual([
			'VIP',
			'Купить билеты',
			'Ложи',
		])
		expect(buttons.find((b) => b.variant === 'primary')?.href).toContain(
			'ticketsteam-2130',
		)
	})

	it('не показывает VIP с кастомной подписью (например, автобус)', () => {
		const game = games.find((g) => g.id === '20')
		expect(game).toBeDefined()

		const buttons = getStandingsTicketButtons(game!)
		expect(buttons.some((b) => b.label === 'VIP')).toBe(false)
	})

	it('добавляет цену «от» для домашнего матча с ЦСКА', () => {
		const game = games.find((g) => g.id === '30')
		expect(game).toBeDefined()

		const buttons = getStandingsTicketButtons(game!)
		expect(buttons.find((b) => b.label === 'Купить билеты')?.priceFrom).toBe(
			'от 490 ₽',
		)
		expect(buttons.find((b) => b.label === 'VIP')?.priceFrom).toBe(
			'от 1990 ₽',
		)
		expect(buttons.find((b) => b.label === 'Ложи')?.priceFrom).toBe(
			'от 12500 ₽',
		)
	})

	it('возвращает кнопки для строки календаря', () => {
		const buttons = getStandingsTicketButtonsForMatch(
			'2026-08-28',
			'ЦСКА',
			'home',
		)
		expect(buttons.length).toBeGreaterThanOrEqual(3)
	})

	it('не показывает кнопки для прошедшей даты', () => {
		const buttons = getStandingsTicketButtonsForMatch(
			'2026-07-25',
			'Зенит',
			'home',
			'2026-08-01',
		)
		expect(buttons).toEqual([])
	})

	it('показывает кнопки для сегодняшней и будущей даты', () => {
		const today = '2026-08-28'
		expect(
			getStandingsTicketButtonsForMatch(
				'2026-08-28',
				'ЦСКА',
				'home',
				today,
			).length,
		).toBeGreaterThan(0)
		expect(
			getStandingsTicketButtonsForMatch(
				'2026-08-23',
				'Крылья Советов',
				'home',
				today,
			),
		).toEqual([])
		expect(
			getStandingsTicketButtonsForMatch(
				'2026-09-06',
				'Оренбург',
				'away',
				today,
			).length,
		).toBe(0)
	})

	it('добавляет регистрацию на выезд для кубкового матча', () => {
		const buttons = getStandingsTicketButtonsForMatch(
			'2026-08-18',
			'ЦСКА',
			'away',
			'2026-08-01',
			'cup',
		)
		expect(buttons.some((b) => b.label === 'Регистрация на выезд')).toBe(
			true,
		)
	})

	it('находит кубковый матч по competition', () => {
		const game = findGameForStandingsMatch(
			'2026-08-18',
			'ЦСКА',
			'away',
			'cup',
		)
		expect(game?.id).toBe('28')
		expect(game?.promoType).toBe('cup')
	})
})
