'use client'

import type { FC } from 'react'

import { PromoBadgeIcon } from '@/components/Button/icons/PromoBadgeIcon'

import { useHomeInfoModal } from './homeInfoModalContext'

export type PromoCodesModalTriggerProps = {
	buttonClassName: string
	iconClassName: string
}

export const PromoCodesModalTrigger: FC<PromoCodesModalTriggerProps> = ({
	buttonClassName,
	iconClassName,
}) => {
	const { open } = useHomeInfoModal()

	return (
		<button
			type='button'
			className={buttonClassName}
			onClick={() => open('promo')}
		>
			<span className={iconClassName}>
				<PromoBadgeIcon width={17} height={17} />
			</span>
			Промокоды
		</button>
	)
}
