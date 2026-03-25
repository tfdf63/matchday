'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { MenuFcLogoIcon } from './icons'
import styles from './Menu.module.scss'

export type MenuNavItem = {
	id: string
	label: string
	href: string
	icon: ReactNode
}

function normalizePath(path: string): string {
	if (path === '' || path === '/') return '/'
	return path.endsWith('/') ? path.slice(0, -1) || '/' : path
}

function pathsMatch(a: string, b: string): boolean {
	return normalizePath(a) === normalizePath(b)
}

export type MenuProps = {
	items: [MenuNavItem, MenuNavItem, MenuNavItem, MenuNavItem]
	/** Явный активный пункт по `id` */
	activeId?: string
	/** Явный активный маршрут по `href` (если не задан `activeId`) */
	activeHref?: string
	centerHref?: string
	/** Кастомный логотип в центральной кнопке; по умолчанию `MenuFcLogoIcon` */
	centerLogo?: ReactNode
	/** Фиксированная панель у низа экрана */
	fixed?: boolean
	className?: string
	'aria-label'?: string
}

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

function isActivePath(pathname: string | null, href: string): boolean {
	if (!pathname) return false
	const p = normalizePath(pathname)
	const h = normalizePath(href)
	if (h === '/') return p === '/'
	return p === h || p.startsWith(`${h}/`)
}

export function Menu({
	items,
	activeId: activeIdProp,
	activeHref: activeHrefProp,
	centerHref = '/',
	centerLogo,
	fixed = true,
	className,
	'aria-label': ariaLabel = 'Основное меню',
}: MenuProps) {
	const pathname = usePathname()
	const [leftFirst, leftSecond, rightFirst, rightSecond] = items

	function itemActive(id: string, href: string): boolean {
		if (activeIdProp !== undefined) return activeIdProp === id
		if (activeHrefProp !== undefined) return pathsMatch(href, activeHrefProp)
		return isActivePath(pathname, href)
	}

	function renderTab(item: MenuNavItem) {
		const active = itemActive(item.id, item.href)
		return (
			<Link
				key={item.id}
				href={item.href}
				className={cx(styles.tab, active && styles.tabActive, 'font-mono')}
				aria-current={active ? 'page' : undefined}
			>
				<span className={styles.indicator} aria-hidden={true} />
				<span className={styles.iconWrap}>{item.icon}</span>
				<span className={styles.label}>{item.label}</span>
			</Link>
		)
	}

	return (
		<nav
			className={cx(styles.root, fixed && styles.rootFixed, className)}
			aria-label={ariaLabel}
		>
			<div className={styles.inner}>
				<div className={styles.row}>
					<div className={styles.group}>
						{renderTab(leftFirst)}
						{renderTab(leftSecond)}
					</div>
					<div className={styles.fabSpacer} aria-hidden={true} />
					<div className={styles.group}>
						{renderTab(rightFirst)}
						{renderTab(rightSecond)}
					</div>
				</div>
				<Link href={centerHref} className={styles.fab} aria-label='На главную'>
					<span className={styles.fabInner}>
						{centerLogo ?? (
							<MenuFcLogoIcon className={styles.fabLogo} />
						)}
					</span>
				</Link>
			</div>
		</nav>
	)
}
