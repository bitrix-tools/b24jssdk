---
outline: deep
---
# Менеджер ограничений

Управляет ограничениями интенсивности запросов к API Битрикс24. Он отслеживает интенсивность
запросов отдельно для каждого аккаунта Битрикс24 и учитывает IP-адрес, с которого выполняется запрос.

::: tip
Работу с **Менеджером ограничений** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/testing-rest-api-calls.client.vue).
:::

## Класс `RestrictionManager` {#RestrictionManager}

Подключается в классе [`Http`](core-http)

### Свойства

- **`params`**: [`TypeRestrictionManagerParams`](types-type-restriction-manager-params) - Параметры менеджера ограничений.

Можно получить и установить любые параметры.

> По умолчанию используются [`RestrictionManagerParamsBase`](#RestrictionManagerParamsBase). 
> 
> В редакциях Битрикс24 `Enterprise` стоит использовать [`RestrictionManagerParamsForEnterprise`](#RestrictionManagerParamsForEnterprise).

#### Пример
::: code-group

```ts [RestrictionManagerParamsForEnterprise]
import {
	B24Hook,
	RestrictionManagerParamsForEnterprise
} from '@bitrix24/b24jssdk'

const $b24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})

$b24.getHttpClient().setRestrictionManagerParams(
	RestrictionManagerParamsForEnterprise
)
```

```ts [Custom]
import {
	B24Hook
} from '@bitrix24/b24jssdk'

const $b24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})

$b24.getHttpClient().setRestrictionManagerParams({
	sleep: 600,
	speed: 0.01,
	amount: 30 * 5
})

```
:::

### Методы

#### `setLogger(logger: LoggerBrowser): void`

Устанавливает [логгер](core-logger-browser) для менеджера ограничений.

| Параметр | Тип             | Описание              |
|----------|-----------------|-----------------------|
| `logger` | `LoggerBrowser` | Логгер для установки. |

#### `getLogger(): LoggerBrowser`

Возвращает текущий [логгер](core-logger-browser). Если логгер не установлен, создается и возвращается `NullLogger`.

#### `check(hash: string = ''): Promise<null>`

Проверяет возможность выполнения запроса без превышения лимитов. Если лимиты превышены, выполняется ожидание.

| Параметр | Тип      | Описание                           |
|----------|----------|------------------------------------|
| `hash`   | `string` | Хэш для логирования (опционально). |

## Константы

### `RestrictionManagerParamsBase` {#RestrictionManagerParamsBase}

```ts
import { RestrictionManagerParamsBase } from '@bitrix24/b24jssdk'
```
Базовые параметры для менеджера ограничений.

- **`sleep`**: `1_000` (время ожидания в миллисекундах)
- **`speed`**: `0.001` (скорость обработки)
- **`amount`**: `30` (количество обрабатываемых элементов)

### `RestrictionManagerParamsForEnterprise` {#RestrictionManagerParamsForEnterprise}

```ts
import { RestrictionManagerParamsForEnterprise } from '@bitrix24/b24jssdk'
```
Параметры для менеджера ограничений, предназначенные для использования в редакциях Битрикс24 `Enterprise`.

- **`sleep`**: `600` (время ожидания в миллисекундах)
- **`speed`**: `0.01` (скорость обработки)
- **`amount`**: `150` (количество обрабатываемых элементов)
