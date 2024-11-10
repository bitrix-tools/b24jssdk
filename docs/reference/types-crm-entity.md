---
outline: deep
---

# Перечисления типов сущностей CRM

Эти перечисления определяют типы сущностей CRM, используемые в Bitrix24.

Они помогают идентифицировать различные сущности в системе CRM (лиды, сделки, контакты и другие).

## EnumCrmEntityType

```ts
import { EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'

console.log(EnumCrmEntityTypeId.deal)
```

`EnumCrmEntityType` представляет строковые идентификаторы типов сущностей CRM:

| Ключ         | Значение            | Описание                 |
|--------------|---------------------|--------------------------|
| `undefined`  | `UNDEFINED`         | Неопределенный тип       |
| `lead`       | `CRM_LEAD`          | Лид                      |
| `deal`       | `CRM_DEAL`          | Сделка                   |
| `contact`    | `CRM_CONTACT`       | Контакт                  |
| `company`    | `CRM_COMPANY`       | Компания                 |
| `oldInvoice` | `CRM_INVOICE`       | Старая версия счета      |
| `invoice`    | `CRM_SMART_INVOICE` | Счет                     |
| `quote`      | `CRM_QUOTE`         | Коммерческое предложение |
| `requisite`  | `CRM_REQUISITE`     | Реквизит                 |

## EnumCrmEntityTypeId

```ts
import { EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'

console.log(EnumCrmEntityTypeId.deal)
```

`EnumCrmEntityTypeId` представляет числовые идентификаторы типов сущностей CRM:

| Ключ         | Значение | Описание                 |
|--------------|----------|--------------------------|
| `undefined`  | 0        | Неопределенный тип       |
| `lead`       | 1        | Лид                      |
| `deal`       | 2        | Сделка                   |
| `contact`    | 3        | Контакт                  |
| `company`    | 4        | Компания                 |
| `oldInvoice` | 5        | Старая версия счета      |
| `invoice`    | 31       | Счет                     |
| `quote`      | 7        | Коммерческое предложение |
| `requisite`  | 8        | Реквизит                 |

Эти перечисления могут быть использованы для работы с различными типами сущностей в CRM Bitrix24, обеспечивая удобный способ их идентификации и обработки.

::: tip
Работу с **EnumCrmEntityTypeId** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/crm-item-list.client.vue).
:::