'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { BaseModal } from '@/components/Modal'
import { busFansDataset } from '@/data/busfans'
import { getMatchEvents } from '@/lib/busfans/selectors'

import styles from './BusFansPage.module.scss'
import { MatchEventCard } from './MatchEventCard'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const benefits = [
	{
		title: 'Максимум эмоций',
		text: 'Мощная поддержка команды с первой минуты',
	},
	{
		title: 'Удобный формат',
		text: 'Поездка организована, без лишних хлопот',
	},
	{
		title: 'Матчи дома и на выезде',
		text: 'Один понятный формат для всех игр',
	},
	{
		title: 'Своя компания',
		text: 'Едешь среди болельщиков «Акрона»',
	},
	{
		title: 'Единый стиль',
		text: 'Красный или чёрный верх для атмосферы сектора',
	},
	{
		title: 'Понятно и прозрачно',
		text: 'Список пассажиров и детали поездки на сайте',
	},
] as const

export const BusFansPage: FC = () => {
	const events = getMatchEvents(busFansDataset)
	const [isBenefitsOpen, setIsBenefitsOpen] = useState(false)

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>Фан-автобусы</h1>
					<p className={cx(styles.lead, 'font-mono')}>
						Хочешь прочувствовать матч на максимум? Бери билет на
						фан-автобус и выезжай вместе с нашими в Самару и на гостевые
						игры по всей России. Это дорога, где уже начинается матч: общий
						настрой, новые знакомые и единый голос трибуны.
					</p>
					<button
						type='button'
						className={cx(styles.benefitsTrigger, 'font-mono')}
						onClick={() => setIsBenefitsOpen(true)}
					>
						Почему стоит ехать с нами?
					</button>
					<p className={cx(styles.metaLine, 'font-mono')}>
						Матчей: {events.length} · болельщиков:{' '}
						{events.reduce((sum, e) => sum + e.passengerCount, 0)}
					</p>
				</header>
				<BaseModal
					open={isBenefitsOpen}
					onClose={() => setIsBenefitsOpen(false)}
					title='Почему стоит ехать с нами?'
					titleId='busfans-benefits-title'
					bodyClassName={styles.benefitsModalBody}
				>
					<div className={styles.benefits}>
						{benefits.map(item => (
							<article key={item.title} className={styles.benefitBlock}>
								<h3 className={styles.benefitLabel}>{item.title}</h3>
								<p className={cx(styles.benefitText, 'font-mono')}>
									{item.text}
								</p>
							</article>
						))}
					</div>
				</BaseModal>

				<div className={styles.list}>
					{events.map((event) => (
						<MatchEventCard key={event.id} event={event} />
					))}
				</div>
			</div>
		</div>
	)
}
