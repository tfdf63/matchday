'use client'

import React from 'react'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
// import StarPlayer from '@/components/StarPlayer'
// import Players from '@/components/Players/Players'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
// import Slider from '@/components/Slider/Slider'
// import Timer from '@/components/Timer/Timer'
// import Timer2 from '@/components/Timer2/Timer2'
import Marquee from '@/components/Marquee/Marquee'
import Requisites from '@/components/Requisites/Requisites'
import SubscriptionSlider from '@/components/SubscriptionSlider/SubscriptionSlider'
import TicketSlider from '@/components/TicketSlider'
import { ticketCards } from '@/data/tickets'
import FanCard from '@/components/FanCard/FanCard'
// import Menu from '@/components/Menu'

const MainPageClient: React.FC = () => {
	return (
		<>
			{/* <Menu /> */}
			<Main />
			<Marquee
				text='БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ × 
        БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ ×'
				duration={50}
			/>
			<Games />
			<div id='ticket-program'>
				<Marquee
					text='БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА × БИЛЕТНАЯ ПРОГРАММА ×'
					duration={50}
				/>
			</div>
			<TicketSlider cards={ticketCards} />
			{/* <Marquee
				text='Легенда российского футбола × Лучший бомбардир в истории сборной ×'
				duration={50}
			/>
			<StarPlayer /> */}
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
