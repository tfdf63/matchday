'use client'

import Image from 'next/image'
import type { FC, ReactNode } from 'react'

import { BaseModal } from '@/components/Modal'

import { useParkingModal } from './parkingModalContext'
import styles from './ParkingModal.module.scss'

type ParkingStep = {
	title: ReactNode
	body?: ReactNode
}

const PARKING_STEPS: ParkingStep[] = [
	{
		title: 'Купить парковочное место',
	},
	{
		title: 'Заранее необходимо выложить из авто:',
		body: (
			<>
				бутылки, канистры с жидкостями; громоздкие предметы; запрещённые
				к&nbsp;проносу предметы согласно правилам поведения болельщиков.{' '}
				<strong>Запрещается проезд в&nbsp;тонированном авто.</strong>
			</>
		),
	},
	{
		title: (
			<>
				Приехать к стадиону и найти волонтёра, который располагается в точке на
				схеме (точка QR на автобусной остановке), чтобы{' '}
				<strong>
					обязательно получить бумажный автопропуск, не позднее, чем за 30 минут
					до начала матча.
				</strong>
			</>
		),
	},
	{
		title: 'Проехать через четвертое транспортное КПП.',
	},
	{
		title: 'Расположиться на парковке Ps и отправиться в зоны активности.',
	},
]

const PARKING_NOTES: ReactNode[] = [
	'По завершении матча выехать через четвертое транспортное КПП (согласно схеме).',
	'Автопропуск даёт право парковки транспортного средства в местах, установленных организатором мероприятия.',
	'Парковка транспортного средства вне мест, установленных организатором, категорически запрещена.',
	'Автопропуск должен быть размещён в углу переднего стекла транспортного средства и чётко видим снаружи.',
	'В случае нарушений правил дорожного движения, правил доступа и парковки транспортного средства производится фотофиксация, автопропуск аннулируется и изымается при следующем посещении стадиона.',
	'АНО "ФК "Акрон" не несёт материальной ответственности за автотранспорт.',
	'При въезде на стадион водитель обязан предоставить документы, дающие право посещения матча, и предоставить транспортное средство для осмотра. Все пассажиры обязаны предъявить документы, дающие право прохода на стадион, пройти осмотр и предоставить для осмотра личные вещи.',
	'Соблюдайте правила дорожного движения.',
	<>
		Контакт для связи в&nbsp;Telegram{' '}
		<a href='https://t.me/slava_tfdf' target='_blank' rel='noopener noreferrer'>
			t.me/slava_tfdf
		</a>{' '}
		/ <a href='tel:+79276879750'>89276879750</a> — Кузнецов Вячеслав (специалист
		по&nbsp;работе с&nbsp;болельщиками).
	</>,
]

const PARKING_PASS_URL =
	'https://widget.afisha.yandex.ru/w/events/752078?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'

export const ParkingModalView: FC = () => {
	const { isOpen, close } = useParkingModal()

	return (
		<BaseModal
			open={isOpen}
			onClose={close}
			titleId='parking-modal-title'
			chrome='fullBleed'
			panelClassName={styles.panel}
		>
			<div className={styles.shell}>
				<div className={styles.scroll}>
					<h2 id='parking-modal-title' className={styles.title}>
						5 шагов, как оформить парковку на матч
					</h2>

					<ol className={styles.steps}>
						{PARKING_STEPS.map((step, index) => (
							<li key={index} className={styles.step}>
								<p className={styles.stepText}>
									<span>{step.title}</span>
									{step.body ? <span>{step.body}</span> : null}
								</p>
							</li>
						))}
					</ol>

					<div className={styles.notes}>
						{PARKING_NOTES.map((note, index) => (
							<p key={index} className={styles.note}>
								{note}
							</p>
						))}
					</div>

					<figure className={styles.figure}>
						<Image
							src='/images/parking/Parking1.webp'
							alt='Схема парковки и транспортного КПП'
							width={1753}
							height={1789}
							className={styles.image}
							sizes='(min-width: 1920px) 920px, (min-width: 1600px) 840px, (min-width: 1280px) 760px, (min-width: 1024px) 680px, (min-width: 767px) 600px, calc(100vw - 40px)'
						/>
					</figure>

					<a
						className={styles.cta}
						href={PARKING_PASS_URL}
						target='_blank'
						rel='noopener noreferrer'
					>
						Оформить автопропуск
					</a>
				</div>
			</div>
		</BaseModal>
	)
}
