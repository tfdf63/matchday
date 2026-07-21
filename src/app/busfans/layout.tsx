import MainPageClient from '../MainPageClient'

export default function BusFansLayout({
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
