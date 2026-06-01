#!/usr/bin/env node
/**
 * docs/content/**\/*.md → добавляет явные якори {#kebab-slug} к каждому заголовку h2/h3,
 * у которого их ещё нет. Slug генерируется из текущего текста заголовка (английский).
 *
 * Этот скрипт должен быть запущен ОДИН РАЗ на английском контенте (до перевода).
 * При ре-запуске идемпотентен — уже размеченные заголовки пропускает.
 *
 * Usage:
 *   node scripts/add-anchors.mjs               # реальный запуск
 *   node scripts/add-anchors.mjs --dry-run     # только показать что будет изменено
 *
 * @see docs/i18n/style-guide.md
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../docs/content', import.meta.url))
const DRY_RUN = process.argv.includes('--dry-run')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (entry.isFile() && path.endsWith('.md')) yield path
  }
}

/** GitHub-style slug: lowercase, non-alphanum → dash, collapse, trim. */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, '')          // HTML entities
    .replace(/[^\w\s-]/g, '')          // non-word/space/dash
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function processFile(content) {
  const lines = content.split('\n')
  let inFence = false
  let inFrontmatter = false
  let frontmatterClosed = false
  let modified = false
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

    // code-fence: ``` или ~~~ (с опциональными пробелами в начале)
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence) return line

    // заголовок h2/h3
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/)
    if (!m) return line
    const [, hashes, headingText] = m

    // уже есть якорь?
    if (/\{#[A-Za-z0-9_-]+\}\s*$/.test(headingText)) return line

    // снимаем любые MDC-модификаторы вида {.class} или inline-код для слага
    const cleanText = headingText
      .replace(/`([^`]+)`/g, '$1')   // inline-код — берём внутренний текст
      .replace(/\{[^}]+\}/g, '')     // MDC модификаторы
      .trim()

    let slug = slugify(cleanText)
    if (!slug) return line

    // на случай дубликатов (редко, но бывает) — добавляем суффикс
    let finalSlug = slug
    let counter = 1
    while (used.has(finalSlug)) {
      finalSlug = `${slug}-${++counter}`
    }
    used.add(finalSlug)

    modified = true
    return `${hashes} ${headingText} {#${finalSlug}}`
  })
  return { content: result.join('\n'), modified }
}

let total = 0, modifiedCount = 0
for await (const path of walk(ROOT)) {
  total++
  const original = await readFile(path, 'utf8')
  const { content, modified } = processFile(original)
  if (!modified) continue
  modifiedCount++
  const rel = path.replace(ROOT + '/', 'docs/content/')
  if (DRY_RUN) {
    console.log(`[DRY] would modify ${rel}`)
  } else {
    await writeFile(path, content)
    console.log(`✓ ${rel}`)
  }
}
console.log(`\n${DRY_RUN ? 'Would modify' : 'Modified'} ${modifiedCount}/${total} files.`)
