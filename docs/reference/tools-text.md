---
outline: deep
---
# `Text` {#Text}

Объект `Text` класса `TextManager` предоставляет методы для работы с текстовыми данными, включая кодирование и 
декодирование HTML-сущностей, генерацию случайных строк, преобразование значений в различные типы данных, 
изменение регистра и формата строк.

>- Использует библиотеку [`luxon`](https://moment.github.io/luxon/) для работы с датами и временем.
>- Методы обеспечивают удобные преобразования и манипуляции с текстовыми данными, что может быть полезно для обработки пользовательского ввода и форматирования данных.

```ts
import { Text, LoggerBrowser } from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('Test', import.meta.env?.DEV === true)

$logger.info(`${Text.getDateForLog()} UuidRfc4122:`, Text.getUuidRfc4122())
// 2012-04-12 09:53:51 UuidRfc4122: 019323ac-8ace-725b-a3dc-6a7c333da066 ////
```

## Методы {#methods}

### `getRandom(length = 8): string`

Генерирует случайную строку заданной длины, состоящую из символов [a-z0-9].

```ts
$logger.info(Text.getRandom(15))
// cavomfautfjwr7n ////
```

### `getUniqId(): string`

Генерирует уникальный идентификатор в формате UUID.

```ts
$logger.info(Text.getUniqId())
// 212c0ca2-4lse-4e03-b0a8-adc1f661d64b ////
```

### `getUuidRfc4122(): string`

Генерирует UUID версии 7.

```ts
$logger.info(Text.getUuidRfc4122())
// 019323b3-7926-70c1-9e2a-81c2e48fb04c ////
```

### `encode(value: string): string`

Кодирует все небезопасные HTML-сущности в строке.

```ts
const testString =  `<${'s'}cript>alert('test');<\/${'s'}cript>`
$logger.info(Text.encode(testString))
// &ltscript&gtalert(&#39test&#39);&lt/script&gt ////
```

### `decode(value: string): string`

Декодирует все закодированные HTML-сущности в строке.

```ts
const testString =  `&ltscript&gtalert(&#39test&#39);&lt/script&gt`
$logger.info(Text.decode(testString)) // <script>alert('test');</script> ////
```

### `toNumber(value: any): number`

Преобразует значение в число. Возвращает 0.0, если преобразование невозможно.

```ts
$logger.info(Text.toNumber(`123.44`)) // 123.44 ////
```

### `toInteger(value: any): number`

Преобразует значение в целое число.

```ts
$logger.info(Text.toInteger(`123.44`)) // 123 ////
$logger.info(Text.toInteger(123.44)) // 123 ////
```

### `toBoolean(value: any, trueValues = []): boolean`

Преобразует значение в булево. Сравнивает значение с `'true'`, `y`, `1`, `true`, а также с дополнительными значениями из `trueValues`.

```ts
$logger.info(Text.toBoolean(`1`)) // true ////
$logger.info(Text.toBoolean(1)) // true ////
$logger.info(Text.toBoolean(`0`)) // false ////
$logger.info(Text.toBoolean(0)) // false ////
$logger.info(Text.toBoolean('y')) // true ////
$logger.info(Text.toBoolean('Y')) // true ////
$logger.info(Text.toBoolean('true')) // true ////
$logger.info(Text.toBoolean('TRUE')) // true ////
$logger.info(Text.toBoolean('ok', ['ok', 'success'])) // true ////
$logger.info(Text.toBoolean('success', ['ok', 'success'])) // true ////
$logger.info(Text.toBoolean('fail', ['ok', 'success'])) // false ////
```

### `toCamelCase(str: string): string`

Преобразует строку в camelCase.

```ts
$logger.info(Text.toCamelCase('sOmE StrIng')) // someString ////
```

### `toPascalCase(str: string): string`

Преобразует строку в PascalCase.

```ts
$logger.info(Text.toPascalCase('sOmE StrIng')) // SomeString ////
```

### `toKebabCase(str: string): string`

Преобразует строку в kebab-case.

```ts
$logger.info(Text.toPascalCase('sOmE StrIng')) // s-om-e-str-ing ////
$logger.info(Text.toKebabCase('some string')) // some-string ////
$logger.info(Text.toKebabCase('someString')) // some-string ////
```

### `capitalize(str: string): string`

Возвращает строку с заглавной первой буквой.

```ts
$logger.info(Text.capitalize('some string')) // Some string ////
```

### `numberFormat(number: number, decimals: number = 0, decPoint: string = '.', thousandsSep: string = ','): string`

Форматирует число с заданным количеством десятичных знаков, разделителем десятичных знаков и разделителем тысяч.

```ts
$logger.info(Text.numberFormat(15678.987)) // '15,679' ////
$logger.info(Text.numberFormat(15678.987, 2)) // '15,678.99' ////
$logger.info(Text.numberFormat(15678.987, 2, ',', ' ')) // '15 678,99' ////
$logger.info(Text.numberFormat(15678.984, 2, ',', ' ')) // '15 678,98' ////
```

### `toDateTime(dateString: string, template?: string, opts?: DateTimeOptions): DateTime`

Преобразует строку в объект [`DateTime`](tools-date-time) из ISO 8601 или по заданному шаблону.

[Подробнее](https://moment.github.io/luxon/#/parsing?id=parsing-technical-formats) про декодирование

```ts
$logger.info(Text.toDateTime('2012-04-12T09:53:51').toFormat('HH:mm:ss y-MM-dd'))
// '09:53:51 2012-04-12' ////
```
### `getDateForLog(): string`

Возвращает текущую дату и время.

```ts
$logger.info(Text.getDateForLog())
// '2012-04-12 09:53:51' ////
```

### `buildQueryString(params: any): string`

Создает строку запроса из объекта параметров.

```ts
$logger.info(Text.buildQueryString({
	par1: 'val_1',
	par2: [
		'val_21',
		'val_22',
	],
}))
// 'par1=val_1&par2%5B0%5D=val_21&par2%5B1%5D=val_22' ////
// 'par1=val_1&par2[0]=val_21&par2[1]=val_22' ////
```