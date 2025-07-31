import React from 'react'
import { Metadata } from 'next'
import C123C119Client from './C123C119Client'

export const metadata: Metadata = {
	title: 'Сектор C123-C119',
	description:
		'Секторы C123 и C119 — места для активных болельщиков. Динамичный обзор игры, близость к действию, возможность поддержать команду на всех участках поля.',
	keywords:
		'сектор C123, сектор C119, активные болельщики, ФК Акрон, футбол, динамичные места, стадион, поддержка команды',
}

const C123C119Page: React.FC = () => {
	return <C123C119Client />
}

export default C123C119Page
