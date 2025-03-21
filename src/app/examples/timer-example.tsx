'use client'

import React from 'react'
import Timer from '@/components/Timer'

export default function TimerExample() {
	// Устанавливаем целевую дату (например, через 10 дней от текущей даты)
	const targetDate = new Date()
	targetDate.setDate(targetDate.getDate() + 10)

	return (
		<div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
			<Timer targetDate={targetDate} />

			<div
				style={{
					marginTop: '2rem',
					padding: '1rem',
					backgroundColor: 'rgba(0,0,0,0.05)',
					borderRadius: '8px',
				}}
			>
				<h3>Как использовать компонент Timer:</h3>
				<pre
					style={{
						overflow: 'auto',
						padding: '1rem',
						backgroundColor: 'rgba(0,0,0,0.1)',
						borderRadius: '4px',
					}}
				>
					{`
// Импортируем компонент
import Timer from '@/components/Timer'

// Использование с конкретной датой
<Timer targetDate="2023-12-31T23:59:59" />

// Или с объектом Date
const futureDate = new Date()
futureDate.setDate(futureDate.getDate() + 14) // 14 дней от текущей даты
<Timer targetDate={futureDate} />
          `}
				</pre>
			</div>
		</div>
	)
}
