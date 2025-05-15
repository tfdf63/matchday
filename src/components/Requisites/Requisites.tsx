import React from 'react'
import styles from './Requisites.module.scss'

interface RequisitesProps {
	className?: string
}

const Requisites: React.FC<RequisitesProps> = ({ className }) => {
	return (
		<div className={`${styles.requisitesContainer} ${className || ''}`}>
			<div className={styles.content}>
				<p className={styles.text}>
					АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ «ФУТБОЛЬНЫЙ КЛУБ «АКРОН». ИНН:
					6376025783, ОГРН: 1156313060628. АДРЕС: 445035, САМАРСКАЯ ОБЛАСТЬ, Г
					ТОЛЬЯТТИ, УЛ ИНДУСТРИАЛЬНАЯ, Д. 6, КОМ. 15. ТЕЛ.: +7 (8482) 940-700.
				</p>
			</div>
		</div>
	)
}

export default Requisites
