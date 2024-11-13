---
outline: deep
---
# Тип `TypeHttp` {#TypeHttp}

```ts
import { type TypeHttp } from '@bitrix24/b24jssdk'
```

## Методы {#methods}

### `setLogger(logger: LoggerBrowser): void`

Устанавливает [логгер](core-logger-browser).

| Параметр | Тип             | Описание              |
|----------|-----------------|-----------------------|
| `logger` | `LoggerBrowser` | Логгер для установки. |

### `getLogger(): LoggerBrowser`

Возвращает текущий [логгер](core-logger-browser).

### `batch(calls: any[]|object, isHaltOnError: boolean): Promise<Result>`

Выполняет пакетный запрос.

| Параметр        | Тип             | Описание                           |
|-----------------|-----------------|------------------------------------|
| `calls`         | `any[]\|object` | Пакет запросов.                    |
| `isHaltOnError` | `boolean`       | Прекращение выполнения при ошибке. |

Возвращает `Promise`, который разрешается в объект [`Result`](core-result).

### `call(method: string, params: object, start: number): Promise<AjaxResult>`

Вызывает метод с указанными параметрами.

| Параметр | Тип      | Описание           |
|----------|----------|--------------------|
| `method` | `string` | Метод для вызова.  |
| `params` | `object` | Параметры запроса. |
| `start`  | `number` | Начальная позиция. |

Возвращает `Promise`, который разрешается в объект [`AjaxResult`](core-ajax-result).

### `setRestrictionManagerParams(params: TypeRestrictionManagerParams): void`

Устанавливает [параметры](types-type-restriction-manager-params) для [менеджера ограничений](core-restriction-manager).

| Параметр | Тип                            | Описание                 |
|----------|--------------------------------|--------------------------|
| `params` | `TypeRestrictionManagerParams` | Параметры для установки. |

### `getRestrictionManagerParams(): TypeRestrictionManagerParams`

Возвращает [параметры](types-type-restriction-manager-params) для [менеджера ограничений](core-restriction-manager).

### `setLogTag(logTag?: string): void`

Устанавливает тег для логирования.

| Параметр | Тип      | Описание             |
|----------|----------|----------------------|
| `logTag` | `string` | Тег для логирования. |

### `clearLogTag(): void`

Очищает установленный тег для логирования.