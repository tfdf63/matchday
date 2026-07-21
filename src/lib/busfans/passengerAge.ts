/** Возраст меньше 18 лет на дату матча (сравнение по календарным датам). */
export function isMinorOnMatchDate(
	birthDateIso: string | null | undefined,
	matchDateIso: string,
): boolean {
	if (!birthDateIso?.trim()) return false

	const birthParts = birthDateIso.split('-').map(Number)
	const matchParts = matchDateIso.split('-').map(Number)
	if (birthParts.length !== 3 || matchParts.length !== 3) return false

	const [by, bm, bd] = birthParts
	const [my, mm, md] = matchParts
	if (
		[by, bm, bd, my, mm, md].some((n) => !Number.isFinite(n)) ||
		bm < 1 ||
		bm > 12 ||
		mm < 1 ||
		mm > 12
	) {
		return false
	}

	let age = my - by
	if (mm < bm || (mm === bm && md < bd)) age -= 1
	return age < 18
}
