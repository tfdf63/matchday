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
		href: '/#ticket-program',
		icon: <MenuTicketIcon />,
	},
	{
		id: 'parking',
		label: 'Парковка',
		href: 'https://widget.afisha.yandex.ru/w/events/752078?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51',
		icon: <MenuParkingIcon />,
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

const MainPageClient: React.FC = () => {
	return <Menu items={MENU_ITEMS} />
}

export default MainPageClient
