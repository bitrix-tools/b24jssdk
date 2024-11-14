---
outline: deep
---
# Класс Result {#result}
Класс представляет собой результат операции с указанием статуса успеха/неудачи, данных и ошибок.

Аналогичен классу `\Bitrix\Main\Result` из Bitrix Framework.

Реализует интерфейс [`IResult`](types-interface-iresult)

## Пример использования

```ts
import { Result, LoggerBrowser } from '@bitrix24/b24jssdk'

const logger = LoggerBrowser.build(
	'Demo: Result',
	import.meta.env?.DEV === true
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