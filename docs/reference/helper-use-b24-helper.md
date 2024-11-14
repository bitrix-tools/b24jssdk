---
outline: deep
---

# Хук `useB24Helper` {#useB24Helper}

Предоставляет простой интерфейс для работы с Битрикс24, что упрощает интеграцию и управление приложением.

Обеспечивает централизованное управление и доступ к функциональности [`B24HelperManager`](helper-helper-manager) и
клиенту [`Pull`](pull-client).

```ts
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
```

::: tip
Работу с **useB24Helper** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Методы {#methods}

### `initB24Helper` {#initB24Helper}

```ts
initB24Helper(
	$b24: TypeB24,
	dataTypes: LoadDataType[] = [
		LoadDataType.App,
		LoadDataType.Profile
	]
): Promise<B24HelperManager>
```

Инициализирует [`B24HelperManager`](helper-helper-manager) и загружает данные.

- **`$b24`**: Экземпляр [`TypeB24`](types-type-b24)
- **`dataTypes`**: Массив типов данных [`LoadDataType`](#enum-LoadDataType) для загрузки
	- по умолчанию загружаются данные приложения и профиля.

### `isInitB24Helper` {#isInitB24Helper}

```ts
isInitB24Helper(): boolean
```

Возвращает `true`, если [`B24HelperManager`](helper-helper-manager) был инициализирован.

### `destroyB24Helper` {#destroyB24Helper}

```ts
destroyB24Helper(): void
```

Уничтожает [`B24HelperManager`](helper-helper-manager) и сбрасывает состояние инициализации.

### `getB24Helper` {#getB24Helper}

```ts
getB24Helper(): B24HelperManager
```

Возвращает экземпляр [`B24HelperManager`](helper-helper-manager).

Выбрасывает ошибку, если `B24HelperManager` не был инициализирован.

### `usePullClient` {#usePullClient}

```ts
usePullClient(): void
```

Инициализирует использование клиента [`Pull`](pull-client)

Выбрасывает ошибку, если [`B24HelperManager`](helper-helper-manager) не был инициализирован через [`initB24Helper`](#initB24Helper).

### `useSubscribePullClient` {#useSubscribePullClient}

```ts
useSubscribePullClient(
	callback: (message: TypePullMessage) => void,
	moduleId: string = 'application'
): void
```

Подписывается на события клиента [`Pull`](pull-client).

[`TypePullMessage`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/pull.ts)

- **`callback`**: Функция обратного вызова, вызываемая при получении сообщения.
- **`moduleId`**: Идентификатор модуля для подписки (по умолчанию `'application'`).

Выбрасывает ошибку, если клиент [`Pull`](pull-client) не был инициализирован через [`usePullClient`](#usePullClient).


> Методы `initB24Helper`, `usePullClient`, и `useSubscribePullClient` должны быть вызваны в правильной
> последовательности для корректной работы.

### `startPullClient` {#startPullClient}

```ts
startPullClient(): void
```

Запускает клиент [`Pull`](pull-client).

Выбрасывает ошибку, если клиент [`Pull`](pull-client) не был инициализирован через [`usePullClient`](#usePullClient).

## Типы данных {#types}
### `LoadDataType` {#enum-LoadDataType}

Определяет типы данных, которые могут быть загружены в приложении.

- **`App`**: Данные [статуса приложения](helper-app-manager), [оплаты приложения](helper-payment-manager), [лицензии Битрикс24](helper-license-manager).
- **`Profile`**: Данные [профиля](helper-profile-manager).
- **`Currency`**: Данные [валюты](helper-currency-manager).
- **`AppOptions`**: [Опции](helper-options-manager) приложения.
- **`UserOptions`**: [Опции](helper-options-manager) пользователя.

## Использование {#usage}

```ts
import {
	initializeB24Frame,
	LoggerBrowser,
	B24Frame,
	useB24Helper,
	LoadDataType,
	type TypePullMessage
} from '@bitrix24/b24jssdk'

const {
	initB24Helper,
	destroyB24Helper,
	getB24Helper,
	usePullClient,
	useSubscribePullClient,
	startPullClient
} = useB24Helper()

let $b24: B24Frame
let $isInitB24Helper = false
const $logger = LoggerBrowser.build('MyApp', import.meta.env?.DEV === true)

// ... ////
async function init(): Promise<void>
{
	try
	{
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
		$isInitB24Helper = true
		
		usePullClient()
		useSubscribePullClient(
			pullCommandHandler.bind(this),
			'main'
		)
		startPullClient()
	}
	catch(error: any)
	{
		// ... ////
	}
}

function pullCommandHandler(message: TypePullMessage): void
{
	$logger.warn('<< pull.get <<<', message)
	
	if(message.command === 'reload.options')
	{
		$logger.info("Get pull command for update. Reinit the application")
		reloadData()
		return
	}
}

async function reloadData(): Promise<void>
{
	if(!$isInitB24Helper)
	{
		return
	}
	
	return getB24Helper().loadData([
		LoadDataType.Profile,
		LoadDataType.App,
		LoadDataType.Currency,
		LoadDataType.AppOptions,
		LoadDataType.UserOptions,
	])
	.then(() => {
		return makeFitWindow()
	})
}

const b24Helper = (): null|B24HelperManager => {
	if($isInitB24Helper)
	{
		return getB24Helper()
	}
	
	return null
}
// ... ////

$logger.info({
	profileInfo: b24Helper?.profileInfo.data,
	appOptions: b24Helper?.appOptions.data,
	userOptions: b24Helper?.userOptions.data,
	isSelfHosted: b24Helper?.isSelfHosted ? 'Y' : 'N'
})

```

