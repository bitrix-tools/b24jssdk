---
outline: deep
---
# Hook

Этот код предоставляет реализацию менеджера авторизации `AuthHookManager` и класса `B24Hook`, который используется для работы с вебхуками в Bitrix24.

Эти классы обеспечивают управление авторизацией и взаимодействие с API Bitrix24 через вебхуки.

## Класс B24Hook

```ts
import { B24Hook } from '@bitrix24/b24jssdk/hook'
const B24 = new B24Hook({
	b24Url: 'https://your_domain.bitrix24.com',
	userId: 123,
	secret: 'k32t88gf3azpmwv3',
})
```

`B24Hook` расширяет `AbstractB24` и используется для управления вебхуками в Bitrix24.

### Конструктор

```ts
constructor(b24HookParams: B24HookParams)
```

- **b24HookParams**: [Параметры вебхука](/reference/types-auth#b24hookparams), используемые для инициализации менеджера авторизации и HTTP-клиента.

## Использование

Класс `B24Hook` обеспечивает взаимодействие с API Bitrix24 через вебхуки.

Этот класс может быть использован для интеграции приложений с Bitrix24, обеспечивая безопасное и эффективное взаимодействие с API через вебхуки.

```ts
import { B24Hook } from '@bitrix24/b24jssdk/hook'
import { EnumCrmEntityTypeId } from '@bitrix24/b24jssdk/types/crm'
import { LoggerBrowser, Result } from '@bitrix24/b24jssdk/logger/browser'

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
			createdTime: new Date(item.createdTime as ISODate)
		}
	});
	
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

Полученные данные преобразуются в массив объектов с полями `id`, `title` и `createdTime`, после чего результаты логируются, 
а в случае ошибки выводится сообщение об ошибке.

::: tip
Работу с `B24Hook` можно протестировать в [песочнице](https://github.com/bitrix24/b24jssdk/blob/main/playgrounds/jssdk/src/pages/1-hook/crm.item.list.vue).
:::