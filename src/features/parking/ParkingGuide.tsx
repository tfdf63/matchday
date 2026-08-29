import Image from 'next/image'
import type { FC } from 'react'

import styles from './ParkingGuide.module.scss'

const PARKING_PASS_URL =
	'https://widget.afisha.yandex.ru/w/events/752078?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'

const PARKING_STEPS = [
	{
		title: 'Купите парковочное место онлайн',
		body: 'Стоимость места для одного автомобиля — 390 ₽.',
	},
	{
		title: 'Подготовьте автомобиль',
		body: 'Уберите бутылки, канистры с жидкостями, громоздкие и запрещённые к проносу предметы.',
		accent: 'Проезд автомобилей с запрещённой тонировкой невозможен.',
	},
	{
		title: 'Приезжайте на транспортное КПП №4',
		body: 'Не позднее чем за 30 минут до начала матча получите на КПП №4 бумажный автопропуск.',
	},
	{
		title: 'Припаркуйтесь на парковке Ps',
		body: 'Разместите автопропуск в углу переднего стекла так, чтобы он был хорошо виден снаружи.',
	},
	{
		title: 'После матча выезжайте через КПП №4',
		body: 'Следуйте схеме и соблюдайте правила дорожного движения.',
	},
] as const

const PARKING_RULES = [
	'Автопропуск даёт право парковки транспортного средства только в местах, установленных организатором мероприятия.',
	'Парковка транспортного средства вне установленных организатором мест категорически запрещена.',
	'В случае нарушения правил дорожного движения, доступа или парковки производится фотофиксация. Автопропуск аннулируется и изымается при следующем посещении стадиона.',
	'АНО «ФК «Акрон» не несёт материальной ответственности за автотранспорт.',
	'При въезде водитель обязан предоставить документы, дающие право посещения матча, и транспортное средство для осмотра. Все пассажиры обязаны предъявить документы, дающие право прохода на стадион, пройти осмотр и предоставить для осмотра личные вещи.',
] as const

export type ParkingGuideProps = {
	headingLevel?: 'h1' | 'h2'
	titleId?: string
	compact?: boolean
}

function cx(...parts: Array<string | false | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export const ParkingGuide: FC<ParkingGuideProps> = ({
	headingLevel = 'h1',
	titleId,
	compact = false,
}) => {
	const Heading = headingLevel
	const mapTitleId = compact ? 'parking-modal-map-title' : 'parking-map-title'

	return (
		<article className={cx(styles.guide, compact && styles.compact)}>
			<header className={styles.header}>
				<Heading id={titleId} className={styles.title}>
					5 шагов, как оформить парковку на матч
				</Heading>
				<p className={styles.lead}>
					Купите место заранее, получите бумажный автопропуск на КПП №4 и
					оставьте автомобиль на парковке Ps.
				</p>
				<a
					className={styles.cta}
					href={PARKING_PASS_URL}
					target='_blank'
					rel='noopener noreferrer'
				>
					Купить парковочное место за 390 ₽
				</a>
			</header>

			<ol className={styles.steps}>
				{PARKING_STEPS.map(step => (
					<li key={step.title} className={styles.step}>
						<div className={styles.stepContent}>
							<h3 className={styles.stepTitle}>{step.title}</h3>
							<p className={styles.stepBody}>{step.body}</p>
							{'accent' in step ? (
								<strong className={styles.stepAccent}>{step.accent}</strong>
							) : null}
						</div>
					</li>
				))}
			</ol>

			<section className={styles.mapSection} aria-labelledby={mapTitleId}>
				<h2 id={mapTitleId} className={styles.sectionTitle}>
					Схема проезда к КПП №4 и парковке Ps
				</h2>
				<figure className={styles.figure}>
					<Image
						src='/images/parking/Parking1.webp'
						alt='Схема проезда к транспортному КПП №4 и парковке Ps'
						width={1753}
						height={1789}
						className={styles.image}
						sizes='(min-width: 1280px) 840px, (min-width: 767px) 680px, calc(100vw - 40px)'
					/>
				</figure>
			</section>

			<details className={styles.rules}>
				<summary className={styles.rulesSummary}>Правила парковки и досмотра</summary>
				<div className={styles.rulesContent}>
					{PARKING_RULES.map(rule => (
						<p key={rule} className={styles.rule}>
							{rule}
						</p>
					))}
				</div>
			</details>

			<aside className={styles.contact}>
				<p className={styles.contactTitle}>Нужна помощь?</p>
				<p className={styles.contactName}>Кузнецов Вячеслав</p>
				<p className={styles.contactRole}>Специалист по работе с болельщиками</p>
				<div className={styles.contactLinks}>
					<a
						href='https://t.me/slava_tfdf'
						target='_blank'
						rel='noopener noreferrer'
					>
						Telegram
					</a>
					<a href='tel:+79276879750'>8 927 687-97-50</a>
				</div>
			</aside>

			<a
				className={styles.cta}
				href={PARKING_PASS_URL}
				target='_blank'
				rel='noopener noreferrer'
			>
				Купить парковочное место за 390 ₽
			</a>
		</article>
	)
}
