import React from 'react'
import { Metadata } from 'next'
import Benchi50Client from './Benchi50Client'

export const metadata: Metadata = {
	title: 'Абонемент',
	description:
		'Абонемент "Ноябрь" - специальное предложение для болельщиков ФК Акрон',
	keywords: 'Абонемент, Ноябрь, ФК Акрон, футбол, билеты, 11.11',
}

const Benchi50Page: React.FC = () => {
	return <Benchi50Client />
}

export default Benchi50Page
