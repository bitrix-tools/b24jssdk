---
outline: deep
---
# Интерфейс `IRequestIdGenerator` {#IRequestIdGenerator}

Используется для генерации уникальных идентификаторов запросов и получения связанных с ними параметров.

```ts
import { type IRequestIdGenerator } from '@bitrix24/b24jssdk'
```

## Методы {#methods}

### `getRequestId`
```ts
getRequestId(): string
```

Генерирует и возвращает уникальный идентификатор запроса.

### `getHeaderFieldName`
```ts
getHeaderFieldName(): string
```

Возвращает имя поля заголовка, используемого для передачи идентификатора запроса.

### `getQueryStringParameterName`
```ts
getQueryStringParameterName(): string
```

Возвращает имя параметра строки запроса, используемого для передачи идентификатора запроса.

### `getQueryStringSdkParameterName`
```ts
getQueryStringSdkParameterName(): string
```

Возвращает имя параметра строки запроса, используемого для передачи идентификатора SDK.