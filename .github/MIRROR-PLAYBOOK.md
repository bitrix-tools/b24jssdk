# Playbook: перенос setup'а зеркала документации «1 в 1»

> Это **инструкция для AI-агента** (Claude Code / Cursor / Codex), которого ты запускаешь
> на новом репозитории-зеркале. Цель — воспроизвести инфраструктуру и процессы, отлаженные
> на `bitrix-tools/b24jssdk`: translation-kit, правила для агентов, CI/CD с гейтом деплоя,
> Dependabot, broken-link checker, sync-from-upstream и дисциплину работы через PR.
>
> Эталон-источник всех артефактов: **`bitrix-tools/b24jssdk`** (ветка `main`).
> Где можно — копируй файлы **дословно** по raw-ссылкам ниже; где помечено «адаптировать» —
> меняй только параметры из §1.

---

## 0. Как этим пользоваться

1. Человек заполняет **§1 Параметры** под новый проект.
2. Вставляет агенту **готовый промпт из §11** (он ссылается на этот файл).
3. Агент идёт по фазам **§4 → §9**, на каждом шаге открывая отдельный PR.
4. Сверяйся с **§10 Чеклист готовности**.

Если новый проект — **тоже RU-зеркало того же upstream** (`bitrix24/b24jssdk`), почти всё копируется
дословно. Если другой upstream/язык — меняются значения §1, структура остаётся.

---

## 1. Параметры (заполнить ОДИН раз, дальше подставлять везде)

| Ключ | Значение на эталоне | Твоё значение |
|---|---|---|
| `UPSTREAM` | `bitrix24/b24jssdk` | `…` |
| `MIRROR` | `bitrix-tools/b24jssdk` | `…` |
| `PAGES_URL` | `https://bitrix-tools.github.io/b24jssdk/` | `…` |
| `LANG` | русский (RU-only) | `…` |
| `BRAND` (продукт — НЕ трогать) | `Bitrix24` | `…` |
| `RIGHTSHOLDER` (копирайт — без цифры) | `Bitrix` / `Битрикс` | `…` |
| `PKG` (npm-пакеты SDK) | `@bitrix24/b24jssdk`, `-nuxt` | `…` |
| `APIDOCS_FROM → APIDOCS_TO` | `apidocs.bitrix24.com → .ru` | `…` |
| `PM` (пакетный менеджер) | `pnpm 11.4.0` | `…` |
| `NODE` | `22` | `…` |
| `DEFAULT_BRANCH` | `main` | `…` |

> Дальше в тексте `UPSTREAM/MIRROR/...` — это подстановки из этой таблицы.

---

## 2. Что именно мы строим (архитектура)

- `MIRROR` — **зеркало + перевод** документации из `UPSTREAM`. Переносится и переводится только папка `docs/`.
- Это **НЕ место для багфиксов** SDK или Vue-кода доки. Любой код-баг → escalate issue в `UPSTREAM`,
  фикс прилетит очередным sync'ом. (Заведи для этого один трекинг-issue — см. §9.6.)
- Сайт **одноязычный** (`LANG`-only): без переключателя языков, без `alternate` frontmatter.
- Публикация — статикой на GitHub Pages (`nuxt generate`).
- Поверх upstream держим набор **mirror-custom отличий** (§8), которые sync НЕ должен откатывать.

---

## 3. Канонические артефакты-источники

Базовый префикс: `https://raw.githubusercontent.com/bitrix-tools/b24jssdk/main/`

