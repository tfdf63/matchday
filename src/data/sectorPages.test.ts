import { describe, expect, it } from 'vitest'

import { getSectorPageBySlug, getSectorPageSlugs } from './sectorPages'

describe('sectorPages', () => {
	it('includes vip slug', () => {
		expect(getSectorPageSlugs()).toContain('vip')
	})

	it('returns vip page with seo fields', () => {
		const page = getSectorPageBySlug('vip')
		expect(page).not.toBeNull()
		expect(page?.path).toBe('/sector/vip/')
		expect(page?.heading).toBe('VIP')
		expect(page?.seo.title).toBe('VIP')
		expect(page?.seo.description.length).toBeGreaterThan(40)
		expect(page?.blocks).toHaveLength(4)
		expect(page?.schema.src).toContain('/images/schema/')
		expect(page?.dealerWidget?.venueId).toBe('85000')
		expect(page?.dealerWidget?.regionId).toBe(51)
		expect(page?.hotspots).toHaveLength(1)
		expect(page?.hotspots?.[0]?.modalImage.src).toContain('/images/merch/')
		expect(page?.hotspots?.[0]?.modalPrice).toBe('Цена: 5900')
		expect(page?.hotspots?.[0]?.modalCtaLabel).toBe('Купить')
		expect(page?.hotspots?.[0]?.modalExtraItems).toHaveLength(1)
		expect(page?.hotspots?.[0]?.modalExtraItems?.[0]?.image.src).toContain(
			'merch_black.gif',
		)
	})

	it('returns null for unknown slug', () => {
		expect(getSectorPageBySlug('unknown')).toBeNull()
	})
})
