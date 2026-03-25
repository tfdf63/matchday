'use client'

import React, { useState, useEffect } from 'react'
import styles from './Main.module.scss'
import CardMatch from '@/components/CardMatch/CardMatch'
import Timer2 from '@/components/Timer2/Timer2'
import games from '@/data/games'
import PromoCodesModal from '@/components/PromoCodesModal/PromoCodesModal'
import TicketSaleNotifyModal from '@/components/TicketSaleNotifyModal/TicketSaleNotifyModal'
import ActionButton from '@/components/ActionButton/ActionButton'
import NavCard from '@/components/NavCard'
import { Ticket, Navigation } from 'lucide-react'
import {
	MAIN_DESKTOP,
	MAIN_MOBILE,
	getMainBackgroundPriorityVideoUrl,
	initDualBackgroundVideos,
	isMobileDevice,
	precacheMainBackgroundVideos,
	preloadVideo,
	registerVideoServiceWorker,
	supportsWebP,
} from '@/lib/video'

interface MainProps {
	matchIndex?: number
}

const Main: React.FC<MainProps> = ({ matchIndex = 0 }) => {
	const selectedIndex =
		matchIndex >= 0 && matchIndex < games.length ? matchIndex : 0
	const selectedGame = games[selectedIndex]

	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [supportsWebPFormat, setSupportsWebPFormat] = useState<boolean>(true)
	const [isPromoOpen, setPromoOpen] = useState(false)
	const [isTicketNotifyOpen, setTicketNotifyOpen] = useState(false)

	useEffect(() => {
		const mobile = isMobileDevice()
		setIsMobile(mobile)

		const webpSupported = supportsWebP()
		setSupportsWebPFormat(webpSupported)

		const priorityVideoUrl = getMainBackgroundPriorityVideoUrl(mobile, webpSupported)

		const loadPriorityVideo = async () => {
			await registerVideoServiceWorker()
			await preloadVideo(priorityVideoUrl)
			precacheMainBackgroundVideos()
		}

		loadPriorityVideo()

		const handleResize = () => {
			const newIsMobile = isMobileDevice()
			if (newIsMobile !== isMobile) {
				setIsMobile(newIsMobile)
			}
		}

		window.addEventListener('resize', handleResize)

		initDualBackgroundVideos({
			isMobile: mobile,
			loadedClassName: styles.loaded,
		})

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [isMobile])

	return (
		<div className={styles.main}>
			<video
				muted
				loop
				playsInline
				poster={MAIN_DESKTOP.poster}
				preload='none'
				className={styles.backgroundVideo}
				id='desktop-video'
			>
				{supportsWebPFormat && (
					<source src={MAIN_DESKTOP.webm} type='video/webm' />
				)}
				<source src={MAIN_DESKTOP.mp4} type='video/mp4' />
			</video>
			<video
				loop
				muted
				playsInline
				poster={MAIN_MOBILE.poster}
				preload='auto'
				className={styles.backgroundVideoMobile}
				id='mobile-video'
			>
				{supportsWebPFormat && (
					<source src={MAIN_MOBILE.webm} type='video/webm' />
				)}
				<source src={MAIN_MOBILE.mp4} type='video/mp4' />
			</video>
			<div className={styles.content}>
				<div className={styles.featuredMatch}>
					<CardMatch
						homeTeam={selectedGame.homeTeam}
						awayTeam={selectedGame.awayTeam}
						date={selectedGame.date}
						time={selectedGame.time}
						timeLocal={selectedGame.timeLocal}
						stadium={selectedGame.stadium}
						ticketLink={selectedGame.ticketLink}
						ticketLinkVip={selectedGame.ticketLinkVip}
						ticketLinkSkybox={selectedGame.ticketLinkSkybox}
						fanIdStatus={selectedGame.fanIdStatus}
						leagueInfo={selectedGame.leagueInfo}
						promoType={selectedGame.promoType}
					/>
					<TicketSaleNotifyModal
						isOpen={isTicketNotifyOpen}
						onClose={() => setTicketNotifyOpen(false)}
					/>
					{selectedGame.promoType && (
						<ActionButton
							href='#'
							title='Промокоды для друзей'
							actionType='modal'
							onModalOpen={() => setPromoOpen(true)}
							className={styles.promoButton}
						/>
					)}
					{selectedGame.priceIncreaseDates && (
						<div className={styles.timerWrapper}>
							<Timer2 priceIncreaseDates={selectedGame.priceIncreaseDates} />
						</div>
					)}
					<div className={styles.navCardsContainer}>
						<NavCard title='Тарифы промокоды' href='/bonuses' icon={Ticket} />
						<NavCard title='Как добраться?' href='/road' icon={Navigation} />
					</div>
					<PromoCodesModal
						isOpen={isPromoOpen}
						onClose={() => setPromoOpen(false)}
						promoType={selectedGame.promoType}
					/>
				</div>
			</div>
		</div>
	)
}
export default Main
