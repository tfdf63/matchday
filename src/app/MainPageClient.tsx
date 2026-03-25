'use client'

import {
	Menu,
	MenuActivitiesIcon,
	MenuBagIcon,
	MenuParkingIcon,
	MenuTicketIcon,
	type MenuNavItem,
} from '@/components/Menu'

const MENU_ITEMS: [MenuNavItem, MenuNavItem, MenuNavItem, MenuNavItem] = [
	{
		id: 'tickets',
		label: 'Билеты',
		href: '/',
		icon: <MenuTicketIcon />,
	},
	{
		id: 'parking',
		label: 'Парковка',
		href: '/parking/',
		icon: <MenuParkingIcon />,
	},
	{
		id: 'activities',
		label: 'Активности',
		href: '/activities/',
		icon: <MenuActivitiesIcon />,
	},
	{
		id: 'merch',
		label: 'Мерч',
		href: '/merch/',
		icon: <MenuBagIcon />,
	},
]

const MainPageClient: React.FC = () => {
	return <Menu items={MENU_ITEMS} />
}

export default MainPageClient
