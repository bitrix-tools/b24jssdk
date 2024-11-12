---
outline: deep
---

# Класс `B24Frame` {#B24Frame}

Предназначен для управления приложениями Битрикс24. Он наследует функциональность от [`AbstractB24`](core-abstract-b24) и 
предоставляет методы для работы с аутентификацией, сообщениями, слайдерами и другими.

Реализует интерфейс [`TypeB24`](types-type-b24).

::: tip
Работу с **B24Frame** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Конструктор {#constructor}

```ts
constructor(queryParams: B24FrameQueryParams)
```

Тип [`B24FrameQueryParams`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts) описывает
параметры, необходимые для инициализации фрейма приложения Битрикс24.

| Поле       | Тип       | Описание                         |
|------------|-----------|----------------------------------|
| `DOMAIN`   | `string`  | Доменное имя аккаунта Битрикс24. |
| `PROTOCOL` | `boolean` | Протокол соединения              |
| `LANG`     | `string`  | Язык интерфейса Битрикс24.       |
| `APP_SID`  | `string`  | Идентификатор сессии приложения. |

## Свойства {#properties}

- **`isInit`**: `boolean` - Указывает, инициализированы ли данные. [Подробнее](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-init.html)
- **`isFirstRun`**: `boolean` - Возвращает флаг, указывающий, является ли это первым запуском приложения. [Подробнее](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-install.html)
- **`isInstallMode`**: `boolean` - Возвращает флаг, указывающий, находится ли приложение в режиме установки. [Подробнее](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-install.html)
- **`auth`**: `authManager` - Возвращает [менеджер авторизации](frame-auth).
- **`parent`**: `ParentManager` - Возвращает [менеджер родительского окна](frame-parent).
- **`slider:`**: `SliderManager` - Возвращает [менеджер слайдеров](frame-slider).
- **`placement`**: `PlacementManager` - Возвращает [менеджер встроек](frame-placement).
- **`options`**: `OptionsManager` - Возвращает [менеджер опций](frame-options).
- **`dialog`**: `DialogManager` - Возвращает [менеджер диалогов](frame-dialog).

## Методы {#methods}
::: info
Реализует интерфейс [`TypeB24`](types-type-b24).
:::

### `async installFinish(): Promise<any>`

Сигнализирует о завершении установки приложения. [Подробнее](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-install-finish.html)

### `getAppSid(): string`

Возвращает идентификатор приложения относительно родительского окна.

### `getLang(): B24LangList`

Возвращает [локализацию](core-lang-list) интерфейса Битрикс24. [Подробнее](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-get-lang.html)

## Использование {#usage}

Этот код создает экземпляр `B24Frame` для взаимодействия с API Битрикс24 и выполняет пакетный запрос для получения списка компаний,
сортируя их по идентификатору в порядке убывания.

Полученные данные преобразуются в массив объектов с полями `id`, `title` и `createdTime`, после чего результаты выводятся в консоль,
а в случае ошибки выводится сообщение об ошибке.

::: warning
Код должен запускаться в качестве [приложения](https://apidocs.bitrix24.com/api-reference/app-installation/local-apps/index.html) Битрикс24 (во фрейме).
:::

::: code-group
```ts [TypeScript]
import {
	initializeB24Frame,
	LoggerBrowser,
	B24Frame,
	Result,
	EnumCrmEntityTypeId,
	Text,
	type ISODate
} from '@bitrix24/b24jssdk'
	
const $logger = LoggerBrowser.build('MyApp', true)
let $b24: B24Frame

initializeB24Frame()
.then((response: B24Frame) => {
	$b24 = response
	
	return $b24.callBatch({
		CompanyList: {
			method: 'crm.item.list',
			params: {
				entityTypeId: EnumCrmEntityTypeId.company,
				order: { id: 'desc' },
				select: [
					'id',
					'title',
					'createdTime'
				]
			}
		}
	}, true )
})
.then((response: Result) => {
	const data = response.getData()
	const dataList = (data.CompanyList.items || []).map((item: any) => {
		return {
			id: Number(item.id),
			title: item.title,
			createdTime: Text.toDateTime(item.createdTime as ISODate)
		}
	})
	
	$logger.info('response >> ', dataList)
	$logger.info('load >> stop ')
})
.catch((error) => {
	$logger.error(error)
})
</script>
```
```html [UMD.js]
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bitrix24 Frame Demo</title>
</head>
<body>
<p>See the result in the developer console</p>
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', async () => {
	try
	{
		const $logger = B24Js.LoggerBrowser.build('MyApp', true);
		let $b24;
		
		$b24 = await B24Js.initializeB24Frame();
		
		const response = await $b24.callBatch({
			CompanyList: {
				method: 'crm.item.list',
				params: {
					entityTypeId: B24Js.EnumCrmEntityTypeId.company,
					order: { id: 'desc' },
					select: [
						'id',
						'title',
						'createdTime'
					]
				}
			}
		}, true );
		
		const data = response.getData();
		const dataList = (data.CompanyList.items || []).map((item) => {
			return {
				id: Number(item.id),
				title: item.title,
				createdTime: B24Js.Text.toDateTime(item.createdTime)
			}
		});
		
		$logger.info('response >> ', dataList);
		$logger.info('load >> stop ');
	}
	catch (error)
	{
		console.error(error);
	}
});
</script>
</body>
</html>
```
```vue [VUE]
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
	initializeB24Frame,
	LoggerBrowser,
	B24Frame,
	EnumCrmEntityTypeId,
	Text,
	type ISODate
} from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('MyApp', true)
let $b24: B24Frame

onMounted(async () => {
	try
	{
		$b24 = await initializeB24Frame()
		
		const response = await $b24.callBatch({
			CompanyList: {
				method: 'crm.item.list',
				params: {
					entityTypeId: EnumCrmEntityTypeId.company,
					order: { id: 'desc' },
					select: [
						'id',
						'title',
						'createdTime'
					]
				}
			}
		}, true)
		
		const data = response.getData()
		const dataList = (data.CompanyList.items || []).map((item: any) => {
			return {
				id: Number(item.id),
				title: item.title,
				createdTime: Text.toDateTime(item.createdTime as ISODate)
			}
		})
		
		$logger.info('response >> ', dataList)
		$logger.info('load >> stop ')
	}
	catch (error)
	{
		$logger.error(error)
	}
})

onUnmounted(() => {
	$b24?.destroy()
})
</script>

<template>
	<p>See the result in the developer console</p>
</template>
```
:::