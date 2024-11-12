---
outline: deep
---

# Инициализации `B24Frame` {#initializeB24Frame}

```ts
initializeB24Frame(): Promise<B24Frame>
````

Функция `initializeB24Frame` предназначена для инициализации объекта [`B24Frame`](frame-index), который используется 
для работы с приложениями Битрикс24. 

Она управляет процессом инициализации и обрабатывает возможные ошибки подключения.

::: info
Поддерживает повторные вызовы до завершения инициализации, используя очередь колбэков.
:::

**Возвращаемое значение**

- **`Promise<B24Frame>`**: Возвращает промис, который разрешается в объект [`B24Frame`](frame-index) после успешной инициализации.

## Использование {#usage}

```ts
import { initializeB24Frame } from '@bitrix24/b24jssdk'
````

::: warning
Код должен запускаться в качестве [приложения](https://apidocs.bitrix24.com/api-reference/app-installation/local-apps/index.html) Битрикс24 (во фрейме).
:::

::: code-group
```ts [TypeScript]
import {
	initializeB24Frame,
	B24Frame,
} from '@bitrix24/b24jssdk'
	
let $b24: B24Frame

initializeB24Frame()
.then((response: B24Frame) => {
	$b24 = response
})
.catch((error) => {
	console.error(error)
})
</script>
```
```html [UMD.js]
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
```vue [VUE]
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
	initializeB24Frame,
	B24Frame,
} from '@bitrix24/b24jssdk'

let $b24: B24Frame

onMounted(async () => {
	try
	{
		$b24 = await initializeB24Frame()
	}
	catch (error)
	{
		console.error(error)
	}
})

onUnmounted(() => {
	$b24?.destroy()
})
</script>

<template>
	<p>See the result in the developer console</p>
</template>
```
:::