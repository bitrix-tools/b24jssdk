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

> - Предоставляет обширный набор методов для проверки типов, что может быть полезно для валидации данных и работы с различными структурами данных в JavaScript.
> - Методы используют различные подходы для определения типов, включая проверку конструктора, тегов объектов и других характеристик.

## Методы {#methods}

### `getTag(value: any): string`

Возвращает строковое представление типа объекта, используя метод `Object.prototype.toString`.

### `isString(value: any): boolean`

Проверяет, является ли значение строкой.

### `isStringFilled(value: any): boolean`

Возвращает `true`, если значение является непустой строкой.

### `isFunction(value: any): boolean`

Проверяет, является ли значение функцией.

### `isObject(value: any): boolean`

Проверяет, является ли значение объектом или функцией.

### `isObjectLike(value: any): boolean`

Проверяет, является ли значение объектоподобным (не `null` и тип `object`).

### `isPlainObject(value: any): boolean`

Проверяет, является ли значение простым объектом (созданным через `{}` или `new Object()`).

### `isJsonRpcRequest(value: any): boolean`

Проверяет, является ли значение JSON-RPC запросом.

### `isJsonRpcResponse(value: any): boolean`

Проверяет, является ли значение JSON-RPC ответом.

### `isBoolean(value: any): boolean`

Проверяет, является ли значение булевым.

### `isNumber(value: any): boolean`

Проверяет, является ли значение числом.

### `isInteger(value: any): boolean`

Проверяет, является ли значение целым числом.

### `isFloat(value: any): boolean`

Проверяет, является ли значение числом с плавающей запятой.

### `isNil(value: any): boolean`

Проверяет, является ли значение `null` или `undefined`.

### `isArray(value: any): boolean`

Проверяет, является ли значение массивом.

### `isArrayFilled(value: any): boolean`

Возвращает `true`, если значение является массивом и содержит хотя бы один элемент.

### `isArrayLike(value: any): boolean`

Проверяет, является ли значение массивоподобным (имеет свойство `length`).

### `isDate(value: any): boolean`

Проверяет, является ли значение объектом `Date`.

### `isDomNode(value: any): boolean`

Проверяет, является ли значение DOM-узлом.

### `isElementNode(value: any): boolean`

Проверяет, является ли значение элементом DOM.

### `isTextNode(value: any): boolean`

Проверяет, является ли значение текстовым узлом DOM.

### `isMap(value: any): boolean`

Проверяет, является ли значение объектом `Map`.

### `isSet(value: any): boolean`

Проверяет, является ли значение объектом `Set`.

### `isWeakMap(value: any): boolean`

Проверяет, является ли значение объектом `WeakMap`.

### `isWeakSet(value: any): boolean`

Проверяет, является ли значение объектом `WeakSet`.

### `isPrototype(value: any): boolean`

Проверяет, является ли значение прототипом.

### `isRegExp(value: any): boolean`

Проверяет, является ли значение регулярным выражением.

### `isNull(value: any): boolean`

Проверяет, является ли значение `null`.

### `isUndefined(value: any): boolean`

Проверяет, является ли значение `undefined`.

### `isArrayBuffer(value: any): boolean`

Проверяет, является ли значение объектом `ArrayBuffer`.

### `isTypedArray(value: any): boolean`

Проверяет, является ли значение типизированным массивом.

### `isBlob(value: any): boolean`

Проверяет, является ли значение объектом `Blob`.

### `isFile(value: any): boolean`

Проверяет, является ли значение объектом `File`.

### `isFormData(value: any): boolean`

Проверяет, является ли значение объектом `FormData`.

### `clone(obj: any, bCopyObj: boolean = true): any`

Клонирует объект, создавая его глубокую копию, если `bCopyObj` равно `true`.