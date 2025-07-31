import React from 'react'
import { Metadata } from 'next'
import C122C120Client from './C122C120Client'

export const metadata: Metadata = {
	title: 'Сектор C122-C120',
	description:
		'Секторы C122 и C120 — популярные места для семейного просмотра матчей. Удобное расположение, отличный обзор поля, комфортные условия для болельщиков всех возрастов.',
	keywords:
		'сектор C122, сектор C120, семейный просмотр, ФК Акрон, футбол, популярные места, стадион, комфорт',
}

const C122C120Page: React.FC = () => {
	return <C122C120Client />
}

export default C122C120Page
