'use client'

import type { FC } from 'react'
import { useCallback, useId, useState } from 'react'

import styles from './PromoCodeCopy.module.scss'

async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch {
		try {
			const ta = document.createElement('textarea')
			ta.value = text
			ta.setAttribute('readonly', '')
			ta.style.position = 'fixed'
			ta.style.left = '-9999px'
			document.body.appendChild(ta)
			ta.select()
			const ok = document.execCommand('copy')
			document.body.removeChild(ta)
			return ok
		} catch {
			return false
		}
	}
}

export type PromoCodeCopyProps = {
	code: string
}

export const PromoCodeCopy: FC<PromoCodeCopyProps> = ({ code }) => {
	const [copied, setCopied] = useState(false)
	const statusId = useId()

	const onCopy = useCallback(async () => {
		const ok = await copyToClipboard(code)
		if (!ok) return
		setCopied(true)
		window.setTimeout(() => setCopied(false), 2000)
	}, [code])

	return (
		<span className={styles.wrap}>
			<button
				type='button'
				className={styles.btn}
				onClick={onCopy}
				aria-label={`Скопировать промокод ${code}`}
			>
				{code}
			</button>
			<span id={statusId} className={styles.status} aria-live='polite'>
				{copied ? 'Скопировано' : ''}
			</span>
		</span>
	)
}
