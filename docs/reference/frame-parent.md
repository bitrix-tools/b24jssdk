---
outline: deep
---

# Класс `ParentManager` {#ParentManager}

Предоставляет методы для управления окном родительского приложения Битрикс24, включая изменение размеров окна, 
управление скроллом, инициацию звонков и открытие мессенджера.

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
await $b24.parent.fitWindow()
```

::: tip
Работу с **B24Frame.parent** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Методы {#methods}

### `async closeApplication(): Promise<void>`

Закрывает слайдер с приложением.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-close-application.html)

### `async fitWindow(): Promise<any>`

Устанавливает размер фрейма приложения в соответствии с размерами его содержимого.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-fit-window.html)

### `async resizeWindow(width: number, height: number): Promise<void>`

Изменяет размер фрейма приложения на указанные ширину и высоту.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-resize-window.html)

### `async resizeWindowAuto(appNode: null|HTMLElement = null, minHeight: number = 0, minWidth: number = 0): Promise<void>`

Автоматически изменяет размер `document.body` фрейма приложения в соответствии с размерами содержимого.

| Параметр    | Тип                 | Описание                            |
|-------------|---------------------|-------------------------------------|
| `appNode`   | `null\|HTMLElement` | Узел приложения для расчета высоты. |
| `minHeight` | `number`            | Минимальная высота.                 |
| `minWidth`  | `number`            | Минимальная ширина.                 |

### `getScrollSize(): { scrollWidth: number, scrollHeight: number }`

Возвращает внутренние размеры фрейма приложения.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-get-scroll-size.html)

### `async scrollParentWindow(scroll: number): Promise<void>`

Прокручивает родительское окно до указанной позиции.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-scroll-parent-window.html)

### `async reloadWindow(): Promise<void>`

Перезагружает страницу с приложением.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-reload-window.html)

### `async setTitle(title: string): Promise<void>`

Устанавливает заголовок страницы.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-set-title.html)

### `async imCallTo(userId: number, isVideo: boolean = true): Promise<void>`

Инициирует звонок через внутреннюю связь.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-im-call-to.html)

| Параметр  | Тип       | Описание                                         |
|-----------|-----------|--------------------------------------------------|
| `userId`  | `number`  | Идентификатор пользователя.                      |
| `isVideo` | `boolean` | `true` для видеозвонка, `false` для аудиозвонка. |

### `async imPhoneTo(phone: string): Promise<void>`

Совершает звонок на указанный номер телефона.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-im-phone-to.html)

| Параметр | Тип      | Описание        |
|----------|----------|-----------------|
| `phone`  | `string` | Номер телефона. |

### `async imOpenMessenger(dialogId: number|'chat${number}'|'sg${number}'|'imol|${number}'|undefined): Promise<void>`

Открывает окно мессенджера.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-messenger.html)

| Параметр   | Тип                                                              | Описание               |
|------------|------------------------------------------------------------------|------------------------|
| `dialogId` | `number\|chat${number}\|sg${number}\|imol\|${number}\|undefined` | Идентификатор диалога. |

### `async imOpenHistory(dialogId: number|'chat${number}'|'imol|${number}'): Promise<void>`

Открывает окно истории сообщений.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-history.html)

| Параметр   | Тип                                      | Описание               |
|------------|------------------------------------------|------------------------|
| `dialogId` | `number\|chat${number}\|imol\|${number}` | Идентификатор диалога. |
