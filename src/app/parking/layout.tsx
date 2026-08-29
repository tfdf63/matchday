import { FloatingHomeButton } from '@/components/FloatingHomeButton'

import MainPageClient from '../MainPageClient'

export default function ParkingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<FloatingHomeButton />
			<MainPageClient />
		</>
	)
}
