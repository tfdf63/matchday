import React from 'react'
import { Metadata } from 'next'
import FansClient from './FansClient'

export const metadata: Metadata = {
	title: 'Фан-сектор',
	description:
		'Фан-сектор ФК Акрон — место для самых преданных болельщиков. Атмосфера поддержки, песни, кричалки, флаги. Погружение в настоящую фан-культуру футбола.',
	keywords:
		'фан-сектор, преданные болельщики, поддержка команды, ФК Акрон, футбол, песни, кричалки, фан-культура',
}

const FansPage: React.FC = () => {
	return <FansClient />
}

export default FansPage
