---
outline: deep
---
# Hook

Этот код предоставляет реализацию класса `B24Hook`, который используется для работы с веб-хуками в Bitrix24.

## Класс `B24Hook`

```ts
import { B24Hook } from '@bitrix24/b24jssdk'
const B24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})
```

`B24Hook` расширяет [`AbstractB24`](abstract-b24) и используется для управления веб-хуками в Bitrix24.

### Конструктор

```ts
constructor(b24HookParams: B24HookParams)
```

Тип [`B24HookParams`](https://github.com/bitrix24/b24jssdk/blob/main/packages/jssdk/src/types/auth.ts) описывает параметры веб-хука, 
используемые для инициализации менеджера авторизации и HTTP-клиента:

| Поле     | Тип      | Описание                                                                   |
|----------|----------|----------------------------------------------------------------------------|
| `b24Url` | `string` | URL портала Bitrix24, например, `https://your-bitrix-portal.bitrix24.com`. |
| `userId` | `number` | Идентификатор пользователя.                                                |
| `secret` | `string` | Секретный ключ.                                                            |

## Использование

Класс `B24Hook` обеспечивает взаимодействие с API Bitrix24 через веб-хуки.

Этот класс может быть использован для интеграции приложений с Bitrix24, обеспечивая взаимодействие с API через веб-хуки.

```ts
import { 
	B24Hook,
	Text,
	EnumCrmEntityTypeId,
	LoggerBrowser,
    Result
} from '@bitrix24/b24jssdk'

const logger = LoggerBrowser.build(
	'MyApp',
	true
)

const B24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})
B24.setLogger(logger)

B24.callBatch(
	{
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
	},
	true
)
.then((response: Result) => {
	const data = response.getData()
	
	const dataList = (data.CompanyList.items || []).map((item) => {
		return {
			id: Number(item.id),
			title: item.title,
			createdTime: Text.toDateTime(item.createdTime as ISODate)
		}
	})
	
	logger.info('response >> ', dataList)
})
.catch((error: Error|string) => {
	logger.error(error)
})
.finally(() => {
	logger.info('load >> stop ')
})
```

Этот код создает экземпляр `B24Hook` для взаимодействия с API Bitrix24 и выполняет пакетный запрос для получения списка компаний, 
сортируя их по идентификатору в порядке убывания.

Полученные данные преобразуются в массив объектов с полями `id`, `title` и `createdTime`, после чего результаты выводятся в консоль, 
а в случае ошибки выводится сообщение об ошибке.

::: tip
Работу с **B24Hook** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/02-nuxt-hook/pages/hook/crm-item-list.client.vue).
:::