---
outline: deep
---
# Класс `LicenseManager` {#LicenseManager}

Используется для управления данными о лицензии Битрикс24. Он расширяет функциональность [`AbstractHelper`](helper-abstract-helper) и предоставляет методы
для получения данных о лицензии и настройки параметров [менеджера ограничений](core-restriction-manager).

::: tip
Работу с **LicenseManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Геттеры {#getters}

### `data` {#data}
```ts
get data(): TypeLicense
```

Возвращает данные лицензии [`TypeLicense`](#typeLicense).

## Методы {#methods}

### `makeRestrictionManagerParams` {#makeRestrictionManagerParams}
```ts
makeRestrictionManagerParams(): void
```
Вызывается автоматически при инициализации данных.

Настраивает параметры [`RestrictionManager`](core-restriction-manager) на основе лицензии.

Для `Enterprise` использует [`RestrictionManagerParamsForEnterprise`](core-restriction-manager#RestrictionManagerParamsForEnterprise).

## Типы данных {#types}

### `TypeLicense` {#typeLicense}

Тип `TypeLicense` представляет информацию о лицензии приложения.

- **`languageId: null|string`**: Код языка.
- **`license: null|string`**: Обозначение тарифа с указанием региона.
- **`licenseType: null|string`**: Внутреннее обозначение тарифа без указания региона.
- **`licensePrevious: null|string`**: Предыдущее значение лицензии.
- **`licenseFamily: null|string`**: Обозначение тарифа без указания региона.
- **`isSelfHosted: boolean`**: Флаг, указывающий, является ли это коробочной (`true`) или облачной (`false`) версией.