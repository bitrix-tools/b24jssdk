# @bitrix24/b24jssdk — документация на русском

Русскоязычная версия документации к [@bitrix24/b24jssdk](https://github.com/bitrix24/b24jssdk) — JS SDK для работы с REST API Bitrix24 из локальных, production-приложений и через вебхуки.

- Сайт документации: <https://bitrix-tools.github.io/b24jssdk/>
- Оригинальная (английская) документация: <https://bitrix24.github.io/b24jssdk/>
- Исходники SDK: <https://github.com/bitrix24/b24jssdk>

## Требования

- Node.js ≥ 18 (рекомендуется 20+)
- pnpm 11.x (зафиксирован в `package.json` `packageManager`)

## Локальная разработка

```bash
pnpm install
pnpm run docs:prepare    # один раз после install или после изменений конфига Nuxt
pnpm run docs:dev        # dev-сервер на http://localhost:3000/b24jssdk/
```

Другие полезные команды:

```bash
pnpm run docs:build      # production build
pnpm run docs:generate   # static export (для GitHub Pages)
pnpm run docs:preview    # превью production-сборки
pnpm run lint            # ESLint всего репозитория
pnpm run lint:fix        # ESLint --fix
pnpm run typecheck       # nuxt typecheck (вызов в docs/)
```

Сайт собирается на Nuxt 4 + @nuxt/content + @bitrix24/b24ui-nuxt. Контент лежит в `docs/content/`, конфигурация — в `docs/nuxt.config.ts`.

## Структура

```
.
├── docs/                # Nuxt-приложение документации
│   ├── app/             # компоненты, layouts, plugins
│   ├── content/         # русскоязычные .md (Stage 3)
│   ├── modules/         # кастомные Nuxt-модули (bx-assistant, md-rewrite)
│   ├── nuxt.config.ts   # конфигурация Nuxt
│   ├── public/          # статические ассеты
│   └── server/          # SSR-маршруты, MCP-инструменты
└── package.json         # docs:* скрипты (делегируют в docs/ через pnpm --filter)
```

## Синхронизация с английской версией

Структура контента 1:1 повторяет оригинал. При изменениях в upstream `bitrix24/b24jssdk` соответствующие страницы переводятся и переносятся сюда без изменения URL.

## Обратная связь и issues

Этот репозиторий — только документация. Поэтому:

- **Баги и замечания по русскому переводу, опечатки, оформление сайта** → [bitrix-tools/b24jssdk/issues](https://github.com/bitrix-tools/b24jssdk/issues).
- **Баги в самом SDK** (поведение методов, API, типы) → [bitrix24/b24jssdk/issues](https://github.com/bitrix24/b24jssdk/issues). `package.json` `bugs.url` этого репозитория указывает именно туда — SDK лежит там.

## Лицензия

MIT — см. [LICENSE](./LICENSE). © Bitrix.
