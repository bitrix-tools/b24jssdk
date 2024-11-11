---
outline: deep
---
# Класс `Http` {#Http}

Предназначен для работы с запросами к REST API Битрикс24 через HTTP.

Реализует интерфейс [`TypeHttp`](types-type-http).

Он использует библиотеку [`axios`](https://github.com/axios/axios) для выполнения HTTP-запросов.

Обрабатывает ошибки авторизации и автоматически обновляет токен доступа при необходимости.

Создает объект [`RestrictionManager`](core-restriction-manager) для управления ограничениями интенсивности запросов.

Создает объект [`DefaultRequestIdGenerator`](core-request-id-generator) для генерации уникальных идентификаторов запросов.

::: tip
Работу с **Http** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/testing-rest-api-calls.client.vue).
:::