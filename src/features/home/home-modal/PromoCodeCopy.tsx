'use client'

import type { FC } from 'react'
import { useCallback, useId, useState } from 'react'

import styles from './PromoCodeCopy.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

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

function CopyGlyph() {
	return (
		<svg
			className={styles.copyIcon}
			viewBox='0 0 16 16'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.2'
			aria-hidden
		>
			<rect x='5' y='4' width='8' height='9' rx='1.2' />
			<path d='M3 10V3.8C3 3.36 3.36 3 3.8 3H10' />
		</svg>
	)
}

export type PromoCodeCopyProps = {
	code: string
	className?: string
}

export const PromoCodeCopy: FC<PromoCodeCopyProps> = ({ code, className }) => {
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
				className={cx(styles.btn, copied && styles.btnCopied, className)}
				onClick={onCopy}
				aria-label={`Скопировать промокод ${code}`}
			>
				<span>{code}</span>
				<CopyGlyph />
			</button>
			<span id={statusId} className={styles.status} aria-live='polite'>
				{copied ? 'Скопировано' : ''}
			</span>
		</span>
	)
}
