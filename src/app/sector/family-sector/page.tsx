import React from 'react'
import { Metadata } from 'next'
import FamilySectorClient from './FamilySectorClient'

export const metadata: Metadata = {
	title: 'Семейный сектор',
	description:
		'Семейный сектор C118 на стадионе Акрон — классические места для всей семьи. Аутентичная атмосфера футбола, удобства для детей, комфорт для родителей.',
	keywords:
		'семейный сектор, C118, ФК Акрон, футбол, семья, дети, классические места, стадион',
}

const FamilySectorPage: React.FC = () => {
	return <FamilySectorClient />
}

export default FamilySectorPage
