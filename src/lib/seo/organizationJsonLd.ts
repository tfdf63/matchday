import {
	ORGANIZATION_DESCRIPTION,
	ORGANIZATION_LEAGUE,
	ORGANIZATION_LOGO,
	SITE_NAME,
	SITE_URL,
} from './constants'

export function buildOrganizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'SportsOrganization',
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}${ORGANIZATION_LOGO}`,
		description: ORGANIZATION_DESCRIPTION,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Самара',
			addressCountry: 'RU',
		},
		sport: 'Футбол',
		memberOf: {
			'@type': 'SportsOrganization',
			name: ORGANIZATION_LEAGUE,
		},
	}
}
