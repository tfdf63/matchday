import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	trailingSlash: true,
	skipTrailingSlashRedirect: true,
	distDir: 'dist',
}

export default nextConfig
