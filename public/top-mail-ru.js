// Top.Mail.Ru counter
var _tmr = window._tmr || (window._tmr = [])
_tmr.push({
	id: '3648109',
	type: 'pageView',
	start: new Date().getTime(),
	pid: 'USER_ID',
})
;(function (d, w, id) {
	if (d.getElementById(id)) return
	var ts = d.createElement('script')
	ts.type = 'text/javascript'
	ts.async = true
	ts.id = id
	ts.src = 'https://top-fwz1.mail.ru/js/code.js'
	var f = function () {
		var s = d.getElementsByTagName('script')[0]
		s.parentNode.insertBefore(ts, s)
	}
	if (w.opera == '[object Opera]') {
		d.addEventListener('DOMContentLoaded', f, false)
	} else {
		f()
	}
})(document, window, 'tmr-code')

// Добавление noscript элемента для Top.Mail.Ru
document.addEventListener('DOMContentLoaded', function () {
	const noscript = document.createElement('noscript')
	const div = document.createElement('div')
	const img = document.createElement('img')

	img.src = 'https://top-fwz1.mail.ru/counter?id=3648109;js=na'
	img.style.position = 'absolute'
	img.style.left = '-9999px'
	img.alt = 'Top.Mail.Ru'

	div.appendChild(img)
	noscript.appendChild(div)
	document.body.appendChild(noscript)
})
