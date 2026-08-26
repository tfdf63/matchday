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

	it('includes family sector c4', () => {
		expect(getSectorPageSlugs()).toContain('c4')
		const page = getSectorPageBySlug('c4')
		expect(page).not.toBeNull()
		expect(page?.path).toBe('/sector/c4/')
		expect(page?.heading).toBe('Семейный')
		expect(page?.subtitle).toContain('C413-C417')
		expect(page?.introHeading).toBe('Тёплая зона С4')
		expect(page?.blocksBeforeSchema).toBe(true)
		expect(page?.schemaAnchor).toBe('full')
		expect(page?.hero.src).toContain('/images/sector/c4-1.webp')
		expect(page?.schema.src).toContain('/images/schema/schema-c4.webp')
		expect(page?.schema.width).toBe(687)
		expect(page?.schema.height).toBe(688)
		expect(page?.schemaHeading).toBe('Схема расположения')
		expect(page?.schemaSubtitle).toBe('4 этаж')
		expect(page?.preTicketsImage?.src).toContain(
			'/images/sector/c4-family.webp',
		)
		expect(page?.showPromos).toBe(true)
		expect(page?.promosHeading).toBe('Промокоды и тарифы')
		expect(page?.seo.title).toBe('Семейный')
		expect(page?.seo.description.length).toBeGreaterThan(40)
		expect(page?.blocks).toHaveLength(5)
		expect(page?.blocks[0]?.title).toBe('Детская зона')
		expect(page?.blocksAside).toHaveLength(2)
		expect(page?.blocksAside?.[0]?.src).toContain('c4-mascot.webp')
		expect(page?.blocksAside?.[1]?.src).toContain('c4-logo.webp')
		expect(page?.blocksAsideWide?.src).toContain('c4-activity.webp')
	})

	it('includes fan sector page', () => {
		expect(getSectorPageSlugs()).toContain('fan')
		const page = getSectorPageBySlug('fan')
		expect(page).not.toBeNull()
		expect(page?.path).toBe('/sector/fan/')
		expect(page?.heading).toBe('Фанатский')
		expect(page?.subtitle).toBe(
			'Максимум эмоций рядом с активной поддержкой команды: громкие заряды, флаги и единый ритм трибуны.',
		)
		expect(page?.buyLabel).toBe('Вступить')
		expect(page?.buyHref).toBe('#join')
		expect(page?.introHeading).toBe('Что такое сектор активной поддержки?')
		expect(page?.introSubtitle).toContain('Организованная группа болельщиков')
		expect(page?.hero.src).toContain('/images/sector/fan.webp')
		expect(page?.schema?.src).toContain('/images/schema/schema-fan.webp')
		expect(page?.schema?.width).toBe(3622)
		expect(page?.schema?.height).toBe(965)
		expect(page?.schemaHeading).toBe('Схема расположения')
		expect(page?.schemaSubtitle).toBe('Трибуна D')
		expect(page?.schemaAnchor).toBe('full')
		expect(page?.ticketsHeading).toBeUndefined()
		expect(page?.blocksBeforeSchema).toBe(true)
		expect(page?.blocks).toHaveLength(3)
		expect(page?.blocks[0]?.title).toBe('Атмосфера')
		expect(page?.blocksImage?.src).toContain('/images/sector/fan-1.webp')
		expect(page?.joinHeading).toBe('Как попасть на сектор?')
		expect(page?.joinSteps).toHaveLength(2)
		expect(page?.joinSteps?.[0]?.spans).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'link',
					label: 'VK',
					href: 'https://vk.ru/id7362124',
				}),
				expect.objectContaining({
					type: 'link',
					label: 'TG',
					href: 'https://t.me/slava_tfdf',
				}),
			]),
		)
		expect(page?.chantsHeading).toBe('Заряды на секторе')
		expect(page?.chantsImage?.src).toContain('/images/sector/fan-2.webp')
		expect(page?.chants).toHaveLength(5)
		expect(page?.chants?.[0]?.title).toBe('Вперёд, Акрон!')
		expect(page?.goldenSeason?.heading).toBe('Золотой сезон')
		expect(page?.goldenSeason?.seasons).toHaveLength(2)
		expect(page?.goldenSeason?.seasons[0]?.names).toEqual([
			'Москалев Александр',
			'Мошкова-Леонтьева Алла',
		])
		expect(page?.goldenSeason?.image.src).toContain(
			'/images/sector/fan-zoloto.webp',
		)
		expect(page?.communityCta?.heading).toBe('Соц. сети')
		expect(page?.communityCta?.label).toBe('VK')
		expect(page?.communityCta?.href).toBe('https://vk.ru/fcakron_fans')
		expect(page?.seo.title).toBe('Фанатский')
		expect(page?.seo.description.length).toBeGreaterThan(40)
	})

	it('includes student sector page', () => {
		expect(getSectorPageSlugs()).toContain('stud')
		const page = getSectorPageBySlug('stud')
		expect(page).not.toBeNull()
		expect(page?.path).toBe('/sector/stud/')
		expect(page?.heading).toBe('Студ')
		expect(page?.subtitle).toBe(
			'Место, где студент может быть самим собой.',
		)
		expect(page?.buyLabel).toBe('Получить билет')
		expect(page?.buyHref).toBe('#join')
		expect(page?.introHeading).toBe('D116')
		expect(page?.hero.src).toContain('/images/sector/stud-1.webp')
		expect(page?.hero.width).toBe(1200)
		expect(page?.hero.height).toBe(800)
		expect(page?.blocksImage?.src).toContain('/images/sector/stud-2.webp')
		expect(page?.blocks).toHaveLength(6)
		expect(page?.blocks[0]?.title).toBe('Студент - часть комьюнити')
		expect(page?.offer?.title).toBe('Получи скидку 20%\nдля близких')
		expect(page?.offer?.subtitle).toBe(
			'Каждый вуз получает свой уникальный промокод',
		)
		expect(page?.offer?.image.src).toContain('/images/sector/stud-3.webp')
		expect(page?.joinHeading).toBe('Как получить билет?')
		expect(page?.joinGroups).toHaveLength(2)
		expect(page?.joinGroups?.[0]?.subtitle).toBe('Студенту')
		expect(page?.joinGroups?.[0]?.steps).toHaveLength(4)
		expect(page?.joinGroups?.[1]?.subtitle).toBe('Учебным заведениям')
		expect(page?.joinGroups?.[1]?.blocks).toHaveLength(2)
		expect(page?.communityCta?.heading).toBe('Получи билет')
		expect(page?.communityCta?.buttons).toEqual([
			{
				label: 'ВК',
				href: 'https://vk.com/club237654596',
			},
			{
				label: 'Телеграм',
				href: 'https://t.me/studakron',
			},
		])
		expect(page?.seo.title).toBe('Студенческий')
		expect(page?.seo.description.length).toBeGreaterThan(40)
	})

	it('returns null for unknown slug', () => {
		expect(getSectorPageBySlug('unknown')).toBeNull()
	})
})
