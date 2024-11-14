---
outline: deep
---
# Класс `B24HelperManager` {#B24HelperManager}

Является универсальным классом, который управляет начальными данными приложения в Битрикс24. 
Он предоставляет методы для загрузки данных, управления профилем, приложением, оплатой, лицензией, 
валютами и опциями, а также для работы с клиентом [`Pull`](pull-client).

::: tip
Работу с **B24HelperManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

Инициализировать нужно черех хук [`useB24Helper.initB24Helper`](helper-use-b24-helper#initB24Helper)
```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()
// ... ////
async function init(): Promise<void>
{
	// ... ////
	$b24 = await initializeB24Frame()
	await initB24Helper(
		$b24,
		[
			LoadDataType.Profile,
			LoadDataType.App,
			LoadDataType.Currency,
			LoadDataType.AppOptions,
			LoadDataType.UserOptions,
		]
	)
	// ... ////
}
// ... ////
```

## Методы {#methods}

### `getLogger` {#getLogger}
```ts
getLogger(): LoggerBrowser
```

Возвращает текущий [логгер](core-logger-browser).

### `setLogger` {#setLogger}
```ts
setLogger(
	logger: LoggerBrowser
): void
```

Устанавливает [логгер](core-logger-browser).

### `destroy` {#destroy}
```ts
destroy(): void
```

Уничтожает клиент [`Pull`](pull-client)

### `loadData` {#loadData}
```ts
async loadData(
	dataTypes: LoadDataType[] = [
		LoadDataType.App,
		LoadDataType.Profile
	]
): Promise<void>
```

Загружает данные по указанным [типам](helper-use-b24-helper#enum-LoadDataType).

[См `initB24Helper`](helper-use-b24-helper#initB24Helper)

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const {	initB24Helper, getB24Helper } = useB24Helper()
// ... ////
async function init(): Promise<void>
{
	// ... ////
	$b24 = await initializeB24Frame()
	await initB24Helper(
		$b24,
		[
			LoadDataType.Profile,
			LoadDataType.App,
			LoadDataType.AppOptions
		]
	)
	// ... ////
}
// ... ////

async function reloadData(): Promise<void>
{
	// ... ////
	return getB24Helper().loadData([
		LoadDataType.Profile,
		LoadDataType.App,
		LoadDataType.AppOptions
	])
	.then(() => {
		// ... ////
	})
}
```

### `usePullClient` {#usePullClient}
```ts
usePullClient(
	prefix: string = 'prefix',
	userId?: number
): B24HelperManager
```

Инициализирует использование клиента `Pull`

[Подробнее](helper-use-b24-helper#usePullClient)

### `subscribePullClient` {#subscribePullClient}
```ts
subscribePullClient(
	callback: (message: TypePullMessage) => void,
	moduleId: string = 'application'
): B24HelperManager
```

Подписывается на события клиента `Pull`

[Подробнее](helper-use-b24-helper#useSubscribePullClient)

### `startPullClient` {#startPullClient}
```ts
startPullClient(): void
```

Запускает клиент `Pull`

[Подробнее](helper-use-b24-helper#startPullClient)

### `getModuleIdPullClient` {#getModuleIdPullClient}
```ts
getModuleIdPullClient(): string
```

Возвращает `moduleId` из [`subscribePullClient`](#subscribePullClient)

Стоит использовать при отправке сообщения в `Pull`

## Геттеры {#getters}

### `isInit` {#isInit}
```ts
get isInit(): boolean
```
Возвращает `true`, если данные инициализированы.

```ts
import { useB24Helper } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()
// ... ////
await initB24Helper($b24)
// ... ////
$logger.info(getB24Helper().isInit)
// ... ////
```

### `profileInfo` {#profileInfo}
```ts
get profileInfo(): ProfileManager
```
Возвращает данные [профиля](helper-profile-manager).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.Profile])
// ... ////
$logger.info(getB24Helper().profileInfo.data)
// ... ////
```

### `appInfo` {#appInfo}
```ts
get appInfo(): AppManager
```
Возвращает данные [статуса приложения](helper-app-manager).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().appInfo.data)
// ... ////
```

### `paymentInfo` {#paymentInfo}
```ts
get paymentInfo(): PaymentManager
```
Возвращает данные [оплаты приложения](helper-payment-manager).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().paymentInfo.data)
// ... ////
```

### `licenseInfo` {#licenseInfo}
```ts
get licenseInfo(): LicenseManager
```
Возвращает данные [лицензии Битрикс24](helper-license-manager).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().licenseInfo.data)
// ... ////
```

### `currency` {#currency}
```ts
get currency(): CurrencyManager
```
Возвращает данные [валюты](helper-currency-manager).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.Currency])
// ... ////
$logger.info({
	baseCurrency: getB24Helper().currency.baseCurrency,
	currencyList: getB24Helper().currency.currencyList
})
// ... ////
```

### `appOptions` {#appOptions}
```ts
get appOptions(): OptionsManager
```
Возвращает [опции](helper-options-manager) приложения.

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.AppOptions])
// ... ////
$logger.info(getB24Helper().appOptions.data)
// ... ////
```

### `userOptions` {#userOptions}
```ts
get userOptions(): OptionsManager
```
Возвращает [опции](helper-options-manager) пользователя.

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.UserOptions])
// ... ////
$logger.info(getB24Helper().userOptions.data)
// ... ////
```

