'use client'

import React from 'react'
import styles from './FansPageClient.module.scss'

const FansPageClient: React.FC = () => {
	return (
		<div className={styles.fansPage}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1 className={styles.title}>Активные болельщики</h1>
				<div className={styles.content}>
					<p className={styles.description}>
						Добро пожаловать в сообщество болельщиков ФК&nbsp;Акрон! Здесь вы
						найдете всю информацию о&nbsp;фанатских группах, мероприятиях
						и&nbsp;способах поддержки нашей команды.
					</p>
					<div className={styles.sections}>
						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Фанатские группы</h2>
							<p className={styles.sectionText}>
								Присоединяйтесь к&nbsp;официальным фанатским группам
								ФК&nbsp;Акрон и&nbsp;станьте частью большой семьи болельщиков.
							</p>
						</section>
						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Мероприятия</h2>
							<p className={styles.sectionText}>
								Участвуйте в&nbsp;встречах с&nbsp;игроками, автограф-сессиях
								и&nbsp;других мероприятиях, организуемых клубом
								для&nbsp;болельщиков.
							</p>
						</section>
						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Поддержка команды</h2>
							<p className={styles.sectionText}>
								Узнайте, как можно поддержать ФК&nbsp;Акрон и&nbsp;внести свой
								вклад в&nbsp;развитие футбола в&nbsp;Самаре.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FansPageClient
