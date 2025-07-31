import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import '../styles/globals.scss'
import Script from 'next/script'
import BackToHome from '@/components/BackToHome'
import '../styles/globals.css'
import '../styles/fonts.css'
import Image from 'next/image'

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-ibm-plex-mono',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
}

export const metadata: Metadata = {
	title: {
		template: 'ФК Акрон | %s',
		default: 'ФК Акрон - Билеты на матчи',
	},
	description:
		'Купить билеты на матчи ФК Акрон в Самаре. Расписание игр, абонементы, VIP-ложи. Официальный сайт клуба.',
	keywords:
		'ФК Акрон, билеты на футбол, матчи Акрон, стадион Самара, купить билет, абонемент, VIP, расписание игр',
	icons: {
		icon: '/favicon.ico',
	},
	// Предотвращение преобразования страницы через Google Web Light
	other: {
		googlebot: 'notranslate',
		google: 'notranslate',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': "frame-ancestors 'self'",
		'Cache-Control': 'no-transform',
		// Запрет Apple на форматирование телефонных номеров и адресов
		'format-detection': 'telephone=no, address=no, email=no, date=no',
		// Запрет на автоматический перевод
		'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
	},
	// Запрет на индексацию iframe
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				<link
					rel='preload'
					href='/fonts/Akademia.otf'
					as='font'
					type='font/otf'
					crossOrigin='anonymous'
					fetchPriority='high'
				/>
				{/* Preconnect для внешних доменов */}
				<link rel='preconnect' href='https://top-fwz1.mail.ru' />
				<link rel='preconnect' href='https://mc.yandex.ru' />
				<link rel='preconnect' href='https://st.top100.ru' />
				<link rel='preconnect' href='https://tagmanager.andata.ru' />
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
				{/* Запрет Web Light и других трансформаций */}
				<meta name='googlebot' content='notranslate' />
				<meta name='google' content='notranslate' />
				<meta httpEquiv='Cache-Control' content='no-transform' />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'SportsOrganization',
							name: 'ФК Акрон',
							url: 'https://matchday.fcakron.ru',
							logo: 'https://matchday.fcakron.ru/images/akron-logo.svg',
							description:
								'Официальный сайт ФК Акрон для покупки билетов на матчи',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Самара',
								addressCountry: 'RU',
							},
							sport: 'Футбол',
							league: 'Российская Премьер-Лига',
						}),
					}}
				/>
			</head>
			<body className={ibmPlexMono.variable}>
				<Image
					src='/images/fon.webp'
					alt='Фон'
					fill
					priority
					className='globalBgFon'
				/>
				<BackToHome />
				<Script id='top-mail-ru' strategy='lazyOnload' src='/top-mail-ru.js' />
				<Script
					id='yandex-metrika'
					strategy='lazyOnload'
					src='/yandex-metrika.js'
				/>
				<Script id='sber-counter' strategy='lazyOnload' src='/sber.js' />
				{children}
				<Script
					id='andata-tag-manager'
					strategy='lazyOnload'
					src='//tagmanager.andata.ru/api/v1/container/9ebcc59d-e373-447f-b5cd-0de5dc2006e4/published/code.js'
				/>
				{children}
			</body>
		</html>
	)
}
