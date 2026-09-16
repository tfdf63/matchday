import { describe, expect, it } from 'vitest'

import { matchActivitiesAll } from '@/data/matchActivities'

import {
	applyMatchActivitiesDisplayRules,
	autographActivityDefaultCopy,
	autographActivityPromoCopy,
	shouldShowAutographPromoCopy,
} from './resolveDisplay'

describe('resolveDisplay autograph card', () => {
	const beforeKickoff = new Date('2026-09-17T19:29:00+04:00')
	const atKickoff = new Date('2026-09-17T19:30:00+04:00')
	const afterKickoff = new Date('2026-09-17T20:00:00+04:00')

	it('shows Milutin promo before Akhmat kickoff', () => {
		expect(shouldShowAutographPromoCopy(beforeKickoff)).toBe(true)
		const [first] = applyMatchActivitiesDisplayRules(
			matchActivitiesAll,
			beforeKickoff,
		)
		expect(first?.titleLine1).toBe(autographActivityPromoCopy.titleLine1)
		expect(first?.titleLine2).toBe(autographActivityPromoCopy.titleLine2)
		expect(first?.subtitle).toBe(autographActivityPromoCopy.subtitle)
	})

	it('restores default copy from kickoff onward', () => {
		expect(shouldShowAutographPromoCopy(atKickoff)).toBe(false)
		expect(shouldShowAutographPromoCopy(afterKickoff)).toBe(false)
		const [first] = applyMatchActivitiesDisplayRules(
			matchActivitiesAll,
			afterKickoff,
		)
		expect(first?.titleLine1).toBe(autographActivityDefaultCopy.titleLine1)
		expect(first?.subtitle).toBe(autographActivityDefaultCopy.subtitle)
	})

	it('keeps Milutin photo paths after kickoff', () => {
		const [first] = applyMatchActivitiesDisplayRules(
			matchActivitiesAll,
			afterKickoff,
		)
		expect(first?.imageSrc).toContain('activity-01.png')
		expect(first?.imageSrcDesktopXl).toContain('activity-01-1920.png')
	})
})
