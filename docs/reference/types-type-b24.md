---
outline: deep
---
# Тип `TypeB24` {#TypeB24}

```ts
import { type TypeB24 } from '@bitrix24/b24jssdk'
```

Реализация:
- [AbstractB24](core-abstract-b24)
  - [Hook](hook-index)
  - [Frame](frame-index)


## Геттеры {#getters}

### `isInit` {#isInit}
```ts
get isInit(): boolean
```
Указывает, инициализированы ли данные. [Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-functions/bx24-init.html)

### `auth` {#auth}
```ts
get auth(): AuthActions
```
Возвращает интерфейс [`AuthActions`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts) для работы с авторизацией.

## Методы {#methods}

### `init` {#init}
```ts
init(): Promise<void>
```
Используется для инициализации данных.

### `destroy` {#destroy}
```ts
destroy(): void
```
Используется для удаления.

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

### `getTargetOrigin` {#getTargetOrigin}
```ts
getTargetOrigin(): string
```

Возвращает адрес Битрикс24 (например, `https://name.bitrix24.com`).
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-get-domain.html)

### `getTargetOriginWithPath` {#getTargetOriginWithPath}
```ts
getTargetOriginWithPath(): string
```

Возвращает адрес rest-api Битрикс24 (например, `https://name.bitrix24.com/rest`).
[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/additional-functions/bx24-get-domain.html)

### `callMethod` {#callMethod}
```ts
callMethod(
	method: string,
    params?: object,
    start?: number
): Promise<AjaxResult>
```
Вызывает метод rest-api с указанными параметрами.

Возвращает `Promise`, который разрешается в [`AjaxResult`](core-ajax-result)

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.html)

### `callListMethod` {#callListMethod}
```ts
callListMethod(
    method: string,
    params?: object,
    progress?: null|((progress: number) => void),
    customKeyForResult?: string|null
): Promise<Result>
```
Вызывает метод rest-api для списочного метода с указанными параметрами.

| Параметр             | Тип                                  | Описание                               |
|----------------------|--------------------------------------|----------------------------------------|
| `method`             | `string`                             | Метод запроса.                         |
| `params`             | `object`                             | Параметры запроса.                     |
| `progress`           | `null\|((progress: number) => void)` | Обработка шагов.                       |
| `customKeyForResult` | `string\|null`                       | Пользовательское поле для группировки. |

Возвращает `Promise`, который разрешается в [`Result`](core-result)

### `fetchListMethod` {#fetchListMethod}
```ts
fetchListMethod(
	method: string,
    params?: any,
    idKey?: string,
    customKeyForResult?: string|null
): AsyncGenerator<any[]>
```
Вызывает метод rest-api для списочного метода и возвращает объект-генератор.

| Параметр             | Тип            | Описание                               |
|----------------------|----------------|----------------------------------------|
| `method`             | `string`       | Метод запроса.                         |
| `params`             | `any`          | Параметры запроса.                     |
| `idKey`              | `string`       | Имя поля ID сущности ('ID' или 'id').  |
| `customKeyForResult` | `string\|null` | Пользовательское поле для группировки. |

### `callBatch` {#callBatch}
```ts
callBatch(
	calls: Array<any>|object,
    isHaltOnError?: boolean
): Promise<Result>
```
Вызывает пакетный запрос с максимальным количеством команд не более 50.

| Параметр        | Тип                  | Описание                           |
|-----------------|----------------------|------------------------------------|
| `calls`         | `Array<any>\|object` | Пакет запросов.                    |
| `isHaltOnError` | `boolean`            | Прекращение выполнения при ошибке. |

Возвращает `Promise`, который разрешается в [`AjaxResult`](core-ajax-result)

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.html)

### `callBatchByChunk` {#callBatchByChunk}
```ts
callBatchByChunk(
	calls: Array<any>,
    isHaltOnError: boolean
): Promise<Result>
```
Вызывает пакетный запрос с любым количеством команд.

| Параметр        | Тип          | Описание                           |
|-----------------|--------------|------------------------------------|
| `calls`         | `Array<any>` | Пакет запросов.                    |
| `isHaltOnError` | `boolean`    | Прекращение выполнения при ошибке. |

Возвращает `Promise`, который разрешается в [`AjaxResult`](core-ajax-result)

### `getHttpClient` {#getHttpClient}
```ts
getHttpClient(): TypeHttp
```
Возвращает HTTP клиент реализующий интерфейс [TypeHttp](types-type-http) для запросов.