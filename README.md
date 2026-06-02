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
│   ├── content/         # markdown-контент (после Stage 3 — на русском)
│   ├── i18n/            # translation-kit: glossary, style-guide, prompt
│   ├── modules/         # кастомные Nuxt-модули (bx-assistant, md-rewrite)
│   ├── nuxt.config.ts   # конфигурация Nuxt
│   ├── public/          # статические ассеты
│   └── server/          # SSR-маршруты, MCP-инструменты
├── scripts/             # i18n / migration утилиты (add-anchors, swap-apidocs)
└── package.json         # docs:* + i18n:* скрипты
```

## Синхронизация с английской версией

Структура контента 1:1 повторяет оригинал. При изменениях в upstream `bitrix24/b24jssdk` соответствующие страницы переводятся и переносятся сюда без изменения URL.

## Участие в переводе

Перевод 87 файлов `docs/content/**` ведётся под-этапами Stage 3a / 3b / 3c / 3d (см. [AGENTS.md](./AGENTS.md) → «Этапы миграции»). Для согласованности перевода используется translation-kit:

| Файл | Назначение |
|---|---|
| [`docs/i18n/glossary.ru.yml`](./docs/i18n/glossary.ru.yml) | Словарь технических терминов EN → RU с пояснениями. Источник истины при переводе. |
| [`docs/i18n/style-guide.md`](./docs/i18n/style-guide.md) | Тон, типографика, что переводить / что НЕ переводить, MDC-разметка. |
| [`docs/i18n/prompt.md`](./docs/i18n/prompt.md) | Готовый AI-промпт для Cursor / Claude Code / Windsurf. |

Рабочий процесс:

1. Открываете .md-файл из `docs/content/` в Cursor / Claude Code.
2. Пастите промпт из [`docs/i18n/prompt.md`](./docs/i18n/prompt.md).
3. AI переводит, вы корректируете спорные места.
4. `pnpm run docs:dev` — визуальная проверка.
5. Коммит с conventional-сообщением (`feat(stage-3b): translate ...`).

Новые термины, не покрытые глоссарием, добавляйте туда в том же PR — следующий переводчик увидит принятый вариант.

Механические правки (якоря заголовков, замена `apidocs.bitrix24.com` → `.ru`) уже выполнены в Stage 3a:

```bash
pnpm run i18n:add-anchors:dry  # сухой прогон add-anchors
pnpm run i18n:swap-apidocs:dry # сухой прогон swap-apidocs
pnpm run i18n:prep             # обе утилиты подряд (только если нужно повторить)
```

## Обратная связь и issues

Этот репозиторий — только документация. Поэтому:

- **Баги и замечания по русскому переводу, опечатки, оформление сайта** → [bitrix-tools/b24jssdk/issues](https://github.com/bitrix-tools/b24jssdk/issues).
- **Баги в самом SDK** (поведение методов, API, типы) → [bitrix24/b24jssdk/issues](https://github.com/bitrix24/b24jssdk/issues). `package.json` `bugs.url` этого репозитория указывает именно туда — SDK лежит там.

## Лицензия

MIT — см. [LICENSE](./LICENSE). © Bitrix.
