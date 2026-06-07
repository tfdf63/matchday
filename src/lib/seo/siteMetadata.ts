import type { Metadata } from 'next'

import {
	DEFAULT_DESCRIPTION,
	DEFAULT_KEYWORDS,
	DEFAULT_OG_IMAGE,
	DEFAULT_OG_IMAGE_HEIGHT,
	DEFAULT_OG_IMAGE_WIDTH,
	DEFAULT_TITLE,
	SITE_NAME,
	SITE_URL,
} from './constants'

export function buildRootMetadata(): Metadata {
	const siteUrl = new URL(SITE_URL)

	return {
		metadataBase: siteUrl,
		title: {
			template: `${SITE_NAME} | %s`,
			default: DEFAULT_TITLE,
		},
		description: DEFAULT_DESCRIPTION,
		keywords: DEFAULT_KEYWORDS,
		alternates: {
			canonical: '/',
		},
		openGraph: {
			type: 'website',
			locale: 'ru_RU',
			url: '/',
			siteName: SITE_NAME,
			title: DEFAULT_TITLE,
			description: DEFAULT_DESCRIPTION,
			images: [
				{
					url: DEFAULT_OG_IMAGE,
					width: DEFAULT_OG_IMAGE_WIDTH,
					height: DEFAULT_OG_IMAGE_HEIGHT,
					alt: 'ФК Акрон — билеты на матчи',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: DEFAULT_TITLE,
			description: DEFAULT_DESCRIPTION,
			images: [DEFAULT_OG_IMAGE],
		},
		icons: {
			icon: '/favicon.ico',
		},
		other: {
			googlebot: 'notranslate',
			google: 'notranslate',
			'X-Frame-Options': 'SAMEORIGIN',
			'Content-Security-Policy': "frame-ancestors 'self'",
			'Cache-Control': 'no-transform',
			'format-detection': 'telephone=no, address=no, email=no, date=no',
			'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}
}
