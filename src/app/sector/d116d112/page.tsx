import React from 'react'
import { Metadata } from 'next'
import D116D112Client from './D116D112Client'

export const metadata: Metadata = {
	title: 'Сектор D116-D112',
	description:
		'Секторы D116 и D112 — комфортные места для просмотра матчей с хорошим обзором поля. Удобное расположение, доступные цены, классическая атмосфера футбола.',
	keywords:
		'сектор D116, сектор D112, комфортные места, ФК Акрон, футбол, хороший обзор, стадион, классика',
}

const D116D112Page: React.FC = () => {
	return <D116D112Client />
}

export default D116D112Page
