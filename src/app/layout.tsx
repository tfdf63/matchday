import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import '../styles/globals.scss'
import Script from 'next/script'
import BackToHome from '@/components/BackToHome'
import Image from 'next/image'

// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// })

const ibmPlexMono = IBM_Plex_Mono({
	variable: '--font-ibm-plex-mono',
	subsets: ['latin'],
	weight: ['300', '400', '600'],
	display: 'swap',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
}

export const metadata: Metadata = {
	title: 'Matchday | Купить билеты на Акрон',
	description:
		'Матчи Акрон, Купить билеты на Акрон, Купить билеты на Акрон, Купить билеты на Акрон',
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
}: Readonly<{
	children: React.ReactNode
}>) {
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
				<meta
					name='description'
					content='Покупайте билеты на матчи ФК Акрон онлайн. Расписание игр, акции, абонементы, лучшие места на стадионе.'
				/>
				<meta
					name='keywords'
					content='Акрон, билеты, футбол, Самара, стадион, купить билет, матч, абонемент, расписание'
				/>
			</head>
			<body className={`${ibmPlexMono.variable}`}>
				<Image
					src='/images/fon.webp'
					alt='Фон'
					fill
					priority
					className='globalBgFon'
					style={{ zIndex: -1 }}
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
			</body>
		</html>
	)
}
