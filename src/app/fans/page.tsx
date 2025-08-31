import React from 'react'
import FansPageClient from './FansPageClient'

export const metadata = {
	title: 'Болельщики | ФК Акрон',
	description:
		'Сообщество болельщиков ФК Акрон. Информация о фанатских группах, мероприятиях и поддержке команды.',
}

const FansPage: React.FC = () => {
	return <FansPageClient />
}

export default FansPage