| Файл | Действие | Что адаптировать |
|---|---|---|
| `AGENTS.md` | **адаптировать** | repo-имена, `BRAND/RIGHTSHOLDER`, `PAGES_URL`, ссылки upstream |
| `.github/AGENTS-SYNC-RUNBOOK.md` | **адаптировать** | repo-имена, список mirror-custom файлов |
| `docs/i18n/glossary.ru.yml` | **адаптировать под язык** | переводы терминов; структуру/поля `keep_en`/`note` сохранить |
| `docs/i18n/style-guide.md` | **адаптировать под язык** | типографику/тон под `LANG` |
| `docs/i18n/prompt.md` | **адаптировать** | имена файлов-источников, термины |
| `.github/workflows/ci.yml` | **копировать** (§6.1) | `NODE`/`PM` если отличаются |
| `.github/workflows/deploy.yml` | **копировать** (§6.2) | `NODE`/`PM` если отличаются |
| `.github/dependabot.yml` | **копировать** (§6.3) | таймзону, группы пакетов |
| `.github/workflows/broken-links.yml` | **копировать** | пути `docs/content/**` |
| `.github/workflows/sync-upstream.yml` | **копировать** | URL `UPSTREAM` |
| `.github/.upstream-sync-baseline` | **сгенерировать** | текущий SHA `UPSTREAM/main` (§6.5) |

> Если у агента нет доступа к raw.githubusercontent — попроси человека приложить эти файлы
> (см. §9.2 «вариант A»).

---

## 4. Фаза A — инфраструктура зеркала

