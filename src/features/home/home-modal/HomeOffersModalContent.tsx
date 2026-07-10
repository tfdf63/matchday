'use client'

import Link from 'next/link'
import type { FC } from 'react'

import type { HomeInfoModalVariant } from '@/data/homeInfoModals'
import {
	FAN_CARD_HASH,
	GOSUSLUGI_URL,
	HOME_OFFERS_SOCIAL_TELEGRAM_HREF,
} from '@/data/homeInfoModals'

import { PromoCodeCopy } from './PromoCodeCopy'
import styles from './HomeOffersModalContent.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const PromoPanel: FC = () => (
	<div className={styles.tabPanel}>
		<p className={styles.subTitle}>Промокоды для друзей:</p>
		<p className={cx(styles.mono, styles.muted)}>
			От&nbsp;2&nbsp;билетов скидка 5%&nbsp;— <PromoCodeCopy code="AKRON2" />
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			От&nbsp;3&nbsp;билетов скидка 10%&nbsp;— <PromoCodeCopy code="AKRON3" />
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			От&nbsp;4&nbsp;билетов скидка 15%&nbsp;— <PromoCodeCopy code="AKRON4" />
		</p>
		<p className={styles.subTitle}>
			Более выгодные скидки в&nbsp;абонементах на&nbsp;сезон или первый круг
		</p>
	</div>
)

const TariffsPanel: FC = () => (
	<div className={styles.tabPanel}>
		<p className={cx(styles.mono, styles.muted)}>
			Детский тариф (для&nbsp;детей до&nbsp;14 лет) на&nbsp;матчах МИР&nbsp;РПЛ предоставляет
			возможность взять билеты <span className={styles.strong}>со&nbsp;скидкой 50%</span>.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			Проверка возраста осуществляется автоматически на&nbsp;входе через{' '}
			<a
				className={styles.inlineLink}
				href={GOSUSLUGI_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				Госуслуги
			</a>
			.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			При&nbsp;выборе места укажите тариф: <span className={styles.strong}>«взрослый»</span>
			{' '}
			или&nbsp;<span className={styles.strong}>«детский»</span>, затем введите соответствующий
			номер{' '}
			<Link className={styles.inlineLink} href={FAN_CARD_HASH}>
				«Карта болельщика»
			</Link>
			.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			Напоминаем, что&nbsp;билет на&nbsp;ребёнка до&nbsp;14 лет отображается в&nbsp;приложении{' '}
			<span className={styles.strong}>«Госуслуги»</span> родителя, который оформил ребёнка.
		</p>
	</div>
)

const SocialPanel: FC = () => (
	<div className={styles.tabPanel}>
		<p className={cx(styles.mono, styles.muted)}>
			Пенсионеры, участники ВОВ и&nbsp;боевых действий могут получить{' '}
			<span className={styles.strong}>бесплатные билеты в&nbsp;сектор С124</span> в&nbsp;кассе
			в&nbsp;день матча при&nbsp;подтверждении статуса.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			Многодетные семьи могут обратиться в&nbsp;клуб для&nbsp;получения скидки на&nbsp;покупку
			билетов <span className={styles.strong}>в&nbsp;семейный сектор С4</span>.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			Для&nbsp;подачи заявки,{' '}
			<span className={styles.strong}>не&nbsp;позднее чем за&nbsp;3&nbsp;дня до&nbsp;матча</span>
			, отправьте сообщение в&nbsp;телеграм{' '}
			<a
				className={styles.inlineLink}
				href={HOME_OFFERS_SOCIAL_TELEGRAM_HREF}
				target="_blank"
				rel="noopener noreferrer"
			>
				{HOME_OFFERS_SOCIAL_TELEGRAM_HREF.replace(/^https:\/\//, '')}
			</a>{' '}
			с&nbsp;текстом:
		</p>
		<p className={cx(styles.mono, styles.quote)}>
			«Заявка на&nbsp;билеты для&nbsp;многодетных семей на&nbsp;матч [указать матч]».
		</p>
	</div>
)

export type HomeOffersModalContentProps = {
	section: HomeInfoModalVariant
}

export const HomeOffersModalContent: FC<HomeOffersModalContentProps> = ({
	section,
}) => {
	switch (section) {
		case 'promo':
			return <PromoPanel />
		case 'tariffs':
			return <TariffsPanel />
		case 'socialTickets':
			return <SocialPanel />
		default:
			return null
	}
}
