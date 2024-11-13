---
outline: deep
---
# Хук `useFormatter` {#useFormatter}

Возвращает объекты `formatterNumber` и `formatterIban` для использования в приложении.

```ts
import { useFormatter, LoggerBrowser } from '@bitrix24/b24jssdk'

const { formatterIban, formatterNumber } = useFormatter()
const $logger = LoggerBrowser.build('Test', import.meta.env?.DEV === true)

$logger.info(formatterIban.printFormat('IT60X0542811101000000123456', ' '))
// IT60 X054 2811 1010 0000 0123 456 ////

$logger.info(formatterNumber.format(15678.987, B24LangList.de)) // 15.678,99 ///
```

## `FormatterIban` {#formatterIban}

Предоставляет методы для работы с IBAN, включая валидацию и преобразование в BBAN.

### Методы {#methods-formatterIban}

- **`isValid(iban: string): boolean`**: Проверяет, является ли IBAN валидным.
- **`printFormat(iban: string, separator?: string): string`**: Форматирует IBAN с указанным разделителем.
- **`electronicFormat(iban: string): string`**: Преобразует IBAN в электронный формат.
- **`toBBAN(iban: string, separator?: string): string`**: Конвертирует IBAN в BBAN.
- **`fromBBAN(countryCode: string, bban: string): string`**: Конвертирует BBAN в IBAN.
- **`isValidBBAN(countryCode: string, bban: string): boolean`**: Проверяет, является ли BBAN валидным.

```ts
$logger.info(formatterIban.printFormat('IT60X0542811101000000123456', ' '))
// IT60 X054 2811 1010 0000 0123 456 ////
```

::: tip
Работу с **formatterIban** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/tools/iban.server.vue).
:::

## `FormatterNumbers` {#formatterNumbers}

Предоставляет методы для форматирования чисел в зависимости от локали.

### Методы {#methods-formatterNumbers}

- **`setDefLocale(locale: string): void`**: Устанавливает локаль по умолчанию.
- **`format(value: number, locale?: string): string`**: Форматирует число в зависимости от указанной локали.

```ts
$logger.info(formatterNumber.format(15678.987, B24LangList.en)) // 15,678.99 ///
$logger.info(formatterNumber.format(15678.987, B24LangList.de)) // 15.678,99 ///
$logger.info(formatterNumber.format(15678.987, B24LangList.ru)) // 15 678.99 ///
```