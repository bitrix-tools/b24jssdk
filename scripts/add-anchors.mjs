#!/usr/bin/env node
/**
 * docs/content/**\/*.md → добавляет явные якори {#kebab-slug} к каждому заголовку h2/h3,
 * у которого их ещё нет. Slug генерируется из текущего текста заголовка (английский).
 *
 * Этот скрипт должен быть запущен ОДИН РАЗ на английском контенте (до перевода).
 * При ре-запуске идемпотентен — уже размеченные заголовки пропускает (якорь может быть в любом месте строки).
 *
 * Usage:
 *   node scripts/add-anchors.mjs               # реальный запуск
 *   node scripts/add-anchors.mjs --dry-run     # только показать что будет изменено
 *
 * Slug-алгоритм совместим с github-slugger (тот же, что использует Nuxt Content):
 * первый вход = `slug`, второй с тем же текстом = `slug-1`, третий = `slug-2`.
 *
 * @see docs/i18n/style-guide.md
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../docs/content', import.meta.url))
const DRY_RUN = process.argv.includes('--dry-run')

/** Обход файлов: пропускает симлинки, выход за пределы ROOT и скрытые файлы/папки. */
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.navigation.yml') continue
    if (entry.isSymbolicLink()) continue
    const path = join(dir, entry.name)
    // санити безопасности: никаких выходов за ROOT
    if (!resolve(path).startsWith(resolve(ROOT))) continue
    if (entry.isDirectory()) yield* walk(path)
    else if (entry.isFile() && path.endsWith('.md')) yield path
  }
}

/** GitHub-style slug: lowercase, non-alphanum → dash, collapse, trim. */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, '') // HTML entities
    .replace(/[^\w\s-]/g, '') // non-word/space/dash
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Обрабатывает один markdown-файл. Чистая функция — легко тестируется в будущем.
 *
 * @param {string} content
 * @returns {{ content: string, modified: boolean, warnings: string[] }}
 */
export function processFile(content) {
  const lines = content.split('\n')
  let inFence = false
  let fenceMarker = '' // запоминаем, чем открыли (``` или ~~~)
  let inFrontmatter = false
  let frontmatterClosed = false
  let modified = false
  const warnings = []
  const used = new Set()

  const result = lines.map((line, i) => {
    // frontmatter (только в самом начале)
    if (i === 0 && line.trim() === '---') {
      inFrontmatter = true
      return line
    }
    if (inFrontmatter && !frontmatterClosed && line.trim() === '---') {
      inFrontmatter = false
      frontmatterClosed = true
      return line
    }
    if (inFrontmatter) return line

    // code-fence: трекаем тип делимитера. Открываем любым из ``` / ~~~,
    // закрываем только тем же — иначе ``` внутри ~~~-блока сломает toggle.
    const fenceMatch = line.match(/^\s*(```|~~~)/)
    if (fenceMatch) {
      const marker = fenceMatch[1]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }
      return line
    }
    if (inFence) return line

    // заголовок h2/h3 — жадный квантор + .trimEnd(), чтобы избежать overlap \s+ и \s*
    const m = line.match(/^(#{2,3})[ \t]+(.+)$/)
    if (!m) return line
    const [, hashes, rawHeading] = m
    const headingText = rawHeading.trimEnd()

    // уже есть якорь В ЛЮБОМ месте строки — и `## Foo {#x}`, и `## Foo {.cls} {#x}`, и `## Foo {#x} {.cls}`
    if (/\{#[\w-]+\}/.test(headingText)) return line

    // снимаем любые MDC-модификаторы вида {.class} или inline-код для слага
    const cleanText = headingText
      .replace(/`([^`]+)`/g, '$1') // inline-код — берём внутренний текст
      .replace(/\{[^}]+\}/g, '') // MDC модификаторы
      .trim()

    const slug = slugify(cleanText)
    if (!slug) {
      warnings.push(`empty slug for heading: "${headingText}" — якорь не добавлен`)
      return line
    }

    // Дедупликация github-slugger style: первый = `slug`, второй = `slug-1`, третий = `slug-2`.
    let finalSlug = slug
    let counter = 0
    while (used.has(finalSlug)) {
      finalSlug = `${slug}-${++counter}`
    }
    used.add(finalSlug)

    modified = true
    return `${hashes} ${headingText} {#${finalSlug}}`
  })
  return { content: result.join('\n'), modified, warnings }
}

let total = 0, modifiedCount = 0, failedCount = 0
for await (const path of walk(ROOT)) {
  total++
  const rel = relative(ROOT, path).replaceAll('\\', '/')
  try {
    const original = await readFile(path, 'utf8')
    const { content, modified, warnings } = processFile(original)
    for (const w of warnings) console.warn(`[warn] docs/content/${rel}: ${w}`)
    if (!modified) continue
    modifiedCount++
    if (DRY_RUN) {
      console.log(`[DRY] would modify docs/content/${rel}`)
    } else {
      await writeFile(path, content)
      console.log(`✓ docs/content/${rel}`)
    }
  } catch (err) {
    failedCount++
    console.error(`[error] docs/content/${rel}: ${err.message}`)
  }
}
console.log(`\n${DRY_RUN ? 'Would modify' : 'Modified'} ${modifiedCount}/${total} files.`)
if (failedCount > 0) {
  console.error(`${failedCount} file(s) failed.`)
  process.exit(1)
}
