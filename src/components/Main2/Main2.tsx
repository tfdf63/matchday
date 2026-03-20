'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Main2.module.scss'
import nextMatchGames from '@/data/nextMatchMock'
import NextMatchCard from '../NextMatchCard'
import PromoCodesModal from '../PromoCodesModal/PromoCodesModal'

const NAV_TAGS = [
	{ label: 'Ближайшие матчи', href: '#games' },
	{ label: 'Активности', href: '#activities' },
	{ label: 'Билетная программа', href: '#ticket-program' },
	{ label: 'Сектора', href: '/sector/vip' },
	{ label: 'Карта болельщика', href: '/fans' },
	{ label: 'Мерч', href: '#merch' },
	{ label: 'Правила', href: '/rules' },
	{ label: 'FAQ', href: '/rules' },
]

const Main2: React.FC = () => {
	const [isPromoOpen, setPromoOpen] = useState(false)
	const game = nextMatchGames[0]

	return (
		<section className={styles.hero}>
			<div className={styles.background}>
				<Image
					src='/videos/bgmain2-poster.jpg'
					alt=''
					fill
					className={styles.bgImage}
					priority
				/>
				<div className={styles.overlay} />
			</div>

			<div className={styles.container}>
				<div className={styles.left}>
					<h1 className={styles.heading}>
						Мы&nbsp;&#8209;&nbsp;больше чем просто команда
					</h1>

					<p className={styles.description}>
						Мы объединяем амбиции города, страсть болельщиков и силу
						стальной воли. Будь с&nbsp;«Акроном» до&nbsp;финального
						свистка.
					</p>

					<nav className={styles.tags}>
						{NAV_TAGS.map(tag =>
							tag.href.startsWith('#') ? (
								<a
									key={tag.label}
									href={tag.href}
									className={styles.tag}
								>
									{tag.label}
								</a>
							) : (
								<Link
									key={tag.label}
									href={tag.href}
									className={styles.tag}
								>
									{tag.label}
								</Link>
							),
						)}
					</nav>
				</div>

				<div className={styles.right}>
					<NextMatchCard
						game={game}
						onPromoClick={() => setPromoOpen(true)}
					/>
				</div>
			</div>

			<p className={styles.decorText}>ФК Акрон</p>

			<PromoCodesModal
				isOpen={isPromoOpen}
				onClose={() => setPromoOpen(false)}
				promoType={game.promoType}
			/>
		</section>
	)
}

export default Main2
