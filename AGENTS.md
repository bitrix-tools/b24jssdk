# AGENTS.md

Правила и конвенции для AI-агентов (Claude Code, Cursor, Codex и др.) при работе в этом репозитории.

## О проекте

`bitrix-tools/b24jssdk` — русскоязычная версия документации к [@bitrix24/b24jssdk](https://github.com/bitrix24/b24jssdk). Сам SDK живёт в `bitrix24/b24jssdk`; сюда переносится и переводится только папка `docs/`.

Публикация: <https://bitrix-tools.github.io/b24jssdk/>.

## Брендинг и копирайт (важно)

Имя правообладателя — **«Bitrix» / «Битрикс» без цифры**. Это отличается от upstream `bitrix24/b24jssdk`, где в LICENSE используется `Bitrix24`.

### Правила по контексту

| Контекст | Правильно | Неправильно |
|---|---|---|
| `LICENSE` (юридический текст) | `Copyright (c) 2024 Bitrix` | `... Bitrix24` |
| `README.md`, блок лицензии | `© Bitrix` | `© Bitrix24` |
| `package.json` `author` | `Bitrix` | `Bitrix24` |
| UI-строки в русских компонентах (Footer, frontmatter, переводы) | `Битрикс` | `Bitrix24`, `Битрикс24` |
| Год в footer | `Copyright © 2024 – настоящее время Битрикс` | `2024-present Bitrix24` |
| Название продукта/бренд («Bitrix24 REST API», «Bitrix24 JS SDK», «Портал Bitrix24») | `Bitrix24` | `Bitrix` |
| Имена npm-пакетов (`@bitrix24/b24jssdk`) | `@bitrix24/...` | — не трогать |
| `aria-label`, `alt`, `title` с указанием на платформу | `Bitrix24 REST API` | `Bitrix REST API` |
| Исходные ref. ссылки (`github.com/bitrix24/...`) | НЕ изменять | — |

### Алгоритм при импорте из upstream

При копировании файлов из `bitrix24/b24jssdk` — вручную проверять каждый `Bitrix24` в этих позициях:

1. **Копирайт-строки** (`Copyright`, `©`, footer сайта, frontmatter `author`) → `Bitrix` (в юр. тексте) или `Битрикс` (в UI на русском).
2. **Название продукта/бренд** («Bitrix24 REST API», `Bitrix24Icon`, названия классов) → не трогать.
3. **Названия npm-пакетов, импорты** (`@bitrix24/b24jssdk`, `@bitrix24/b24icons-vue/...`) → не трогать.

## Структура репозитория

- `docs/` — Nuxt 4 приложение документации (`@nuxt/content` + `@bitrix24/b24ui-nuxt`).
  - `docs/app/` — компоненты, layouts, pages, composables.
  - `docs/content/` — русскоязычные markdown (после Stage 3).
  - `docs/modules/` — кастомные Nuxt-модули.
  - `docs/server/` — SSR-маршруты, MCP-инструменты, raw-markdown routes.
- Корневые конфиги: `package.json` (только `docs:*` скрипты), `pnpm-workspace.yaml` (единственный участник — `docs`), `nuxt.config.ts`, `eslint.config.mjs`.

## Команды

```bash
pnpm install
pnpm run docs:dev          # http://localhost:3000/b24jssdk/
pnpm run docs:build        # production build
pnpm run docs:generate     # static export (для GitHub Pages)
pnpm run typecheck
pnpm run lint
pnpm run lint:fix
```

## Конвенции

- **Пакетный менеджер:** только `pnpm` 11.x (зафиксировано в `package.json` `packageManager`). Никакого `npm`/`yarn`.
- **Код-стайл:** ESLint `@nuxt/eslint-config` (flat), 2-space indent, без trailing commas, 1tbs скобки. `.editorconfig` фиксирует LF + UTF-8.
- **Commits:** Conventional Commits (`feat`, `fix`, `docs`, `chore`, `ci`). Язык коммитов — английский.
- **Язык контента `docs/content/`:** русский. При первичном импорте из upstream (этап 2) — временно английский, перевод на этапе 3.
- **Язык UI-строк в `docs/app/**`:** русский для видимых пользователю фраз (Footer, подписи, плейсхолдеры). `aria-label`/`alt` с названием продукта — остаются английскими (`Bitrix24 REST API`).
- **Якоря заголовков в markdown:** явные `## Заголовок {#en-anchor}` с английским slug (равным оригинальному) — чтобы при переводе на русский внешние ссылки не ломались.
- **Ссылки в markdown:**
  - `https://apidocs.bitrix24.com/...` → `https://apidocs.bitrix24.ru/...` (русскоязычный хост).
  - `https://github.com/bitrix24/b24jssdk/...` — НЕ переписывать (SDK лежит в upstream).
  - Внутренние `/docs/...` — зеркалируются 1:1, URL не меняются.
- **`docs/package.json`:** `@bitrix24/b24jssdk` и `-nuxt` идут как npm-версии (`^x.y.z`), а не `workspace:*`.
- **`package.json` `homepage`** — `https://bitrix-tools.github.io/b24jssdk/`. **`repository`/`bugs`** — остаются на `bitrix24/b24jssdk` (там исходники SDK).

## Этапы миграции

1. **Stage 1 (инфра)** — замена VitePress на Nuxt 4 + b24ui, конфиги, `docs/app/`, `docs/modules/`, `docs/server/`.
2. **Stage 2 (англ. контент)** — импорт `docs/content/**` из upstream вербатим.
3. **Stage 3 (перевод)** — русский перевод + якоря + `apidocs.bitrix24.ru` + `alternate` frontmatter + переключатель языков.
4. **Stage 4 (CI)** — GitHub Actions (build + deploy на `gh-pages`), Dependabot, lint, broken-link checker, sync-from-upstream.

## Git workflow

- Ветки — `claude/stage-N-<slug>` или `ai/<описание>`, от `main`.
- Каждый Stage — свой PR. Stacked PRs допустимы (base = предыдущий Stage).
- Перед коммитом: `pnpm run lint:fix` и `pnpm run typecheck` — оба должны пройти.
