'use client'

import {
	Menu,
	MenuBagIcon,
	MenuBusIcon,
	MenuParkingIcon,
	MenuPromoIcon,
	type MenuNavItem,
} from '@/components/Menu'
import { useHomeInfoModal } from '@/features/home/home-modal'

const MainMenu: React.FC = () => {
	const { open: openHomeInfoModal } = useHomeInfoModal()

	const menuItems: [MenuNavItem, MenuNavItem, MenuNavItem, MenuNavItem] = [
		{
			id: 'busfans',
			label: 'Автобусы',
			href: '/busfans',
			icon: <MenuBusIcon />,
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
