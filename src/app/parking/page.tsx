import React from 'react'
import { Metadata } from 'next'
import ParkingClient from './ParkingClient'

export const metadata: Metadata = {
	title: 'Парковка',
	description:
		'Воспользуйтесь удобной парковкой на территории стадиона, рядом с трибунами A D C.',
	keywords: 'Парковка, стадион, ФК Акрон, трибуны',
}

const ParkingPage: React.FC = () => {
	return <ParkingClient />
}

export default ParkingPage

