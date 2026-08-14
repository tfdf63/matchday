import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSectorPageBySlug, getSectorPageSlugs } from '@/data/sectorPages'
import { SectorPage } from '@/features/sector'
import { SITE_URL } from '@/lib/seo/constants'

type PageProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return getSectorPageSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params
	const page = getSectorPageBySlug(slug)
	if (!page) {
		return { title: 'Страница не найдена' }
	}

	return {
		title: page.seo.title,
		description: page.seo.description,
		alternates: {
			canonical: page.path,
		},
		openGraph: {
			title: page.seo.ogTitle,
			description: page.seo.description,
			url: `${SITE_URL}${page.path}`,
		},
	}
}

export default async function SectorRoutePage({ params }: PageProps) {
	const { slug } = await params
	const page = getSectorPageBySlug(slug)
	if (!page) notFound()

	return (
		<main id='content'>
			<SectorPage page={page} />
		</main>
	)
}
