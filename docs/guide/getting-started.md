---
outline: deep
---
# Быстрый старт {#getting-started}

Эта страница поможет вам быстро начать использовать `@bitrix24/b24jssdk` в вашем проекте.

## Установка {#install}

Перед началом работы убедитесь, что у вас установлена последняя версия Node.js. Затем выполните следующую команду для установки библиотеки:

```bash
npm install @bitrix24/b24jssdk
```

## Импорт {#import}

Импортируйте библиотеку в ваш проект:

```javascript
import { initializeB24Frame, B24Frame } from '@bitrix24/b24jssdk'
```

## Пример {#example}

Вот простой пример, демонстрирующий основные возможности библиотеки:

```ts
import {
	B24Hook,
	Text,
	EnumCrmEntityTypeId,
	LoggerBrowser,
	Result,
	type ISODate
} from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('MyApp', import.meta.env?.DEV === true)

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

## Документация

Для более подробной информации о всех доступных функциях и параметрах, пожалуйста, ознакомьтесь с нашей документацией
для [B24Hook](/reference/hook-index) и [B24Frame](/reference/frame-initialize-b24-frame).

## Поддержка

Если у вас возникли вопросы или проблемы, вы можете создать issue на [GitHub](https://github.com/bitrix24/b24jssdk/issues).