const PROD_API_BASE = 'https://api.fcakron.ru'
const TEST_API_BASE = 'https://id-fcakron.internetlab.ru'

/** Тестовый домен, если в адресной строке есть 'internetlab', иначе прод. */
export function getApiBase(): string {
	if (typeof window !== 'undefined' && window.location.hostname.includes('internetlab')) {
		return TEST_API_BASE
	}
	return PROD_API_BASE
}

export function isTestEnv(): boolean {
	return getApiBase() === TEST_API_BASE
}

export function getApiUrl(path: string): string {
	return `${getApiBase()}${path}`
}
