import { describe, expect, it } from 'vitest'

import { appendPersonalDataToUrl, type PersonalData } from './personalData'

const personalData: PersonalData = {
	fullName: 'Иван Иванов',
	email: 'ivan@example.com',
	phone: '79991234567',
}

function decodePersonalData(url: string): PersonalData {
	const encoded = new URL(url).searchParams.get('personalData')!
	const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
	return JSON.parse(decodeURIComponent(atob(base64)))
}

describe('appendPersonalDataToUrl', () => {
	it('добавляет персональные данные к ссылке без query-параметров', () => {
		const url = appendPersonalDataToUrl('https://example.com/tickets', personalData)

		expect(url).toContain('?personalData=')
		expect(decodePersonalData(url)).toEqual(personalData)
	})

	it('сохраняет существующие query-параметры', () => {
		const url = appendPersonalDataToUrl('https://example.com/tickets?regionId=51', personalData)

		expect(new URL(url).searchParams.get('regionId')).toBe('51')
		expect(decodePersonalData(url)).toEqual(personalData)
	})
})
