import MainPageClient from '../MainPageClient'

export default function StandingsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<MainPageClient />
		</>
	)
}
