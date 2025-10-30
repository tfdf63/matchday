'use client'

import React, { useState } from 'react'
import styles from './BonusesPageClient.module.scss'

const BonusesPageClient: React.FC = () => {
	const [copied, setCopied] = useState<string | null>(null)

	const handleCopy = async (code: string) => {
		try {
			const el = document.createElement('textarea')
			el.value = code
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
			setCopied(code)
			setTimeout(() => setCopied(null), 1500)
		} catch {
			try {
				await navigator.clipboard.writeText(code)
				setCopied(code)
				setTimeout(() => setCopied(null), 1500)
			} catch {}
		}
	}

	return (
		<div className={styles.bonusesPage}>
			<div className={styles.background}></div>
			<div className={styles.container}>
				<h1 className={styles.title}>Тарифы и скидки</h1>
				<div className={styles.content}>
					<p className={styles.description}>
						Специальные предложения для&nbsp;болельщиков ФК&nbsp;Акрон.
						Получайте скидки, используйте промокоды и&nbsp;посещайте матчи
						с&nbsp;друзьями выгодно.
					</p>
					<div className={styles.sections}>
						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Тарифы</h2>
							<div className={styles.sectionText}>
								<p>
									Детский тариф (для&nbsp;детей до&nbsp;14 лет) на&nbsp;матчах
									МИР&nbsp;РПЛ предоставляет возможность взять билеты
									со&nbsp;скидкой 25 или 50% в&nbsp;зависимости от&nbsp;сектора.
								</p>
								<p>
									Проверка возраста осуществляется автоматически на&nbsp;входе
									через «госуслуги».
								</p>
								<p>
									При&nbsp;выборе места укажите тариф: «взрослый»
									или&nbsp;«детский», затем введите соответствующий номер «карты
									болельщика».
								</p>
								<p>
									Напоминаем, что&nbsp;билет на&nbsp;ребёнка до&nbsp;14 лет
									отображается в&nbsp;приложении «госуслуги» родителя, который
									оформил ребёнка.
								</p>
							</div>
						</section>

						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Промокоды</h2>
							<div className={styles.sectionText}>
								<p>
									Уникальный промокод на&nbsp;18&nbsp;заказов для&nbsp;матчей
									МИР&nbsp;РПЛ и&nbsp;FONBET Кубка России.
								</p>
								<p>
									Размер скидки зависит от&nbsp;количества посещенных матчей
									в&nbsp;сезоне 2024/25:
								</p>
								<ul>
									<li>от&nbsp;2 до&nbsp;5 игр&nbsp;— 15%</li>
									<li>от&nbsp;6 до&nbsp;9 встреч&nbsp;— 20%</li>
									<li>свыше 10 матчей&nbsp;— 25%</li>
								</ul>
								<p style={{ marginTop: '20px', fontWeight: '600' }}>
									Промокоды для&nbsp;друзей:
								</p>
								<p>
									При&nbsp;покупке 2&nbsp;билетов скидка 10%&nbsp;— промокод{' '}
									<span
										className={styles.promoCode}
										onClick={() => handleCopy('AKRRPL10')}
										role='button'
										tabIndex={0}
										onKeyDown={e => e.key === 'Enter' && handleCopy('AKRRPL10')}
									>
										AKRRPL10
										{copied === 'AKRRPL10' && (
											<span className={styles.copied}>✓</span>
										)}
									</span>
								</p>
								<p>
									При&nbsp;покупке 3&nbsp;билетов скидка 15%&nbsp;— промокод{' '}
									<span
										className={styles.promoCode}
										onClick={() => handleCopy('AKRRPL15')}
										role='button'
										tabIndex={0}
										onKeyDown={e => e.key === 'Enter' && handleCopy('AKRRPL15')}
									>
										AKRRPL15
										{copied === 'AKRRPL15' && (
											<span className={styles.copied}>✓</span>
										)}
									</span>
								</p>
								<p>
									При&nbsp;покупке от&nbsp;4&nbsp;билетов скидка 20%&nbsp;—
									промокод{' '}
									<span
										className={styles.promoCode}
										onClick={() => handleCopy('AKRRPL20')}
										role='button'
										tabIndex={0}
										onKeyDown={e => e.key === 'Enter' && handleCopy('AKRRPL20')}
									>
										AKRRPL20
										{copied === 'AKRRPL20' && (
											<span className={styles.copied}>✓</span>
										)}
									</span>
								</p>
							</div>
						</section>

						<section className={styles.section}>
							<h2 className={styles.sectionTitle}>Социальные билеты</h2>
							<div className={styles.sectionText}>
								<p>
									Пенсионеры, участники ВОВ и&nbsp;боевых действий могут
									получить бесплатные билеты в&nbsp;сектор С124 в&nbsp;кассе
									в&nbsp;день матча при&nbsp;подтверждении статуса.
								</p>
								<p>
									Многодетные семьи могут обратиться в&nbsp;клуб
									для&nbsp;получения скидки на&nbsp;покупку билетов
									в&nbsp;семейный сектор С4.
								</p>
								<p>
									Для&nbsp;подачи заявки отправьте сообщение в&nbsp;телеграм{' '}
									<a
										href='https://t.me/slava_tfdf'
										target='_blank'
										rel='noopener noreferrer'
									>
										t.me/slava_tfdf
									</a>{' '}
									с&nbsp;текстом: «заявка на&nbsp;билеты для&nbsp;многодетных
									семей на&nbsp;матч &#123;указать матч&#125;». Не&nbsp;позднее
									чем за&nbsp;3&nbsp;дня до&nbsp;матча.
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
