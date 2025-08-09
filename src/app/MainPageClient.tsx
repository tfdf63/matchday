'use client'

import React from 'react'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
// import Players from '@/components/Players/Players'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
// import VIP from '@/components/VIP/VIP'
// import Skybox from '@/components/Skybox/Skybox'
// import Slider from '@/components/Slider/Slider'
// import Timer from '@/components/Timer/Timer'
// import Timer2 from '@/components/Timer2/Timer2'
import Marquee from '@/components/Marquee/Marquee'
import Requisites from '@/components/Requisites/Requisites'
import SubscriptionSlider from '@/components/SubscriptionSlider/SubscriptionSlider'
// import TicketSlider from '@/components/TicketSlider'
// import { ticketCards } from '@/data/tickets'
import FanCard from '@/components/FanCard/FanCard'

const MainPageClient: React.FC = () => {
	return (
		<>
			<Main />
			<Marquee
				text='БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ × 
        БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ ×'
				duration={50}
			/>
			<Games />
			{/* <Marquee
				text='БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА ×'
				duration={50}
			/>
			<TicketSlider cards={ticketCards} /> */}
			{/* <Marquee
        text='СИЛЬНЕЙШИЕ ИГРОКИ ГЛАВНОГО 
        ФУТБОЛЬНОГО ТУРНИРА СТРАНЫ × СИЛЬНЕЙШИЕ 
        ИГРОКИ ГЛАВНОГО ФУТБОЛЬНОГО ТУРНИРА СТРАНЫ 
        ×'
        duration={50}
      />
      <Players /> */}
			{/* <Marquee
        text='ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × 
        ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ 
        ЗАРАНЕЕ - ВЫГОДНО! × '
        duration={50}
      /> */}
			{/* <YandexTicket /> */}
			{/* <Slider /> */}
			{/* <PricingTables /> */}
			<Marquee
				text='БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × 
        БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ 
        СТИЛЬНЫМ × БУДЬ С АКРОНОМ × '
				duration={50}
			/>
			<Merch />
			<FanCard />
			{/* <Marquee
        text='SKYBOX × SKYBOX × SKYBOX × SKYBOX × 
        SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX 
        × SKYBOX × SKYBOX ×'
        duration={50}
      /> */}
			{/* <Skybox /> */}
			<Stadium />
			<Marquee
				text='КУПИТЬ БИЛЕТЫ × КУПИТЬ БИЛЕТЫ × КУПИТЬ БИЛЕТЫ × 
        КУПИТЬ БИЛЕТЫ × КУПИТЬ БИЛЕТЫ ×'
				duration={50}
			/>
			<SubscriptionSlider />
			<Requisites />
		</>
	)
}

export default MainPageClient
