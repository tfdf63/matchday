import type { Game } from '@/data/games'
import { getMatchTicketBannerText, parseMatchDateRu } from '@/lib/match-dates'

import styles from './MatchDateBanner.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MatchDateBannerProps = {
	game: Game
	className?: string
	now?: Date
}

export function getMatchDateBannerText(
	game: Game,
	now: Date = new Date(),
): string | null {
	const date = game.date?.trim()
	if (!date) return null

	const matchDate = parseMatchDateRu(date, now.getFullYear())
	if (!matchDate) return null

	return getMatchTicketBannerText(matchDate, now)?.text ?? null
}

export function MatchDateBanner({
	game,
	className,
	now = new Date(),
}: MatchDateBannerProps) {
	const text = getMatchDateBannerText(game, now)
	if (!text) return null

	return (
		<div className={cx(styles.root, className)} role="note">
			<span className={cx(styles.label, 'font-mono')}>{text}</span>
		</div>
	)
}
