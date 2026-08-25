export type PersonalData = {
	fullName: string
	email: string
	phone: string
}

export function appendPersonalDataToUrl(url: string, data: PersonalData): string {
	const json = JSON.stringify(data)
	const urlEncoded = encodeURIComponent(json)
	const base64Url = btoa(urlEncoded)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')

	const separator = url.includes('?') ? '&' : '?'
	return `${url}${separator}personalData=${base64Url}`
}
