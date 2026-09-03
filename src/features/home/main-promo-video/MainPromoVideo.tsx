'use client'

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import { BaseModal } from '@/components/Modal'

import styles from './MainPromoVideo.module.scss'

const VIDEO_SRC = '/videos/akrloko-mobile.mp4'
const VIDEO_POSTER = '/videos/akrloko-poster.jpg'
const MOBILE_MQ = '(max-width: 766px)'
const CARD_SELECTOR = '[data-main-match-card]'
const MENU_SELECTOR = 'nav[aria-label="Основное меню"]'
const CARD_GAP_PX = 12
const VIDEO_ASPECT = 9 / 16
const REVEAL_DELAY_MS = 2000

type PipBox = {
	left: number
	bottom: number
	width: number
	height: number
}

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function createPromoVideo(): HTMLVideoElement {
	const video = document.createElement('video')
	video.src = VIDEO_SRC
	video.poster = VIDEO_POSTER
	video.muted = true
	video.defaultMuted = true
	video.loop = true
	video.playsInline = true
	video.preload = 'auto'
	video.setAttribute('playsinline', '')
	video.setAttribute('webkit-playsinline', '')
	video.setAttribute('muted', '')
	video.disablePictureInPicture = true
	return video
}

function measurePipBox(pip: HTMLElement): PipBox | null {
	const card = document.querySelector(CARD_SELECTOR)
	const menu = document.querySelector(MENU_SELECTOR)
	const main = pip.offsetParent
	if (!card || !menu || !(main instanceof HTMLElement)) return null

	const mainRect = main.getBoundingClientRect()
	const cardRect = card.getBoundingClientRect()
	const menuBar = menu.firstElementChild
	const menuTop = (menuBar ?? menu).getBoundingClientRect().top
	const height = Math.floor(menuTop - cardRect.bottom - CARD_GAP_PX)
	if (height < 48) return null

	return {
		left: Math.max(0, Math.round(cardRect.left - mainRect.left)),
		bottom: Math.max(0, Math.round(mainRect.bottom - menuTop)),
		width: Math.round(height * VIDEO_ASPECT),
		height,
	}
}

export function MainPromoVideo() {
	const pipRef = useRef<HTMLDivElement>(null)
	const pipHostRef = useRef<HTMLDivElement>(null)
	const modalHostRef = useRef<HTMLDivElement>(null)
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const [isMobile, setIsMobile] = useState(false)
	const [expanded, setExpanded] = useState(false)
	const [revealed, setRevealed] = useState(false)
	const [box, setBox] = useState<PipBox | null>(null)
	const [layoutReady, setLayoutReady] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia(MOBILE_MQ)
		const sync = () => setIsMobile(mq.matches)
		sync()
		mq.addEventListener('change', sync)
		return () => mq.removeEventListener('change', sync)
	}, [])

	useEffect(() => {
		if (!isMobile) {
			setBox(null)
			setRevealed(false)
			setLayoutReady(false)
			return
		}

		const update = () => {
			const pip = pipRef.current
			if (!pip) return
			const next = measurePipBox(pip)
			setBox(next)
			if (next) setLayoutReady(true)
		}

		update()
		const card = document.querySelector(CARD_SELECTOR)
		const observer = new ResizeObserver(update)
		if (card) observer.observe(card)
		window.addEventListener('resize', update)
		window.addEventListener('orientationchange', update)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', update)
			window.removeEventListener('orientationchange', update)
		}
	}, [isMobile])

	useEffect(() => {
		if (!isMobile || !layoutReady) return

		const timeoutId = window.setTimeout(() => setRevealed(true), REVEAL_DELAY_MS)
		return () => window.clearTimeout(timeoutId)
	}, [isMobile, layoutReady])

	useEffect(() => {
		if (!isMobile) {
			videoRef.current?.pause()
			videoRef.current?.remove()
			videoRef.current = null
			setExpanded(false)
			return
		}

		const host = pipHostRef.current
		if (!host) return

		const video = createPromoVideo()
		videoRef.current = video
		host.appendChild(video)
		void video.play().catch(() => {})

		return () => {
			video.pause()
			video.remove()
			if (videoRef.current === video) videoRef.current = null
		}
	}, [isMobile])

	useLayoutEffect(() => {
		if (!expanded) return
		const video = videoRef.current
		const host = modalHostRef.current
		if (!video || !host) return

		if (video.parentElement !== host) {
			host.appendChild(video)
		}
		video.muted = false
		video.defaultMuted = false
		video.removeAttribute('muted')
		void video.play().catch(() => {})
	}, [expanded])

	const open = useCallback(() => {
		const video = videoRef.current
		if (video) {
			video.muted = false
			video.defaultMuted = false
			video.removeAttribute('muted')
			void video.play().catch(() => {})
		}
		setExpanded(true)
	}, [])

	const close = useCallback(() => {
		const video = videoRef.current
		const pip = pipHostRef.current
		if (video && pip && video.parentElement !== pip) {
			video.muted = true
			video.defaultMuted = true
			video.setAttribute('muted', '')
			pip.appendChild(video)
			void video.play().catch(() => {})
		}
		setExpanded(false)
	}, [])

	if (!isMobile) return null

	return (
		<>
			<div
				ref={pipRef}
				className={cx(
					styles.pip,
					revealed && styles.pipIn,
					expanded && styles.pipHidden,
				)}
				style={
					box
						? {
								left: box.left,
								bottom: box.bottom,
								width: box.width,
								height: box.height,
							}
						: undefined
				}
			>
				<div ref={pipHostRef} className={styles.pipHost} />
				<button
					type='button'
					className={styles.pipHit}
					aria-label='Смотреть видео'
					onClick={open}
				/>
			</div>

			<BaseModal
				open={expanded}
				onClose={close}
				titleId='main-promo-video-title'
				chrome='fullBleed'
				panelClassName={styles.modalPanel}
				bodyClassName={styles.modalBody}
			>
				<h2 id='main-promo-video-title' className={styles.srOnly}>
					Видео
				</h2>
				<div ref={modalHostRef} className={styles.modalHost} />
			</BaseModal>
		</>
	)
}
