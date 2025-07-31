import React from 'react'
import { Metadata } from 'next'
import MgnClient from './MgnClient'

export const metadata: Metadata = {
	title: 'Социальный сектор',
	description:
		'Социальный сектор Акрон — комфортные места для болельщиков с ограниченными возможностями. Бесплатные билеты, отдельный вход, поддержка на стадионе.',
	keywords:
		'социальный сектор, Акрон, футбол, билеты, стадион, доступная среда, инвалид, комфорт',
}

const MgnPage: React.FC = () => {
	return <MgnClient />
}

export default MgnPage
