import { describe, expect, it } from 'vitest'
import { parseMatchDateRu } from './parse-match-date-ru'

describe('parseMatchDateRu', () => {
	it('parses day and Russian month', () => {
		const d = parseMatchDateRu('29 июля', 2025)
		expect(d).not.toBeNull()
		expect(d!.getFullYear()).toBe(2025)
		expect(d!.getMonth()).toBe(6)
		expect(d!.getDate()).toBe(29)
	})

	it('returns null for invalid string', () => {
		expect(parseMatchDateRu('')).toBeNull()
		expect(parseMatchDateRu('foo')).toBeNull()
	})
})
