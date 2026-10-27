# Portfolio

Personal portfolio of Jairo Jiménez, backend developer. A single static page meant to be linked from job boards: who I am, what I work with, where I have worked, and how to get in touch.

Live site: https://jairojimenez.dev/

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript strict.
- Plain CSS with design tokens, scoped per component. No CSS framework.
- [Lenis](https://github.com/darkroomengineering/lenis) for inertial scrolling. It is the only runtime dependency.
- Fonts downloaded at build time and served from this domain (no requests to Google Fonts from visitors).
- Deployed to GitHub Pages by GitHub Actions on every push to `master`.

## How the code is organised

```
src/
  config/             site URL and the list of languages, shared by Astro, tests and tools
  content/            portfolio data, one JSON file per entry, with every translation inside
  content.config.ts   schema of that data (the build fails if a file breaks it)
  i18n/               interface strings, one dictionary per language
  lib/                pure TypeScript: data access, translation, dates, sorting, markup, URLs, SEO
  components/
    ui/               primitives: Band, Row, Button, SectionTitle, TagList, Icon, Emphasis, Eyebrow
    sections/         Hero, Skills, Experience, Projects, Education, Contact
    layout/           Header, Menu, Footer
  layouts/            Base.astro: document head, fonts, metadata, scripts
  pages/              [...locale].astro: one home page per language (/, /en/, /ca/)
  scripts/            browser JavaScript: smooth scroll, reveal on scroll, dot twinkle, expandable blocks, menu, copy button
  styles/             tokens.css (colours, type, rhythm) and global.css (reset, reveal, expandable blocks)
  assets/             optimised portrait
public/               files served as-is: CV, favicon, one Open Graph image per language
tools/                build helpers: prepare the portrait, render the Open Graph image
tests/                unit tests (Vitest) and end-to-end tests (Playwright)
```

Data flows one way: `content/` → `content.config.ts` (validation) → `lib/content.ts` (loading, sorting and picking the language) → `pages/[...locale].astro` → sections. Sections receive typed props with plain strings in the page's language and never read the collections themselves.

## Languages

The site is published in Spanish at `/`, English at `/en/` and Catalan at `/ca/`. The list lives in `src/config/locales.ts`; routes, dictionaries, the content schema, the sitemap and the Open Graph images all derive from it. Each page declares its language and links to the other versions with `hreflang`, and visitors can switch language from a dropdown in the header on desktop or from the bottom of the full-screen menu on mobile. Visitors are never redirected based on their browser language.

Interface strings live in `src/i18n/<language>.ts`. The Spanish dictionary defines the shape, so a missing or extra key in another language does not compile.

The page works without JavaScript. Scripts only add behaviour: inertial scrolling, reveal animations, collapsing long lists and the mobile menu. If the main script fails to start within three seconds, the reveal animations switch off so no content stays hidden.

## Editing the content

Every section reads from `src/content/`. To add a job, a project or a course, add a JSON file to the matching folder; to remove one, delete the file. Fields are documented in `src/content.config.ts`. Text fields that accept `**bold**` render the marked words with the accent colour.

Facts such as dates, URLs and order are written once per entry. Text that changes between languages is written as `{ "es": "…", "en": "…", "ca": "…" }`. Prose fields (summaries, highlights, descriptions) must have all three versions or the build fails; names and technologies can stay as a single string when they are the same in every language.

- `profile/main.json`: name, role, keywords, intro, links, contact and SEO texts.
- `skills/`: one file per category, with an `order`. The first three items show by default; the rest fold behind a "+N" chip.
- `experience/`: one file per position; `period.end: null` means current. `summary` is always visible; `highlights` fold behind "Ver logros".
- `projects/` and `education/`: one file per entry, with an `order`.

## Scripts

| Command            | What it does                                                  |
| ------------------ | ------------------------------------------------------------- |
| `npm run dev`      | Development server with hot reload.                           |
| `npm run build`    | Production build into `dist/`.                                |
| `npm run preview`  | Serves `dist/` locally.                                       |
| `npm run check`    | Type-checks `.astro` and `.ts` files.                         |
| `npm run lint`     | ESLint.                                                       |
| `npm run format`   | Prettier.                                                     |
| `npm test`         | Unit tests.                                                   |
| `npm run test:e2e` | Browser tests against the production build.                   |
| `npm run photo`    | Prepares `src/assets/foto.jpg` from `Foto.JPG` (strips EXIF). |
| `npm run og`       | Renders `public/og/<language>.png` from the profile data.     |
| `npm run verify`   | Everything above, in the order CI runs it.                    |

## Deployment

`.github/workflows/deploy.yml` runs the checks, builds the site and publishes `dist/` to GitHub Pages. Actions are pinned by commit hash and the workflow runs with read-only permissions except for the deploy step. Pull requests run the checks without deploying.

The site is served from the custom domain `jairojimenez.dev`, configured in the repository's Pages settings and pointed at GitHub Pages through DNS. The public URL lives in `src/config/site.ts`; Astro, the browser tests and the Open Graph image all read it from there.

## License

[MIT](LICENSE)
