import React from 'react'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
import Slider from '@/components/Slider/Slider'
import FanCard from '@/components/FanCard/FanCard'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
import Skybox from '@/components/Skybox/Skybox'
// import VIP from '@/components/VIP/VIP'

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
			<Marquee
				text='БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × '
				duration={48}
			/>
			<Merch />
			<Marquee
				text='SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX ×'
				duration={48}
			/>
			<Skybox />
			<Stadium />
			{/* <VIP /> */}
		</>
	)
}

export default MatchesPage
