import type { FaqItem } from '@/data/faq'

export function buildFaqPageJsonLd(items: readonly FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.questionLines.join(' '),
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer.join(' '),
			},
		})),
	}
}
