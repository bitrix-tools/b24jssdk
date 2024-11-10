---
outline: deep
---
# Логирование в браузере {#logger-for-browser}

Класс `LoggerBrowser` предоставляет структурированный способ ведения логов в браузерной среде с различными уровнями логирования и стилями.

Он позволяет выводить сообщения различных уровней детализации с форматированием.

## Уровни логирования {#enum-logger-type}

`LoggerType` - это перечисление (enum), которое определяет различные уровни сообщений журнала:

```js
import { LoggerType } from '@bitrix24/b24jssdk'
```

| Код       | По умолчанию | Описание                                                                                                       |
|-----------|--------------|----------------------------------------------------------------------------------------------------------------|
| `desktop` | Да           | Предназначено для вывода сообщений, специфичных для настольного приложения (обычно не отображается в браузере) |
| `log`     | Нет          | Общие лог-сообщения                                                                                            |
| `info`    | Нет          | Информационные сообщения, важные для понимания работы приложения                                               |
| `warn`    | Нет          | Предупреждения о потенциальных проблемах.                                                                      |
| `error`   | Да           | Ошибки приложения.                                                                                             |
| `trace`   | Да           | Подробные трассировки стека вызовов для отладки.                                                               |


## LoggerBrowser {#class-logger-browser}

```js
import { LoggerBrowser } from '@bitrix24/b24jssdk'
```

Класс `LoggerBrowser` предоставляет методы для:

- Конфигурирования разрешенных уровней сообщений журнала.
- Форматирования и вывода сообщений в консоль с разными уровнями (_LoggerType.desktop_, _LoggerType.log_, _LoggerType.info_, _LoggerType.warn_, _LoggerType.error_, _LoggerType.trace_).


### Создание {#LoggerBrowser-build}
```ts
static build(
	title: string,
	isDevelopment: boolean = false
): LoggerBrowser
```
Создает и настраивает новый экземпляр `LoggerBrowser`:

| Параметр         | Тип      | Описание                                                                                   |
|------------------|----------|--------------------------------------------------------------------------------------------|
| `title`          | string   | Заголовок для сообщений журнала. Будет использоваться при форматировании вывода сообщений. |
| `isDevelopment`  | boolean  | Если `true`, включает логирование уровней `log`, `info`, и `warn`                          |


### Управление
- `setConfig(types: Record<string|LoggerType, boolean>): void`: Устанавливает разрешенные типы сообщений.
- `enable(type: LoggerType): boolean`: Включает конкретный тип сообщения. Возвращает `true`, если успешно, `false` в противном случае.
- `disable(type: LoggerType): boolean`: Отключает конкретный тип сообщения. Возвращает `true`, если успешно, `false` в противном случае.
- `isEnabled(type: LoggerType): boolean`: Проверяет, включен ли указанный тип лога. Возвращает `true`, если включен, `false` в противном случае.

### Логирование

Каждый из этих методов принимает произвольное количество параметров (`params`),
которые будут выведены в консоль, если соответствующий тип лога включен:

- `desktop(...params: any[]): void`: Выводит сообщение на уровне **desktop**.
- `log(...params: any[]): void`: Выводит сообщение на уровне **log**.
- `info(...params: any[]): void`: Выводит сообщение на уровне **info**.
- `warn(...params: any[]): void`: Выводит сообщение на уровне **warn**.
- `error(...params: any[]): void`: Выводит сообщение на уровне **error**.
- `trace(...params: any[]): void`: Выводит сообщение на уровне **trace**.

## Пример
```ts
import { LoggerBrowser, LoggerType } from '@bitrix24/b24jssdk'

const logger = LoggerBrowser.build(
	'MyApp',
	import.meta.env?.DEV === true // or process.env?.NODE_ENV === 'development'
)

logger.info('>> start >>>')

if(process.env.NODE_ENV === 'development')
{
	logger.enable(LoggerType.log)
}

logger.log('Processing data')
logger.info('This is an informational message.')
logger.warn('A potential warning occurred')
logger.error('This is an error message.')

// ... other logical messages ////
```

Этот пример демонстрирует базовое использование `LoggerBrowser` для создания структурированного и настраиваемого журнала в браузере.

::: tip
Работу с **LoggerBrowser** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/tools/use-logger.client.vue).
:::