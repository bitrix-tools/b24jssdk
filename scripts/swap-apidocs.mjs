#!/usr/bin/env node
/**
 * docs/content/**\/*.md → массово заменяет apidocs.bitrix24.com → apidocs.bitrix24.ru.
 *
 * Почему: сайт обслуживает русскоязычную аудиторию — ссылки на REST API-доки
 * должны вести на .ru домен.
 *
 * Скрипт работает наивным поиском по всему файлу (включая код-блоки) —
 * это осознанно: apidocs URLs в код-примерах всегда педагогические («see URL»),
 * не продакшен-эндпоинты SDK. Если потребуется исключать код-блоки — см. issue
 * «swap-apidocs: skip code fences».
 *
 * Идемпотентен — повторный запуск ничего не портит.
 *
 * Usage:
 *   node scripts/swap-apidocs.mjs               # реальный запуск
 *   node scripts/swap-apidocs.mjs --dry-run     # только показать что будет изменено
 *
 * @see docs/i18n/style-guide.md — «Ссылки в markdown»
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../docs/content', import.meta.url))
const DRY_RUN = process.argv.includes('--dry-run')
const FROM = 'apidocs.bitrix24.com'
const TO = 'apidocs.bitrix24.ru'
const FROM_REGEX = new RegExp(FROM.replace(/\./g, '\\.'), 'g')

/** Обход файлов: пропускает симлинки и выход за пределы ROOT. */
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue
    const path = join(dir, entry.name)
    if (!resolve(path).startsWith(resolve(ROOT))) continue
    if (entry.isDirectory()) yield* walk(path)
    else if (entry.isFile() && path.endsWith('.md')) yield path
  }
}

let total = 0, modifiedCount = 0, totalReplacements = 0, failedCount = 0
for await (const path of walk(ROOT)) {
  total++
  const rel = relative(ROOT, path).replaceAll('\\', '/')
  try {
    const original = await readFile(path, 'utf8')
    const matches = original.match(FROM_REGEX)
    if (!matches) continue
    modifiedCount++
    totalReplacements += matches.length
    if (DRY_RUN) {
      console.log(`[DRY] docs/content/${rel} (×${matches.length})`)
    } else {
      await writeFile(path, original.replaceAll(FROM, TO))
      console.log(`✓ docs/content/${rel} (×${matches.length})`)
    }
  } catch (err) {
    failedCount++
    console.error(`[error] docs/content/${rel}: ${err.message}`)
  }
}
console.log(`\n${DRY_RUN ? 'Would modify' : 'Modified'} ${modifiedCount}/${total} files, ${totalReplacements} replacements.`)
if (failedCount > 0) {
  console.error(`${failedCount} file(s) failed.`)
  process.exit(1)
}
