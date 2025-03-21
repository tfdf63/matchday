import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	output: 'export',
	distDir: 'out',
	images: { unoptimized: true },
}

export default nextConfig
