---
outline: deep
---

# Список языков

## Обзор

`B24LangList` — это перечисление, которое определяет список поддерживаемых языков в Bitrix24 Cloud.
Это перечисление может быть полезно для работы с языковыми настройками в приложениях, интегрированных с Bitrix24.

## Описание

```js
import { B24LangList } from '@bitrix24/b24jssdk/core/language/list'
```

Перечисление `B24LangList` содержит следующие языковые коды:

| Code | Language           |
|------|--------------------|
| en   | English            |
| de   | Deutsch            |
| la   | Español            |
| br   | Português (Brasil) |
| fr   | Français           |
| it   | Italiano           |
| pl   | Polski             |
| ru   | Русский            |
| ua   | Українська         |
| tr   | Türkçe             |
| sc   | 中文（简体）             |
| tc   | 中文（繁體）             |
| ja   | 日本語                |
| vn   | Tiếng Việt         |
| id   | Bahasa Indonesia   |
| ms   | Bahasa Melayu      |
| th   | ภาษาไทย            |
| ar   | عربي,              |

## Примечания

- В облачной версии Bitrix24 поддерживается широкий спектр языков, как указано в перечислении.
- Для коробочной версии Bitrix24 обычно поддерживается 1-2 языка, что следует учитывать при разработке и настройке локализации.

::: tip
Работу с **B24LangList** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::