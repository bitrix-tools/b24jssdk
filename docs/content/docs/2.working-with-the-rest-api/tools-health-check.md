---
title: HealthCheck.make()
description: 'Метод для проверки доступности REST API Bitrix24. Выполняет простой запрос к REST API для проверки работоспособности сервиса.'
category: 'tools'
audited: 2026-06-25
navigation.title: HealthCheck
links:
  - label: HealthCheck
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/core/tools/healthcheck.ts
---

## Обзор {#overview}

Используйте `HealthCheck.make()`{lang="ts-type"} для проверки доступности REST API Bitrix24. Метод возвращает `Promise` с булевым значением, указывающим на доступность API.

```ts
// Базовое использование
const isHealthy = await $b24.tools.healthCheck.make()

if (isHealthy) {
  console.log('Bitrix24 API is available')
} else {
  console.error('Problems accessing Bitrix24 API')
}
```

## Сигнатура метода {#method-signature}

```ts-type
make(
  options?: { requestId?: string }
): Promise<boolean>
```

### Параметры {#parameters}

| Параметр | Тип | Обязательный | Описание |
|----|----|----|----|
| **`requestId`** | `string`{lang="ts-type"} | Нет | Уникальный идентификатор запроса для отслеживания. Используется для дедупликации запросов и отладки. |

### Возвращаемое значение {#return-value}

`Promise<boolean>`{lang="ts-type"} — promise, который разрешается булевым значением:

- **`true`** — REST API доступен и отвечает, вебхук настроен корректно.
- **`false`** — REST API недоступен, произошла ошибка или отсутствуют необходимые права доступа.

## Обработка ошибок {#error-handling}

`HealthCheck.make()`{lang="ts-type"} никогда не выбрасывает исключений. Сетевые сбои, HTTP-ошибки, отсутствующие scope и таймауты — всё сводится к возврату `false`. Метод намеренно сделан «чёрным ящиком» — для информации об ошибке, с которой можно работать, вызывайте нижележащий метод напрямую через [`CallV2.make()`](/docs/working-with-the-rest-api/call-rest-api-ver2/) и проверяйте `AjaxResult` (`isSuccess`, `getErrorMessages()`).

## Примеры {#examples}

### Проверка доступности {#availability-check}

::code-example
---
name: 'tools-health-check'
---
::

## Альтернативы и рекомендации {#alternatives-and-recommendations}

* **Для измерения скорости ответа**: используйте [`Ping`](/docs/working-with-the-rest-api/tools-ping/).
* **Для проверки конкретных прав**: выполните тестовый запрос к нужному методу API.
* **На клиентской стороне (браузер):** используйте встроенный объект [`B24Frame`](/docs/getting-started/installation/vue/#init).
