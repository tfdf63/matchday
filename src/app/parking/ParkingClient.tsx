'use client'

import React from 'react'
import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './ParkingClient.module.scss'

const ParkingClient: React.FC = () => {
	return (
		<div className={styles.parkingPage}>
			{/* Фото */}
			<div className={styles.heroImage}>
				<Image
					src='/images/optimized/stadium/Stadium32.webp'
					alt='Парковка стадиона'
					width={1200}
					height={400}
					className={styles.image}
				/>
			</div>

			{/* Заголовок */}
			<div className={styles.headerSection}>
				<h1 className={styles.title}>Парковка</h1>
				<div className={styles.headerButton}>
					<ActionButton
						href='https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@50693782?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'
						title='Оформить автопропуск'
						actionType='link'
					/>
				</div>
			</div>

			{/* Описание */}
			<div className={styles.descriptionSection}>
				<p className={styles.descriptionText}>
					<span className={styles.testMode}>ТЕСТОВЫЙ РЕЖИМ:</span>{' '}
					Воспользуйтесь удобной парковкой на
					{'\u00A0'}
					территории стадиона, рядом с{'\u00A0'}
					трибунами <span className={styles.tribunes}>A D C</span>.
				</p>
			</div>

			{/* Секция с шагами */}
			<div className={styles.stepsSection}>
				<h2 className={styles.stepsTitle}>
					4 шага, как оформить парковку на матч
				</h2>

				<div className={styles.stepsList}>
					<div className={styles.step}>
						<div className={styles.stepNumber}>1</div>
						<div className={styles.stepContent}>
							<p className={styles.stepText}>Купить парковочное место</p>
						</div>
					</div>

					<div className={styles.step}>
						<div className={styles.stepNumber}>2</div>
						<div className={styles.stepContent}>
							<p className={styles.stepText}>
								Приехать к{'\u00A0'}стадиону и{'\u00A0'}найти волонтёра, который
								располагается в{'\u00A0'}
								точке на{'\u00A0'}схеме (точка QR на{'\u00A0'}автобусной
								остановке), чтобы получить бумажный автопропуск.
							</p>
						</div>
					</div>

					<div className={styles.step}>
						<div className={styles.stepNumber}>3</div>
						<div className={styles.stepContent}>
							<p className={styles.stepText}>
								Проехать через четвертое транспортное КПП (заранее необходимо
								выложить из{'\u00A0'}авто: бутылки, канистры с жидкостями;
								громоздкие предметы; запрещённые к проносу предметы согласно
								правилам поведения болельщиков)
							</p>
						</div>
					</div>

					<div className={styles.step}>
						<div className={styles.stepNumber}>4</div>
						<div className={styles.stepContent}>
							<p className={styles.stepText}>
								Расположиться на{'\u00A0'}парковке{' '}
								<span className={styles.highlight}>Ps</span> и{'\u00A0'}
								отправиться в{'\u00A0'}зоны активности.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.finishNote}>
					<p className={styles.finishText}>
						По{'\u00A0'}завершению матча выехать через четвертое транспортное
						КПП (согласно схеме).
					</p>
				</div>
			</div>

			{/* Схема проезда на парковку Ps */}
			<div className={styles.schemaImage}>
				<Image
					// src='/images/optimized/stadium/schema-1.webp'
					src='/images/optimized/stadium/Parking1.webp'
					alt='Схема проезда на парковку Ps'
					width={1080}
					height={1080}
					className={styles.schemaImg}
				/>
			</div>

			{/* Секция с правилами */}
			<div className={styles.rulesSection}>
				<p className={styles.rulesText}>
					Автопропуск дает право парковки транспортного средства в{'\u00A0'}
					местах, установленных организатором мероприятия.
				</p>

				<p className={styles.rulesText}>
					Парковка транспортного средства вне мест, установленных организатором,
					категорически запрещена.
				</p>

				<p className={styles.rulesText}>
					Автопропуск должен быть размещен в{'\u00A0'}углу переднего стекла
					транспортного средства и{'\u00A0'}четко видим снаружи.
				</p>

				<p className={styles.rulesText}>
					В{'\u00A0'}случае нарушений правил дорожного движения, правил доступа
					и{'\u00A0'}
					парковки транспортного средства производится фотофиксация, автопропуск
					аннулируется и{'\u00A0'}изымается при следующем посещении стадиона.
				</p>

				<p className={styles.rulesText}>
					АНО &quot;ФК &quot;Акрон&quot; не{'\u00A0'}несет материальной
					ответственности за{'\u00A0'}автотранспорт.
				</p>

				<p className={styles.rulesText}>
					При въезде на{'\u00A0'}стадион водитель обязан предоставить документы
					дающие право посещения матча и{'\u00A0'}предоставить транспортное
					средство для{'\u00A0'}
					осмотра. Все пассажиры обязаны предъявить документы дающие право
					прохода на{'\u00A0'}стадион, пройти осмотр и{'\u00A0'}предоставить для
					{'\u00A0'}осмотра личные вещи.
				</p>

				<p className={styles.rulesText}>
					Соблюдайте правила дорожного движения.
				</p>
			</div>

			{/* Кнопка внизу */}
			<div className={styles.bottomButton}>
				<ActionButton
					href='https://widget.afisha.yandex.ru/w/sessions/ticketsteam-2130@50693782?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'
					title='Оформить автопропуск'
					actionType='link'
				/>
			</div>
		</div>
	)
}

export default ParkingClient
