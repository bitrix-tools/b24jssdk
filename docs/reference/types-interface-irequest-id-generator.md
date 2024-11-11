---
outline: deep
---
# Интерфейс `IRequestIdGenerator` {#IRequestIdGenerator}

Используется для генерации уникальных идентификаторов запросов и получения связанных с ними параметров.

```ts
import { type IRequestIdGenerator } from '@bitrix24/b24jssdk'
```

## Методы

### `getRequestId(): string`

Генерирует и возвращает уникальный идентификатор запроса.

### `getHeaderFieldName(): string`

Возвращает имя поля заголовка, используемого для передачи идентификатора запроса.

### `getQueryStringParameterName(): string`

Возвращает имя параметра строки запроса, используемого для передачи идентификатора запроса.

### `getQueryStringSdkParameterName(): string`

Возвращает имя параметра строки запроса, используемого для передачи идентификатора SDK.