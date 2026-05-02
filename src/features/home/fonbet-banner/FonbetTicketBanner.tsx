import Image from 'next/image'
import type { FC } from 'react'

import {
	FONBET_TICKET_BANNER_HREF,
	FONBET_TICKET_BANNER_IMAGE,
	FONBET_TICKET_BANNER_IMAGE_HEIGHT,
	FONBET_TICKET_BANNER_IMAGE_WIDTH,
} from '@/data/fonbetBanner'

import styles from './FonbetTicketBanner.module.scss'

export const FonbetTicketBanner: FC = () => {
	return (
		<section className={styles.section} aria-label="Партнёр FONBET">
			<div className={styles.inner}>
				<a
					className={styles.link}
					href={FONBET_TICKET_BANNER_HREF}
					target="_blank"
					rel="noopener noreferrer sponsored"
				>
					<Image
						className={styles.bannerImg}
						src={FONBET_TICKET_BANNER_IMAGE}
						alt="FONBET: до 15 000 ₽ по промокоду Акрон. Официальный партнёр."
						width={FONBET_TICKET_BANNER_IMAGE_WIDTH}
						height={FONBET_TICKET_BANNER_IMAGE_HEIGHT}
						sizes="(max-width: 767px) 320px, (max-width: 1023px) 703px, (max-width: 1279px) 944px, (max-width: 1599px) 1200px, (max-width: 1919px) 1520px, 1840px"
					/>
				</a>
			</div>
		</section>
	)
}
