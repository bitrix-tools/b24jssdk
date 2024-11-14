---
outline: deep
---
# `Type` {#Type}

Объект `Type` класса `TypeManager` предназначен для проверки и определения различных типов данных в JavaScript. 
Он предоставляет методы для проверки примитивных типов, объектов, массивов, DOM-узлов и других структур данных.

```ts
import { Type, LoggerBrowser } from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('Test', import.meta.env?.DEV === true)
const testString: any = undefined

$logger.info('isStringFilled:', Type.isStringFilled(testString), testString)
// isStringFilled: false undefined ////
```

## Методы {#methods}

### `getTag`
```ts
getTag(value: any): string`

Возвращает строковое представление типа объекта, используя метод `Object.prototype.toString`.

### `isString`
```ts
isString(value: any): boolean
```

Проверяет, является ли значение строкой.

### `isStringFilled`
```ts
isStringFilled(value: any): boolean
```

Возвращает `true`, если значение является непустой строкой.

### `isFunction`
```ts
isFunction(value: any): boolean
```

Проверяет, является ли значение функцией.

### `isObject`
```ts
isObject(value: any): boolean
```

Проверяет, является ли значение объектом или функцией.

### `isObjectLike`
```ts
isObjectLike(value: any): boolean
```

Проверяет, является ли значение объектоподобным (не `null` и тип `object`).

### `isPlainObject`
```ts
isPlainObject(value: any): boolean
```

Проверяет, является ли значение простым объектом (созданным через `{}` или `new Object()`).

### `isJsonRpcRequest`
```ts
isJsonRpcRequest(value: any): boolean
```

Проверяет, является ли значение JSON-RPC запросом.

### `isJsonRpcResponse`
```ts
isJsonRpcResponse(value: any): boolean
```

Проверяет, является ли значение JSON-RPC ответом.

### `isBoolean`
```ts
isBoolean(value: any): boolean
```

Проверяет, является ли значение булевым.

### `isNumber`
```ts
isNumber(value: any): boolean
```

Проверяет, является ли значение числом.

### `isInteger`
```ts
isInteger(value: any): boolean
```

Проверяет, является ли значение целым числом.

### `isFloat`
```ts
isFloat(value: any): boolean
```

Проверяет, является ли значение числом с плавающей запятой.

### `isNil`
```ts
isNil(value: any): boolean
```

Проверяет, является ли значение `null` или `undefined`.

### `isArray`
```ts
isArray(value: any): boolean
```

Проверяет, является ли значение массивом.

### `isArrayFilled`
```ts
isArrayFilled(value: any): boolean
```

Возвращает `true`, если значение является массивом и содержит хотя бы один элемент.

### `isArrayLike`
```ts
isArrayLike(value: any): boolean
```

Проверяет, является ли значение массивоподобным (имеет свойство `length`).

### `isDate`
```ts
isDate(value: any): boolean
```

Проверяет, является ли значение объектом `Date`.

### `isDomNode`
```ts
isDomNode(value: any): boolean
```

Проверяет, является ли значение DOM-узлом.

### `isElementNode`
```ts
isElementNode(value: any): boolean
```

Проверяет, является ли значение элементом DOM.

### `isTextNode`
```ts
isTextNode(value: any): boolean
```

Проверяет, является ли значение текстовым узлом DOM.

### `isMap`
```ts
isMap(value: any): boolean
```

Проверяет, является ли значение объектом `Map`.

### `isSet`
```ts
isSet(value: any): boolean
```

Проверяет, является ли значение объектом `Set`.

### `isWeakMap`
```ts
isWeakMap(value: any): boolean
```

Проверяет, является ли значение объектом `WeakMap`.

### `isWeakSet`
```ts
isWeakSet(value: any): boolean
```

Проверяет, является ли значение объектом `WeakSet`.

### `isPrototype`
```ts
isPrototype(value: any): boolean
```

Проверяет, является ли значение прототипом.

### `isRegExp`
```ts
isRegExp(value: any): boolean
```

Проверяет, является ли значение регулярным выражением.

### `isNull`
```ts
isNull(value: any): boolean
```

Проверяет, является ли значение `null`.

### `isUndefined`
```ts
isUndefined(value: any): boolean
```

Проверяет, является ли значение `undefined`.

### `isArrayBuffer`
```ts
isArrayBuffer(value: any): boolean
```

Проверяет, является ли значение объектом `ArrayBuffer`.

### `isTypedArray`
```ts
isTypedArray(value: any): boolean
```

Проверяет, является ли значение типизированным массивом.

### `isBlob`
```ts
isBlob(value: any): boolean
```

Проверяет, является ли значение объектом `Blob`.

### `isFile`
```ts
isFile(value: any): boolean
```

Проверяет, является ли значение объектом `File`.

### `isFormData`
```ts
isFormData(
	value: any
): boolean
```

Проверяет, является ли значение объектом `FormData`.

### `clone` {#clone}
```ts
clone(
	obj: any,
	bCopyObj: boolean = true
): any
```

Клонирует объект, создавая его глубокую копию, если `bCopyObj` равно `true`.