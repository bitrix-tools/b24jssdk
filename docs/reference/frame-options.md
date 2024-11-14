---
outline: deep
---

# Класс `OptionsManager` {#OptionsManager}

Используется для управления настройками приложения и пользователя в приложении Битрикс24. 
Он позволяет инициализировать данные, получать и устанавливать опции через сообщения родительскому окну.

## Методы {#methods}

### `appGet` {#appGet}
```ts
appGet(option: string): any
```

Получает значение опции приложения. 

Возвращает значение опции или выбрасывает ошибку, если опция не установлена.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/options/bx24-app-option-get.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const value: any = $b24.options.appGet('test')
```

### `appSet` {#appSet}
```ts
async appSet(
	option: string,
	value: any
): Promise<void>
```

Получает значение опции приложения. 

Возвращает значение опции или выбрасывает ошибку, если опция не установлена.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/options/bx24-app-option-set.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
await $b24.options.appSet('test', 123)
```

### `userGet` {#userGet}
```ts
userGet(
	option: string
): any
```

Получает значение пользовательской опции. 

Возвращает значение опции или выбрасывает ошибку, если опция не установлена.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/options/bx24-user-option-get.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const value: any = $b24.options.userGet('test')
```

### `userSet` {#userSet}
```ts
async userSet(
	option: string,
	value: any
): Promise<void>
```

Получает значение пользовательской опции. 

Возвращает значение опции или выбрасывает ошибку, если опция не установлена.

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/options/bx24-user-option-set.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
await $b24.options.userSet('test', 123)
```