/**
 * Fails if a CSS custom property is referenced via var(--x) in the stylesheets or
 * tailwind.config.js without being defined in the :root block of src/index.css.
 * Catches the silent-transparent-color failure mode when a token is renamed.
 */
import { readFileSync } from 'node:fs'
import { globSync } from 'glob'

const TOKENS_FILE = 'src/index.css'
const SOURCES = [...globSync('src/**/*.css'), 'tailwind.config.js']

const tokensCss = readFileSync(TOKENS_FILE, 'utf8')
const rootBlock = tokensCss.match(/:root\s*\{([^}]*)\}/)

if (!rootBlock) {
  console.error(`✖ Could not find a :root block in ${TOKENS_FILE}`)
  process.exit(1)
}

const defined = new Set(
  [...rootBlock[1].matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1])
)

const missing = []

for (const file of SOURCES) {
  const contents = readFileSync(file, 'utf8')
  for (const [, name] of contents.matchAll(/var\(\s*(--[\w-]+)/g)) {
    if (!defined.has(name)) missing.push({ file, name })
  }
}

if (missing.length > 0) {
  console.error('✖ Undefined CSS variables referenced:')
  for (const { file, name } of missing) console.error(`  ${file}: var(${name})`)
  process.exit(1)
}

console.log(`✔ ${defined.size} CSS variables defined, all references resolve.`)
