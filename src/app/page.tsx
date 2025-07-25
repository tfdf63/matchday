import React from 'react'
import Head from 'next/head'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
// import Slider from '@/components/Slider/Slider'
import FanCard from '@/components/FanCard/FanCard'
import Merch from '@/components/Merch/Merch'
import Stadium from '@/components/Stadium/Stadium'
// import Skybox from '@/components/Skybox/Skybox'
import Requisites from '@/components/Requisites'
import SubscriptionSlider from '@/components/SubscriptionSlider/SubscriptionSlider'
// import PricingTables from '@/components/PricingTables/PricingTables'

// import YandexTicket from '@/components/YandexTicket/YandexTicket'

const MatchesPage = () => {
	return (
		<>
			<Head>
				<title>ФК Акрон - Билеты на матчи | Официальный сайт</title>
				<meta
					name='description'
					content='Купить билеты на матчи ФК Акрон в Самаре. Расписание игр, абонементы, VIP-ложи. Официальный сайт клуба с актуальными ценами и бронированием.'
				/>
				<meta
					name='keywords'
					content='ФК Акрон, билеты на футбол, матчи Акрон, стадион Самара, купить билет, абонемент, VIP, расписание игр'
				/>
			</Head>
			<Main />
			<Marquee
				text='БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ × БЛИЖАЙШИЕ МАТЧИ ×'
				duration={50}
			/>
			<Games />
			{/* <Marquee
				text='ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × ПОКУПАТЬ ЗАРАНЕЕ - ВЫГОДНО! × '
				duration={50}
			/> */}
			{/* <YandexTicket /> */}
			{/* <Slider /> */}
			{/* <PricingTables /> */}
			<Marquee
				text='БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × БУДЬ СТИЛЬНЫМ × БУДЬ С АКРОНОМ × '
				duration={50}
			/>
			<Merch />
			<FanCard />
			{/* <Marquee
				text='SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX × SKYBOX ×'
				duration={50}
			/> */}
			{/* <Skybox /> */}
			<Stadium />
			<Marquee
				text='БИЛЕТЫ × АБОНЕМЕНТЫ × БИЛЕТЫ × АБОНЕМЕНТЫ × БИЛЕТЫ ×'
				duration={50}
			/>
			<SubscriptionSlider />
			<Requisites />
		</>
	)
}

export default MatchesPage