> Пропусти, если репозиторий уже на Nuxt 4 + контент перенесён. Иначе — это самый объёмный этап
> (на эталоне это были Stage 1–2, PR #5 и #7). Кратко:

1. **Stage 1 (инфра):** Nuxt 4 + `@bitrix24/b24ui-nuxt`, перенос `docs/app|server|modules`, конфиги.
2. **Stage 2 (контент):** импорт `docs/content/**` из `UPSTREAM` **вербатим** (ещё без перевода).

Ключевые инварианты инфры (детали — в `AGENTS.md`):
- Корневые `docs:*`-скрипты делегируют в воркспейс: `pnpm --filter ./docs run <cmd>` (прямой `nuxt` ломается на Windows pnpm 11).
- `docs/package.json` `lint` = `eslint --config ../eslint.config.mjs .` (flat-config не walking-up).
- `remark-custom-heading-id` в **корневом** `package.json` + подключён в `docs/nuxt.config.ts`
  (`content.build.markdown.remarkPlugins`) — без него синтаксис `## Заголовок {#anchor}` ломается в `@nuxt/content` v3.
- `pnpm-workspace.yaml` — единственный участник `docs`.

---

## 5. Фаза B — translation-kit + правила агентов

Открой **один PR** «docs(i18n): translation kit + AGENTS rules».

1. Создай `docs/i18n/glossary.ru.yml`, `docs/i18n/style-guide.md`, `docs/i18n/prompt.md` — из §3, адаптируя под `LANG`.
   - В каждом — строка-штамп `Last reviewed: <дата> (<повод>)`. Освежай её при каждой правке файла.
   - В glossary поле `keep_en: true` = термин НЕ переводим (оставляем оригинал). Поле `note` — когда какой вариант.
2. Создай корневой `AGENTS.md` из §3. Критичные разделы, которые ОБЯЗАНЫ быть:
   - **Отношения с upstream** (что наш скоуп, что escalate).
   - **Брендинг и копирайт** (`BRAND` vs `RIGHTSHOLDER` — таблица по контекстам).
   - **Язык UI-строк** (что переводим / что нет, таблица готовых переводов типовых фраз).
   - **Кастомные якоря заголовков** (`{#anchor}` + `remark-custom-heading-id`).
   - **При sync НЕ восстанавливать** (§8 — список mirror-custom отличий).
   - **Доставка файлов «вариант A»** (бинарь/lockfile — делегируем человеку, §9.2).

---

## 6. Фаза C — CI/CD

Открой **один PR** «ci: pipelines, dependabot, link checker, upstream sync». Все версии экшенов —
**на Node-24-мажорах** (GitHub форсит Node 24 с 2026-06-16; не используй v4-экшены).

### 6.1 `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

# Cancel older runs on the same PR/branch — saves CI time on rapid pushes.
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: pnpm/action-setup@v6
        with:
          version: 11.4.0
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Lint
        run: pnpm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: pnpm/action-setup@v6
        with:
          version: 11.4.0
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Prepare Nuxt
        run: pnpm run docs:prepare
      - name: Typecheck
        run: pnpm run typecheck

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: pnpm/action-setup@v6
        with:
          version: 11.4.0
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Prepare Nuxt
        run: pnpm run docs:prepare
      - name: Build (static export)
        run: pnpm run docs:generate
```

### 6.2 `.github/workflows/deploy.yml`

> Ключевая идея: `deploy.yml` работает **независимо** от `ci.yml`, поэтому он **сам** перепрогоняет
> lint+typecheck перед публикацией — сломанный `main` не уедет в прод. Плюс smoke-тест доступности.

```yaml
name: Deploy docs to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Only one Pages deploy at a time. Do NOT cancel in-progress — we want the
# triggered deploy to finish so the artifact actually reaches Pages.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup pnpm
        uses: pnpm/action-setup@v6
        with:
          version: 11.4.0

      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # Gate the deploy on the same checks as CI: a push to main that breaks
      # lint/typecheck must NOT reach production (deploy.yml runs independently
      # of ci.yml, so we re-run them here before building the artifact).
      - name: Lint
        run: pnpm run lint

      - name: Prepare Nuxt
        run: pnpm run docs:prepare

      - name: Typecheck
        run: pnpm run typecheck

      - name: Build static site
        run: pnpm run docs:generate

      - name: Setup Pages
        uses: actions/configure-pages@v6

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: docs/.output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5

      # Smoke-test — site is actually reachable in prod (with propagation retry).
      - name: Smoke test deployed site
        run: |
          URL="${{ steps.deployment.outputs.page_url }}"
          echo "Smoke testing $URL"
          for i in 1 2 3 4 5; do
            if curl -fsS --max-time 15 "$URL" > /dev/null; then
              echo "site reachable on attempt $i"
              exit 0
            fi
            echo "attempt $i failed, retrying in 10s"
            sleep 10
          done
          echo "site not reachable after 5 attempts"
          exit 1
```

### 6.3 `.github/dependabot.yml`

Копируй с эталона (§3). Суть: 3 экосистемы — корневой `npm`, `docs/` `npm` (с группами
`bitrix24`/`nuxt`/`vue`/`content-tooling` и `ignore` мажоров Nuxt/Vue), и `github-actions`.

> ⚠️ **Грабли pnpm-workspace:** если lockfile один на корень (workspace), а `docs/` — отдельная
> npm-экосистема dependabot, то PR из `docs/`-экосистемы правят только `docs/package.json` и НЕ
> обновляют корневой `pnpm-lock.yaml` → `pnpm install --frozen-lockfile` в CI падает. Держи бампы
> приложения на **корневой** экосистеме (она правит workspace-lockfile), либо не заводи дублирующую
> `docs/`-экосистему для тех же пакетов. Не заводи группы под пакеты, которых нет в манифесте.

### 6.4 `broken-links.yml` + `sync-upstream.yml`

Копируй дословно из §3:
- **broken-links** — еженедельный `lychee` по `docs/content/**/*.md` (только внутренние/якорные ссылки),
  результат санитайзится в code-fence (анти-инъекция) и открывает issue.
- **sync-upstream** — еженедельно сравнивает `docs/` с `UPSTREAM/main` от baseline-SHA, открывает
  issue-отчёт «что приехало» (новые/изменённые/удалённые файлы content + изменения app/server/config).
  Ничего сам не переводит.

### 6.5 `.github/.upstream-sync-baseline`

Один SHA `UPSTREAM/main` на момент последней синхронизации (без перевода строки критично — следи за форматом).
Инициализируй текущим: `git ls-remote https://github.com/UPSTREAM.git main`.

---

## 7. Фаза D — перевод контента (поэтапно)

Дроби по разделам, **каждый раздел — свой PR**. На эталоне:
- Stage 3a — kit + механика (`scripts/add-anchors`, `swap-apidocs`, `remark-custom-heading-id`, прогон).
- Stage 3b/3c/3d — перевод по папкам `docs/content/docs/**`.

Для самого перевода используй промпт из `docs/i18n/prompt.md` (он заставляет агента сначала прочитать
glossary + style-guide + AGENTS.md). После AI-прохода — ручная корректура и `pnpm run docs:dev`.

---

## 8. Mirror-custom инварианты («при sync НЕ восстанавливать»)

Это сердце «зеркала». Веди этот список в `AGENTS.md`. На эталоне:

- Корневой `package.json` — `docs:*` через `pnpm --filter`, `i18n:*` скрипты, `dependencies.remark-custom-heading-id`.
- `docs/package.json` `lint` с явным `--config ../eslint.config.mjs`.
- `docs/nuxt.config.ts` — `optimizeDeps.include`, `remarkPlugins['remark-custom-heading-id']`,
  `app.head.meta` (CSP/Referrer-Policy), `schemaOrg.identity.name = RIGHTSHOLDER`.
- `LICENSE` — `Copyright (c) <год> RIGHTSHOLDER` (без цифры бренда).
- `docs/i18n/` и `scripts/` — нет в upstream, не сносить.
- **Баннер** `<Banner />` — закомментирован в `docs/app/app.vue` И `docs/app/error.vue`.
- **Chrome-ссылки сайта** (нав-пункт «GitHub», `config.public.gitUrl`, «edit this page») → `MIRROR`, не `UPSTREAM`.
  (NB: это UI-chrome самого сайта — отличается от **контентных** ссылок на исходники SDK, которые НЕ переписываем.)
- Если на зеркале намеренно вырезаны модули (AI-чат, MCP-сервер и т.п.) — список файлов и зависимостей
  держать в runbook §5.1, при sync **не восстанавливать**.

---

## 9. Методология работы агента (выработано практикой — соблюдать строго)

### 9.1 PR-дисциплина
- **Один концерн = один PR**, отдельная ветка `claude/<slug>` от `DEFAULT_BRANCH`.
- Conventional Commits на английском (`feat`/`fix`/`docs`/`chore`/`ci`). Squash при мерже, тело — список изменений.
- Перед мержем: ветка актуальна (`clean`), CI зелёный, ревью-вопросы закрыты, штампы `Last reviewed` освежены.
- НЕ создавай PR, пока человек не попросил (если регламент это требует).

### 9.2 Пуш файлов через GitHub MCP (а не git)
- В таких сессиях запись идёт через MCP (`create_or_update_file` / `push_files`), git-push токеном часто **read-only**.
- **Бинарь и крупные/генерируемые файлы** (`.webp/.png/.ico`, `pnpm-lock.yaml`, lockfiles, SVG >50 KB) MCP-обёртка
  портит (хранит как UTF-8/литеральный base64). → **Вариант A**: агент даёт человеку точный список + команды
  `cp/git add/commit/push`, человек заливает локально, агент верифицирует через `get_commit`/`get_file_contents`.
  Текст до ~500 KB агент пушит сам.

### 9.3 Байт-точные пуши (критично для не-ASCII контента)
MCP-пуш полного файла рискует исказить спецсимволы (— « » → ё, trailing-newline). Протокол без слепых ретраев:
1. Получи **эталонные байты**: `git clone --depth 1` репо по read-токену (если есть) ИЛИ возьми из апстрим-клона.
2. Применяй правки на диске, считай `git hash-object <file>` — это **target-SHA**.
3. Перед пушем собери контент, запиши во временный файл, `diff` против эталона — добивайся пустого diff.
4. После MCP-пуша сверь: возвращённый `blob sha` == target-SHA. Не совпало — чини и повторяй.
- **Грабли:** многие файлы БЕЗ финального `\n` (напр. `CHANGELOG.md`) — лишний перевод строки ломает SHA.

### 9.4 Подтверждение деплоя
- `deploy.yml` не идёт на PR. После каждого мержа в `main`, **особенно** если менялся `deploy.yml` или
  пользовательские страницы, дождись прогона `deploy.yml` и подтверди `conclusion: success`.

### 9.5 Dependabot
- Если делаешь консолидированный ручной PR, перекрывающий dependabot-PR — закрой их комментарием
  `@dependabot close` со ссылкой на свой PR (иначе переоткроются). Не плоди группы без реальных зависимостей.
- Dependabot-PR несут свой lockfile — их выгоднее **мержить** (не редактировать руками). Стейл-базы —
  сначала `Update branch`/rebase, дождись зелёного CI, потом мерж по одному.

### 9.6 Upstream-баги
- Любой код-баг SDK/доки, найденный при работе, НЕ чини в зеркале — заноси в **единый трекинг-issue**
  «upstream bugs» и/или escalate в `UPSTREAM`. Зеркало получит фикс синком.

### 9.7 Чистка веток
- В MCP **нет** удаления refs. Включи в репо **Settings → General → Automatically delete head branches**,
  тогда смерженные ветки чистятся сами. Старые — человек сносит в UI.

---

## 10. Чеклист готовности

- [ ] §1 параметры заполнены.
- [ ] `docs/i18n/{glossary,style-guide,prompt}` есть, со штампами `Last reviewed`.
- [ ] `AGENTS.md` со всеми разделами §5; список mirror-custom (§8) актуален.
- [ ] `ci.yml` + `deploy.yml` (с гейтом lint+typecheck и smoke-тестом), все экшены на Node-24-мажорах.
- [ ] `dependabot.yml` (3 экосистемы, без мёртвых групп; workspace-lockfile учтён).
- [ ] `broken-links.yml` + `sync-upstream.yml` + `.upstream-sync-baseline` (актуальный SHA).
- [ ] Пробный PR прошёл CI зелёным; первый деплой `main` — `success`, сайт открывается на `PAGES_URL`.
- [ ] Включено авто-удаление веток.
- [ ] Заведён трекинг-issue для upstream-багов.

---

## 11. Готовый промпт-затравка (вставь это агенту на новом зеркале)

````
Ты работаешь на репозитории-зеркале документации <MIRROR> (зеркало + перевод docs/ из <UPSTREAM>
на <LANG>, публикация на <PAGES_URL>). Цель — воспроизвести инфраструктуру и процессы эталона
bitrix-tools/b24jssdk 1:1.

Источник истины — playbook .github/MIRROR-PLAYBOOK.md (приложен ниже / в репозитории). Эталонные
артефакты бери дословно с https://raw.githubusercontent.com/bitrix-tools/b24jssdk/main/<path>
(если нет сетевого доступа — попроси меня приложить файлы).

Параметры проекта:
- UPSTREAM=<…>  MIRROR=<…>  PAGES_URL=<…>  LANG=<…>
- BRAND=<Bitrix24>  RIGHTSHOLDER=<Bitrix/Битрикс>  PKG=<…>
- PM=<pnpm 11.4.0>  NODE=<22>  DEFAULT_BRANCH=<main>

Порядок работы:
1. Прочитай MIRROR-PLAYBOOK.md целиком, затем эталонные AGENTS.md, glossary, style-guide, prompt.md.
2. Иди по фазам B→C→D. КАЖДЫЙ концерн — отдельная ветка claude/<slug> и отдельный PR. Не создавай
   PR, пока я не подтвердил план.
3. Соблюдай методологию §9: байт-точные пуши с проверкой blob-SHA, вариант A для бинаря/lockfile,
   подтверждение деплоя после мержа, @dependabot close для перекрытых PR, трекинг-issue для upstream-багов.
4. Все экшены в воркфлоу — только Node-24-мажоры (checkout@v6, setup-node@v5, pnpm/action-setup@v6,
   configure-pages@v6, upload-pages-artifact@v5, deploy-pages@v5).
5. После каждого мержа в main с изменением deploy.yml или страниц — дождись deploy.yml и подтверди success.

Начни с того, что прочитаешь playbook и эталонные файлы, затем предложи мне план первого PR
(translation-kit + AGENTS.md). Жди моего «го» перед пушем.
````

---

_Сгенерировано на основе рабочего состояния `bitrix-tools/b24jssdk` @ main (2026-07-02)._
