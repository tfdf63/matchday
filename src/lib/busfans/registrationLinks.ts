import type { Game } from '@/data/games'

export const DEFAULT_BUSFANS_PURCHASE_PRICE_FROM = 'от 490 ₽'

export type GameBusRegistrationLinks = {
	samara: string | null
	tolyatti: string | null
	/** Покупка места (`busfansRegistrationUrl` без отдельных городов). */
	purchase: string | null
	priceFrom: string | null
	primaryUrl: string | null
}

function trimUrl(value: string | undefined): string | null {
	const url = value?.trim()
	return url || null
}

export function getGameBusRegistrationLinks(
	game: Pick<
		Game,
		| 'busfansRegistrationUrl'
		| 'busfansRegistrationUrlSamara'
		| 'busfansRegistrationUrlTolyatti'
		| 'busfansRegistrationPriceFrom'
	>,
): GameBusRegistrationLinks {
	const samara = trimUrl(game.busfansRegistrationUrlSamara)
	const tolyatti = trimUrl(game.busfansRegistrationUrlTolyatti)
	const generic = trimUrl(game.busfansRegistrationUrl)
	const purchase =
		generic && !tolyatti && !samara ? generic : null
	const priceFrom =
		trimUrl(game.busfansRegistrationPriceFrom) ??
		(purchase ? DEFAULT_BUSFANS_PURCHASE_PRICE_FROM : null)

	return {
		samara,
		tolyatti,
		purchase,
		priceFrom,
		primaryUrl: purchase ?? tolyatti ?? samara,
	}
}
