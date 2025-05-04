/** @type {import('next').NextConfig} */
const nextConfig = {
	// Отключаем кэширование в режиме разработки
	onDemandEntries: {
		// период (в мс), в течение которого страница будет храниться в памяти
		maxInactiveAge: 25 * 1000,
		// количество страниц, которые должны храниться в памяти
		pagesBufferLength: 2,
	},
	// Отключаем кэширование статических страниц
	staticPageGenerationTimeout: 1000,
	// Принудительно пересобираем страницы при изменении
	webpack: (config, { dev, isServer }) => {
		if (dev && !isServer) {
			config.watchOptions = {
				poll: 1000,
				aggregateTimeout: 300,
			}
		}
		return config
	},
}

module.exports = nextConfig
