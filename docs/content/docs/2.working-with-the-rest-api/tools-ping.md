---
title: Ping.make()
description: 'Метод для измерения скорости ответа REST API Bitrix24. Выполняет тестовый запрос и возвращает время ответа в миллисекундах.'
category: 'tools'
audited: 2026-06-25
navigation.title: Ping
links:
  - label: Ping
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/core/tools/ping.ts
---

## Обзор {#overview}

Используйте `Ping.make()`{lang="ts-type"} для измерения времени ответа REST API Bitrix24. Метод возвращает `Promise` с числовым значением времени ответа в миллисекундах.

```ts
// Базовое использование
const responseTime = await $b24.tools.ping.make()

if (responseTime >= 0) {
  console.log(`API response time: ${responseTime}ms`)
} else {
  console.error('Failed to measure API response time')
}
```

## Сигнатура метода {#method-signature}

```ts-type
make(
  options?: { requestId?: string }
): Promise<number>
```

### Параметры {#parameters}

| Параметр | Тип | Обязательный | Описание |
|----|----|----|----|
| **`requestId`** | `string`{lang="ts-type"} | Нет | Уникальный идентификатор запроса для отслеживания. Используется для дедупликации запросов и отладки. |

### Возвращаемое значение {#return-value}

`Promise<number>`{lang="ts-type"} — promise, который разрешается числовым значением:

- **Положительное число** — время ответа в миллисекундах от отправки запроса до получения ответа.
- **`-1`** — в случае ошибки или таймаута.

## Обработка ошибок {#error-handling}

`Ping.make()`{lang="ts-type"} никогда не выбрасывает исключений. Сетевые сбои, HTTP-ошибки, неверные учётные данные и таймауты — всё проглатывается внутри и возвращается как `-1`. Со стороны вызова нет способа различить виды сбоев — для этого используйте [`HealthCheck.make()`](/docs/working-with-the-rest-api/tools-health-check/) или вызывайте нижележащий метод напрямую через [`CallV2.make()`](/docs/working-with-the-rest-api/call-rest-api-ver2/) и проверяйте `AjaxResult`.

## Примеры {#examples}

### Измерение времени ответа {#measuring-response-time}

::code-example
---
name: 'tools-ping'
---
::

## Альтернативы и рекомендации {#alternatives-and-recommendations}

* **Для проверки доступности**: используйте [`HealthCheck`](/docs/working-with-the-rest-api/tools-health-check/).
* **Для измерения производительности операций**: выполняйте замеры времени для конкретных методов API.
* **На клиентской стороне (браузер):** используйте встроенный объект [`B24Frame`](/docs/getting-started/installation/vue/#init).
