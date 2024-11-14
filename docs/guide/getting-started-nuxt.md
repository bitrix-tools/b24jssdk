---
outline: deep
---
# Быстрый старт для Nuxt 3

Эта страница поможет вам быстро интегрировать `@bitrix24/b24jssdk` в ваш проект на Nuxt 3.

## Установка {#install}

Перед началом работы убедитесь, что у вас установлен Nuxt 3.

Затем выполните следующую команду для установки модуля:

```bash
npx nuxi module add @bitrix24/b24jssdk-nuxt
```

## Пример {#example}

После настройки модуля вы можете использовать его в компонентах вашего приложения. Вот пример:

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { B24Frame } from '@bitrix24/b24jssdk'

let $b24: B24Frame

onMounted(async () => {
	try
	{
		const { $initializeB24Frame } = useNuxtApp()
		$b24 = await $initializeB24Frame()
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
<div>
    <h1>@bitrix24/b24jssdk</h1>
</div>
</template>
```

## Документация

Для более подробной информации о всех доступных функциях и параметрах, пожалуйста, ознакомьтесь с нашей документацией
для [B24Hook](/reference/hook-index) и [B24Frame](/reference/frame-initialize-b24-frame).

## Поддержка

Если у вас возникли вопросы или проблемы, вы можете создать issue на [GitHub](https://github.com/bitrix24/b24jssdk/issues).