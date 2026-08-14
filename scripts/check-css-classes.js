/**
 * Fails if a hand-written class in src/**\/*.css is never referenced from the app.
 * Tailwind utilities are generated at build time and never declared in these files,
 * so anything declared here is bespoke and should have a caller — an unreferenced
 * rule means a class was renamed in JSX and the CSS was left behind.
 */
import { readFileSync } from 'node:fs'
import { globSync } from 'glob'

// Declared for the dark-mode variant, toggled on <html> rather than written in JSX.
const ALLOWED_UNUSED = new Set(['dark'])

const cssFiles = globSync('src/**/*.css')
const sourceFiles = [...globSync('src/**/*.{ts,tsx}'), 'index.html']

const declared = new Map()

for (const file of cssFiles) {
  const contents = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  // Only selector text, i.e. whatever precedes a declaration block.
  for (const [, selector] of contents.matchAll(/([^{}@;]+)\{/g)) {
    for (const [, name] of selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
      if (!declared.has(name)) declared.set(name, file)
    }
  }
}

const used = new Set()

for (const file of sourceFiles) {
  const contents = readFileSync(file, 'utf8')
  for (const [token] of contents.matchAll(/[A-Za-z0-9_:./-]+/g)) {
    // Strip Tailwind variant prefixes so `dark:glass-card` counts as `glass-card`.
    used.add(token.slice(token.lastIndexOf(':') + 1))
  }
}

const unused = [...declared.entries()].filter(
  ([name]) => !used.has(name) && !ALLOWED_UNUSED.has(name)
)

if (unused.length > 0) {
  console.error('✖ CSS classes declared but never used in the app:')
  for (const [name, file] of unused) console.error(`  ${file}: .${name}`)
  process.exit(1)
}

console.log(`✔ ${declared.size} declared CSS classes, all referenced.`)
