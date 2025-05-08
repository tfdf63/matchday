const YandexTicketWidget = () => {
	return (
		<script>
			/* Настройка */
			var dealerName = 'YandexTicketsDealer';
	var dealer = window[dealerName] = window[dealerName] || [];

	dealer.push(['setDefaultClientKey', 'b68536bf-10b4-436a-a02d-739a2a9e7fcc']);
        dealer.push(['setDefaultRegionId', 51]);

	YandexTicketsDealer.push(['getDealer', function (dealer) {
		const widget = dealer.Widget('ticketsteam-7855@36744901', 'session', {
			target: document.getElementById('ya-widget-frame'),
			onRequestClose: function() {
				widget.unmount();
				widget.destroy();
			},
		});

		widget.mount({ style: { height: '600px' } });
	}]);

	/* Загрузка */
	(function () {
		var rnd = '?' + new Date().getTime() * Math.random();
		var script = document.createElement('script');
		var target = document.getElementsByTagName('script')[0];
		script.async = true;
		script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js'+rnd;
		target.parentNode.insertBefore(script, target);
	})();
</script>)

export default YandexTicketWidget