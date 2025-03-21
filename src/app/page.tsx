import React from 'react'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
import Slider from '@/components/Slider/Slider'
import FanCard from '@/components/FanCard/FanCard'

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
				text='ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ ВЫИГРЫВАЙ ПРИЗЫ ОТ ПАРТНËРОВ × ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ ВЫИГРЫВАЙ ПРИЗЫ ОТ ПАРТНËРОВ ×'
				duration={48}
			/>
			<Slider />
			<FanCard />
		</>
	)
}

export default MatchesPage
