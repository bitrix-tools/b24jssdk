---
outline: deep
---
# Класс `CurrencyManager` {#CurrencyManager}

Используется для управления данными валют в Битрикс24. Он расширяет функциональность [`AbstractHelper`](helper-abstract-helper) и предоставляет методы 
для форматирования и получения информации о валютах.

::: tip
Работу с **CurrencyManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Геттеры {#getters}

### `data` {#data}
```ts
get data(): {
	currencyBase: string,
	currencyList: Map<string, Currency>
}
```

Возвращает данные валют:
- **код базовой** валюты
- **список** валют [`Currency`](#currency).

### `baseCurrency` {#baseCurrency}
```ts
get baseCurrency(): string
```

Возвращает код базовой валюты.

### `currencyList` {#currencyList}
```ts
get currencyList(): string[]
```

Возвращает список кодов всех валют.

## Методы {#methods}

~~### `format` {#format}
```ts
format(
	value: number,
	currencyCode: string,
	langCode: string
): string
```

Форматирует значение в соответствии с настройками валюты и языка.~~

### `getCurrencyFullName` {#getCurrencyFullName}
```ts
getCurrencyFullName(
	currencyCode: string,
	langCode: string
): string
```

Возвращает полное название валюты для заданного кода валюты и языка.

### `getCurrencyLiteral` {#getCurrencyLiteral}
```ts
getCurrencyLiteral(
	currencyCode: string,
	langCode: string
): string
```

Возвращает строковое представление валюты для заданного кода валюты и языка.

## Типы данных {#types}

### `Currency` {#currency}

Тип `Currency` представляет информацию о валюте.

- **`amount: number`**: Сумма.
- **`amountCnt: number`**: Количество единиц.
- **`isBase: boolean`**: Флаг, указывающий, является ли это базовой валютой.
- **`currencyCode: string`**: Код валюты.
- **`dateUpdate: DateTime`**: Дата обновления.
- **`decimals: number`**: Количество десятичных знаков.
- **`decPoint: string`**: Десятичный разделитель.
- **`formatString: string`**: Строка формата.
- **`fullName: string`**: Полное название валюты.
- **`lid: string`**: Идентификатор языка.
- **`sort: number`**: Порядок сортировки.
- **`thousandsSep?: string`**: Разделитель тысяч.
- **`lang: Record<string, CurrencyFormat>`**: Форматы валюты для разных языков.


### `CurrencyFormat` {#CurrencyFormat}

Тип `CurrencyFormat` представляет формат валюты.

- **`decimals: number`**: Количество десятичных знаков.
- **`decPoint: string`**: Десятичный разделитель.
- **`formatString: string`**: Строка формата.
- **`fullName: string`**: Полное название валюты.
- **`isHideZero: boolean`**: Флаг, указывающий, скрывать ли нули.
- **`thousandsSep?: string`**: Разделитель тысяч.
- **`thousandsVariant?: 'N'|'D'|'C'|'S'|'B'|'OWN'|string`**: Вариант разделителя тысяч.
