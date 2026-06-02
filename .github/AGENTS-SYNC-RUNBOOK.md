# Sync-from-upstream runbook

<sub>Last reviewed: 2026-06-02 (Stage 4 merge)</sub>

Пошаговый чеклист «как принести изменения из [`bitrix24/b24jssdk`](https://github.com/bitrix24/b24jssdk) в этот репозиторий». Используется, когда в upstream:

- выходит новый релиз SDK и вместе с ним обновляется `docs/content/**`;
- обновляется `docs/app/**` (компоненты, layouts);
- выходят новые версии Nuxt-зависимостей (обычно Dependabot видит их раньше).

> Главный принцип: **мы зеркало + перевод**, не место фиксов SDK. Баги кода и docs-аппликейшена — это upstream. Здесь только принимаем и переводим.

Связанные документы: [`AGENTS.md`](../AGENTS.md) («При sync из upstream — НЕ восстанавливать», «Брендинг и копирайт»), [`docs/i18n/style-guide.md`](../docs/i18n/style-guide.md).

---

## 0. Подготовка

```bash
# в локальном клоне bitrix-tools/b24jssdk
git checkout main
git pull origin main
git checkout -b sync/upstream-YYYY-MM-DD

# добавить upstream remote (однократно)
git remote add upstream https://github.com/bitrix24/b24jssdk.git 2>/dev/null || true
git fetch upstream main
```

## 1. Оценить, что изменилось в upstream

```bash
# Последний sync коммит — это merge commit предыдущего Stage 2 / sync PR. Найдите его:
git log --oneline --all | grep -i 'stage-2\|sync' | head -5

# Посмотреть новые коммиты в upstream (только в docs/):
git log upstream/main --oneline --since='2 weeks ago' -- docs/

# Посмотреть полный diff по docs/content/:
git diff <last-sync-sha>..upstream/main -- docs/content/ | less

# Или по файлам — что добавилось/удалилось:
git diff <last-sync-sha>..upstream/main --stat -- docs/
```

Решение по скоупу:

- **Новые файлы в `docs/content/**`** — приносим, потом в следующем PR переводим.
- **Изменённые файлы в `docs/content/**` которые уже переведены** — особый случай, см. §3.
- **Изменения в `docs/app/**`, `docs/server/**`, `docs/modules/**`** — приносим, внимательно переводим UI-строки (см. §4).
- **Изменения в `docs/nuxt.config.ts`** — ОСОБОЕ внимание: не откатить наши адаптации (см. §5).
- **Изменения в корневых конфигах** (`package.json`, `LICENSE`, `README.md`) — НЕ приносим автоматически. Проверяем по §6.

## 2. Принести изменения

### Вариант A — большинство случаев (cherry-pick по файлам)

```bash
# Новые EN-файлы в docs/content/** (в нашем репо их нет — просто копируем):
git checkout upstream/main -- docs/content/docs/<new-file>.md

# Или целая папка:
git checkout upstream/main -- docs/content/docs/<new-section>/
```

### Вариант B — изменён уже переведённый файл

Не перезаписывать файл целиком — ручной merge по блокам:

```bash
# Посмотреть diff конкретного файла:
git diff <last-sync-sha>..upstream/main -- docs/content/docs/1.getting-started/1.index.md
```

Перенести в RU-перевод руками:

- Новые абзацы — перевести по [`prompt.md`](../docs/i18n/prompt.md), вставить.
- Новые якоря `{#...}` — добавить (или прогнать `pnpm run i18n:add-anchors` — он идемпотентен).
- Новые ссылки на `apidocs.bitrix24.com` — `pnpm run i18n:swap-apidocs`.
- Новые термины — добавить в `docs/i18n/glossary.ru.yml` в том же коммите.

### Вариант C — большой sync (десятки файлов)

Разобьёте на несколько PR по разделам (в духе Stage 3a/b/c/d): `sync/getting-started`, `sync/working-with-rest-api`, `sync/examples`.

## 3. Изменён уже переведённый файл — рабочий процесс

1. Открыть diff upstream-версии (как в §2 Вариант B).
2. Изменение в frontmatter (напр. `audited: 2024-...`) — НЕ откатывать нашу дату. Актуализировать только если реально пересмотрели файл.
3. Новые код-блоки (являются каноном API) — взять как есть, комментарии в коде перевести.
4. Новые ссылки на GitHub upstream (`github.com/bitrix24/b24jssdk/...`) — НЕ переписывать (SDK живёт там).
5. Новые MDC-блоки — внутренний текст перевести, синтаксис оставить (`::warning`, `:::tabs-item{label=...}`).

## 4. UI-строки в `docs/app/**`, `docs/modules/**`

Для каждого принесённого файла проверьте (внимание на видимый текст в `<template>`):

```bash
# Дифф с upstream по всем компонентам:
git diff <last-sync-sha>..upstream/main -- docs/app/ docs/modules/

# Поиск EN-строк, которые могли вернуться:
grep -rn 'Get started\|Edit this page\|Copy code\|Search' docs/app/ docs/modules/
```

Для каждой найденной строки — см. таблицу «Готовые переводы типовых фраз» в [`AGENTS.md`](../AGENTS.md). Не переводить: `aria-label` с `Bitrix24`, имена иконок, `console.log`.

## 5. `docs/nuxt.config.ts` — зоны конфликта

Сравните наш `docs/nuxt.config.ts` с upstream, обратив внимание на эти «зоны» — НЕ откатывайте ни одну:

| Зона | Наше значение | Почему |
|---|---|---|
| `app.head.htmlAttrs.lang` | `'ru-RU'` | RU-only сайт |
| `app.head.meta` | CSP / X-Content-Type-Options / Referrer-Policy | статический хостинг GitHub Pages |
| `app.baseURL` | `/b24jssdk/` | прод-хост bitrix-tools.github.io |
| `content.build.markdown.remarkPlugins['remark-custom-heading-id']` | `{}` | обязательно — без него якоря `{#anchor}` ломаются |
| `vite.optimizeDeps.include` | список + `'remark-custom-heading-id'` | предбандл в деве |
| `schemaOrg.identity.name` | `'Bitrix'` (без цифры) | юр. имя правообладателя |
| `schemaOrg.identity.sameAs` | `bitrix-tools` + `bitrix24` orgs | наши + upstream profile links |
| `runtimeConfig.public.siteUrl` | `https://bitrix-tools.github.io` | прод-домен |
| `runtimeConfig.public.gitUrl` | `github.com/bitrix-tools/b24jssdk` | наш репо для ссылок «редактировать» |
| `llms.title` / `description` | на русском | LLM-поиск |
| `llms.notes` | «Переводы синхронизируются с upstream...» | пояснение об источнике |

Изменения из upstream принять можно только в `modules: [...]`, `nitro: {...}`, `routeRules: {...}` и `compatibilityDate`. Всё остальное — ручной merge.

## 6. Корневые конфиги — НЕ восстанавливать

Эти файлы **не берём из upstream**:

- `package.json` (корневой) — наши скрипты `docs:*` и `i18n:*`, `dependencies.remark-custom-heading-id`.
- `LICENSE` — `Copyright (c) <год> Bitrix` (без цифры).
- `README.md` — русскоязычный, с секцией «Участие в переводе».
- `pnpm-workspace.yaml` — только `docs` (у upstream возможны другие участники).
- `eslint.config.mjs`, `.editorconfig`, `.nuxtrc`, `.npmrc` — принимаем по желанию, если upstream обновил ESLint-правила.

Если upstream поменял свой `LICENSE` / `package.json` — это НЕ наш вопрос. Должны остаться наши версии.

## 7. `docs/package.json` — зависимости

Версии npm-пакетов (`@bitrix24/b24jssdk`, `@bitrix24/b24jssdk-nuxt`) поднимает Dependabot. Но в мажорных release-тагах SDK (напр. v2.0.0) лучше поднять вручную:

```bash
cd docs
pnpm update @bitrix24/b24jssdk @bitrix24/b24jssdk-nuxt --latest
```

Проверьте, что:

- Не появился `workspace:*` в `dependencies` (у нас всегда npm-версии).
- `lint` в `scripts` остался: `eslint --config ../eslint.config.mjs .`

## 8. Проверка после sync

```bash
# 1. Чистая установка
rm -rf node_modules docs/node_modules
pnpm install

# 2. Прогнать i18n-скрипты (идемпотентны)
pnpm run i18n:prep

# 3. Полный цикл CI локально
pnpm run lint
pnpm run docs:prepare
pnpm run typecheck
pnpm run docs:generate    # то, что реально идёт в деплой

# 4. Визуальная проверка
pnpm run docs:dev
# Откройте в браузере: главная, getting-started, любой переведённый раздел.
# Сверьте: якоря, футер, RU-UI строки, рендер MDC-блоков.
```

### Проверки бренда

```bash
# 1. Копирайт не вернулся на Bitrix24:
grep -RIn 'Copyright (c).* Bitrix24' LICENSE README.md docs/app/ docs/nuxt.config.ts
# Ожидаем пустой результат

# 2. schemaOrg имя организации — Bitrix (без цифры):
grep -n 'identity' docs/nuxt.config.ts | grep -i name
# Ожидаем: name: 'Bitrix'

# 3. Footer copyright (русский):
grep -n 'Copyright\|MIT' docs/app/components/Footer.vue
# Ожидаем: «Копирайт © 2024 – настоящее время Битрикс» и «Распространяется под лицензией MIT.»

# 4. remark-custom-heading-id подключён:
grep -n 'remark-custom-heading-id' docs/nuxt.config.ts package.json
# Ожидаем: 3 вхождения (remarkPlugins, optimizeDeps, root dependencies)
```

### Проверки ссылок

```bash
# apidocs.com — пусто (или только во фронтматтере):
grep -r 'apidocs.bitrix24.com' docs/content/

# github.com/bitrix24/ — ОСТАЛСЯ (SDK живёт там, не переписываем):
grep -rc 'github.com/bitrix24/b24jssdk' docs/content/ | head -5

# Якоря без дублирования:
grep -rE '\{#[^}]+\}\s*\{#[^}]+\}' docs/content/
# Ожидаем пусто
```

## 9. Коммит и PR

```bash
git status --short
git add -A
git commit -m "sync(upstream): bring v<version> docs changes

* docs/content/: список принесённых/изменённых файлов
* docs/app/: видимые UI-строки переведены
* docs/nuxt.config.ts: приняты X / отклонены Y
* docs/package.json: версии @bitrix24/* подняты до A.B.C

Last sync: <last-sync-sha>
Upstream: <upstream-sha>"
git push -u origin sync/upstream-YYYY-MM-DD
```

PR-боди должен включать:

- Список upstream-коммитов (`git log <last-sync-sha>..upstream/main --oneline -- docs/`)
- Какие файлы RU-перевода попали под конфликт (и как разрешен)
- Новые термины в `glossary.ru.yml`
- Ссылка на upstream-релизные notes (если синка привязана к тегу)

## 10. После мержа

CI (`.github/workflows/deploy.yml`) автоматически пересоберёт и выложит сайт. Проверьте <https://bitrix-tools.github.io/b24jssdk/> через ~5 минут.

Если broken-links checker (недельный) создал issue с сломанными внутренними ссылками — это вероятно из-за sync (внутренняя ссылка ведёт на файл, который переименовался в upstream).

---

## FAQ

**Почему не используем `git merge upstream/main`?**  
Потому что наши ветки имеют «отдельную» историю (без общего предка с upstream). Merge сработает, но даст огромный конфликт по LICENSE / package.json / nuxt.config.ts. Пофайловый `git checkout upstream/main -- <path>` безопаснее.

**Как найти «last-sync-sha»?**  
Это верхний upstream-коммит из предыдущего sync. Пишите в PR-боди `Upstream: <sha>` — следующий sync возьмёт его оттуда.

**Что делать, если upstream полностью переписал файл, который мы уже перевели?**  
Сверьте EN-версии «do» и «after» — если переписан больше 30%, лучше перевести заново (положив сверху русский frontmatter `title:`/`description:` из предыдущего перевода). Иначе — ручной merge по блокам через diff.

**Кто отвечает за sync?**  
Обычно после нового релиза SDK (`bitrix24/b24jssdk/releases`) — мейнтейнер репо. При критичных фиксах SDK — в течение недели.
