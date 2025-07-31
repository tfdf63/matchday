import React from 'react'
import { Metadata } from 'next'
import VipPageClient from './VipPageClient'

export const metadata: Metadata = {
	title: 'VIP-ложи и Skybox',
	description:
		'VIP-ложи и Skybox на стадионе Акрон — премиум места с лучшим обзором поля. Приватность, комфорт, гастрономия. Забронируйте эксклюзивные места для просмотра футбола.',
	keywords:
		'VIP-ложи, Skybox, премиум места, ФК Акрон, стадион, футбол, приватность, комфорт, гастрономия, бронирование',
}

const VipPage: React.FC = () => {
	return <VipPageClient />
}

export default VipPage
