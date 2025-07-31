import React from 'react'
import { Metadata } from 'next'
import C4Client from './C4Client'

export const metadata: Metadata = {
	title: 'Сектор C4',
	description:
		'Сектор C4 — комфортные места для просмотра матчей с отличным обзором поля. Удобное расположение, доступные цены, все необходимые удобства для болельщиков.',
	keywords:
		'сектор C4, комфортные места, ФК Акрон, футбол, хороший обзор, стадион, удобства',
}

const C4Page: React.FC = () => {
	return <C4Client />
}

export default C4Page
