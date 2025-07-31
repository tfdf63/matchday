import React from 'react'
import { Metadata } from 'next'
import A104A108Client from './A104A108Client'

export const metadata: Metadata = {
	title: 'Сектор A104-A108',
	description:
		'Секторы A104 и A108 — премиальные места на главной трибуне стадиона Акрон. Отличный обзор поля, комфортные условия, статусные места для истинных ценителей футбола.',
	keywords:
		'сектор A104, сектор A108, премиальные места, главная трибуна, ФК Акрон, футбол, статусные места, стадион',
}

const A104A108Page: React.FC = () => {
	return <A104A108Client />
}

export default A104A108Page
