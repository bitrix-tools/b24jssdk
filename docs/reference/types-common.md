---
outline: deep
---

# Типы данных и структуры {#common}

```ts
import type {
	NumberString,
	ISODate,
	BoolString,
	GenderString,
	PlacementViewMode,
	Fields,
	MultiField,
	MultiFieldArray,
	UserFieldType
} from '@bitrix24/b24jssdk'

import { DataType } from '@bitrix24/b24jssdk'
```

Это различные типы данных и структуры, используемые в приложениях, интегрированных с Bitrix24.

Он включает в себя типы строк, представляющих числа, даты, булевы значения и другие специфические форматы данных.

## Типы данных {#DataTypes}

### NumberString

| Тип      | Описание                                                       |
|----------|----------------------------------------------------------------|
| `string` | Строка, которая фактически является числом, например, `20.23`. |

### ISODate

| Тип      | Описание                                                          |
|----------|-------------------------------------------------------------------|
| `string` | Строка в формате ISO даты, например, `2018-06-07T03:00:00+03:00`. |

::: tip
Работу с **ISODate** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/crm-item-list.client.vue).
:::

### BoolString

| Значение | Описание    |
|----------|-------------|
| `Y`      | Да (истина) |
| `N`      | Нет (ложь)  |

### GenderString

| Значение | Описание  |
|----------|-----------|
| `M`      | Мужской   |
| `F`      | Женский   |
| ``       | Не указан |

### PlacementViewMode

| Значение | Описание             |
|----------|----------------------|
| `view`   | Режим просмотра      |
| `edit`   | Режим редактирования |

## Структуры данных {#DataStructures}

### Fields

| Поле          | Тип       | Описание           |
|---------------|-----------|--------------------|
| `type`        | `string`  | Тип поля           |
| `isRequired`  | `boolean` | Обязательное поле  |
| `isReadOnly`  | `boolean` | Только для чтения  |
| `isImmutable` | `boolean` | Неизменяемое поле  |
| `isMultiple`  | `boolean` | Множественное поле |
| `isDynamic`   | `boolean` | Динамическое поле  |
| `title`       | `string`  | Заголовок поля     |

### MultiField

| Поле         | Тип            | Описание           |
|--------------|----------------|--------------------|
| `ID`         | `NumberString` | Идентификатор      |
| `VALUE_TYPE` | `string`       | Тип значения       |
| `VALUE`      | `string`       | Значение           |
| `TYPE_ID`    | `string`       | Идентификатор типа |

### MultiFieldArray

| Поле         | Тип      | Описание     |
|--------------|----------|--------------|
| `VALUE`      | `string` | Значение     |
| `VALUE_TYPE` | `string` | Тип значения |

### UserFieldType

| Поле           | Тип      | Описание                             |
|----------------|----------|--------------------------------------|
| `USER_TYPE_ID` | `string` | Идентификатор пользовательского типа |
| `HANDLER`      | `string` | Обработчик                           |
| `TITLE`        | `string` | Заголовок                            |
| `DESCRIPTION`  | `string` | Описание                             |
| `OPTIONS`      | `object` | Опции (например, высота)             |

## Перечисление DataType {#EnumDataType}

`DataType` определяет различные типы данных, используемые в Bitrix24:

| Ключ          | Значение       | Описание        |
|---------------|----------------|-----------------|
| `undefined`   | `undefined`    | Неопределенный  |
| `any`         | `any`          | Любой           |
| `integer`     | `integer`      | Целое число     |
| `boolean`     | `boolean`      | Булево значение |
| `double`      | `double`       | Дробное число   |
| `date`        | `date`         | Дата            |
| `datetime`    | `datetime`     | Дата и время    |
| `string`      | `string`       | Строка          |
| `text`        | `text`         | Текст           |
| `file`        | `file`         | Файл            |
| `array`       | `array`        | Массив          |
| `object`      | `object`       | Объект          |
| `user`        | `user`         | Пользователь    |
| `location`    | `location`     | Локация         |
| `crmCategory` | `crm_category` | Категория CRM   |
| `crmStatus`   | `crm_status`   | Статус CRM      |
| `crmCurrency` | `crm_currency` | Валюта CRM      |

Эти типы и структуры данных могут быть использованы для описания и работы с различными сущностями и полями в Bitrix24.

