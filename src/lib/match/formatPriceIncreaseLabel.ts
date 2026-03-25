function formatIsoToDdMm(iso: string): string | null {
	const t = iso.trim()
	if (!t) return null
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t)
	if (!m) return null
	return `${m[3]}.${m[2]}`
}

/** Текст «Повышение цен: ДД.ММ - ДД.ММ» из ISO `YYYY-MM-DD`. */
export function formatPriceIncreaseLabel(dates: {
	first?: string
	second?: string
}): string | null {
	const a = dates.first ? formatIsoToDdMm(dates.first) : null
	const b = dates.second ? formatIsoToDdMm(dates.second) : null
	if (!a && !b) return null
	if (a && b) return `Повышение цен: ${a} - ${b}`
	if (a) return `Повышение цен: ${a}`
	return `Повышение цен: ${b}`
}
