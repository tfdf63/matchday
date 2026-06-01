'use client'

import { Bitrix24InlineForm } from '@/components/Bitrix24InlineForm'
import matchCardStyles from '@/components/MatchCard/MatchCard.module.scss'

import {
	MAIN_HERO_BITRIX_FORM_ID,
	MAIN_HERO_BITRIX_LOADER_URL,
	MAIN_HERO_SUBSCRIPTION_TITLE,
} from './mainHeroConfig'
import styles from './MainSubscriptionCard.module.scss'

export function MainSubscriptionCard() {
	return (
		<article className={matchCardStyles.root}>
			<div className={matchCardStyles.inner}>
				<h2 className={`${matchCardStyles.title} ${styles.title}`}>
					{MAIN_HERO_SUBSCRIPTION_TITLE}
				</h2>
				<Bitrix24InlineForm
					formId={MAIN_HERO_BITRIX_FORM_ID}
					loaderUrl={MAIN_HERO_BITRIX_LOADER_URL}
					className={styles.formSlot}
				/>
			</div>
		</article>
	)
}
