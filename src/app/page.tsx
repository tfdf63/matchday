import React from 'react'
// import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
import Slider from '@/components/Slider/Slider'
import FanCard from '@/components/FanCard/FanCard'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
import Skybox from '@/components/Skybox/Skybox'
import Requisites from '@/components/Requisites'
// import YandexTicket from '@/components/YandexTicket/YandexTicket'

const MatchesPage = () => {
	return (
		<>
			{/* <Main /> */}
			{/* <Marquee
				text='ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × '
				duration={50}
			/> */}
			{/* <YandexTicket /> */}
			<Games />
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
			<Requisites />
		</>
	)
}

export default MatchesPage
