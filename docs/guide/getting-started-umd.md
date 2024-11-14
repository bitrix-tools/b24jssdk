---
outline: deep
---
# Быстрый старт для UMD {#getting-started-umd}

Эта страница поможет вам быстро начать использовать `@bitrix24/b24jssdk` с помощью UMD-версии, 
которая подходит для использования в браузере.

## Подключение {#import}
### Через CDN {#import-cdn}

Вы можете подключить библиотеку напрямую через CDN. Добавьте следующий тег `<script>` в ваш HTML-файл:

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
```

### Локальное подключение {#import-local}

Скачайте UMD-версию библиотеки с [www.npmjs.com](https://www.npmjs.com/package/@bitrix24/b24jssdk) и добавьте её в ваш проект.

Затем подключите её в вашем HTML-файле:

```html
<script src="/path/to/umd/index.min.js"></script>
```

## Пример {#example}

После подключения библиотеки, она будет доступна через глобальную переменную `[B24Js]`. Вот пример использования:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bitrix24 Frame Demo</title>
</head>
<body>
<p>See the result in the developer console</p>
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
<script>
	document.addEventListener('DOMContentLoaded', async () => {
		try
		{
			let $b24 = await B24Js.initializeB24Frame();
		}
		catch (error)
		{
			console.error(error);
		}
	});
</script>
</body>
</html>
```

## Документация

Для более подробной информации о всех доступных функциях и параметрах, пожалуйста, ознакомьтесь с нашей документацией
для [B24Hook](/reference/hook-index) и [B24Frame](/reference/frame-initialize-b24-frame).

## Поддержка

Если у вас возникли вопросы или проблемы, вы можете создать issue на [GitHub](https://github.com/bitrix24/b24jssdk/issues).