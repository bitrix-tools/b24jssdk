---
outline: deep
---

# Класс `AuthManager` {#AuthManager}

Предназначен для управления аутентификацией в приложениях Битрикс24. Он обрабатывает данные аутентификации, полученные 
от родительского окна, и предоставляет методы для обновления и получения этих данных.

```ts
// ... /////
$b24 = await initializeB24Frame()
if($b24.auth.isAdmin)
{
	// ... ////
}
```

::: tip
Работу с **B24Frame.auth** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Геттеры {#getters}
### `isAdmin` {#isAdmin}
```ts
get isAdmin(): boolean
```

Возвращает `true`, если текущий пользователь имеет права администратора, иначе `false`.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-is-admin.html)

## Методы {#methods}

::: info
Реализует интерфейс [`AuthActions`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts).
:::

### `getAuthData` {#getAuthData}
```ts
getAuthData(): false|AuthData
```

Возвращает данные аутентификации ([`AuthData`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts)), если они еще не истекли.
Если срок действия истек, возвращает `false`.
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-get-auth.html)

### `refreshAuth` {#refreshAuth}
```ts
async refreshAuth(): Promise<AuthData>
```

Обновляет данные аутентификации через родительское окно и возвращает обновленные данные ([`AuthData`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts)).
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-refresh-auth.html)

### `getUniq` {#getUniq}
```ts
getUniq(prefix: string): string
```

Возвращает уникальную строку, состоящую из заданного префикса и `AuthData.memberId`.

>Используется в ['B24PullClientManager'](pull-client)