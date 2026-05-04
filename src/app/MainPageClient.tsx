'use client'

import {
	Menu,
	MenuActivitiesIcon,
	MenuBagIcon,
	MenuParkingIcon,
	MenuTicketIcon,
	type MenuNavItem,
} from '@/components/Menu'
import { useParkingModal } from '@/features/home/parking-modal'

const MainMenu: React.FC = () => {
	const parkingModal = useParkingModal()

	const menuItems: [MenuNavItem, MenuNavItem, MenuNavItem, MenuNavItem] = [
		{
			id: 'tickets',
			label: 'Билеты',
			href: '/#ticket-program',
			icon: <MenuTicketIcon />,
		},
		{
			id: 'parking',
			label: 'Парковка',
			icon: <MenuParkingIcon />,
			onClick: parkingModal.open,
		},
		{
			id: 'activities',
			label: 'Активности',
			href: '/#match-activities',
			icon: <MenuActivitiesIcon />,
		},
		{
			id: 'merch',
			label: 'Мерч',
			href: '/#merch',
			icon: <MenuBagIcon />,
		},
	]

	return <Menu items={menuItems} />
}

const MainPageClient: React.FC = () => {
	return <MainMenu />
}

export default MainPageClient
