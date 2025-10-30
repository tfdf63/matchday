import React from 'react'
import RulesPageClient from './RulesPageClient'

export const metadata = {
	title: 'Правила игры | ФК Акрон',
	description:
		'Основные правила футбола. Не были на футболе? Узнайте основные правила игры.',
}

const RulesPage: React.FC = () => {
	return <RulesPageClient />
}

export default RulesPage

