---
outline: deep
---
# Класс `AjaxResult` {#AjaxResult}

Класс `AjaxResult` представляет собой результат запроса к REST API и расширяет класс [`Result`](core-result), реализуя 
интерфейс [`IResult`](types-interface-iresult).

## Конструктор {#constructor}

```ts
constructor(
	answer: AjaxResultParams,
	query: AjaxQuery,
	status: number
)
```

- **`answer`**: [`AjaxResultParams`](#AjaxResultParams) - Параметры ответа.
- **`query`**: [`AjaxQuery`](#AjaxQuery) - Запрос, который был выполнен.
- **`status`**: `number` - Статус ответа.

## Методы {#methods}

> **Примечание**: Метод `setData` не поддерживается в `AjaxResult` и вызовет ошибку при попытке использования.

##### `getData` {#getData}
```ts
getData(): Payload<unknown>
```

Извлекает данные, связанные с результатом.

##### `isMore` {#isMore}
```ts
isMore(): boolean
```

Проверяет, есть ли еще данные для запроса.

##### `getTotal` {#getTotal}
```ts
getTotal(): number
```

Возвращает общее количество элементов.

##### `getStatus` {#getStatus}
```ts
getStatus(): number
```

Возвращает статус ответа.

##### `getQuery` {#getQuery}
```ts
getQuery(): AjaxQuery
```

Возвращает [запрос](#AjaxQuery), который был выполнен.

##### `getNext` {#getNext}
```ts
getNext(
	http: TypeHttp
): Promise<false|AjaxResult>
```

Асинхронно получает следующий результат, если он доступен.

| Параметр | Тип        | Описание                            |
|----------|------------|-------------------------------------|
| `http`   | `TypeHttp` | HTTP клиент для выполнения запроса. |

Возвращает `Promise`, который разрешается в `AjaxResult` или `false`, если больше данных нет.

## Типы данных {#types}
### `AjaxResultParams` {#AjaxResultParams}

Тип `AjaxResultParams` используется для представления параметров результата запроса к API.

| Свойство            | Тип                                                  | Описание                                |
|---------------------|------------------------------------------------------|-----------------------------------------|
| `error`             | `string\|{error: string, error_description: string}` | Ошибка или объект ошибки.               |
| `error_description` | `string`                                             | Описание ошибки.                        |
| `result`            | `any`                                                | Результат запроса.                      |
| `next`              | `NumberString`                                       | Следующий элемент (если есть).          |
| `total`             | `NumberString`                                       | Общее количество элементов (если есть). |

### `AjaxQuery` {#AjaxQuery}

Тип `AjaxQuery` используется для представления запроса к API.

| Свойство | Тип      | Описание           |
|----------|----------|--------------------|
| `method` | `string` | Метод запроса.     |
| `params` | `{}`     | Параметры запроса. |
| `start`  | `number` | Начальная позиция. |

