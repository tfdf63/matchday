import React from 'react'
import { Metadata } from 'next'
import C121Client from './C121Client'

export const metadata: Metadata = {
	title: 'Сектор C121',
	description:
		'Сектор C121 — идеальные места для наблюдения за атакующими действиями команды. Центральная трибуна, отличный обзор ворот соперника, аутентичная атмосфера футбола.',
	keywords:
		'сектор C121, центральная трибуна, атаки, ФК Акрон, футбол, классические места, стадион, ворота',
}

const C121Page: React.FC = () => {
	return <C121Client />
}

export default C121Page