### `forB24Form` {#forB24Form}
```ts
get forB24Form(): TypeB24Form
```
Возвращает [данные](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/b24Helper.ts) для передачи в форму обратной связи (CRM-форму) Битрикс24

| Поле              | Тип          | Описание                                                                                                                |
|-------------------|--------------|-------------------------------------------------------------------------------------------------------------------------|
| `app_code`        | `string`     | Код приложения в Битрикс24                                                                                              |
| `app_status`      | `string`     | Статус приложения                                                                                                       |
| `payment_expired` | `BoolString` | Строковое представление булевого значения, указывающее, истек ли срок оплаты (`'Y'` для истекшего, `'N'` для активного) |
| `days`            | `number`     | Количество дней до истечения срока оплаты или после истечения                                                           |
| `b24_plan`        | `string`     | Идентификатор тарифного плана Битрикс24 (актуально для облачных версий)                                                 |
| `c_name`          | `string`     | Имя пользователя.                                                                                                       |
| `c_last_name`     | `string`     | Фамилия пользователя.                                                                                                   |
| `hostname`        | `string`     | Адрес Битрикс24 (например, `name.bitrix24.com`).                                                                        |

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App, LoadDataType.Profile])
// ... ////
$logger.info(getB24Helper().forB24Form)
// ... ////
```

::: tip
Работу с **формы обратной связи (CRM-форма) Битрикс24** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/feedback.client.vue).
:::

### `hostName` {#hostName}
```ts
get hostName(): string
```
Возвращает адрес Битрикс24

```ts
import { useB24Helper } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24)
// ... ////
$logger.info(getB24Helper().hostName)
// ... ////
```

### `isSelfHosted` {#isSelfHosted}
```ts
get isSelfHosted(): boolean
```
Возвращает `true`, если приложение развернуто на собственном сервере.

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().isSelfHosted)
// ... ////
```

### `primaryKeyIncrementValue` {#primaryKeyIncrementValue}
```ts
get primaryKeyIncrementValue(): number
```
Возвращает шаг инкремента для полей типа ID.

Для коробки `1`, для облака - `2`

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().primaryKeyIncrementValue)
// ... ////
```

### `b24SpecificUrl` {#b24SpecificUrl}
```ts
get b24SpecificUrl(): Record<keyof typeof TypeSpecificUrl, string>

export const TypeSpecificUrl = {
	MainSettings: 'MainSettings',
	UfList: 'UfList',
	UfPage: 'UfPage'
} as const
```
Возвращает специфические URL для Битрикс24


```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
const { initB24Helper, getB24Helper } = useB24Helper()

// ... ////
await initB24Helper($b24, [LoadDataType.App])
// ... ////
$logger.info(getB24Helper().b24SpecificUrl.MainSettings)
// ... ////
```