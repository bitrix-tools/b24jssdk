---
outline: deep
---
# Класс `B24Hook` {#B24Hook}

Предназначен для управления вебхуками Битрикс24. Он наследует функциональность от [`AbstractB24`](core-abstract-b24) и 
предоставляет методы для работы с аутентификацией через вебхуки.

Реализует интерфейс [`TypeB24`](types-type-b24).

::: tip
Работу с **B24Hook** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/crm-item-list.client.vue).
:::

## Конструктор {#constructor}

```ts
constructor(b24HookParams: B24HookParams)
```

Тип [`B24HookParams`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts) описывает параметры веб-хука, 
используемые для инициализации менеджера авторизации и HTTP-клиента:

| Поле     | Тип      | Описание                                                                   |
|----------|----------|----------------------------------------------------------------------------|
| `b24Url` | `string` | URL портала Битрикс24, например, `https://your-bitrix-portal.bitrix24.com`. |
| `userId` | `number` | Идентификатор пользователя.                                                |
| `secret` | `string` | Секретный ключ.                                                            |

## Методы {#methods}
::: info
Реализует интерфейс [`TypeB24`](types-type-b24).
:::

## Использование {#usage}

Этот код создает экземпляр `B24Hook` для взаимодействия с API Битрикс24 и выполняет пакетный запрос для получения списка компаний,
сортируя их по идентификатору в порядке убывания.

Полученные данные преобразуются в массив объектов с полями `id`, `title` и `createdTime`, после чего результаты выводятся в консоль,
а в случае ошибки выводится сообщение об ошибке.

```ts
import { 
	B24Hook,
	Text,
	EnumCrmEntityTypeId,
	LoggerBrowser,
	Result,
	type ISODate
} from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('MyApp', true)

const $b24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})

$b24.callBatch({
	CompanyList: {
		method: 'crm.item.list',
		params: {
			entityTypeId: EnumCrmEntityTypeId.company,
			order: { id: 'desc' },
			select: [
				'id',
				'title',
				'createdTime'
			]
		}
	}
}, true)
.then((response: Result) => {
	const data = response.getData()
	const dataList = (data.CompanyList.items || []).map((item: any) => {
		return {
			id: Number(item.id),
			title: item.title,
			createdTime: Text.toDateTime(item.createdTime as ISODate)
		}
	})
	$logger.info('response >> ', dataList)
})
.catch((error) => {
	$logger.error(error)
})
.finally(() => {
	$logger.info('load >> stop ')
})
```