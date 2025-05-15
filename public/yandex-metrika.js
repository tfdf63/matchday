// Yandex.Metrika counter
;(function (m, e, t, r, i, k, a) {
	m[i] =
		m[i] ||
		function () {
			;(m[i].a = m[i].a || []).push(arguments)
		}
	m[i].l = 1 * new Date()
	for (var j = 0; j < document.scripts.length; j++) {
		if (document.scripts[j].src === r) {
			return
		}
	}
	k = e.createElement(t)
	a = e.getElementsByTagName(t)[0]
	k.async = 1
	k.src = r
	a.parentNode.insertBefore(k, a)
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

ym(90103330, 'init', {
	clickmap: true,
	trackLinks: true,
	accurateTrackBounce: true,
	webvisor: true,
	ecommerce: 'dataLayer',
})

// Добавление noscript элемента для Яндекс.Метрики
document.addEventListener('DOMContentLoaded', function () {
	const noscript = document.createElement('noscript')
	const div = document.createElement('div')
	const img = document.createElement('img')

	img.src = 'https://mc.yandex.ru/watch/90103330'
	img.style.position = 'absolute'
	img.style.left = '-9999px'
	img.alt = ''

	div.appendChild(img)
	noscript.appendChild(div)
	document.body.appendChild(noscript)
})
