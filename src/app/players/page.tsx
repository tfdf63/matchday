import React from 'react'
import { Metadata } from 'next'
import PlayersPageClient from './PlayersPageClient'

export const metadata: Metadata = {
	title: 'Игроки ФК Акрон',
	description:
		'Игроки ФК Акрон — состав команды, статистика, достижения. Познакомьтесь с футболистами клуба, их биографиями и игровыми характеристиками.',
	keywords:
		'игроки ФК Акрон, состав команды, футболисты, статистика, биографии, ФК Акрон',
}

const PlayersPage: React.FC = () => {
	return <PlayersPageClient />
}

export default PlayersPage
