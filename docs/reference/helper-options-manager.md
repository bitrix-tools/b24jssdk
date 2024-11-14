---
outline: deep
---
# Класс `OptionsManager` {#OptionsManager}

Используется для управления опциями приложения или пользователя в Битрикс24. Он расширяет функциональность[`AbstractHelper`](helper-abstract-helper) и предоставляет методы 
для получения, кодирования и сохранения опций.

::: tip
Работу с **OptionsManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/app.options.client.vue) 
и [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/user.options.client.vue).
:::

## Геттеры {#getters}

### `data` {#data}
```ts
get data(): Map<string, any>
```

Возвращает `Map` данных опций.

## Методы {#methods}
### `getSupportTypes` {#getSupportTypes}
```ts
static getSupportTypes(): TypeOption[]
```

Возвращает массив поддерживаемых типов опций [`TypeOption`](#typeOption).

### `prepareArrayList` {#prepareArrayList}
```ts
static prepareArrayList(list: any): any[]
```

Преобразует входные данные в массив, если это возможно.

### `reset` {#reset}
```ts
reset(): void
```

Сбрасывает данные опций

### `getJsonArray` {#getJsonArray}
```ts
getJsonArray(
	key: string,
	defValue: any[] = []
): any[]
```

Возвращает значение опции как массив.

### `getJsonObject` {#getJsonObject}
```ts
getJsonObject(
	key: string,
	defValue: Object = {}
): Object
```

Возвращает значение опции как объект.

### `getFloat` {#getFloat}
```ts
getFloat(
	key: string,
	defValue: number = 0.0
): number
```

Возвращает значение опции как число с плавающей запятой.

### `getInteger` {#getInteger}
```ts
getInteger(
	key: string,
	defValue: number = 0
): number
```

Возвращает значение опции как целое число.

### `getBoolYN` {#getBoolYN}
```ts
getBoolYN(
	key: string,
	defValue: boolean = true
): boolean
```

Возвращает значение опции как булево значение (да/нет).

### `getBoolNY` {#getBoolNY}
```ts
getBoolNY(
	key: string,
	defValue: boolean = false
): boolean
```

Возвращает значение опции как булево значение (нет/да).

### `getString` {#getString}
```ts
getString(
	key: string,
	defValue: string = ''
): string
```

Возвращает значение опции как строку.

### `getDate` {#getDate}
```ts
getDate(
	key: string,
	defValue: null|DateTime = null
): null|DateTime
```

Возвращает значение опции как объект [`DateTime`](tools-date-time).

### `encode` {#encode}
```ts
encode(
	value: any
): string
```

Кодирует значение в строку JSON

### `decode` {#decode}
```ts
decode(
	data: string,
	defaultValue: any
): any
```

Декодирует строку JSON в объект.

### `save` {#save}
```ts
async save(
	options: any,
	optionsPull?: {
		moduleId: string,
		command: string,
		params: any
	}
): Promise<Result>
```

Сохраняет опции и отправляет событие через [`Pull`](pull-client)

## Типы данных {#types}

### `TypeOption` {#typeOption}

Перечисление `TypeOption` определяет типы опций.

- **`NotSet`**: Не установлено.
- **`JsonArray`**: JSON массив.
- **`JsonObject`**: JSON объект.
- **`FloatVal`**: Число с плавающей запятой.
- **`IntegerVal`**: Целое число.
- **`BoolYN`**: Булево значение (да/нет).
- **`StringVal`**: Строка.
