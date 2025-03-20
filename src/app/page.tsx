import React from 'react'
import styles from './page.module.scss'
import Main from '@/components/Main/Main'
import Games from '@/components/Games/Games'
import Marquee from '@/components/Marquee/Marquee'
const MatchesPage = () => {
	return (
		<>
			<div className={styles.container}>
				<Main />
			</div>
			<Marquee
				text='БУДУЩИЕ МАТЧИ × БИЛЕТЫ ЗА 10 ДНЕЙ ДО МАТЧА ВЫГОДНЕЕ × БУДУЩИЕ МАТЧИ × '
				duration={24}
			/>
			<Games />
			<Marquee
				text='ПРИЕЗЖАЙ НА СТАДИОН ЗАРАНЕЕ И УЧАСТВУЙ В АКТИВНОСТЯХ ! ЕСТЬ УНИКАЛЬНАЯ ВОЗМОЖНОСТЬ ВЫИГРАТЬ ПРИЗЫ ОТ ПАРТНËРОВ !'
				duration={48}
			/>
		</>
	)
}

export default MatchesPage
