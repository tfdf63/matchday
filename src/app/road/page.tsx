import React from 'react'
import RoadPageClient from './RoadPageClient'

export const metadata = {
	title: 'Дорога на стадион | ФК Акрон',
	description:
		'Информация о транспорте и маршрутах до стадиона "Солидарность Самара Арена".',
}

const RoadPage: React.FC = () => {
	return <RoadPageClient />
}

export default RoadPage
