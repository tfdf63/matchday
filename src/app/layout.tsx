import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Mono } from 'next/font/google'
import '../styles/globals.scss'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
	variable: '--font-ibm-plex-mono',
	subsets: ['latin'],
	weight: ['300', '400', '600'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Matchday | Купить билеты на Акрон',
	description:
		'Матчи Акрон, Купить билеты на Акрон, Купить билеты на Акрон, Купить билеты на Акрон',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='preload'
					href='/fonts/Akademia.otf'
					as='font'
					type='font/opentype'
					crossOrigin='anonymous'
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable}`}
			>
				{children}
			</body>
		</html>
	)
}
