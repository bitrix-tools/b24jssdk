---
outline: deep
---
# Класс `PaymentManager` {#PaymentManager}

Используется для управления данными об оплате в Битрикс24. Он расширяет функциональность [`AbstractHelper`](helper-abstract-helper) и предоставляет
методы для получения данных об оплате приложения.

::: tip
Работу с **PaymentManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Геттеры {#getters}

### `data` {#data}
```ts
get data(): TypePayment
```

Возвращает данные об оплате приложения [`TypePayment`](#typePayment).

## Типы данных {#types}
### `TypePayment` {#typePayment}

Тип `TypePayment` представляет информацию об оплате приложения.

- **`isExpired: boolean`**: Флаг, указывающий, истек ли оплаченный или пробный период.
- **`days: number`**: Количество дней до окончания оплаченного или пробного периода.
