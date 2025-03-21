'use client'

import React from 'react'
import Merch from '@/components/Merch'

export default function MerchExample() {
	// Пример массива с товарами (если нужно переопределить)
	const merchItems = [
		{ id: 1, image: '/images/merch/merch-1.jpg' },
		{ id: 2, image: '/images/merch/merch-2.jpg' },
		{ id: 3, image: '/images/merch/merch-3.jpg' },
		{ id: 4, image: '/images/merch/merch-4.jpg' },
		{ id: 5, image: '/images/merch/merch-5.jpg' },
		{ id: 6, image: '/images/merch/merch-6.jpg' },
		{ id: 7, image: '/images/merch/merch-7.jpg' },
		{ id: 8, image: '/images/merch/merch-8.jpg' },
		{ id: 9, image: '/images/merch/merch-9.jpg' },
		{ id: 10, image: '/images/merch/merch-10.jpg' },
		{ id: 11, image: '/images/merch/merch-11.jpg' },
		{ id: 12, image: '/images/merch/merch-12.jpg' },
		{ id: 13, image: '/images/merch/merch-13.jpg' },
		{ id: 14, image: '/images/merch/merch-14.jpg' },
		{ id: 15, image: '/images/merch/merch-15.jpg' },
	]

	return (
		<div>
			<h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Атрибутика</h1>

			{/* Использование компонента с настройками по умолчанию */}
			<Merch />

			{/* Пример кастомизации компонента */}
			{/* 
      <Merch 
        items={merchItems} 
        buttonText="Заказать" 
        buttonLink="/shop" 
      />
      */}

			<div
				style={{
					maxWidth: '800px',
					margin: '3rem auto',
					padding: '1rem',
					backgroundColor: 'rgba(0,0,0,0.05)',
					borderRadius: '8px',
				}}
			>
				<h3>Как использовать компонент Merch:</h3>
				<pre
					style={{
						overflow: 'auto',
						padding: '1rem',
						backgroundColor: 'rgba(0,0,0,0.1)',
						borderRadius: '4px',
					}}
				>
					{`
// Простой вариант использования
<Merch />

// С кастомными настройками
<Merch 
  items={[
    { id: 1, image: '/images/merch/merch-1.jpg' },
    { id: 2, image: '/images/merch/merch-2.jpg' },
    // ...другие товары
  ]} 
  buttonText="Заказать" 
  buttonLink="/shop" 
/>
          `}
				</pre>
			</div>
		</div>
	)
}
