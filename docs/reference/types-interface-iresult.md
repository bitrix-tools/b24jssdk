---
outline: deep
---
# Интерфейс `IResult`

```ts
import { type IResult } from '@bitrix24/b24jssdk'
```

Реализация:
- [Result](core-result)
	- [AjaxResult](core-ajax-result)

## Геттеры {#getters}

### `isSuccess` {#isSuccess}
```ts
get isSuccess(): boolean
```

Указывает, завершилась ли операция успешно (без ошибок)

## Методы {#methods}

### `setData`
```ts
setData(
	data: any
): IResult
```

Устанавливает данные, связанные с результатом.

Возвращает текущий объект для цепочки вызовов.

### `getData`
```ts
getData(): any
```

Извлекает данные, связанные с результатом.

Возвращает данные, сохраненные в результате, если они есть.

### `addError`
```ts
addError(
	error: Error|string
): IResult
```
Добавляет сообщение об ошибке или объект `Error` к результату.

Возвращает текущий объект для цепочки вызовов.

### `addErrors
```ts
addErrors(
	errors: (Error|string)[]
): IResult
```

Добавляет несколько ошибок к результату за один вызов.

Возвращает текущий объект для цепочки вызовов.

### `getErrors`
```ts
getErrors(): IterableIterator<Error>
```

Извлекает итератор для ошибок, собранных в результате.

Возвращает итератор по сохраненным объектам `Error`.

### `getErrorMessages`
```ts
getErrorMessages(): string[]
```

Извлекает массив сообщений об ошибках из собранных ошибок.

Возвращает массив строк, представляющих сообщения об ошибках.

### `toString`
```ts
toString(): string
```

Преобразует данные в строку.

Возвращает строковое представление операции результата.
