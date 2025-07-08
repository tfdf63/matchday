// Настройка виджета Яндекс.Афиши
export const initYandexWidget = () => {
	// Настройка
	var dealerName = 'YandexTicketsDealer'
	var dealer = (window[dealerName] = window[dealerName] || [])

	dealer.push(['setDefaultClientKey', 'd721bb72-e7ce-4a03-8775-67aea527feb0'])
	dealer.push(['setDefaultRegionId', 51])

	YandexTicketsDealer.push([
		'getDealer',
		function (dealer) {
			const widget = dealer.Widget('79807', 'venue', {
				target: document.getElementById('ya-widget-frame'),
				onRequestClose: function () {
					widget.unmount()
					widget.destroy()
				},
				urlQueryParams: '_ab_new_calendar=off',
			})

			widget.mount({ style: { height: '600px' } })
		},
	])

	// Загрузка скрипта
	;(function () {
		var rnd = '?' + new Date().getTime() * Math.random()
		var script = document.createElement('script')
		var target = document.getElementsByTagName('script')[0]
		script.async = true
		script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js' + rnd
		target.parentNode.insertBefore(script, target)
	})()
}
