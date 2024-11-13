---
outline: deep
---

# Класс `SliderManager` {#SliderManager}

Предоставляет методы для работы с слайдерами в приложении Битрикс24. Он позволяет открывать и закрывать 
слайдеры, а также управлять их содержимым.

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeOpenSliderForUser = async(userId: number) =>
{
	return $b24.slider.openPath(
		$b24.slider.getUrl(`/company/personal/user/${userId}/`),
		950
	)
	.then((response: StatusClose) =>
	{
		if(
			!response.isOpenAtNewWindow
			&& response.isClose
		)
		{
			$logger.info("Slider is closed! Reinit the application")
			return reloadData()
		}
	})
}
```

::: tip
Работу с **B24Frame.parent** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Методы {#methods}

### `getUrl(path: string = '/'): URL`

Возвращает URL, относительный к доменному имени и пути.

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const url = $b24.slider.getUrl('/settings/configs/userfield_list.php')
```

### `getTargetOrigin(): string`

Возвращает адрес Битрикс24 (например, `https://name.bitrix24.com`).
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-get-domain.html)

### `async openSliderAppPage(params: any = {}): Promise<any>`

Открывает слайдер с фреймом приложения.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-open-application.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeOpenAppOptions = async() => {
	return $b24.slider.openSliderAppPage(
		{
			place: 'app.options',
			bx24_width: 650,
			bx24_label: {
				bgColor: 'violet',
				text: '🛠️',
				color: '#ffffff',
			},
			bx24_title: 'App Options',
		}
	)
}
```

### `async closeSliderAppPage(): Promise<void>`

Закрывает слайдер с приложением.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-close-application.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeClosePage = async (): Promise<void> => {
	return $b24.slider.closeSliderAppPage()
}
```

### `async openPath(url: URL, width: number = 1640): Promise<StatusClose>`

Открывает указанный путь внутри портала в слайдере.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-open-path.html)

Обрабатывает ошибки, связанные с использованием мобильных устройств, и может открывать URL в новой вкладке, если слайдер не поддерживается.

Возвращает [`StatusClose`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/slider.ts)

| Параметр | Тип      | Описание                                           |
|----------|----------|----------------------------------------------------|
| `url`    | `URL`    | URL который нужно открыть.                         |
| `width`  | `number` | Ширина слайдера, число в диапазоне от 1640 до 900. |

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeOpenSliderEditCurrency = async(currencyCode: string) =>
{
	return $b24.slider.openPath(
		$b24.slider.getUrl(`/crm/configs/currency/edit/${currencyCode}/`),
		950
	)
	.then((response: StatusClose) =>
	{
		$logger.warn(response)
		if(
			!response.isOpenAtNewWindow
			&& response.isClose
		)
		{
			$logger.info("Slider is closed! Reinit the application")
			return reloadData()
		}
	})
}

makeOpenSliderEditCurrency('INR')
```