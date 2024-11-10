---
outline: deep
---
# Result {#result}

Класс `Result` представляет собой объект, который используется для хранения результата выполнения операции,
включая статус успеха/неудачи, связанные данные и ошибки.

Он аналогичен классу `\Bitrix\Main\Result` из Bitrix Framework.

## Интерфейс `IResult`

```ts
import { type IResult } from '@bitrix24/b24jssdk'
```

Интерфейс `IResult` определяет структуру и методы объекта `Result`:

- `isSuccess`: Указывает, завершилась ли операция успешно (без ошибок).
- `setData(data: any): IResult`: Устанавливает данные, связанные с результатом.
- `getData(): any`: Возвращает данные, связанные с результатом.
- `addError(error: Error|string): IResult`: Добавляет сообщение об ошибке или объект ошибки к результату.
- `addErrors(errors: (Error|string)[]): IResult`: Добавляет несколько ошибок к результату за один вызов.
- `getErrors(): IterableIterator<Error>`: Возвращает итератор для ошибок, собранных в результате.
- `getErrorMessages(): string[]`: Возвращает массив строк с сообщениями об ошибках.
- `[Symbol.toPrimitive](hint: string): string | number`: Преобразует объект `Result` в примитивное значение.

## Класс `Result`

```ts
import { Result } from '@bitrix24/b24jssdk'

const result = new Result()
```

### isSuccess

```ts
get isSuccess(): boolean
```

Возвращает `true`, если коллекция ошибок пуста, что указывает на успешное выполнение операции.

### setData

```ts
setData(data: any): Result
```

| Параметр | Тип    | Описание                         |
|----------|--------|----------------------------------|
| `data`   | `any`  | Данные, которые нужно сохранить. |

Устанавливает данные, связанные с результатом, и возвращает текущий объект `Result` для цепочки вызовов.

### getData

```ts
getData(): any
```

Возвращает данные, связанные с результатом.

### addError

```ts
addError(error: Error|string): Result
```

| Параметр | Тип                  | Описание                                     |
|----------|----------------------|----------------------------------------------|
| `error`  | `Error` \| `string`  | Сообщение об ошибке или объект ошибки.       |

Добавляет сообщение об ошибке или объект ошибки к результату и возвращает текущий объект `Result` для цепочки вызовов.

### addErrors

```ts
addErrors(errors: (Error|string)[]): Result
```

| Параметр | Тип                       | Описание                                          |
|----------|---------------------------|---------------------------------------------------|
| `errors` | (`Error` \| `string`)[]   | Массив сообщений об ошибках или объектов ошибок.  |

Добавляет несколько ошибок к результату за один вызов и возвращает текущий объект `Result` для цепочки вызовов.

### getErrors

```ts
getErrors(): IterableIterator<Error>
```

Возвращает итератор для объектов ошибок, собранных в результате.

### getErrorMessages

```ts
getErrorMessages(): string[]
```

Возвращает массив строк, представляющих сообщения об ошибках.

### toString

```ts
toString(): string
```

Преобразует объект `Result` в строку, возвращая строковое представление результата операции.

Если операция успешна, возвращает строку с данными.

Если операция завершилась с ошибками, возвращает строку с сообщениями об ошибках.

## Пример использования

```ts
import { Result, LoggerBrowser } from '@bitrix24/b24jssdk'

const logger = LoggerBrowser.build(
	'Demo: Result',
	true
);

// This function contains errors ////
function proc1(): Result
{
	const result = new Result()
	if(1 > 0)
	{
		return result.addError(new Error('Some error 1'));
	}
	
	return result.setData({someKey1: 'This data will not be used'});
}

// This function does not contain an error ////
function proc2(): Result
{
	const result = new Result()
	if(1 > 2)
	{
		return result.addError(new Error('Some error 2'));
	}
	
	return result.setData({someKey2: 'This data will be used'});
}

const result = new Result()
result.setData({
	someKey0: 'SomeData'
})

if(result.isSuccess)
{
	// proc1 returns a non-successful response ////
	const response = proc1()
	if(!response.isSuccess)
	{
		// this code works ////
		result.addErrors([
			...response.getErrors()
		])
	}
	else
	{
		result.setData(Object.assign(
			result.getData(),
			response.getData()
		))
	}
}

if(result.isSuccess)
{
	// this code does not work ////
	const response = proc2()
	if(!response.isSuccess)
	{
		result.addErrors([
			...response.getErrors()
		])
	}
	else
	{
		result.setData(Object.assign(
			result.getData(),
			response.getData()
		))
	}
}

if(!result.isSuccess)
{
	// this code works ////
	logger.error(result.getErrorMessages());
}
else
{
	logger.log(result.getData());
}
```

Этот пример демонстрирует, как использовать класс `Result` для хранения данных и обработки ошибок в результате выполнения операции.

- Создается новый объект `Result` и устанавливаются начальные данные `{someKey0: 'SomeData'}`.
- Проверяется, успешен ли текущий результат (`result.isSuccess`):
	- **Вызов `proc1`:**
      - Если `proc1` возвращает неуспешный результат, ошибки из `proc1` добавляются в текущий результат.
      - Если `proc1` успешен, данные из `proc1` объединяются с текущими данными.
	- **Вызов `proc2`:**
      - Если `proc2` возвращает неуспешный результат, ошибки из `proc2` добавляются в текущий результат.
      - Если `proc2` успешен, данные из `proc2` объединяются с текущими данными.
- **Итог**
  - Функция `proc1` всегда возвращает ошибку, поэтому итоговый результат будет неуспешным.
  - `logger.log` выведет сообщение об ошибке `['Some error 1']`, так как `proc1` добавляет ошибку в результат.
- 

::: tip
Работу с **Result** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/core/use-result.client.vue).
:::