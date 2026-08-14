import { FloatingHomeButton } from '@/components/FloatingHomeButton'
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
			<FloatingHomeButton />
			<MarqueeSection />
			<MainPageClient />
		</>
	)
}
