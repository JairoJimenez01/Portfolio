import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { DEFAULT_LOCALE, LOCALE_INFO, LOCALES } from './src/config/locales';
import { BASE_PATH, SITE_URL } from './src/config/site';

/** Subconjuntos de caracteres necesarios para español y catalán (acentos, ñ, ç, l·l). */
const SUBSETS: [string, ...string[]] = ['latin', 'latin-ext'];

export default defineConfig({
  // `site` se usa para URLs absolutas (sitemap, Open Graph, canónica) y `base` para las rutas internas.
  site: SITE_URL,
  base: BASE_PATH,
  // Las rutas por idioma las genera pages/[...locale].astro. Al sitemap solo se le indica qué
  // prefijo corresponde a cada idioma, para que enlace entre sí las tres versiones de la página.
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((locale) => [locale, LOCALE_INFO[locale].tag])),
      },
    }),
  ],
  // Las fuentes se descargan en el build y se sirven desde el propio dominio:
  // ningún visitante hace peticiones a Google Fonts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Sora',
      cssVariable: '--font-sora',
      weights: [600, 800],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['ui-monospace', 'Cascadia Mono', 'Consolas', 'monospace'],
    },
  ],
});
