import React from 'react'
import Main from '@/components/Main/Main'
// import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
import Slider from '@/components/Slider/Slider'
import FanCard from '@/components/FanCard/FanCard'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
import Skybox from '@/components/Skybox/Skybox'
// import VIP from '@/components/VIP/VIP'
import YandexTicket from '@/components/YandexTicket/YandexTicket'
const MatchesPage = () => {
	return (
		<>
			<Main />
			<Marquee
				text='ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × '
				duration={50}
			/>
			{/* <Games /> */}
			{/* <Marquee
				text='ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ ВЫИГРЫВАЙ ПРИЗЫ ОТ ПАРТНËРОВ × ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ ВЫИГРЫВАЙ ПРИЗЫ ОТ ПАРТНËРОВ ×'
				duration={48}
			/> */}
			<Slider />
			<FanCard />
			<Marquee
				text='БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × '
				duration={50}
			/>
			<Merch />
			<Marquee
				text='SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX ×'
				duration={50}
			/>
			<Skybox />
			<Stadium />
			{/* <VIP /> */}
			<YandexTicket />
		</>
	)
}

export default MatchesPage
