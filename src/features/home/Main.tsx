import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import games from '@/data/games'
import {
	pickHeroGameByMatchEnd,
	sortGamesByDateIso,
} from '@/lib/match/upcomingGamePick'

import { MainMatchCardClient } from './MainMatchCardClient'
import styles from './Main.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const HERO_TAGS: ReadonlyArray<{ label: string; href: string }> = [
	{ label: 'Ближайшие матчи', href: '#upcoming-match-panel' },
	{ label: 'Активности', href: '#match-activities' },
	{ label: 'Билетная программа', href: '#ticket-program' },
	{ label: 'Сектора', href: '#sector' },
	{ label: 'Карта болельщика', href: '#fan-card' },
	{ label: 'Мерч', href: '#merch' },
	{ label: 'Правила', href: '#rules' },
	{ label: 'FAQ', href: '#faq' },
]

export type MainProps = {
	withBottomMenu?: boolean
}

const sortedGamesMain = sortGamesByDateIso(games)

const Main: FC<MainProps> = ({ withBottomMenu = false }) => {
	const game =
		pickHeroGameByMatchEnd(sortedGamesMain) ?? sortedGamesMain[0]

	return (
		<div className={cx(styles.main, withBottomMenu && styles.withBottomMenu)}>
			<div className={styles.hero}>
				<div className={styles.heroImageWrap}>
					{/* Фон первого экрана FCA_Fans; при появлении финала из Figma заменить hero.png / hero.webp */}
					<Image
						src='/images/main/bg.png'
						alt='Болельщики ФК Акрон'
						fill
						className={styles.heroImage}
						sizes='100vw'
						priority
					/>
				</div>
				<div className={styles.heroOverlayTint} aria-hidden />
				<div className={styles.heroOverlayFade} aria-hidden />
			</div>

			<div className={styles.contentBand}>
				<div className={styles.heroCopy}>
					<div className={styles.heroTitleBlock}>
						<h1 className={styles.heroTitle}>
							<span className={styles.heroTitleLine1}>
								Мы&nbsp;&mdash; больше
							</span>
							<br />
							чем просто команда
						</h1>
						<div className={styles.heroLead}>
							{/* <1024: 4810:16486 + 4810:16485 (Group 4810:16484) */}
							<div className={styles.heroLeadNarrow}>
								<p
									className={cx(
										styles.heroLeadLine,
										styles.heroLeadFirst,
										'font-mono',
									)}
								>
									Мы объединяем амбиции города,{' '}
								</p>
								<div className={styles.heroLeadBody}>
									<p className={cx(styles.heroLeadLine, 'font-mono')}>
										страсть болельщиков и силу стальной воли.
										<br />
										Будь с «Акроном» до финального свистка.
									</p>
								</div>
							</div>
							{/* 1024+: 4810:14196; продолжение 4810:14195 / 1280 */}
							<div className={styles.heroLeadWide}>
								<p
									className={cx(
										styles.heroLeadLine,
										styles.heroLeadFirst,
										'font-mono',
									)}
								>
									Мы объединяем амбиции города, страсть{' '}
								</p>
								<div className={styles.heroLeadBody}>
									<p className={cx(styles.heroLeadLine, 'font-mono')}>
										болельщиков и силу стальной воли. Будь с «Акроном» <br />
										до финального свистка.
									</p>
								</div>
							</div>
						</div>
					</div>
					<nav className={styles.tagNav} aria-label='Разделы сайта'>
						{HERO_TAGS.map(({ label, href }) => (
							<Link
								key={label}
								href={href}
								className={cx(styles.tagLink, 'font-mono')}
							>
								{label}
							</Link>
						))}
					</nav>
				</div>
				<div className={styles.matchStack}>
					<div className={styles.matchAnchor}>
						<MainMatchCardClient games={sortedGamesMain} initialGame={game} />
					</div>
				</div>
				<p className={styles.clubWordmark} aria-hidden>
					ФК Акрон
				</p>
			</div>
		</div>
	)
}

export default Main
