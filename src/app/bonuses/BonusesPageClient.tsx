'use client'

import React from 'react'
import styles from './BonusesPageClient.module.scss'

const BonusesPageClient: React.FC = () => {
	return (
		<div className={styles.bonusesPage}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1 className={styles.title}>Бонусы</h1>
				<div className={styles.content}>
					<p className={styles.description}>
						Специальные предложения и&nbsp;бонусы для&nbsp;болельщиков
						ФК&nbsp;Акрон. Получайте скидки, используйте промокоды
						и&nbsp;участвуйте в&nbsp;программах лояльности.
					</p>
					<div className={styles.sections}>
						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Тарифы</h2>
							<div className={styles.sectionText}>
								<p>
									Детский тариф (для детей до 14 лет) на матчах МИР РПЛ
									предоставляет возможность взять билеты со скидкой 25 или 50% в
									зависимости от сектора.
								</p>
								<p>
									Проверка возраста автоматически на входе через «госуслуги».
								</p>
								<p>
									Взрослый может приобретать билеты по детскому тарифу на себя,
									но они не будут назначены. Далее можно назначить fan id
									ребёнка через приложение «госуслуги» или «карта болельщика».
								</p>
							</div>
						</section>

						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Скидки и льготы</h2>
							<div className={styles.sectionText}>
								<p>
									Система скидок для&nbsp;различных категорий болельщиков.
									Студенты, пенсионеры и&nbsp;многодетные семьи получают
									специальные предложения.
								</p>
								<p>
									При покупке билетов на&nbsp;несколько матчей действуют
									дополнительные скидки и&nbsp;бонусные программы.
								</p>
							</div>
						</section>

						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Промокоды</h2>
							<div className={styles.sectionText}>
								<p>
									Регулярно обновляемые промокоды для&nbsp;получения скидок
									на&nbsp;билеты и&nbsp;дополнительных бонусов.
								</p>
								<p>
									Подписывайтесь на&nbsp;наши социальные сети, чтобы быть
									в&nbsp;курсе новых промокодов и&nbsp;специальных предложений.
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BonusesPageClient
