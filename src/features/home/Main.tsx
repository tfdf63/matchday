import Image from 'next/image'
import type { FC } from 'react'

import { MatchCard } from '@/components/MatchCard'
import games from '@/data/games'

import styles from './Main.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MainProps = {
	withBottomMenu?: boolean
}

const Main: FC<MainProps> = ({ withBottomMenu = false }) => {
	const game = games[0]

	return (
		<div className={cx(styles.main, withBottomMenu && styles.withBottomMenu)}>
			<div className={styles.hero}>
				<div className={styles.heroImageWrap}>
					{/* Фон первого экрана FCA_Fans; при появлении финала из Figma заменить hero.png / hero.webp */}
					<Image
						src='/images/main/bg.png'
						alt=''
						fill
						className={styles.heroImage}
						sizes='100vw'
						priority
					/>
				</div>
				<div className={styles.heroOverlayTint} aria-hidden />
				<div className={styles.heroOverlayFade} aria-hidden />
			</div>

			<div className={styles.matchAnchor}>
				<MatchCard game={game} />
			</div>

			<p className={styles.clubWordmark} aria-hidden>
				ФК Акрон
			</p>
		</div>
	)
}

export default Main
