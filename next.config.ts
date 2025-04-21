import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	output: 'export',
	distDir: 'out',
	images: { unoptimized: true },

	// Добавляем HTTP-заголовки
	async headers() {
		return [
			{
				// Применяем ко всем маршрутам
				source: '/:path*',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Content-Security-Policy',
						value: "frame-ancestors 'self'",
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Cache-Control',
						value: 'no-transform',
					},
				],
			},
		]
	},
}

export default nextConfig
