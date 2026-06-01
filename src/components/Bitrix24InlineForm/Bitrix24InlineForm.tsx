'use client'

import { useEffect, useRef } from 'react'

export type Bitrix24InlineFormProps = {
	formId: string
	loaderUrl: string
	className?: string
}

export function Bitrix24InlineForm({
	formId,
	loaderUrl,
	className,
}: Bitrix24InlineFormProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return
		if (container.querySelector('script[data-b24-form]')) return

		const script = document.createElement('script')
		script.setAttribute('data-b24-form', formId)
		script.setAttribute('data-skip-moving', 'true')
		script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${loaderUrl}');`
		container.appendChild(script)

		return () => {
			container.replaceChildren()
		}
	}, [formId, loaderUrl])

	return <div ref={containerRef} className={className} />
}
