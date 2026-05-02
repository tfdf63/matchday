/** Отображение гола в ячейке счёта: число или «-». */
export function formatGoalCell(value: number | undefined): string {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value)
	}
	return '-'
}
