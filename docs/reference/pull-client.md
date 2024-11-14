---
outline: deep
---
# Push&Pull

Рассмотрим как работать с Push & Pull клиентом в рамках приложения [Frame](frame-index).

::: danger
Через [Hook](hook-index) не работает.
:::

Подключение PullClient позволит **front-end** вашего приложения получать события из канала, которые туда будет
отправлять **front-end** или **back-end** вашего же приложения при помощи
метода [`pull.application.event.add`](https://apidocs.bitrix24.com/api-reference/interactivity/push-and-pull/pull-application-event-add.html).

## Использование {#usage}
```ts
import {
	LoggerBrowser,
	initializeB24Frame,
	B24Frame,
	useB24Helper,
	Text,
	type TypePullMessage
} from '@bitrix24/b24jssdk'

const {
	initB24Helper,
	getB24Helper,
	usePullClient,
	useSubscribePullClient,
	startPullClient
} = useB24Helper()

const $logger = LoggerBrowser.build('MyApp', import.meta.env?.DEV === true)
let $b24: B24Frame

async function init(): Promise<void>
{
	// region B24 ////
	$b24 = await initializeB24Frame()
	
	await initB24Helper($b24)
	// endregion ////
	
	// region Pull Client ////
	// Initialize ////
	usePullClient()
	
	// Subscribe to channel ////
	useSubscribePullClient(
		// Get command ////
		(message: TypePullMessage) => {
			$logger.warn(
				Text.getDateForLog(),
				'<< pull.get <<<',
				message.params.param_1,
				message
			)
		},
		'main'
	)
	
	// Launch ////
	startPullClient()
	// endregion ////
}

/**
 * Send command via Pull
 * @param {string} command
 * @param {Record<string, any>} params
 * @return {Promise<void>}
 */
async function makeSendPullCommand(
	command: string,
	params: Record<string, any> = {}
): Promise<void>
{
	try
	{
		await $b24.callMethod(
			'pull.application.event.add',
			{
				COMMAND: command,
				PARAMS: params,
				MODULE_ID: getB24Helper().getModuleIdPullClient()
			}
		)
	}
	catch(error: any)
	{
		$logger.error(error)
	}
}

// region Start ////
init()
	.then(() => {
		setInterval(() => {
			makeSendPullCommand('ping', {
				param_1: Text.getDateForLog()
			})
		}, 1_000)
	})
	.catch((error: Error|string) => {
		$logger.error(error)
	})
// endregion ////
```

::: tip
Работу с **Push&Pull** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::