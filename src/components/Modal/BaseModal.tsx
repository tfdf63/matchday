'use client'

import {
	type FC,
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

import styles from './BaseModal.module.scss'

export type BaseModalProps = {
	open: boolean
	onClose: () => void
	/** Для `chrome: "default"` — заголовок в шапке. Для `fullBleed` можно не задавать. */
	title?: ReactNode
	children: ReactNode
	/** id элемента с заголовком для aria-labelledby */
	titleId?: string
	/**
	 * `fullBleed` — только оверлей и панель; контент (включая заголовок и закрытие) целиком в `children`.
	 * Задайте `aria-labelledby` на панели через `titleId` и заголовок с этим id внутри children.
	 */
	chrome?: 'default' | 'fullBleed'
}

function CloseGlyph() {
	return (
		<svg
			className={styles.closeIcon}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			aria-hidden
		>
			<path d='M6 6l12 12M18 6L6 18' />
		</svg>
	)
}

export const BaseModal: FC<BaseModalProps> = ({
	open,
	onClose,
	title,
	children,
	titleId: titleIdProp,
	chrome = 'default',
}) => {
	const autoTitleId = useId()
	const titleId = titleIdProp ?? autoTitleId
	const isFullBleed = chrome === 'fullBleed'
	const closeRef = useRef<HTMLButtonElement>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose()
			}
		},
		[onClose],
	)

	useEffect(() => {
		if (!open) return
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [open, onKeyDown])

	useEffect(() => {
		if (!open) return
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [open])

	useEffect(() => {
		if (!open) return
		const prevActive = document.activeElement as HTMLElement | null
		const t = window.setTimeout(() => {
			closeRef.current?.focus()
		}, 0)
		return () => {
			window.clearTimeout(t)
			prevActive?.focus?.()
		}
	}, [open])

	if (!mounted || !open) return null

	const node = (
		<div
			className={styles.backdrop}
			role='presentation'
			onClick={e => {
				if (e.target === e.currentTarget) onClose()
			}}
		>
			<div
				className={
					isFullBleed
						? `${styles.panel} ${styles.panelFullBleed}`
						: styles.panel
				}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				onClick={e => e.stopPropagation()}
			>
				{isFullBleed ? (
					<>
						<button
							ref={closeRef}
							type='button'
							className={styles.closeFloating}
							aria-label='Закрыть'
							onClick={onClose}
						>
							<CloseGlyph />
						</button>
						<div className={styles.bodyFullBleed}>{children}</div>
					</>
				) : (
					<>
						<div className={styles.header}>
							<h2 id={titleId} className={styles.title}>
								{title ?? ''}
							</h2>
							<button
								ref={closeRef}
								type='button'
								className={styles.close}
								aria-label='Закрыть'
								onClick={onClose}
							>
								<CloseGlyph />
							</button>
						</div>
						<div className={styles.body}>{children}</div>
					</>
				)}
			</div>
		</div>
	)

	return createPortal(node, document.body)
}
