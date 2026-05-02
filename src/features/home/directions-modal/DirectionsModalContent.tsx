'use client'

import Image from 'next/image'
import type { FC } from 'react'

import {
	DIRECTIONS_SAMARA_TRANSPORT_IMAGES,
	DIRECTIONS_VK_FANS_URL,
	DIRECTIONS_VK_TOGETHER_TOPIC_URL,
	type DirectionsModalTabId,
} from '@/data/directionsModal'

import styles from './DirectionsModalContent.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

const TolyattiPanel: FC = () => (
	<div className={styles.tabPanel}>
		<p className={styles.subTitle}>Специальные маршруты</p>
		<p className={cx(styles.mono, styles.muted)}>
			В&nbsp;дни матчей организуются бесплатные фан-автобусы из&nbsp;Тольятти до&nbsp;стадиона.
			Информация о&nbsp;расписании и&nbsp;маршрутах публикуется в{' '}
			<a
				className={styles.inlineLink}
				href={DIRECTIONS_VK_FANS_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				сообществе болельщиков VK
			</a>
			. Необходима предварительная запись.
		</p>
		<p className={styles.subTitle}>Автомобиль</p>
		<p className={cx(styles.mono, styles.muted)}>
			На&nbsp;автомобиле из&nbsp;Тольятти до&nbsp;стадиона можно доехать по&nbsp;трассе М5. Время
			в&nbsp;пути составляет примерно 1–1,5 часа в&nbsp;зависимости от&nbsp;загруженности дорог.
		</p>
		<p className={cx(styles.mono, styles.muted)}>
			<span className={styles.accentWhite}>«Вместе на&nbsp;футбол!»</span>
			{' '}
			— предлагаем болельщикам договариваться о&nbsp;совместных поездках на&nbsp;личном авто
			на&nbsp;матчи ФК&nbsp;Акрон в&nbsp;Самаре, а&nbsp;быть может и&nbsp;не&nbsp;только в&nbsp;Самаре.{' '}
			<a
				className={styles.inlineLinkPlain}
				href={DIRECTIONS_VK_TOGETHER_TOPIC_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				Обсуждение в&nbsp;VK
			</a>
			.
		</p>
	</div>
)

const SamaraPanel: FC = () => (
	<div className={styles.tabPanel}>
		<p className={styles.subTitle}>Общественный транспорт</p>
		<p className={cx(styles.mono, styles.muted)}>
			До&nbsp;стадиона можно доехать на&nbsp;автобусах и&nbsp;трамваях. Подробное расписание
			на&nbsp;сайте городского транспорта.
		</p>
		<div className={styles.imageRow}>
			{DIRECTIONS_SAMARA_TRANSPORT_IMAGES.map(img => (
				<div key={img.src} className={styles.imageWrap}>
					<Image
						className={styles.image}
						src={img.src}
						alt={img.alt}
						width={img.width}
						height={img.height}
						sizes="152px"
					/>
				</div>
			))}
		</div>
		<p className={styles.subTitle}>Автомобиль</p>
		<p className={cx(styles.mono, styles.muted)}>
			Для&nbsp;автомобилистов предусмотрены парковочные места рядом со&nbsp;стадионом.
			Рекомендуем приезжать заранее, чтобы избежать пробок в&nbsp;час пик.
		</p>
	</div>
)

export type DirectionsModalContentProps = {
	section: DirectionsModalTabId
}

export const DirectionsModalContent: FC<DirectionsModalContentProps> = ({
	section,
}) => {
	if (section === 'tolyatti') {
		return <TolyattiPanel />
	}
	return <SamaraPanel />
}
