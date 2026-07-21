/** Совпадает с scripts/busfans/import-atoms-reports.py → slugify */
const CYR_TO_LAT: Record<string, string> = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'g',
	д: 'd',
	е: 'e',
	ж: 'zh',
	з: 'z',
	и: 'i',
	й: 'y',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'h',
	ц: 'c',
	ч: 'ch',
	ш: 'sh',
	щ: 'sch',
	ъ: '',
	ы: 'y',
	ь: '',
	э: 'e',
	ю: 'yu',
	я: 'ya',
}

export function slugify(text: string): string {
	let s = text.toLowerCase().replaceAll('ё', 'е')
	s = s.normalize('NFKD')
	s = s.replace(/[^a-z0-9а-я]+/gi, '-')
	s = s.replace(/-+/g, '-').replace(/^-|-$/g, '')
	let out = ''
	for (const ch of s) {
		if (ch in CYR_TO_LAT) out += CYR_TO_LAT[ch]
		else if (ch.charCodeAt(0) < 128) out += ch
	}
	out = out.replace(/-+/g, '-').replace(/^-|-$/g, '')
	return out || 'item'
}
