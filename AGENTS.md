# AGENTS.md

Правила и конвенции для AI-агентов (Claude Code, Cursor, Codex и др.) при работе в этом репозитории.

## О проекте

`bitrix-tools/b24jssdk` — русскоязычная версия документации к [@bitrix24/b24jssdk](https://github.com/bitrix24/b24jssdk). Сам SDK живёт в `bitrix24/b24jssdk`; сюда переносится и переводится только папка `docs/`.

Публикация: <https://bitrix-tools.github.io/b24jssdk/>.

## Отношения с upstream (важно)

Этот репозиторий — **зеркало + перевод**, не место для исправления багов SDK или докум-приложения. Поведенческие правила:

- **Баги SDK / поведения методов / типов** → escalate в `bitrix24/b24jssdk` issues. Здесь не правим, фикс прилетит через очередной sync.
- **Баги Vue-кода `docs/app/**`, `docs/server/**`, `docs/modules/**`** (упомянутые в апстрим-PR) → escalate в `bitrix24/b24jssdk`. Здесь только зеркалим.
- **Адаптации под bitrix-tools** (наш скоуп) — это: `nuxt.config.ts` env-defaults и `@bitrix24/b24jssdk-nuxt` через npm, `docs/package.json` без `workspace:*`, `pnpm-workspace.yaml` только с `docs`, корневой `package.json` с `docs:*`-скриптами, `README.md`/`LICENSE` под bitrix-tools, копирайт-строки на «Bitrix / Битрикс», русские UI-фразы.
- **Тесты, JSDoc, security-фиксы api-routes** — это всё upstream-вопросы. Не наш скоуп.
- **Развёртывание** — статика на GitHub Pages (`nuxt generate`). API-routes (`/api/ai`, `/api/component-example`) и MCP в prod **не работают** — это dev-only. Соответствующие security-риски касаются только локальной разработки.

## Доставка файлов, которые агент не может запушить сам (важно)

Некоторые файлы НЕВОЗМОЖНО заливать через GitHub MCP инструменты (`push_files`, `create_or_update_file`):

- **Бинарные ассеты** (`.webp`, `.png`, `.jpg`, `.jpeg`, `.ico`, `.gif`, фавикон, шрифты, видео) — MCP-обёртка сохраняет `content` как UTF-8 текст; base64-передача хранится литеральной строкой, а не байтами. Проверено экспериментально.
- **Крупные или генерируемые файлы**: `pnpm-lock.yaml`, `package-lock.json`, большие SVG (>50 KB), `llms-full.txt` и подобные — по объёму/времени неэффективно и рисковано проталкивать через пакетные push'ы: повышается вероятность повреждения при транскрипции и растёт расход контекста.

### Правило «вариант A» — делегация человеку

Такие файлы агент НЕ пытается пушить сам. Алгоритм:

1. **Агент формирует точный список** файлов, которые нужно добавить/обновить — пути, источник, размеры. Публикует список человеку в чате.
2. **Человек выполняет доставку локально**: `cp` из исходника (напр. upstream-клон) или регенерация (напр. `pnpm install` → `pnpm-lock.yaml`) в своём клоне репозитория. Затем `git add` + `git commit` + `git push` на рабочую ветку.
3. **Агент верифицирует результат** через MCP (`mcp__github__get_commit` / `get_file_contents`): все ли файлы из списка появились, не вкралось ли побочных изменений (напр. случайное удаление lockfile).

### Шаблон запроса от агента

Агент выдаёт человеку блок вида:

```
Нужны файлы, которые я не могу запушить сам:

Источник: <путь к upstream-клону или принцип генерации>
Цель: <путь в текущем репо>
Список:
  - docs/.../foo.webp
  - docs/.../bar.png
  - ...
Ожидаемый объём: ~N MB

Команды:
  cd <локальный клон>
  git checkout <ветка>
  cp -v <SRC>/... <DST>/...
  git add <директории>
  git status --short    # проверка что файлы в staging, не в .gitignore
  git commit -m "chore(...): add binary assets / regenerate lockfile"
  git push origin <ветка>

После push'а скажите «проверь» — я верифицирую результат.
```

### Частые ловушки при варианте A

- **Пустой коммит**: `git add docs/` не находит файлов (нет в локальном дереве, или попадают в `.gitignore`). Агент должен проверить `commit.files` в ответе `get_commit` — если там не те пути, подсказать «проверьте ls/git status/git check-ignore».
- **Побочные изменения**: в коммит может нечаянно попасть удаление lockfile или другого файла — агент сверяет `additions`/`deletions` и `files[]` и сигнализирует, если видит лишнее.
- **Неверная ветка**: push уходит не в ту ветку (частая ошибка при stacked PRs). Агент верифицирует `ref` в ответе push'а.

### Когда НЕ нужен вариант A

Текстовые файлы до ~500 KB (`.ts`, `.vue`, `.md`, `.json`, `.yml`, SVG до 50 KB) агент пушит сам через MCP — это быстрее и не требует вашего вмешательства.

## Язык UI-строк (важно)

**Все видимые пользователю фразы в `docs/app/**` и `docs/modules/**` — на русском.** При копировании компонентов из upstream проверять каждый текстовый слот/свойство в `<template>` и переводить.

### Что переводить

- Содержимое тегов `<ProseP>`, `<NuxtLink>`, `<span>`, `<p>` и пр. — видимый текст.
- Атрибуты `label`, `placeholder`, `title`, `tooltip`, `description` (видимые надписи).
- Строки в реактивных выражениях (`{{ ... }}`), результаты composables, вывод toast/notification.
- Frontmatter в markdown (`title`, `description`, `navigation.title`, `badge`, текстовые поля) — этап 3.

### Что НЕ переводить

- `aria-label`, `alt`, `title` с названием продукта — сохраняем оригинал (`"Bitrix24 REST API"`, `"Bitrix24 UI on Telegram"`).
- Имена компонентов и иконок (`Bitrix24Icon`, `B24Button`).
- Импорты, названия npm-пакетов (`@bitrix24/b24jssdk`, `@bitrix24/b24icons-vue/...`).
- CSS-классы, ID, data-атрибуты.
- Строки в логах (`console.log`, `logger.debug`) — остаются английскими для отладки.

### Готовые переводы типовых фраз

| Английский | Русский |
|---|---|
| `Copyright © 2024-present Bitrix24` | `Copyright © 2024 – настоящее время Битрикс` |
| `Published under MIT License.` | `Распространяется под лицензией MIT.` |
| `Get started` | `Начать` |
| `Search` | `Поиск` |
| `Edit this page` | `Редактировать страницу` |
| `On this page` | `На этой странице` |
| `Previous` / `Next` | `Назад` / `Далее` |
| `Releases` | `Релизы` |
| `Copy code` | `Копировать код` |
| `Loading...` | `Загрузка…` |

## Брендинг и копирайт (важно)

Имя правообладателя — **«Bitrix» / «Битрикс» без цифры**. Это отличается от upstream `bitrix24/b24jssdk`, где в LICENSE используется `Bitrix24`.

### Правила по контексту

| Контекст | Правильно | Неправильно |
|---|---|---|
| `LICENSE` (юридический текст) | `Copyright (c) 2024 Bitrix` | `... Bitrix24` |
| `README.md`, блок лицензии | `© Bitrix` | `© Bitrix24` |
| `package.json` `author` | `Bitrix` | `Bitrix24` |
| `schemaOrg.identity.name` в `nuxt.config.ts` | `Bitrix` | `Bitrix24` |
| UI-строки в русских компонентах (Footer, frontmatter, переводы) | `Битрикс` | `Bitrix24`, `Битрикс24` |
| Год в footer | `Copyright © 2024 – настоящее время Битрикс` | `2024-present Bitrix24` |
| Название продукта/бренд («Bitrix24 REST API», «Bitrix24 JS SDK», «Портал Bitrix24») | `Bitrix24` | `Bitrix` |
| Имена npm-пакетов (`@bitrix24/b24jssdk`) | `@bitrix24/...` | — не трогать |
| `aria-label`, `alt`, `title` с указанием на платформу | `Bitrix24 REST API` | `Bitrix REST API` |
| Исходные ref. ссылки (`github.com/bitrix24/...`) | НЕ изменять | — |

### Алгоритм при импорте из upstream

При копировании файлов из `bitrix24/b24jssdk` — вручную проверять каждый `Bitrix24` в этих позициях:

1. **Копирайт-строки** (`Copyright`, `©`, footer сайта, frontmatter `author`, `schemaOrg.identity.name`) → `Bitrix` (в юр. тексте) или `Битрикс` (в UI на русском).
2. **Название продукта/бренд** («Bitrix24 REST API», `Bitrix24Icon`, названия классов) → не трогать.
3. **Названия npm-пакетов, импорты** (`@bitrix24/b24jssdk`, `@bitrix24/b24icons-vue/...`) → не трогать.

## Структура репозитория

- `docs/` — Nuxt 4 приложение документации (`@nuxt/content` + `@bitrix24/b24ui-nuxt`).
  - `docs/nuxt.config.ts` — конфигурация Nuxt-приложения.
  - `docs/app/` — компоненты, layouts, pages, composables.
  - `docs/content/` — русскоязычные markdown (после Stage 3).
  - `docs/modules/` — кастомные Nuxt-модули.
  - `docs/server/` — SSR-маршруты, MCP-инструменты, raw-markdown routes (dev-only при static export).
  - `docs/public/` — статические ассеты.
  - `docs/package.json` — зависимости Nuxt-приложения.
- **Корневые конфиги** (репо-уровень, не Nuxt): `package.json` (только `docs:*` скрипты), `pnpm-workspace.yaml` (единственный участник — `docs`), `eslint.config.mjs`, `.editorconfig`, `.npmrc`, `.nuxtrc`, `.gitignore`, `LICENSE`, `README.md`, `AGENTS.md`.

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
- **Якоря заголовков в markdown:** явные `## Заголовок {#en-anchor}` с английским slug (равным оригинальному) — чтобы при переводе на русский внешние ссылки не ломались.
- **Ссылки в markdown:**
  - `https://apidocs.bitrix24.com/...` → `https://apidocs.bitrix24.ru/...` (русскоязычный хост).
  - `https://github.com/bitrix24/b24jssdk/...` — НЕ переписывать (SDK лежит в upstream).
  - Внутренние `/docs/...` — зеркалируются 1:1, URL не меняются.
- **`docs/package.json`:** `@bitrix24/b24jssdk` и `-nuxt` идут как npm-версии (`^x.y.z`), а не `workspace:*`.
- **`package.json` `homepage`** — `https://bitrix-tools.github.io/b24jssdk/`. **`repository`/`bugs`** — остаются на `bitrix24/b24jssdk` (там исходники SDK; баги перевода в issues этого репо, баги SDK — в upstream).

## Этапы миграции

1. **Stage 1 (инфра)** — замена VitePress на Nuxt 4 + b24ui, конфиги, `docs/app/`, `docs/modules/`, `docs/server/`.
2. **Stage 2 (англ. контент)** — импорт `docs/content/**` из upstream вербатим.
3. **Stage 3 (перевод)** — русский перевод + якоря + `apidocs.bitrix24.ru` + `alternate` frontmatter + переключатель языков.
4. **Stage 4 (CI)** — GitHub Actions (build + deploy на `gh-pages`), Dependabot, lint, broken-link checker, sync-from-upstream.

## Git workflow

- Ветки — `claude/stage-N-<slug>` или `ai/<описание>`, от `main`.
- Каждый Stage — свой PR. Stacked PRs допустимы (base = предыдущий Stage).
- Перед коммитом: `pnpm run lint:fix` и `pnpm run typecheck` — оба должны пройти.
