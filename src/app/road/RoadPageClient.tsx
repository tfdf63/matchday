'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './RoadPageClient.module.scss'

const RoadPageClient: React.FC = () => {
	const [modalImage, setModalImage] = useState<{
		src: string
		alt: string
	} | null>(null)

	const openModal = (src: string, alt: string) => {
		setModalImage({ src, alt })
	}

	const closeModal = () => {
		setModalImage(null)
	}

	return (
		<div className={styles.roadPage}>
			<div className={styles.container}>
				<h1 className={styles.title}>
					Дорога на стадион Чемпионата&nbsp;Мира 2018
				</h1>
				<div className={styles.content}>
					<p className={styles.description}>
						Вся информация о&nbsp;транспорте и&nbsp;маршрутах до&nbsp;стадиона
						«Солидарность Самара Арена». Выбирайте удобный способ добраться
						на&nbsp;матчи команды.
					</p>

					{/* Из Тольятти */}
					<div className={styles.citySection}>
						<h2 className={styles.cityTitle}>Из Тольятти</h2>
						<div className={styles.sections}>
							<section className={styles.section}>
								<h3 className={styles.sectionTitle}>Специальные маршруты</h3>
								<p className={styles.sectionText}>
									В&nbsp;дни матчей организуются бесплатные фан-автобусы
									из&nbsp;Тольятти до&nbsp;стадиона. Информация
									о&nbsp;расписании и&nbsp;маршрутах публикуется в&nbsp;
									<a
										href='https://vk.com/fcakron_fans'
										target='_blank'
										rel='noopener noreferrer'
										className={styles.link}
									>
										сообществе болельщиков VK
									</a>
									. Необходима предварительная запись.
								</p>
							</section>
							<section className={styles.section}>
								<h3 className={styles.sectionTitle}>Автомобиль</h3>
								<p className={styles.sectionText}>
									На&nbsp;автомобиле из&nbsp;Тольятти до&nbsp;стадиона можно
									доехать по&nbsp;трассе М5. Время в&nbsp;пути составляет
									примерно 1-1.5 часа в&nbsp;зависимости от&nbsp;загруженности
									дорог.
								</p>
								<p className={`${styles.sectionText} ${styles.extraTopMargin}`}>
									<span className={styles.bold}>«Вместе на&nbsp;футбол!»</span>
									&nbsp;— предлагаем болельщикам договариваться
									о&nbsp;совместных поездках на&nbsp;личном авто на&nbsp;матчи
									ФК&nbsp;Акрон в&nbsp;Самаре, а&nbsp;быть может
									и&nbsp;не&nbsp;только в&nbsp;Самаре.{' '}
									<a
										href='https://vk.com/topic-206993703_52115486'
										target='_blank'
										rel='noopener noreferrer'
										className={styles.link}
									>
										Обсуждение в&nbsp;VK
									</a>
									.
								</p>
							</section>
							<section className={styles.section}>
								<h3 className={styles.sectionTitle}>Общественный транспорт</h3>
								<p className={styles.sectionText}>
									Добраться до&nbsp;стадиона из&nbsp;Тольятти можно
									на&nbsp;междугородних автобусах. Автобусы отправляются
									с&nbsp;центрального автовокзала и&nbsp;следуют до&nbsp;Самары.
								</p>
							</section>
						</div>
					</div>

					{/* Из Самары */}
					<div className={styles.citySection}>
						<h2 className={styles.cityTitle}>Из Самары</h2>
						<div className={styles.sections}>
							<section className={styles.section}>
								<h3 className={styles.sectionTitle}>Общественный транспорт</h3>
								<div className={styles.transportImages}>
									<div
										className={styles.transportImage}
										onClick={() =>
											openModal('/images/road/bus1.webp', 'Автобус')
										}
									>
										<Image
											src='/images/road/bus1.webp'
											alt='Автобус'
											width={300}
											height={200}
											className={styles.imageItem}
										/>
									</div>
									<div
										className={styles.transportImage}
										onClick={() =>
											openModal('/images/road/tram1.webp', 'Трамвай')
										}
									>
										<Image
											src='/images/road/tram1.webp'
											alt='Трамвай'
											width={300}
											height={200}
											className={styles.imageItem}
										/>
									</div>
								</div>
								<p className={styles.sectionText}>
									До&nbsp;стадиона можно доехать на&nbsp;автобусах и трамваях.
									Подробное расписание на&nbsp;сайте городского транспорта.
								</p>
							</section>
							<section className={styles.section}>
								<h3 className={styles.sectionTitle}>Автомобиль</h3>
								<p className={styles.sectionText}>
									Для&nbsp;автомобилистов предусмотрены парковочные места рядом
									со&nbsp;стадионом. Рекомендуем приезжать заранее, чтобы
									избежать пробок в&nbsp;час пик.
								</p>
							</section>
						</div>
					</div>
				</div>
			</div>

			{/* Модальное окно для просмотра изображений */}
			{modalImage && (
				<div className={styles.modalOverlay} onClick={closeModal}>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<button className={styles.closeButton} onClick={closeModal}>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='M18 6L6 18M6 6l12 12' />
							</svg>
						</button>
						<div className={styles.modalImageContainer}>
							<Image
								src={modalImage.src}
								alt={modalImage.alt}
								width={1200}
								height={800}
								className={styles.modalImage}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default RoadPageClient
