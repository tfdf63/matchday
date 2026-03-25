import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'outline' | 'secondary'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant
	icon?: ReactNode
	fullWidth?: boolean
}

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export function Button({
	variant = 'primary',
	icon,
	fullWidth = false,
	className,
	type = 'button',
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cx(
				'font-mono',
				styles.root,
				variant === 'primary' && styles.primary,
				variant === 'outline' && styles.outline,
				variant === 'secondary' && styles.secondary,
				fullWidth && styles.fullWidth,
				className,
			)}
			{...rest}
		>
			{icon ? <span className={styles.icon}>{icon}</span> : null}
			{children}
		</button>
	)
}
