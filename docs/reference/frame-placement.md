---
outline: deep
---

# Класс `PlacementManager` {#PlacementManager}

Используется для управления размещением виджетов в приложении Битрикс24.

[Подробнее](https://apidocs.bitrix24.com/api-reference/widgets/ui-interaction/index.html)
### Геттеры {#getters}

- **`get title(): string`**: Возвращает заголовок размещения. По умолчанию возвращает `'DEFAULT'`, если заголовок не установлен.
- **`get isDefault(): boolean`**: Возвращает `true`, если заголовок размещения равен `'DEFAULT'`.
- **`get options(): any`**: Возвращает объект опций размещения. Объект заморожен для предотвращения изменений.
- **`get isSliderMode(): boolean`**: Возвращает `true`, если виджет работает в режиме слайдера (опция `IFRAME` равна `'Y'`).

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
if($b24.placement.isSliderMode)
{
	$b24.parent.setTitle('SliderMode')
}
```