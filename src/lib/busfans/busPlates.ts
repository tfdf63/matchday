import busPlatesJson from '@/data/busfans/busPlates.json'

const byManifestId = busPlatesJson as Readonly<Record<string, readonly string[]>>

/** Госномера автобуса по id манифеста (ручной ввод, не затирается импортом Excel). */
export function getBusPlateNumbers(manifestId: string): readonly string[] {
	return byManifestId[manifestId] ?? []
}
