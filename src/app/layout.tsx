import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import '../styles/globals.scss'
import { SiteFooter } from '@/components/Footer'
import { SeoJsonLd } from '@/components/SeoJsonLd/SeoJsonLd'
import {
	buildOrganizationJsonLd,
	buildRootMetadata,
} from '@/lib/seo'
import { AppProviders } from './AppProviders'
import { ClientAnalytics } from './ClientAnalytics'
import '../styles/globals.css'
import '../styles/fonts.css'

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-ibm-plex-mono',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	viewportFit: 'cover',
}

export const metadata: Metadata = buildRootMetadata()

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<head>
				<link
					rel='preload'
					href='/fonts/Akademia.otf'
					as='font'
					type='font/otf'
					crossOrigin='anonymous'
					fetchPriority='high'
				/>
				<link rel='preconnect' href='https://top-fwz1.mail.ru' />
				<link rel='preconnect' href='https://mc.yandex.ru' />
				<link rel='preconnect' href='https://st.top100.ru' />
				<style
					dangerouslySetInnerHTML={{
						__html: `
						@font-face {
							font-family: 'Akademia';
							font-display: swap;
							src: url('/fonts/Akademia.otf') format('opentype');
							font-weight: normal;
							font-style: normal;
						}
					`,
					}}
				/>
				<meta name='googlebot' content='notranslate' />
				<meta name='google' content='notranslate' />
				<meta httpEquiv='Cache-Control' content='no-transform' />
				<meta name='geo.placename' content='Samara, Russia' />
				<meta
					name='geo.position'
					content='53.27804484340651; 50.23771335335012'
				/>
				<meta name='geo.region' content='RU-' />
				<meta name='ICBM' content='53.27804484340651, 50.23771335335012' />
				<SeoJsonLd data={buildOrganizationJsonLd()} />
			</head>
			<body className={ibmPlexMono.variable} suppressHydrationWarning>
				<ClientAnalytics />
				<AppProviders>{children}</AppProviders>
				<SiteFooter />
			</body>
		</html>
	)
}
