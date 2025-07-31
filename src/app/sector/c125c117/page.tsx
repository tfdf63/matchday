import React from 'react'
import { Metadata } from 'next'
import C125C117Client from './C125C117Client'

export const metadata: Metadata = {
	title: 'Сектор C125-C117',
	description:
		'Секторы C125 и C117 — отличные места для просмотра матчей с хорошим обзором поля. Удобное расположение, доступные цены, классическая атмосфера футбола.',
	keywords:
		'сектор C125, сектор C117, хороший обзор, ФК Акрон, футбол, доступные места, стадион, классика',
}

const C125C117Page: React.FC = () => {
	return <C125C117Client />
}

export default C125C117Page
