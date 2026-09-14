import { describe, expect, it } from 'vitest'

import games from '@/data/games'

import { getGameBusRegistrationLinks } from './registrationLinks'

describe('registrationLinks', () => {
	it('uses purchase link when only busfansRegistrationUrl is set', () => {
		const game = games.find((g) => g.id === '34')
		expect(game).toBeDefined()
		const links = getGameBusRegistrationLinks(game!)
		expect(links.purchase).toContain('atomstravel.com')
		expect(links.tolyatti).toBeNull()
		expect(links.priceFrom).toBe('от 490 ₽')
	})

	it('keeps city-specific links separate from generic url', () => {
		const game = games.find((g) => g.id === '32')
		expect(game).toBeDefined()
		const links = getGameBusRegistrationLinks(game!)
		expect(links.tolyatti).toBeTruthy()
		expect(links.purchase).toBeNull()
	})
})
