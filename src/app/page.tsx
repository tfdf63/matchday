import React from 'react'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
import Slider from '@/components/Slider/Slider'

const MatchesPage = () => {
	return (
		<>
			<Main />
			<Marquee
				text='БИЛЕТЫ ЗА 10 ДНЕЙ ДО МАТЧА ВЫГОДНЕЕ × БИЛЕТЫ ЗА 10 ДНЕЙ ДО МАТЧА ВЫГОДНЕЕ × БИЛЕТЫ ЗА 10 ДНЕЙ ДО МАТЧА ВЫГОДНЕЕ × '
				duration={48}
			/>
			<Games />
			<Marquee
				text='ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ И УЧАСТВУЙ В АКТИВНОСТЯХ × ЕСТЬ УНИКАЛЬНАЯ ВОЗМОЖНОСТЬ ВЫИГРАТЬ ПРИЗЫ ОТ ПАРТНËРОВ × '
				duration={48}
			/>
			<Slider />
		</>
	)
}

export default MatchesPage
