import Script from 'next/script'
import { YANDEX_METRIKA_MAIN_COUNTER_ID } from './constants'

/**
 * Скрипты счётчиков (Top.Mail.Ru, Яндекс.Метрика x2, Сбер).
 * Подключается из корневого layout; сами инициализаторы лежат в public/*.js.
 */
export function AnalyticsScripts() {
	return (
		<>
			<noscript>
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element -- пиксель Метрики для noscript */}
					<img
						src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_MAIN_COUNTER_ID}`}
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
			<Script id='top-mail-ru' strategy='lazyOnload' src='/top-mail-ru.js' />
			<Script
				id='yandex-metrika-main'
				strategy='lazyOnload'
				src='/yandex-metrika-main.js'
			/>
			<Script
				id='yandex-metrika'
				strategy='lazyOnload'
				src='/yandex-metrika.js'
			/>
			<Script id='sber-counter' strategy='lazyOnload' src='/sber.js' />
		</>
	)
}
