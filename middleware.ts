import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Редирект с /sector/ на главную страницу
	if (pathname === '/sector') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// Редирект с /sector/ (с trailing slash) на главную страницу
	if (pathname === '/sector/') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
