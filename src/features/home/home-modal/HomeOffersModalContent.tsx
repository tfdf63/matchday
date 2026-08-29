'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { LocationArrowIcon, PromoBadgeIcon } from '@/components/Button'
import { MenuActivitiesIcon, MenuPromoIcon, MenuTicketIcon } from '@/components/Menu'
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
		<p className={styles.subTitle}>Промокоды для друзей</p>
		<p className={cx(styles.mono, styles.muted)}>
			Чем больше билетов — тем больше выгода.
		</p>

		<div className={styles.promoGrid}>
			<article className={styles.promoMiniCard}>
				<p className={styles.miniCond}>От 2 билетов</p>
				<p className={styles.miniValue}>5%</p>
				<p className={styles.miniMeta}>Скидка</p>
				<PromoCodeCopy code='AKRON2' className={styles.codeButton} />
			</article>
			<article className={styles.promoMiniCard}>
				<p className={styles.miniCond}>От 3 билетов</p>
				<p className={styles.miniValue}>10%</p>
				<p className={styles.miniMeta}>Скидка</p>
				<PromoCodeCopy code='AKRON3' className={styles.codeButton} />
			</article>
			<article className={styles.promoMiniCard}>
				<p className={styles.miniCond}>От 4 билетов</p>
				<p className={styles.miniValue}>15%</p>
				<p className={styles.miniMeta}>Скидка</p>
				<PromoCodeCopy code='AKRON4' className={styles.codeButton} />
			</article>
		</div>

		<article className={styles.familyCard}>
			<div className={styles.familyMain}>
				<span className={styles.familyIcon} aria-hidden>
					<MenuActivitiesIcon />
				</span>
				<p className={styles.familyTitle}>
					Семейный
					<br />
					сектор C4
				</p>
			</div>
			<div className={styles.familyKpi}>
				<p className={styles.familyValue}>−25%</p>
				<p className={styles.familyMeta}>Доп. скидка</p>
			</div>
			<p className={cx(styles.mono, styles.muted, styles.familyCond)}>
				Покупайте от 2-х билетов, включая 1 детский билет.
			</p>
			<div className={styles.familyAction}>
				<span className={styles.familyCodeLabel}>Промокод</span>
				<PromoCodeCopy code='AKRKIDS' className={styles.codeButton} />
				<Link className={styles.familyMoreLink} href='/sector/c4'>
					Подробнее о секторе C4
				</Link>
			</div>
		</article>

	</div>
)

const TariffsPanel: FC = () => (
	<div className={styles.tabPanel}>
		<article className={styles.tariffCard}>
			<div className={styles.tariffTop}>
				<div className={styles.tariffTitleWrap}>
					<p className={styles.tariffTitle}>Детский тариф</p>
					<span className={styles.tariffBadge}>До 14 лет включительно</span>
				</div>
				<div className={styles.tariffKpi}>
					<p className={styles.tariffValue}>50%</p>
					<p className={styles.tariffMeta}>Скидка</p>
				</div>
			</div>

			<div className={styles.tariffRows}>
				<div className={styles.tariffRow}>
					<span className={styles.tariffRowIcon} aria-hidden>
						<MenuTicketIcon />
					</span>
					<div className={styles.rowCopy}>
						<p className={styles.rowTitle}>Как выбрать</p>
						<p className={cx(styles.mono, styles.muted)}>
							При покупке выберите тариф «детский».
						</p>
					</div>
				</div>
				<div className={styles.tariffRow}>
					<span className={styles.tariffRowIcon} aria-hidden>
						<LocationArrowIcon />
					</span>
					<div className={styles.rowCopy}>
						<p className={styles.rowTitle}>Что нужно указать</p>
						<p className={cx(styles.mono, styles.muted)}>
							Введите номер{' '}
							<Link className={styles.inlineLink} href={FAN_CARD_HASH}>
								карты болельщика
							</Link>{' '}
							ребёнка в детский билет.
						</p>
					</div>
				</div>
				<div className={styles.tariffRow}>
					<span className={styles.tariffRowIcon} aria-hidden>
						<PromoBadgeIcon />
					</span>
					<div className={styles.rowCopy}>
						<p className={styles.rowTitle}>Проверка возраста</p>
						<p className={cx(styles.mono, styles.muted)}>
							Осуществляется автоматически на входе через{' '}
							<a
								className={styles.inlineLink}
								href={GOSUSLUGI_URL}
								target='_blank'
								rel='noopener noreferrer'
							>
								Госуслуги
							</a>
							.
						</p>
					</div>
				</div>
			</div>

			<p className={styles.infoBar}>
				Билет на ребёнка до 14 лет отображается в приложении «Госуслуги» у
				родителя, который оформил ребёнка.
			</p>
		</article>
	</div>
)

const SocialPanel: FC = () => (
	<div className={styles.tabPanel}>
		<article className={styles.socialCard}>
			<span className={styles.socialIcon} aria-hidden>
				<MenuPromoIcon />
			</span>
			<div>
				<p className={styles.socialTitle}>
					Бесплатные билеты
					<br />
					в сектор C124
				</p>
				<p className={cx(styles.mono, styles.muted)}>
					Пенсионеры, участники ВОВ и боевых действий могут получить билет в
					кассе в день матча при подтверждении статуса.
				</p>
			</div>
		</article>

		<article className={styles.socialCard}>
			<span className={styles.socialIcon} aria-hidden>
				<MenuActivitiesIcon />
			</span>
			<div>
				<p className={styles.socialTitle}>
					Скидки
					<br />
					для многодетных семей
				</p>
				<p className={cx(styles.mono, styles.muted)}>
					Многодетные семьи могут получить скидку на покупку билетов в семейный
					сектор C4.
				</p>
			</div>
		</article>

		<p className={cx(styles.mono, styles.quote)}>
			Для подачи заявки не позднее чем за 3 дня до матча отправьте сообщение в
			Telegram:{' '}
			<a
				className={styles.inlineLink}
				href={HOME_OFFERS_SOCIAL_TELEGRAM_HREF}
				target='_blank'
				rel='noopener noreferrer'
			>
				{HOME_OFFERS_SOCIAL_TELEGRAM_HREF.replace(/^https:\/\//, '')}
			</a>
			: «Заявка на билеты для пенсионера/ветерана/многодетных семей на матч
			[указать матч]».
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
