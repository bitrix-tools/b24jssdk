---
outline: deep
---

# Класс `PlacementManager` {#PlacementManager}

Используется для управления размещением виджетов в приложении Битрикс24.

[Подробнее](https://apidocs.bitrix24.com/api-reference/widgets/ui-interaction/index.html)

## Геттеры {#getters}

### `title` {#title}
```ts
get title(): string
```
Возвращает заголовок размещения. По умолчанию возвращает `'DEFAULT'`, если заголовок не установлен.

### `isDefault` {#isDefault}
```ts
get isDefault(): boolean
```
Возвращает `true`, если заголовок размещения равен `'DEFAULT'`.

### `options` {#options}
```ts
get options(): any
```
Возвращает объект опций размещения. Объект заморожен для предотвращения изменений.

### `isSliderMode` {#isSliderMode}
```ts
get isSliderMode(): boolean
```
Возвращает `true`, если виджет работает в режиме слайдера (опция `IFRAME` равна `'Y'`).

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
if($b24.placement.isSliderMode)
{
	$b24.parent.setTitle('SliderMode')
}
```

## Методы {#methods}

### `getInterface` {#getInterface}
```ts
async getInterface(): Promise<any>
```

Получение информации о js-интерфейсе текущего места встраивания: списке возможных команд и событий.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/widgets/ui-interaction/bx24-placement-get-interface.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const value: any = await $b24.placement.getInterface()
```

### `bindEvent` {#bindEvent}
```ts
async bindEvent(eventName: string): Promise<any>
```

Установка обработчика события интерфейса.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/widgets/ui-interaction/bx24-placement-bind-event.html)

### `call` {#call}
```ts
async call(command: string, parameters: Record<string, any> = {}): Promise<any>
```

Вызов зарегистрированной команды интерфейса.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/widgets/ui-interaction/bx24-placement-call.html)

```ts
import { LoggerBrowser, LoggerType } from '@bitrix24/b24jssdk'
// ... /////
const logger = LoggerBrowser.build(
  'Demo',
  import.meta.env?.DEV === true
)

$b24 = await initializeB24Frame()
// ... /////
$b24.placement.call(
  'reloadData'
)
.then((respose: any) => {
  logger.log('reload call')
})
```
