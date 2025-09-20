import React from 'react'
import { Metadata } from 'next'
import SaranskClient from './SaranskClient'

export const metadata: Metadata = {
	title: 'Саранск',
	description:
		'Футбольный матч ФК Акрон против ФК Локомотив в Саранске на стадионе Мордовия Арена',
	keywords: 'Саранск, стадион, ФК Акрон, футбол, город, информация',
}

const SaranskPage: React.FC = () => {
	return <SaranskClient />
}

export default SaranskPage
