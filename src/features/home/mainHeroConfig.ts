export const MAIN_HERO_ROTATE_INTERVAL_MS = 4000

/** Абонементы в hero-кarousel до этой даты включительно; после — только матч. */
export const SEASON_TICKETS_SALE_UNTIL_ISO = '2026-08-31'

export function isSeasonTicketsHeroActive(todayIso: string): boolean {
	return todayIso <= SEASON_TICKETS_SALE_UNTIL_ISO
}

export const SEASON_TICKETS_BUY_URL =
	'https://widget.afisha.yandex.ru/w/venues/79807?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51'

export const SEASON_TICKETS_VIP_URL =
	'https://widget.afisha.yandex.ru/w/venues/85000?clientKey=0046af24-2980-419c-bf99-c4d864c693e3&regionId=51'

export const SEASON_TICKETS_FAMILY_URL =
	'https://widget.afisha.yandex.ru/w/venues/85002?clientKey=cbdbe66d-8aa4-40e2-a435-894fe798cf5e&regionId=51'
