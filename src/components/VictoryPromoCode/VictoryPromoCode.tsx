'use client'

import React, { useState } from 'react'
import styles from './VictoryPromoCode.module.scss'

const VictoryPromoCode: React.FC = () => {
	const [copied, setCopied] = useState<boolean>(false)

	const handleCopy = async (code: string) => {
		try {
			const el = document.createElement('textarea')
			el.value = code
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			try {
				await navigator.clipboard.writeText(code)
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			} catch {}
		}
	}

	return (
		<div className={styles.promoCodeSection}>
			<p className={styles.promoCodeText}>
				Поддержи наших парней{'\u00A0'}на заключительном домашнем матче
				года. Победный промокод{' '}
				<span
					className={styles.promoCode}
					onClick={() => handleCopy('AKRWIN30')}
					onTouchEnd={() => handleCopy('AKRWIN30')}
					tabIndex={0}
					role='button'
					aria-label='Скопировать промокод AKRWIN30'
				>
					AKRWIN30
					{copied && <span className={styles.copied}>✓</span>}
				</span>{' '}
				поможет{'\u00A0'}сэкономить 30%{'\u00A0'}при покупке билетов{'\u00A0'}на
				игру{'\u00A0'}с{'\u00A0'}«Пари НН».
			</p>
		</div>
	)
}

export default VictoryPromoCode

