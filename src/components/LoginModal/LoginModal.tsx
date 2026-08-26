'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import styles from './LoginModal.module.scss'
import { getApiUrl, isTestEnv } from '@/lib/apiUrl'

const API_URL = getApiUrl('/api')
const emailField = isTestEnv() ? 'login' : 'email'

type Step = 'email' | 'code' | 'error'

export type LoginModalProps = {
	open: boolean
	onClose: () => void
	onSuccess?: () => void
}

function CloseIcon() {
	return (
		<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#close-clip)' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
				<path d='m10.277 10.277 19.446 19.446M17.5 22.374 29.874 10M10 29.874 22.374 17.5' />
			</g>
			<defs>
				<clipPath id='close-clip'>
					<path fill='currentColor' d='M0 0h40v40H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}

function BackIcon() {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#back-clip)'>
				<path d='M12.5 16.25 6.25 10l6.25-6.25' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
			</g>
			<defs>
				<clipPath id='back-clip'>
					<path fill='currentColor' d='M0 0h20v20H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
	const [step, setStep] = useState<Step>('email')
	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorCode, setErrorCode] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [secondsToRepeat, setSecondsToRepeat] = useState(0)
	const [emailFocused, setEmailFocused] = useState(false)
	const [codeFocused, setCodeFocused] = useState(false)
	const [emailTouched, setEmailTouched] = useState(false)
	const [codeTouched, setCodeTouched] = useState(false)
	const [mounted, setMounted] = useState(false)
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [])

	const startTimer = useCallback(() => {
		setSecondsToRepeat(60)
		if (timerRef.current) clearInterval(timerRef.current)
		timerRef.current = setInterval(() => {
			setSecondsToRepeat(prev => {
				if (prev <= 1) {
					if (timerRef.current) clearInterval(timerRef.current)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}, [])

	const handleSendCode = useCallback(async () => {
		setLoading(true)
		setErrorCode(false)
		try {
			const res = await fetch(`${API_URL}/auth/send/password`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ [emailField]: email }),
			})
			if (!res.ok) {
				setStep('error')
				return
			}
			setStep('code')
			startTimer()
		} catch {
			setStep('error')
		} finally {
			setLoading(false)
		}
	}, [email, startTimer])

	const handleCheckCode = useCallback(async () => {
		setLoading(true)
		setErrorCode(false)
		try {
			const res = await fetch(`${API_URL}/auth/check/password`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ [emailField]: email, code: code.split('-').join('') }),
			})
			if (!res.ok) {
				setStep('error')
				return
			}
			const json = await res.json()
			if (json.status === 'success') {
				onSuccess?.()
				onClose()
			} else {
				setErrorCode(true)
				setErrorMessage('Введен неверный код подтверждения')
			}
		} catch {
			setStep('error')
		} finally {
			setLoading(false)
		}
	}, [email, code, onSuccess, onClose])

	const handleRepeatCode = useCallback(() => {
		if (secondsToRepeat > 0) return
		handleSendCode()
	}, [secondsToRepeat, handleSendCode])

	const handleBack = useCallback(() => {
		setStep('email')
		setCode('')
		setErrorCode(false)
		setCodeTouched(false)
	}, [])

	const handleClose = useCallback(() => {
		setStep('email')
		setEmail('')
		setCode('')
		setErrorCode(false)
		setErrorMessage('')
		setEmailTouched(false)
		setCodeTouched(false)
		onClose()
	}, [onClose])

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
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				handleClose()
			}
		}
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [open, handleClose])

	const formatTimer = (s: number) => {
		const m = Math.floor(s / 60)
		const sec = s % 60
		return `${m}:${sec.toString().padStart(2, '0')}`
	}

	const emailEmpty = !email
	const emailInvalid = emailTouched && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
	const codeEmpty = !code
	const codeInvalid = codeTouched && code.length < 6

	if (!mounted || !open) return null

	return createPortal(
		<div className={styles.overlay} role='presentation' onClick={e => { if (e.target === e.currentTarget) handleClose() }}>
			<div className={styles.formBlock} role='dialog' aria-modal='true' onClick={e => e.stopPropagation()}>
				{step === 'email' && (
					<>
						<header className={styles.header}>
							<img src='/icons/logo.svg' alt='Логотип ФК Акрон' className={styles.logo} />
							<button type='button' className={styles.closeButton} onClick={handleClose}>
								<CloseIcon />
							</button>
						</header>
						<h3 className={styles.h3}>Вход в личный кабинет</h3>
						<form
							className={styles.form}
							onSubmit={e => {
								e.preventDefault()
								setEmailTouched(true)
								if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) handleSendCode()
							}}
						>
							<label
								className={[
									styles.field,
									emailEmpty && !emailFocused && styles.empty,
									emailFocused && styles.focused,
									emailInvalid && styles.error,
									styles.required,
								].filter(Boolean).join(' ')}
							>
								<span className={styles.label}>Email</span>
								<input
									type='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
									onFocus={() => setEmailFocused(true)}
									onBlur={() => { setEmailFocused(false); setEmailTouched(true) }}
									autoComplete='none'
									tabIndex={0}
								/>
							</label>
							{emailInvalid && <p className={styles.errorMessage}>Поле обязательно для заполнения</p>}

							<button type='submit' className={styles.button} disabled={loading || !email.trim()}>
								{loading ? 'Загрузка...' : 'Продолжить'}
							</button>

							<div className={styles.textSmall + ' ' + styles.textAlignCenter}>
								Нажимая на кнопку «Продолжить» вы соглашаетесь с{' '}
								<a className={styles.link} target='_blank' href='https://shop.fcakron.ru/privacy-policy/' rel='noopener noreferrer'>
									пользовательским соглашением
								</a>
								, и даете{' '}
								<a className={styles.link} target='_blank' href='https://shop.fcakron.ru/privacy-policy/' rel='noopener noreferrer'>
									согласие на обработку персональных данных
								</a>
							</div>
						</form>
					</>
				)}

				{step === 'code' && (
					<>
						<header className={styles.header + ' ' + styles.headerAlignCenter}>
							<button type='button' className={styles.backButton + ' ' + styles.textSmall} onClick={handleBack}>
								<span className={styles.backIcon}>
									<BackIcon />
								</span>
								Назад
							</button>
							<img src='/icons/logo.svg' alt='Логотип ФК Акрон' className={styles.logo} />
						</header>
						<h3 className={styles.h3}>Введите код из e-mail</h3>
						<p className={styles.text}>
							Код подтверждения отправлен на почту <span className={styles.nobr}>{email}</span>
						</p>
						<form
							className={styles.form}
							onSubmit={e => {
								e.preventDefault()
								setCodeTouched(true)
								if (code.trim() && code.length >= 6) handleCheckCode()
							}}
						>
							<label
								className={[
									styles.field,
									codeEmpty && !codeFocused && styles.empty,
									codeFocused && styles.focused,
									(codeInvalid || errorCode) && styles.error,
									styles.required,
								].filter(Boolean).join(' ')}
							>
								<span className={styles.label}>Код подтверждения</span>
								<input
									type='text'
									value={code}
									onChange={e => { setCode(e.target.value); setErrorCode(false) }}
									onFocus={() => setCodeFocused(true)}
									onBlur={() => { setCodeFocused(false); setCodeTouched(true) }}
									maxLength={6}
									autoComplete='none'
									tabIndex={0}
								/>
							</label>
							{codeInvalid && <p className={styles.errorMessage}>Минимум 6 символов</p>}
							{errorCode && (
								<p className={styles.customErrorMessage + ' ' + styles.textSmall}>
									{errorMessage}
								</p>
							)}

							<button type='submit' className={styles.button} disabled={loading || !code.trim()}>
								{loading ? 'Загрузка...' : 'Продолжить'}
							</button>
							<p className={styles.repeatSendCode + ' ' + styles.textSmall}>
								{secondsToRepeat > 0 ? (
									`Отправить код повторно через ${formatTimer(secondsToRepeat)}`
								) : (
									<span className={styles.link} onClick={handleRepeatCode}>
										Отправить код повторно
									</span>
								)}
							</p>
						</form>
					</>
				)}

				{step === 'error' && (
					<>
						<header className={styles.header}>
							<img src='/icons/logo.svg' alt='Логотип ФК Акрон' className={styles.logo} />
							<button type='button' className={styles.closeButton} onClick={handleClose}>
								<CloseIcon />
							</button>
						</header>
						<h3 className={styles.h3}>Ошибка</h3>
						<p className={styles.text}>Повторите попытку позже</p>
						<button
							type='button'
							className={styles.button}
							onClick={() => {
								setStep('email')
								setEmail('')
								setCode('')
							}}
						>
							Закрыть
						</button>
					</>
				)}
			</div>
		</div>,
		document.body,
	)
}
