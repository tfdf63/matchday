import React from 'react'
import { Metadata } from 'next'
import Benchi50Client from './Benchi50Client'

export const metadata: Metadata = {
	title: 'Скамейка 50',
	description:
		'Абонемент "Скамейка 50" - специальное предложение для болельщиков ФК Акрон',
	keywords: 'Абонемент, Скамейка 50, ФК Акрон, футбол, билеты',
}

const Benchi50Page: React.FC = () => {
	return <Benchi50Client />
}

export default Benchi50Page

