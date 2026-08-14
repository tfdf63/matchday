import { MarqueeSection } from '@/features/home'

import MainPageClient from '../MainPageClient'

export default function SectorLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<MarqueeSection />
			<MainPageClient />
		</>
	)
}
