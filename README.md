# @bitrix24/b24jssdk — документация на русском

Русскоязычная версия документации к [@bitrix24/b24jssdk](https://github.com/bitrix24/b24jssdk) — JS SDK для работы с REST API Bitrix24 из локальных, production-приложений и через вебхуки.

- Сайт документации: <https://bitrix-tools.github.io/b24jssdk/>
- Оригинальная (английская) документация: <https://bitrix24.github.io/b24jssdk/>
- Исходники SDK: <https://github.com/bitrix24/b24jssdk>

## Локальная разработка

```bash
pnpm install
pnpm run docs:dev
```

Сайт собирается на Nuxt 4 + @nuxt/content + @bitrix24/b24ui-nuxt. Контент лежит в `docs/content/`, конфигурация — в `docs/nuxt.config.ts`.

## Структура

```
.
├── docs/                # Nuxt-приложение документации
│   ├── app/             # компоненты, layouts, plugins
│   ├── content/         # русскоязычные .md (Stage 3)
│   ├── modules/         # кастомные Nuxt-модули (bx-assistant, md-rewrite)
│   ├── public/          # статические ассеты
│   └── server/          # SSR-маршруты, MCP-инструменты
└── package.json         # docs:* скрипты
```

## Синхронизация с английской версией

Структура контента 1:1 повторяет оригинал. При изменениях в upstream `bitrix24/b24jssdk` соответствующие страницы переводятся и переносятся сюда без изменения URL.

## Лицензия

MIT — см. [LICENSE](./LICENSE). © Bitrix.
