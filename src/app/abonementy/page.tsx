import React from 'react'
import { Metadata } from 'next'
import AbonementyClient from './AbonementyClient'

export const metadata: Metadata = {
	title: 'Абонементы',
	description: 'Абонементы на матчи ФК Акрон',
	keywords: 'Абонементы, ФК Акрон, футбол, билеты',
}

const AbonementyPage: React.FC = () => {
	return <AbonementyClient />
}

export default AbonementyPage
