type SeoJsonLdProps = {
	data: Record<string, unknown> | null | undefined
}

export function SeoJsonLd({ data }: SeoJsonLdProps) {
	if (!data) return null

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	)
}
