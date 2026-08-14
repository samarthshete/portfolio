# Release Notes — Portfolio Polish Series

Review pass before merging to `main`. Everything below is already built and lint-clean locally.

## Positioning & content

**Hero (`src/pages/Home.tsx`)** — Replaced the 4-role rotator (`AI/ML Engineer`, `Software Engineer`, `Cloud Architect`, `Full-Stack Developer`) and its interval logic with a single static title, **AI Engineer**. New one-line positioning statement: "I build and evaluate production LLM systems — RAG pipelines, agent security, and eval infrastructure — on a 3+ year software engineering foundation." The four self-rated skill tiles (`Python: Expert`, etc.) became four factual chips: 3+ yrs production engineering / RAG & LLM evaluation / AWS · Docker · K8s / MS CS, GWU '26. All animations and type scale preserved.

**Experience (`src/pages/Experience.tsx`)** — Trimmed from 8 entries to the 3 on the resume, in order: Adobe (AI Engineer), Virtual Infotech Solution (SDE), Neon IT Systems (Software Engineer). Every quantified claim in the surviving entries is byte-identical to before. Removed: both GWU roles, GirlScript Summer of Code, VG Computers, H Globe Tech. Section subline is now "Production engineering across AI systems, backend platforms, and cloud infrastructure."

**About (`src/pages/About.tsx`)** — MS is stated as completed (May 2026), not in progress. "My Story" rewritten as a 3-paragraph arc: production foundation in India → MS CS at GWU with applied-AI work → current specialization in the reliability layer (LLM evaluation, agent security, observability). Added an **Education** card with the MS (including a "While at GWU (part-time roles)" sub-list covering the Graduate Teaching Assistant and Law School Technical Assistant roles moved out of Experience) and the B.Tech. Skills grid untouched.

**Projects (`src/pages/ProjectDetail.tsx`)** — Regrouped the flat list into Featured / AI & Agents / Full-Stack & Product / Systems & Infrastructure / ML using the existing card component and field structure. AgentShield and ContextLens copy updated from verified facts; ContextLens now uses a real local screenshot (`src/assets/projects/contextlens.png`). GitHub and demo URLs filled in for featured work. Dates normalized.

## Functionality

**Contact form is real.** Extracted one shared `src/components/ContactForm.tsx` used by both `Home.tsx` and `Contact.tsx`, replacing two copies of a fake `console.log` + `alert()` submit. It POSTs to Formspree with loading ("Sending…", button disabled), success (form cleared, inline confirmation), and failure states — the failure path surfaces `samarthshete1420@gmail.com` as a fallback. No `alert()` anywhere. Each page keeps its original form styling via a `variant` prop.

**Resume is wired in.** `public/Samarth_Shete_Resume.pdf` is served through `import.meta.env.BASE_URL`, so it resolves under the `/portfolio/` base path. Added a distinct outlined "Resume" pill as the last item in both desktop and mobile nav, plus a "Download Resume" button in the hero. Confirmed the PDF is copied into `dist/`.

**Cross-page section navigation fixed.** Clicking a nav item from a project detail page used to land at the top of Home instead of the requested section. Nav now routes to `/?section=<id>`, and `Home.tsx` scrolls to it on mount (80px header offset) then strips the param via `replace` so history stays clean.

**Contact details updated** — phone `5712756434`, email `samarthshete1420@gmail.com`. Removed the old footer resume link.

## Metadata & assets

- **New social share image**: `public/og-image.png`, 1200×630, generated from `scripts/og-image.svg` (dark `#121212` background matching the site palette, blue accent gradient, SS monogram, name / "AI Engineer" / "RAG pipelines · Agent security · LLM evals"). The SVG source lives in `scripts/` so it doesn't ship in `dist/`.
- `og:image` and `twitter:image` now point at `https://samarthshete.github.io/portfolio/og-image.png`, with explicit `og:image:width`/`height`. `og:url` and `canonical` corrected from the non-existent `samarthshete.com` to the deployed GitHub Pages URL.
- `<title>`, meta description, and all OG/Twitter title+description aligned to the AI Engineer positioning.
- **Removed the Blink auto-engineer script tag** (`blink.new/auto-engineer.js`) from `index.html` — a third-party script that was loading on every page view.
- **Fixed a 404 favicon**: was `/vite.svg`, which neither existed in `public/` nor resolved under the `/portfolio/` base. Added `public/favicon.svg` (SS monogram) referenced relatively.
- Footer copyright is now `new Date().getFullYear()` instead of a hardcoded `© 2025`, and the placeholder `https://github.com` / `https://linkedin.com` / `https://twitter.com` social links became real profile URLs (the dead Twitter link was dropped).

## Build & tooling hygiene

- **`npm run lint` actually runs now.** Both `eslint.config.js` and `.stylelintrc.json` were missing entirely, so `lint:js` and `lint:css` failed immediately despite the dependencies being installed. Added flat-config ESLint (typescript-eslint, react-hooks, react-refresh; vendored shadcn sources ignored) and a Stylelint config that recognizes Tailwind at-rules.
- **The two `check:css-*` lint steps referenced scripts that did not exist.** Wrote `scripts/check-css-variables.js` (every `var(--x)` must be defined in `:root`, catching silently-transparent renamed tokens) and `scripts/check-css-classes.js` (hand-written CSS classes must have a caller, catching CSS left behind after a JSX rename). The class guard immediately found and removed one dead utility, `.bg-dark`.
- **Fixed a type-check blocker**: `src/components/ui/toggle.ts` contained JSX under a `.ts` extension, producing 9 parse errors and failing `tsc --noEmit` for the whole repo. Renamed to `.tsx`.
- **Stylelint `--fix` was silently deleting `-webkit-backdrop-filter`**, which would have broken the glass effect on Safari/iOS. Disabled `property-no-vendor-prefix` and the cosmetic rewrite rules so `--fix` no longer mutates authored CSS.
- Deleted dead code: unused `src/components/Layout.tsx` and leftover Vite-template `src/App.css` (never imported). Removed an unused `useLocation` import from `App.tsx`.
- Normalized `src/index.css` filename casing — the local file had drifted to `Index.css`, which is invisible on macOS but would break the lowercase import on the Linux CI runner. Git tracked lowercase throughout, so no deployed build was affected.

## Known follow-ups

- **The AgentScape demo link returns HTTP 500** (`https://agentscape-kappa.vercel.app`, referenced in `ProjectDetail.tsx`). The link is intentionally left in place; the Vercel deployment will be redeployed separately.
- Seven projects still use Unsplash stock images; each is marked with a `TODO` in `ProjectDetail.tsx` naming the local screenshot path to drop in.
- `Samarth Shete-AI Engineer-Updated Resume (1).pdf` is an untracked duplicate at the repo root. `public/Samarth_Shete_Resume.pdf` is the canonical copy — delete the root one rather than committing it.
- Three non-blocking `react-refresh/only-export-components` warnings remain (`ThemeContext.tsx`, `ProjectDetail.tsx`, `Writing.tsx`); they only affect HMR granularity in dev.

### Regenerating the OG image

```bash
npx --yes sharp-cli -i scripts/og-image.svg -o public --format png resize 1200 630
```
