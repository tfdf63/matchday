'use client'

import {
	Menu,
	MenuBagIcon,
	MenuParkingIcon,
	MenuPromoIcon,
	MenuTicketIcon,
	type MenuNavItem,
} from '@/components/Menu'
import { useHomeInfoModal } from '@/features/home/home-modal'

const MainMenu: React.FC = () => {
	const { open: openHomeInfoModal } = useHomeInfoModal()

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
			href: '/parking',
			icon: <MenuParkingIcon />,
		},
		{
			id: 'promo',
			label: 'Промокоды',
			icon: <MenuPromoIcon />,
			onClick: () => openHomeInfoModal('promo'),
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
